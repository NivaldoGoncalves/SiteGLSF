// ==========================================
// COMMENTS.JS - Sistema de comentários
// Armazena comentários no localStorage
// Preparado para migração futura para backend
// ==========================================

// ==========================================
// CONFIGURAÇÃO
// ==========================================
const COMMENTS_STORAGE_KEY = 'blog_comments'; // Chave para localStorage
const MAX_COMMENT_LENGTH = 1000; // Limite de caracteres por comentário

// ==========================================
// FUNÇÃO: Obter ID do post atual pela URL
// ==========================================
function getCurrentPostId() {
    // Extrai o nome do arquivo da URL (ex: ansiedade.html)
    const path = window.location.pathname;
    const fileName = path.substring(path.lastIndexOf('/') + 1);
    return fileName.replace('.html', '');
}

// ==========================================
// FUNÇÃO: Carregar comentários do localStorage
// ==========================================
function loadComments() {
    const stored = localStorage.getItem(COMMENTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
}

// ==========================================
// FUNÇÃO: Salvar comentários no localStorage
// ==========================================
function saveComments(comments) {
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
}

// ==========================================
// FUNÇÃO: Obter comentários de um post específico
// ==========================================
function getPostComments(postId) {
    const allComments = loadComments();
    return allComments[postId] || [];
}

// ==========================================
// FUNÇÃO: Adicionar novo comentário
// ==========================================
function addComment(postId, commentData) {
    const allComments = loadComments();
    
    // Inicializar array de comentários do post se não existir
    if (!allComments[postId]) {
        allComments[postId] = [];
    }
    
    // Criar objeto do comentário
    const newComment = {
        id: Date.now(), // ID único baseado em timestamp
        name: commentData.name,
        email: commentData.email, // Não será exibido publicamente
        text: commentData.text,
        date: new Date().toISOString(),
        approved: true // Em produção, poderia haver moderação
    };
    
    // Adicionar ao início do array (mais recente primeiro)
    allComments[postId].unshift(newComment);
    
    // Salvar no localStorage
    saveComments(allComments);
    
    return newComment;
}

// ==========================================
// FUNÇÃO: Formatar data do comentário
// ==========================================
function formatCommentDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    // Retornar formato relativo
    if (diffMins < 1) return 'Agora mesmo';
    if (diffMins < 60) return `Há ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
    if (diffHours < 24) return `Há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 7) return `Há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
    
    // Formato completo para datas antigas
    return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ==========================================
// FUNÇÃO: Criar HTML de um comentário
// ==========================================
function createCommentHTML(comment) {
    return `
        <div class="comment" data-comment-id="${comment.id}">
            <div class="comment-header">
                <span class="comment-author">${escapeHTML(comment.name)}</span>
                <span class="comment-date">${formatCommentDate(comment.date)}</span>
            </div>
            <div class="comment-text">${escapeHTML(comment.text)}</div>
        </div>
    `;
}

// ==========================================
// FUNÇÃO: Escapar HTML para prevenir XSS
// ==========================================
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================================
// FUNÇÃO: Renderizar lista de comentários
// ==========================================
function renderComments(postId) {
    const commentsList = document.getElementById('comments-list');
    
    if (!commentsList) return;
    
    const comments = getPostComments(postId);
    
    if (comments.length === 0) {
        commentsList.innerHTML = '<p class="no-comments">Nenhum comentário ainda. Seja o primeiro a comentar!</p>';
        return;
    }
    
    // Renderizar comentários
    commentsList.innerHTML = comments.map(comment => createCommentHTML(comment)).join('');
}

// ==========================================
// FUNÇÃO: Validar formulário de comentário
// ==========================================
function validateCommentForm(formData) {
    const errors = {};
    
    // Validar nome
    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'Por favor, insira seu nome (mínimo 2 caracteres)';
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.email = 'Por favor, insira um email válido';
    }
    
    // Validar comentário
    if (!formData.text || formData.text.trim().length < 10) {
        errors.text = 'O comentário deve ter pelo menos 10 caracteres';
    }
    
    if (formData.text && formData.text.length > MAX_COMMENT_LENGTH) {
        errors.text = `O comentário não pode ter mais de ${MAX_COMMENT_LENGTH} caracteres`;
    }
    
    return errors;
}

// ==========================================
// FUNÇÃO: Exibir erros de validação
// ==========================================
function displayErrors(errors) {
    // Limpar erros anteriores
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });
    
    document.querySelectorAll('.error-message').forEach(msg => {
        msg.textContent = '';
    });
    
    // Exibir novos erros
    Object.keys(errors).forEach(field => {
        const input = document.getElementById(`comment-${field}`);
        if (input) {
            const formGroup = input.closest('.form-group');
            const errorMsg = formGroup.querySelector('.error-message');
            
            formGroup.classList.add('error');
            if (errorMsg) {
                errorMsg.textContent = errors[field];
            }
        }
    });
}

// ==========================================
// FUNÇÃO: Exibir mensagem de sucesso
// ==========================================
function showSuccessMessage() {
    // Criar elemento de feedback
    const feedback = document.createElement('div');
    feedback.className = 'form-feedback success';
    feedback.textContent = 'Comentário publicado com sucesso!';
    
    const form = document.getElementById('comment-form');
    form.appendChild(feedback);
    
    // Remover mensagem após 5 segundos
    setTimeout(() => {
        feedback.remove();
    }, 5000);
}

// ==========================================
// FUNÇÃO: Processar envio do formulário
// ==========================================
function handleCommentSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const postId = getCurrentPostId();
    
    // Coletar dados do formulário
    const formData = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        text: form.comment.value.trim()
    };
    
    // Validar
    const errors = validateCommentForm(formData);
    
    if (Object.keys(errors).length > 0) {
        displayErrors(errors);
        return;
    }
    
    // Adicionar comentário
    addComment(postId, formData);
    
    // Renderizar comentários atualizados
    renderComments(postId);
    
    // Limpar formulário
    form.reset();
    
    // Mostrar mensagem de sucesso
    showSuccessMessage();
    
    // Rolar para os comentários
    document.getElementById('comments-list').scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
}

// ==========================================
// INICIALIZAÇÃO
// Configurar sistema de comentários quando DOM carregar
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');
    
    // Verificar se estamos em uma página de post
    if (!commentForm || !commentsList) return;
    
    const postId = getCurrentPostId();
    
    // Renderizar comentários existentes
    renderComments(postId);
    
    // Configurar formulário
    commentForm.addEventListener('submit', handleCommentSubmit);
    
    // Adicionar contadores de caracteres (opcional)
    const commentTextarea = document.getElementById('comment-text');
    if (commentTextarea) {
        commentTextarea.addEventListener('input', function() {
            const remaining = MAX_COMMENT_LENGTH - this.value.length;
            // Você pode adicionar um contador visual aqui se desejar
        });
    }
});

// ==========================================
// FUNÇÃO HELPER: Limpar todos os comentários (desenvolvimento)
// Para usar: execute clearAllComments() no console do navegador
// ==========================================
function clearAllComments() {
    localStorage.removeItem(COMMENTS_STORAGE_KEY);
    console.log('Todos os comentários foram removidos');
    location.reload();
}

// ==========================================
// PREPARAÇÃO PARA BACKEND FUTURO
// ==========================================
/*
Para migrar para um backend, substitua as funções:

1. loadComments() -> fetch('/api/comments')
2. saveComments() -> fetch('/api/comments', { method: 'POST', ... })
3. addComment() -> fetch('/api/comments', { method: 'POST', body: JSON.stringify(commentData) })

Exemplo de integração com API:

async function addComment(postId, commentData) {
    try {
        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: postId,
                ...commentData
            })
        });
        
        if (!response.ok) {
            throw new Error('Erro ao enviar comentário');
        }
        
        const newComment = await response.json();
        return newComment;
    } catch (error) {
        console.error('Erro:', error);
        alert('Não foi possível enviar seu comentário. Tente novamente.');
    }
}

async function getPostComments(postId) {
    try {
        const response = await fetch(`/api/comments/${postId}`);
        if (!response.ok) {
            throw new Error('Erro ao carregar comentários');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro:', error);
        return [];
    }
}
*/
