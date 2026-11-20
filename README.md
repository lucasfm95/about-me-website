# about-me-website

Portfólio profissional de **Lucas Martins** — Desenvolvedor de Software Back-End (C#, .NET e Google Cloud Platform). É um site estático de página única, feito com HTML, CSS e JavaScript puros, sem frameworks nem etapa de build.

## Conteúdo do site

Seções: Sobre, Experiência Profissional, Habilidades, Formação (cursos e certificações), Projetos e Contato, além do download do currículo em PDF.

## Funcionalidades

- Tema claro/escuro, respeitando a preferência do sistema e persistido no `localStorage`
- Menu responsivo com versão mobile
- Destaque do item de navegação conforme a seção visível (scroll-spy)
- Animações de entrada ao rolar a página, efeito ripple nos botões e botão "voltar ao topo"
- Visual inspirado no Material Design (Roboto e Material Symbols via Google Fonts)

## Estrutura

```
.
├── index.html            # Página única
├── css/style.css         # Estilos e temas
├── js/script.js          # Interações
├── assets/
│   ├── docs/curriculo.pdf
│   └── img/
├── nginx.conf            # Configuração do Nginx (gzip, cache, headers)
├── Dockerfile            # Imagem nginx:alpine com o site
└── .github/workflows/ci-cd.yml
```

## Rodando localmente

Com Docker:

```bash
docker build -t about-me-website .
docker run --rm -p 8080:80 about-me-website
```

Acesse http://localhost:8080. Também é possível simplesmente abrir o `index.html` no navegador.

## Pipeline CI/CD

O workflow em `.github/workflows/ci-cd.yml` tem três jobs:

1. **Build and test image** (push e pull requests): builda a imagem e faz um smoke test com `curl` nas páginas e assets principais.
2. **Build and publish image to Docker Hub** (push na `main` ou execução manual): gera a imagem multi-arch (`linux/amd64` e `linux/arm64`) e publica como `<usuario>/about-me-website:latest`.
3. **Deploy on VPS** (após a publicação): um runner self-hosted na VPS executa `deploy-app about-me-website latest`, que baixa a nova imagem e atualiza o container.

Secret necessário no repositório: `DOCKERHUB_PASSWORD`. O runner da VPS deve ter o label `vps`.

## Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE).
