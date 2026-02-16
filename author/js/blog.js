// ==========================================
// BLOG.JS - Gerenciamento do blog
// Responsável por carregar artigos e exibi-los
// ==========================================

// ==========================================
// BASE DE DADOS DOS ARTIGOS
// Em produção, esses dados viriam de um backend
// ==========================================
const blogPosts = [
    {
        id: 1,
        title: "5 Dicas Práticas para Lidar com a Ansiedade no Dia a Dia",
        excerpt: "A ansiedade faz parte da vida, mas quando ela se torna constante e interfere no seu dia a dia, é hora de agir. Confira estratégias simples e eficazes.",
        date: "2026-02-05",
        readTime: "5 min",
        url: "blog/ansiedade.html",
        image: null
    },
    {
        id: 2,
        title: "Por que fazer terapia? Desmistificando o processo terapêutico",
        excerpt: "Muitas pessoas ainda têm dúvidas sobre como funciona a terapia e se ela é realmente para elas. Vamos esclarecer os principais mitos.",
        date: "2026-01-28",
        readTime: "6 min",
        url: "blog/porque-fazer-terapia.html",
        image: null
    },
    {
        id: 3,
        title: "Autoestima: como desenvolver uma relação mais saudável consigo mesmo",
        excerpt: "A autoestima não é algo que nasce pronto. É uma construção diária que envolve autoconhecimento, autocompaixão e ação.",
        date: "2026-01-20",
        readTime: "7 min",
        url: "#",
        image: null
    },
    {
        id: 4,
        title: "Sinais de que você pode estar sofrendo de Burnout",
        excerpt: "O esgotamento profissional é mais comum do que imaginamos. Aprenda a identificar os sinais e o que fazer para recuperar seu bem-estar.",
        date: "2026-01-12",
        readTime: "6 min",
        url: "#",
        image: null
    },
    {
        id: 5,
        title: "Como a terapia online funciona na prática",
        excerpt: "O atendimento psicológico online é tão eficaz quanto o presencial? Tire suas dúvidas sobre essa modalidade que vem crescendo no Brasil.",
        date: "2026-01-05",
        readTime: "5 min",
        url: "#",
        image: null
    },
    {
        id: 6,
        title: "Relacionamentos tóxicos: quando é hora de se afastar",
        excerpt: "Nem sempre é fácil reconhecer quando um relacionamento está fazendo mais mal do que bem. Entenda os sinais e como agir.",
        date: "2025-12-28",
        readTime: "8 min",
        url: "#",
        image: null
    }
];

// ==========================================
// FUNÇÃO: Formatar data para português
// ==========================================
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
}

// ==========================================
// FUNÇÃO: Criar placeholder SVG para imagem
// ==========================================
function createPlaceholderImage() {
    return `
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 200">
            <rect fill="#e8f4f8" width="400" height="200"/>
            <text x="200" y="100" font-size="16" fill="#7ca8b8" text-anchor="middle" dominant-baseline="middle">Imagem do artigo</text>
        </svg>
    `;
}

// ==========================================
// FUNÇÃO: Criar HTML de um card de blog
// ==========================================
function createBlogCard(post) {
    return `
        <article class="blog-card">
            <div class="blog-card-image">
                ${post.image ? `<img src="${post.image}" alt="${post.title}">` : createPlaceholderImage()}
            </div>
            <div class="blog-card-content">
                <div class="blog-card-meta">
                    <span>${formatDate(post.date)}</span> • <span>${post.readTime} de leitura</span>
                </div>
                <h3 class="blog-card-title">${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <a href="${post.url}" class="blog-card-link">Ler artigo →</a>
            </div>
        </article>
    `;
}

// ==========================================
// FUNÇÃO: Carregar posts na página principal (últimos 3)
// ==========================================
function loadHomePosts() {
    const container = document.getElementById('home-blog-posts');
    
    if (!container) return;
    
    // Pegar os 3 posts mais recentes
    const recentPosts = blogPosts.slice(0, 3);
    
    // Renderizar os posts
    container.innerHTML = recentPosts.map(post => createBlogCard(post)).join('');
}

// ==========================================
// FUNÇÃO: Carregar todos os posts na página do blog
// ==========================================
function loadBlogPosts() {
    const container = document.getElementById('blog-posts');
    
    if (!container) return;
    
    // Renderizar todos os posts
    container.innerHTML = blogPosts.map(post => createBlogCard(post)).join('');
}

// ==========================================
// INICIALIZAÇÃO
// Carregar posts quando o DOM estiver pronto
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    loadHomePosts();
    loadBlogPosts();
});

// ==========================================
// EXPORTAR DADOS PARA OUTROS SCRIPTS
// Permite que comments.js acesse os posts
// ==========================================
if (typeof window !== 'undefined') {
    window.blogPosts = blogPosts;
}
