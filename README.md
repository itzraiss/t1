# 🎬 CineStream Brasil - Plataforma de Streaming Completa

## 🌟 Visão Geral

**CineStream Brasil** é uma plataforma de streaming completa e moderna, desenvolvida especificamente para o mercado brasileiro. Combine filmes, séries, animes, desenhos e jogos em uma única plataforma, com pagamentos em Real brasileiro via Mercado Pago e PIX.

### 🎯 Inspiração
- **Netflix**: Interface limpa e recomendações inteligentes
- **Amazon Prime**: Variedade de conteúdo e qualidade de streaming
- **Disney+**: Experiência familiar e multiplataforma
- **HBO Max**: Qualidade premium e conteúdo exclusivo

## 🚀 Características Principais

### 📱 Multiplataforma
- ✅ **Website Responsivo** (lançamento inicial)
- ✅ **Android APK** (celulares e tablets)
- ✅ **Android TV / TV Box**
- ✅ **Roku TV**

### 🎭 Conteúdo Universal
- 🎬 **Filmes** de todos os gêneros
- 📺 **Séries** nacionais e internacionais
- 🌸 **Animes** legendados e dublados
- 🎨 **Desenhos** para toda família
- 🎮 **Jogos** integrados na plataforma

### 💳 Sistema de Pagamento Brasileiro
- 💰 **Preços em Real Brasileiro**
- 💳 **Cartão de Débito/Crédito**
- 📱 **PIX** (pagamento instantâneo)
- 🏪 **Mercado Pago** (gateway principal)
- 🎫 **Planos flexíveis** a partir de R$ 19,90

### 🔐 Autenticação Avançada
- 📧 **Email/Senha**
- 📱 **Telefone/SMS**
- 🔑 **Google OAuth**
- 👤 **Facebook Login**
- 👨‍👩‍👧‍👦 **Perfis múltiplos por conta**

## 💰 Planos de Assinatura

| Plano | Preço | Telas | Qualidade | Recursos |
|-------|-------|-------|-----------|----------|
| **Gratuito** | R$ 0,00 | 1 | 480p | Anúncios, conteúdo limitado |
| **Básico** | R$ 19,90 | 1 | 720p HD | Sem anúncios, download offline |
| **Premium** | R$ 29,90 | 2 | 1080p Full HD | Múltiplos perfis, streaming simultâneo |
| **Família** | R$ 39,90 | 4 | 4K Ultra HD | Controle parental, perfis ilimitados |

## 🏗️ Arquitetura Técnica

### Backend
- **Framework**: Node.js + Express.js
- **Banco de Dados**: MongoDB Atlas (gratuito)
- **Autenticação**: JWT + OAuth 2.0
- **Pagamentos**: Mercado Pago SDK
- **APIs**: TMDB + OMDB para catálogo
- **Hospedagem**: Render.com (gratuito)

### Frontend
- **Web**: React.js + Next.js
- **Mobile**: React Native
- **TV**: Android TV (Java/Kotlin) + Roku (BrightScript)
- **UI/UX**: Material-UI + Design System customizado

### Performance
- **CDN**: Cloudflare (gratuito)
- **Otimização**: Bundle splitting, lazy loading
- **Cache**: Redis para sessões e dados frequentes
- **Streaming**: Adaptive bitrate streaming

## 🎨 Design System

### Cores Principais
```css
--primary: #E50914 (Netflix Red)
--secondary: #00A8E1 (Prime Blue)
--accent: #1DB954 (Spotify Green)
--dark: #141414 (Netflix Dark)
--light: #F5F5F5 (Clean White)
```

### Tipografia
- **Principal**: Inter (moderna e legível)
- **Secundária**: Roboto (Android padrão)
- **Destaque**: Montserrat (títulos e chamadas)

## 📦 Estrutura do Projeto

```
cinestream-brasil/
├── backend/                 # API e servidor
│   ├── src/
│   │   ├── controllers/     # Controladores das rotas
│   │   ├── models/          # Modelos do MongoDB
│   │   ├── routes/          # Definição das rotas
│   │   ├── middleware/      # Middlewares de autenticação/validação
│   │   ├── services/        # Serviços (pagamento, email, etc.)
│   │   └── utils/           # Funções utilitárias
│   ├── config/              # Configurações do banco e APIs
│   └── tests/               # Testes automatizados
├── frontend-web/            # Website React/Next.js
│   ├── components/          # Componentes reutilizáveis
│   ├── pages/               # Páginas da aplicação
│   ├── styles/              # Estilos CSS/SCSS
│   ├── hooks/               # Custom hooks React
│   └── utils/               # Utilitários frontend
├── mobile-app/              # App React Native
│   ├── src/
│   │   ├── screens/         # Telas do app
│   │   ├── components/      # Componentes mobile
│   │   ├── navigation/      # Navegação entre telas
│   │   └── services/        # Serviços API
│   └── android/             # Configurações Android
├── tv-apps/                 # Apps para TV
│   ├── android-tv/          # Android TV (Java/Kotlin)
│   └── roku/                # Roku TV (BrightScript)
├── docs/                    # Documentação completa
└── deployment/              # Scripts e configs de deploy
```

## 🚀 Instalação e Configuração

### Pré-requisitos
```bash
# Node.js 18+ e npm
node --version
npm --version

# Git
git --version

# MongoDB Compass (opcional, para visualizar dados)
```

### 1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/cinestream-brasil.git
cd cinestream-brasil
```

### 2. Configure o Backend
```bash
cd backend
npm install
cp .env.example .env
# Edite o arquivo .env com suas configurações
npm run dev
```

### 3. Configure o Frontend Web
```bash
cd ../frontend-web
npm install
cp .env.local.example .env.local
# Edite o arquivo .env.local
npm run dev
```

### 4. Configure o App Mobile
```bash
cd ../mobile-app
npm install
# Para Android
npx react-native run-android
```

## 🔧 Configuração das Variáveis de Ambiente

### Backend (.env)
```env
# Servidor
PORT=5000
NODE_ENV=development

# MongoDB (suas credenciais)
MONGODB_URI=mongodb+srv://itzraiss:1414@streamvault.fauf3qq.mongodb.net/?retryWrites=true&w=majority&appName=StreamVault

# JWT
JWT_SECRET=sua_chave_super_secreta_aqui
JWT_EXPIRE=7d

# APIs de Filmes
TMDB_API_KEY=97654fa982a1f2e165be95e0ef9b94e6
TMDB_READ_TOKEN=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzY1NGZhOTgyYTFmMmUxNjViZTk1ZTBlZjliOTRlNiIsIm5iZiI6MTc1Mzk5NjkwNC41OTgsInN1YiI6IjY4OGJkZTY4NDliMzQwNWRiZDYxZTI3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c-APqR2gTNbQWfMrmTResdinG4RzkQgcDEinXZ6O3GE
OMDB_API_KEY=31bc1e9f

# Mercado Pago
MP_ACCESS_TOKEN=seu_token_do_mercado_pago
MP_PUBLIC_KEY=sua_chave_publica_do_mercado_pago

# Email (SendGrid ou similar)
EMAIL_SERVICE=sendgrid
EMAIL_API_KEY=sua_chave_do_sendgrid
EMAIL_FROM=noreply@cinestream.com.br

# OAuth
GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret
FACEBOOK_APP_ID=seu_facebook_app_id
FACEBOOK_APP_SECRET=seu_facebook_app_secret

# Cloudflare (CDN)
CLOUDFLARE_ZONE_ID=seu_zone_id
CLOUDFLARE_API_TOKEN=seu_api_token
```

## 🎬 Funcionalidades Implementadas

### ✅ Sistema de Usuários
- [x] Registro e login
- [x] Perfis múltiplos
- [x] Recuperação de senha
- [x] Verificação de email
- [x] OAuth (Google/Facebook)

### ✅ Catálogo de Conteúdo
- [x] Integração TMDB/OMDB
- [x] Busca avançada
- [x] Filtros por gênero/ano
- [x] Recomendações personalizadas
- [x] Lista de favoritos

### ✅ Sistema de Pagamentos
- [x] Integração Mercado Pago
- [x] Pagamento via PIX
- [x] Cartão de crédito/débito
- [x] Gestão de assinaturas
- [x] Faturas e histórico

### ✅ Streaming e Player
- [x] Player HTML5 customizado
- [x] Controles avançados
- [x] Legendas/dublagem
- [x] Qualidade adaptativa
- [x] Histórico de visualização

## 📈 Roadmap de Desenvolvimento

### Fase 1: MVP Web (Semanas 1-4)
- ✅ Backend API completo
- ✅ Autenticação e usuários
- ✅ Catálogo básico
- ✅ Sistema de pagamentos
- ✅ Player de vídeo

### Fase 2: App Mobile (Semanas 5-8)
- [ ] React Native setup
- [ ] Navegação mobile
- [ ] Telas principais
- [ ] Download offline
- [ ] Notificações push

### Fase 3: Apps para TV (Semanas 9-12)
- [ ] Android TV app
- [ ] Roku TV app
- [ ] Interface adaptada para TV
- [ ] Controle remoto
- [ ] Cast/AirPlay

### Fase 4: Recursos Avançados (Semanas 13-16)
- [ ] Recomendações IA
- [ ] Controle parental
- [ ] Streaming ao vivo
- [ ] Conteúdo original
- [ ] Analytics avançado

## 🔒 Segurança e Performance

### Segurança
- ✅ Autenticação JWT
- ✅ Validação de entrada
- ✅ Rate limiting
- ✅ HTTPS obrigatório
- ✅ Sanitização de dados

### Performance
- ✅ Bundle splitting
- ✅ Lazy loading
- ✅ CDN Cloudflare
- ✅ Compressão gzip
- ✅ Cache inteligente

## 💸 Custos e Escalabilidade

### Tier Gratuito (0-1000 usuários)
- **Render.com**: Gratuito (750h/mês)
- **MongoDB Atlas**: Gratuito (512MB)
- **Cloudflare**: Gratuito (ilimitado)
- **Mercado Pago**: 4,99% por transação
- **Total**: R$ 0,00/mês + taxas de transação

### Crescimento (1000+ usuários)
- **Render.com Pro**: $7/mês
- **MongoDB Atlas**: $9/mês
- **CDN Premium**: $20/mês
- **Total**: ~R$ 200/mês

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📞 Suporte

- **Email**: suporte@cinestream.com.br
- **WhatsApp**: +55 11 99999-9999
- **Discord**: [CineStream Brasil](https://discord.gg/cinestream)
- **Documentação**: [docs.cinestream.com.br](https://docs.cinestream.com.br)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**🎬 CineStream Brasil** - Sua nova experiência de streaming brasileira!

*Desenvolvido com ❤️ para o mercado brasileiro*