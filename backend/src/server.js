/**
 * ========================================
 * CINESTREAM BRASIL - SERVIDOR PRINCIPAL
 * ========================================
 * 
 * Plataforma de streaming brasileira completa
 * Desenvolvido para o mercado brasileiro
 * 
 * Recursos:
 * - Pagamentos em Real via Mercado Pago/PIX
 * - Integração TMDB/OMDB para catálogo
 * - Autenticação JWT + OAuth
 * - Sistema de assinaturas
 * - Performance otimizada
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

// Importar configurações
const { connectDB } = require('./config/database');
const { configurePassport } = require('./config/passport');
const logger = require('./utils/logger');

// Importar rotas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const mediaRoutes = require('./routes/media');
const subscriptionRoutes = require('./routes/subscription');
const paymentRoutes = require('./routes/payment');
const adminRoutes = require('./routes/admin');
const watchlistRoutes = require('./routes/watchlist');
const profileRoutes = require('./routes/profile');

// Importar middlewares
const { errorHandler } = require('./middleware/errorHandler');
const { notFound } = require('./middleware/notFound');

// Criar aplicação Express
const app = express();

// ========================================
// CONFIGURAÇÕES DE SEGURANÇA
// ========================================

// Helmet para headers de segurança
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://image.tmdb.org/", "https://www.gravatar.com"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "https://api.mercadopago.com"],
      mediaSrc: ["'self'", "blob:", "data:"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// CORS configurado para Brasil
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://cinestream.com.br',
      'https://www.cinestream.com.br',
      'https://app.cinestream.com.br'
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Compressão gzip
app.use(compression());

// Rate limiting geral
const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    error: 'Muitas requisições. Tente novamente em 15 minutos.',
    code: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(generalLimiter);

// Rate limiting para autenticação
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: parseInt(process.env.AUTH_RATE_LIMIT_MAX) || 5,
  message: {
    error: 'Muitas tentativas de login. Tente novamente em 15 minutos.',
    code: 'AUTH_RATE_LIMIT_EXCEEDED'
  },
  skipSuccessfulRequests: true,
});

// ========================================
// MIDDLEWARES DE PARSING
// ========================================

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Configuração de sessão
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  }
}));

// Passport para OAuth
app.use(passport.initialize());
app.use(passport.session());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ========================================
// CONFIGURAÇÕES INICIAIS
// ========================================

// Conectar ao MongoDB
connectDB();

// Configurar Passport
configurePassport();

// ========================================
// ROTAS DA API
// ========================================

// Rota de saúde
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'CineStream Brasil API funcionando!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV
  });
});

// Rota raiz
app.get('/', (req, res) => {
  res.status(200).json({
    message: '🎬 Bem-vindo ao CineStream Brasil API!',
    description: 'Plataforma de streaming brasileira completa',
    version: '1.0.0',
    docs: '/api/docs',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      media: '/api/media',
      subscriptions: '/api/subscriptions',
      payments: '/api/payments',
      admin: '/api/admin'
    }
  });
});

// Rotas da API
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/profiles', profileRoutes);

// ========================================
// MIDDLEWARE DE ERRO
// ========================================

// 404 - Rota não encontrada
app.use(notFound);

// Handler de erro global
app.use(errorHandler);

// ========================================
// INICIALIZAÇÃO DO SERVIDOR
// ========================================

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  logger.info(`
  ========================================
  🎬 CINESTREAM BRASIL API INICIADO
  ========================================
  
  🚀 Servidor: http://localhost:${PORT}
  🌍 Ambiente: ${process.env.NODE_ENV}
  📅 Data: ${new Date().toLocaleString('pt-BR')}
  
  📊 Endpoints disponíveis:
  • GET  /health           - Status da API
  • POST /api/auth/login   - Login de usuário
  • POST /api/auth/register - Registro de usuário
  • GET  /api/media        - Catálogo de mídia
  • POST /api/payments/pix - Pagamento PIX
  
  🔧 Recursos ativos:
  ✅ MongoDB Atlas conectado
  ✅ Mercado Pago configurado
  ✅ TMDB/OMDB integrados
  ✅ Rate limiting ativo
  ✅ CORS configurado para Brasil
  ✅ Segurança Helmet ativa
  
  ========================================
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM recebido. Encerrando servidor graciosamente...');
  server.close(() => {
    logger.info('Servidor encerrado.');
    mongoose.connection.close(false, () => {
      logger.info('Conexão MongoDB encerrada.');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT recebido. Encerrando servidor graciosamente...');
  server.close(() => {
    logger.info('Servidor encerrado.');
    mongoose.connection.close(false, () => {
      logger.info('Conexão MongoDB encerrada.');
      process.exit(0);
    });
  });
});

// Capturar erros não tratados
process.on('unhandledRejection', (err, promise) => {
  logger.error('Unhandled Promise Rejection:', err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err.message);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;