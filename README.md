# Site Profissional para Psicólogo

Site institucional completo desenvolvido com HTML5, CSS3 e JavaScript puro (vanilla), sem frameworks externos.

## 📋 Estrutura do Projeto

```
new-projectGL/
├── index.html                 # Página inicial
├── sobre.html                 # Sobre o psicólogo
├── servicos.html              # Serviços oferecidos
├── blog.html                  # Listagem de artigos
├── contato.html               # Formulário de contato
├── css/
│   └── styles.css             # Estilos completos do site
├── js/
│   ├── main.js                # Script principal (navegação, FAQ, animações)
│   ├── blog.js                # Gerenciamento de artigos
│   ├── comments.js            # Sistema de comentários
│   └── contact.js             # Validação do formulário de contato
├── blog/
│   └── ansiedade.html         # Exemplo de artigo individual
└── assets/
    └── images/                # Pasta para imagens (atualmente com placeholders SVG)
```

## 🎨 Características

### Design
- ✅ Interface moderna, minimalista e acolhedora
- ✅ Paleta de cores suaves (azul, verde água, bege)
- ✅ Tipografia confortável para leitura
- ✅ Animações sutis e transições suaves
- ✅ Totalmente responsivo (mobile-first)

### Funcionalidades
- ✅ Navegação fixa com menu hamburguer para mobile
- ✅ Sistema de blog com artigos
- ✅ Sistema de comentários (localStorage, preparado para backend)
- ✅ Formulário de contato com validação completa
- ✅ FAQ com accordion
- ✅ Animações ao rolar a página
- ✅ Integração com WhatsApp

### Tecnologias
- HTML5 semântico
- CSS3 com variáveis, Flexbox e Grid
- JavaScript ES6+ (vanilla, sem frameworks)
- LocalStorage para comentários

## 🚀 Como Usar

1. **Abrir o site**: Basta abrir o arquivo `index.html` em qualquer navegador moderno
2. **Adicionar imagens**: Substitua os placeholders SVG na pasta `assets/images/`
3. **Personalizar conteúdo**: Edite os textos nos arquivos HTML
4. **Ajustar cores**: Modifique as variáveis CSS em `css/styles.css` (linhas 6-20)

## 📝 Sistema de Comentários

O sistema de comentários está implementado com **localStorage** para funcionar sem backend. Para migrar para um backend:

1. Abra `js/comments.js`
2. Vá até a seção "PREPARAÇÃO PARA BACKEND FUTURO" (linha 290)
3. Substitua as funções `loadComments()` e `addComment()` pelas chamadas à sua API

Exemplo de integração:
```javascript
async function addComment(postId, commentData) {
    const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, ...commentData })
    });
    return await response.json();
}
```

## 📧 Formulário de Contato

O formulário possui validação completa client-side. Para enviar emails:

1. Abra `js/contact.js`
2. Localize a função `submitToServer()` (linha 87)
3. Substitua pela sua integração (exemplo fornecido no código)

Opções de backend:
- **EmailJS**: Serviço gratuito para envio de emails
- **Formspree**: Formulários sem backend
- **API própria**: Node.js, PHP, Python, etc.

## 🎨 Personalização de Cores

Edite as variáveis CSS no arquivo `css/styles.css`:

```css
:root {
    --primary-color: #5B9FBF;      /* Azul principal */
    --secondary-color: #A8D5BA;    /* Verde água */
    --accent-color: #F4A261;       /* Laranja suave */
    --text-dark: #2C3E50;          /* Texto escuro */
    --bg-light: #F8FAFB;           /* Fundo claro */
}
```

## 📱 SEO e Meta Tags

Cada página possui:
- Meta description única
- Meta keywords relevantes
- Open Graph tags (pode ser expandido)
- Estrutura HTML semântica

Para melhorar o SEO:
1. Adicione Google Analytics
2. Crie um arquivo `sitemap.xml`
3. Configure `robots.txt`
4. Adicione Schema.org markup

## 📦 Adicionar Novos Artigos

1. Crie um novo arquivo HTML em `/blog/` (ex: `novo-artigo.html`)
2. Use `blog/ansiedade.html` como template
3. Adicione o artigo no array `blogPosts` em `js/blog.js`:

```javascript
{
    id: 7,
    title: "Título do Artigo",
    excerpt: "Resumo do artigo...",
    date: "2026-02-10",
    readTime: "5 min",
    url: "blog/novo-artigo.html",
    image: null
}
```

## 🔒 Segurança

- ✅ Sanitização de HTML nos comentários (prevenção XSS)
- ✅ Validação client-side completa
- ✅ Escape de caracteres especiais
- ⚠️ **Importante**: Sempre implemente validação server-side em produção

## 🌐 Navegadores Suportados

- Chrome/Edge (últimas 2 versões)
- Firefox (últimas 2 versões)
- Safari (últimas 2 versões)
- Opera (última versão)

## 📄 Licença

Este projeto foi criado como template profissional. Você pode usar, modificar e distribuir livremente.

## 🤝 Suporte

Para dúvidas sobre o código:
1. Leia os comentários nos arquivos JavaScript
2. Consulte a documentação inline no CSS
3. Teste as funcionalidades no navegador (F12 para DevTools)

---

**Desenvolvido com ❤️ para profissionais da psicologia**
