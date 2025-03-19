// Мобильное меню
// Глобальный обработчик ошибок
window.addEventListener('error', function(e) {
    // Логируем ошибку для отладки
    console.error('JavaScript error:', e.message, 'at', e.filename, ':', e.lineno);
    // Предотвращаем выполнение действия по умолчанию для данного события
    return false;
});

// Основной код с обработкой ошибок
try {
    document.addEventListener('DOMContentLoaded', () => {
        try {
            // Функция для восстановления стилей навигации при изменении размера окна
            function resetNavStyles() {
                try {
                    const navLinks = document.querySelector('.nav-links');
                    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                    const body = document.body;
                    
                    if (window.innerWidth > 768 && navLinks) {
                        // Если переключились на десктопный режим, сбрасываем все мобильные стили
                        mobileMenuToggle?.classList.remove('active');
                        navLinks.classList.remove('active');
                        navLinks.classList.remove('closing');
                        body.classList.remove('no-scroll');
                        
                        // Сбрасываем inline стили на ссылках
                        const menuItems = navLinks.querySelectorAll('a');
                        menuItems.forEach(item => {
                            item.removeAttribute('style');
                        });
                    }
                } catch (error) {
                    console.error('Error in resetNavStyles:', error);
                }
            }
            
            // Функция debounce для оптимизации производительности
            function debounce(func, wait = 20, immediate = true) {
                let timeout;
                return function() {
                    const context = this, args = arguments;
                    const later = function() {
                        timeout = null;
                        if (!immediate) func.apply(context, args);
                    };
                    const callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) func.apply(context, args);
                };
            }
            
            // Слушаем изменение размера окна с дебаунсингом
            window.addEventListener('resize', debounce(resetNavStyles, 150));
            
            // Обработчик клика по логотипу
            const logo = document.querySelector('.logo');
            if (logo) {
                logo.addEventListener('click', (e) => {
                    try {
                        e.preventDefault();
                        // Добавляем класс active для анимации
                        logo.classList.add('active');
                        // Удаляем класс через 300мс
                        setTimeout(() => {
                            logo.classList.remove('active');
                        }, 300);
                        // Скроллим страницу
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    } catch (error) {
                        console.error('Error in logo click handler:', error);
                    }
                });
            }

            // Обработчик клика по ссылке Home
            const homeLink = document.querySelector('.nav-links a[href="#"]');
            if (homeLink) {
                homeLink.addEventListener('click', (e) => {
                    try {
                        e.preventDefault();
                        // Скроллим страницу наверх
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    } catch (error) {
                        console.error('Error in home link click handler:', error);
                    }
                });
            }

            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            const navLinks = document.querySelector('.nav-links');
            const body = document.body;

            if (mobileMenuToggle && navLinks) {
                // Обработчик клика по кнопке меню
                mobileMenuToggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    mobileMenuToggle.classList.toggle('active');
                    navLinks.classList.toggle('active');
                    
                    if (navLinks.classList.contains('active')) {
                        body.classList.add('no-scroll');
                    } else {
                        body.classList.remove('no-scroll');
                    }
                });

                // Закрытие меню при клике на ссылку
                const links = navLinks.querySelectorAll('a');
                links.forEach(link => {
                    link.addEventListener('click', () => {
                        if (window.innerWidth <= 768) {
                            mobileMenuToggle.classList.remove('active');
                            navLinks.classList.remove('active');
                            body.classList.remove('no-scroll');
                        }
                    });
                });

                // Закрытие меню при клике вне меню
                document.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768 && 
                        navLinks.classList.contains('active') && 
                        !navLinks.contains(e.target) && 
                        !mobileMenuToggle.contains(e.target)) {
                        mobileMenuToggle.classList.remove('active');
                        navLinks.classList.remove('active');
                        body.classList.remove('no-scroll');
                    }
                });

                // Оптимизированная функция анимации при прокрутке
                const animateOnScroll = debounce(() => {
                    try {
                        const elements = document.querySelectorAll('.animate-on-scroll');
                        elements.forEach(element => {
                            const elementTop = element.getBoundingClientRect().top;
                            const elementVisible = 150;
                            
                            if (elementTop < window.innerHeight - elementVisible) {
                                element.classList.add('active');
                            }
                        });
                    } catch (error) {
                        console.error('Error in animateOnScroll:', error);
                    }
                }, 10);

                // Оптимизированная функция проверки направления прокрутки
                const checkDirection = debounce(function() {
                    try {
                        // Удаляем функциональность скрытия навигации
                    } catch (error) {
                        console.error('Error in checkDirection:', error);
                    }
                }, 50);

                // Обработчики событий касания
                let touchStartY = 0;
                let touchEndY = 0;

                document.addEventListener('touchstart', e => {
                    touchStartY = e.changedTouches[0].screenY;
                });

                document.addEventListener('touchend', e => {
                    touchEndY = e.changedTouches[0].screenY;
                    checkDirection();
                });
            }
        } catch (error) {
            console.error('Error in DOMContentLoaded event:', error);
        }
    });
} catch (error) {
    console.error('Critical error in script initialization:', error);
}

// Добавление класса для изменения навигации при прокрутке
const nav = document.querySelector('.nav');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Улучшенная загрузка изображений
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    // Проверяем поддержку атрибута loading="lazy"
    if ('loading' in HTMLImageElement.prototype) {
        // Браузер поддерживает lazy loading
        console.log('Browser supports lazy loading');
    } else {
        // Браузер не поддерживает lazy loading, используем Intersection Observer
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Обработка активных состояний навигации при прокрутке
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Предотвращаем исчезновение ссылок при клике в десктопной версии
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Для десктопной версии не мешаем стандартному поведению
            if (window.innerWidth > 768) {
                // Просто добавляем класс active и удаляем его у других ссылок
                navLinks.forEach(item => item.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    function highlightNavLink() {
        const scrollPosition = window.scrollY + (window.innerHeight / 3);

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Вызываем функцию при загрузке и прокрутке
    highlightNavLink();
    window.addEventListener('scroll', highlightNavLink);

    // Плавная прокрутка для всех внутренних ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Закрываем мобильное меню при клике на ссылку
                const mobileMenu = document.querySelector('.nav-links');
                const menuToggle = document.querySelector('.mobile-menu-toggle');
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            }
        });
    });
});
