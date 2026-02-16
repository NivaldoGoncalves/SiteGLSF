// ==========================================
// CONTACT.JS - Validação e envio do formulário de contato
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    // ==========================================
    // FUNÇÃO: Validar campo de email
    // ==========================================
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ==========================================
    // FUNÇÃO: Validar campo de telefone (opcional)
    // ==========================================
    function isValidPhone(phone) {
        // Aceita formatos: (11) 98765-4321, 11987654321, etc.
        if (!phone) return true; // Campo opcional
        const phoneRegex = /^[\d\s()\-+]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }
    
    // ==========================================
    // FUNÇÃO: Validar formulário completo
    // ==========================================
    function validateForm(formData) {
        const errors = {};
        
        // Validar nome
        if (!formData.name || formData.name.trim().length < 3) {
            errors.name = 'Por favor, insira seu nome completo (mínimo 3 caracteres)';
        }
        
        // Validar email
        if (!formData.email || !isValidEmail(formData.email)) {
            errors.email = 'Por favor, insira um email válido';
        }
        
        // Validar telefone (se preenchido)
        if (formData.phone && !isValidPhone(formData.phone)) {
            errors.phone = 'Por favor, insira um telefone válido';
        }
        
        // Validar assunto
        if (!formData.subject) {
            errors.subject = 'Por favor, selecione um assunto';
        }
        
        // Validar mensagem
        if (!formData.message || formData.message.trim().length < 10) {
            errors.message = 'A mensagem deve ter pelo menos 10 caracteres';
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
            const input = document.getElementById(field);
            if (input) {
                const formGroup = input.closest('.form-group');
                const errorMsg = formGroup.querySelector('.error-message');
                
                formGroup.classList.add('error');
                if (errorMsg) {
                    errorMsg.textContent = errors[field];
                }
                
                // Focar no primeiro campo com erro
                if (Object.keys(errors)[0] === field) {
                    input.focus();
                }
            }
        });
    }
    
    // ==========================================
    // FUNÇÃO: Exibir feedback de sucesso
    // ==========================================
    function showSuccessFeedback() {
        const feedback = document.getElementById('form-feedback');
        feedback.className = 'form-feedback success';
        feedback.textContent = 'Mensagem enviada com sucesso! Entrarei em contato em breve.';
        
        // Rolar até o feedback
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // ==========================================
    // FUNÇÃO: Exibir feedback de erro
    // ==========================================
    function showErrorFeedback(message) {
        const feedback = document.getElementById('form-feedback');
        feedback.className = 'form-feedback error';
        feedback.textContent = message || 'Ocorreu um erro ao enviar a mensagem. Tente novamente.';
    }
    
    // ==========================================
    // FUNÇÃO: Simular envio (substituir por API real)
    // ==========================================
    function submitToServer(formData) {
        return new Promise((resolve, reject) => {
            // Simular delay de rede
            setTimeout(() => {
                // Em produção, aqui seria uma chamada fetch() para seu backend
                console.log('Dados do formulário:', formData);
                
                // Simular sucesso (90% de chance)
                if (Math.random() > 0.1) {
                    resolve({ success: true, message: 'Mensagem enviada com sucesso!' });
                } else {
                    reject(new Error('Erro simulado no envio'));
                }
            }, 1000);
        });
        
        /* EXEMPLO DE INTEGRAÇÃO REAL COM BACKEND:
        
        return fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar mensagem');
            }
            return response.json();
        });
        */
    }
    
    // ==========================================
    // EVENTO: Submit do formulário
    // ==========================================
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Coletar dados do formulário
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim()
        };
        
        // Validar dados
        const errors = validateForm(formData);
        
        if (Object.keys(errors).length > 0) {
            displayErrors(errors);
            return;
        }
        
        // Desabilitar botão durante envio
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        try {
            // Enviar para servidor
            await submitToServer(formData);
            
            // Sucesso
            showSuccessFeedback();
            contactForm.reset();
            
            // Limpar erros
            displayErrors({});
            
        } catch (error) {
            // Erro
            console.error('Erro ao enviar formulário:', error);
            showErrorFeedback();
        } finally {
            // Reabilitar botão
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
    
    // ==========================================
    // MÁSCARAS DE INPUT (melhorar UX)
    // ==========================================
    
    // Máscara de telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            
            // Aplicar máscara: (11) 98765-4321
            if (value.length > 6) {
                value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7)}`;
            } else if (value.length > 2) {
                value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
            } else if (value.length > 0) {
                value = `(${value}`;
            }
            
            e.target.value = value;
        });
    }
    
    // ==========================================
    // VALIDAÇÃO EM TEMPO REAL (opcional)
    // Remove erro quando usuário começa a corrigir
    // ==========================================
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const formGroup = this.closest('.form-group');
            if (formGroup.classList.contains('error')) {
                formGroup.classList.remove('error');
                const errorMsg = formGroup.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.textContent = '';
                }
            }
        });
    });
});
