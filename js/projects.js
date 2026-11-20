/*
  Lista de projetos.
  Para adicionar um novo projeto, basta incluir um objeto neste array —
  a lista e a modal da página projetos.html são geradas a partir dele.

  Campos:
    id          identificador único (usado na URL: projetos.html#<id>)
    name        título exibido
    icon        ícone do Material Symbols (thumb do card)
    summary     descrição curta (card)
    description descrição completa (modal)
    features    lista de destaques (modal)
    stack       tecnologias (chips)
    repo        URL do repositório no GitHub
    demo        (opcional) URL de demonstração
    docs        (opcional) URL da documentação
*/
const PROJECTS = [
  {
    id: 'stash-bot',
    name: 'stash-bot',
    icon: 'smart_toy',
    summary: 'Bot do Telegram que recebe mensagens, salva cada uma no Postgres e confirma o recebimento.',
    description:
      'Bot do Telegram que recebe mensagens via long polling, persiste cada uma em um banco ' +
      'PostgreSQL e responde confirmando o recebimento. Ao subir, a aplicação confere se o banco ' +
      'está na última migration e aplica as pendentes antes de começar a atender o Telegram.',
    features: [
      'Recebimento de mensagens via long polling',
      'Persistência em PostgreSQL com EF Core (code-first)',
      'Migrations aplicadas automaticamente na inicialização',
      'Restrição opcional a um chat específico (TELEGRAM_ALLOWED_CHAT_ID)',
      'Empacotado em Docker, com docker-compose para desenvolvimento local'
    ],
    stack: ['C#', '.NET', 'EF Core', 'PostgreSQL', 'Telegram Bot', 'Docker'],
    repo: 'https://github.com/lucasfm95/stash-bot'
  },
  {
    id: 'brazil-cities-api',
    name: 'brazil-cities-api',
    icon: 'location_city',
    summary: 'API RESTful em .NET 9 para consultar as cidades do Brasil.',
    description:
      'API RESTful em .NET 9 que disponibiliza os dados de todas as cidades do Brasil. ' +
      'Está publicada no Render, com documentação interativa via Swagger UI e Scalar, e conta com ' +
      'pipeline de build no GitHub Actions.',
    features: [
      'API RESTful com ASP.NET Core (.NET 9)',
      'Acesso a dados com Entity Framework Core e PostgreSQL',
      'Documentação interativa com Swagger UI e Scalar',
      'Aplicação auxiliar para carga inicial dos dados',
      'Build automatizado com GitHub Actions e execução via Docker Compose'
    ],
    stack: ['C#', '.NET 9', 'ASP.NET Core', 'EF Core', 'PostgreSQL', 'Docker', 'GitHub Actions'],
    repo: 'https://github.com/lucasfm95/brazil-cities-api',
    demo: 'https://brazil-cities-api.onrender.com',
    docs: 'https://brazil-cities-api.onrender.com/scalar/v1'
  },
  {
    id: 'video-downloader',
    name: 'video-downloader',
    icon: 'download',
    summary: 'Scripts em Python para baixar vídeos do YouTube, extrair áudio em MP3 e obter transcrições.',
    description:
      'Conjunto de scripts em Python, baseados no yt-dlp, para baixar vídeos do YouTube, extrair o ' +
      'áudio em MP3 e obter a transcrição dos vídeos. Funciona de forma interativa pelo terminal e ' +
      'reaproveita os cookies de um navegador logado para contornar a verificação anti-bot do YouTube.',
    features: [
      'Download de vídeo (MP4) com escolha do formato e qualidade, inclusive 1080p+ via ffmpeg',
      'Extração de áudio em MP3 (192 kbps)',
      'Transcrição por youtube-transcript-api ou via legendas do yt-dlp, com opção de salvar em .txt',
      'Uso de cookies do navegador (Safari por padrão, configurável) para evitar o bot check'
    ],
    stack: ['Python', 'yt-dlp', 'youtube-transcript-api', 'ffmpeg'],
    repo: 'https://github.com/lucasfm95/video-downloader'
  }
];
