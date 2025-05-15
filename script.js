document.addEventListener('DOMContentLoaded', () => {
    // Função para scroll suave ao clicar nos links da navegação e no botão CTA
    const scrollLinks = document.querySelectorAll('a[href^="#"], .cta-button');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Previne o comportamento padrão do link

            const targetId = this.getAttribute('href').substring(1); // Pega o ID da seção
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Ajusta para a altura da navbar fixa
                    behavior: 'smooth' // Rola suavemente
                });

                // Atualiza a classe 'active' na navbar
                updateActiveNavLink(targetId);
            } else if (targetId === 'sabores' && this.classList.contains('cta-button')) {
                // Caso específico para o botão CTA na hero section
                const saboresSection = document.getElementById('sabores');
                if (saboresSection) {
                    window.scrollTo({
                        top: saboresSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    updateActiveNavLink('sabores');
                }
            }
        });
    });

    // Função para atualizar a classe 'active' na navbar
    function updateActiveNavLink(currentId) {
        const navLinks = document.querySelectorAll('.navbar a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentId) {
                link.classList.add('active');
            }
        });
    }

    // Observador para atualizar a classe 'active' ao rolar a página
    const sections = document.querySelectorAll('section');
    const options = {
        root: null, // O viewport como root
        rootMargin: '-100px 0px -50% 0px', // Aciona quando a seção está 100px do topo e 50% da altura da viewport
        threshold: 0 // Aciona assim que qualquer parte da seção fica visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveNavLink(entry.target.id);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Animação simples de elementos ao scroll
    const animatedElements = document.querySelectorAll('.section-padded, .sabor-item, .gallery-item');

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Para de observar depois de animar
            }
        });
    };

    const animationObserver = new IntersectionObserver(animateOnScroll, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Começa a animar quando 10% do elemento está visível
    });

    animatedElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        animationObserver.observe(el);
    });

    // Efeito para o formulário de contato (simples)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Em breve entraremos em contato. :)');
            contactForm.reset(); // Limpa o formulário
        });
    }
});

// Função para o botão "Explorar Sabores" na hero section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80, // Ajusta para a altura da navbar
            behavior: 'smooth'
        });
    }
}