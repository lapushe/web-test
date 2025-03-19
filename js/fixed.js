// Мобильное меню
document.addEventListener('DOMContentLoaded', () => {
    // Функция для восстановления стилей навигации при изменении размера окна
    function resetNavStyles() {
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
    }
    
    // Слушаем изменение размера окна
    window.addEventListener('resize', resetNavStyles);
    
    // Обработчик клика по логотипу
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
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
        });
    }

    // Обработчик клика по ссылке Home
    const homeLink = document.querySelector('.nav-links a[href="#"]');
    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Скроллим страницу наверх
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (mobileMenuToggle && navLinks) {
        // Обработчик клика по кнопке меню
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем всплытие события
            
            if (navLinks.classList.contains('active')) {
                // Закрываем меню
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.add('closing');
                
                // Сбрасываем стили элементов меню перед закрытием
                const menuItems = navLinks.querySelectorAll('a');
                menuItems.forEach(item => {
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(10px)';
                });
                
                // После завершения анимации удаляем классы
                setTimeout(() => {
                    navLinks.classList.remove('active');
                    navLinks.classList.remove('closing');
                    body.classList.remove('no-scroll');
                    
                    // Сбрасываем inline стили элементов меню
                    menuItems.forEach(item => {
                        item.removeAttribute('style');
                    });
                }, 500); // Время должно соответствовать transition в CSS
            } else {
                // Открываем меню
                mobileMenuToggle.classList.add('active');
                navLinks.classList.add('active');
                body.classList.add('no-scroll');
                
                // Анимированное появление пунктов меню
                const menuItems = navLinks.querySelectorAll('a');
                menuItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100 + (index * 100)); // Задержка для каждого элемента
                });
            }
        });

        // Закрытие меню при клике на ссылку
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                // Проверяем, находимся ли мы в мобильном режиме
                if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    navLinks.classList.add('closing');
                    
                    // Сбрасываем стили элементов меню перед закрытием
                    const menuItems = navLinks.querySelectorAll('a');
                    menuItems.forEach(item => {
                        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(10px)';
                    });
                    
                    // После завершения анимации удаляем классы
                    setTimeout(() => {
                        navLinks.classList.remove('active');
                        navLinks.classList.remove('closing');
                        body.classList.remove('no-scroll');
                        
                        // Сбрасываем inline стили элементов меню
                        menuItems.forEach(item => {
                            item.removeAttribute('style');
                        });
                    }, 500);
                }
            });
        });
        
        // Закрытие меню при клике вне меню
        document.addEventListener('click', (e) => {
            // Проверяем, находимся ли мы в мобильном режиме и открыто ли меню
            if (window.innerWidth <= 768 && 
                navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.add('closing');
                
                // Сбрасываем стили элементов меню перед закрытием
                const menuItems = navLinks.querySelectorAll('a');
                menuItems.forEach(item => {
                    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(10px)';
                });
                
                // После завершения анимации удаляем классы
                setTimeout(() => {
                    navLinks.classList.remove('active');
                    navLinks.classList.remove('closing');
                    body.classList.remove('no-scroll');
                    
                    // Сбрасываем inline стили элементов меню
                    menuItems.forEach(item => {
                        item.removeAttribute('style');
                    });
                }, 500);
            }
        });
    }
});

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

// Анимация элементов при прокрутке
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.8) {
            element.classList.add('visible');
        }
    });
};

// Обработка касаний для мобильных устройств
let touchStartY = 0;
let touchEndY = 0;

// Функция для определения направления свайпа
function checkDirection() {
    if (touchEndY < touchStartY) {
        // Свайп вверх - скрываем навигацию
        if (window.scrollY > 100) {
            nav.classList.add('nav-hidden');
        }
    } else if (touchEndY > touchStartY) {
        // Свайп вниз - показываем навигацию
        nav.classList.remove('nav-hidden');
    }
}

// Обработчики событий касания
document.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    checkDirection();
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
    
    // Флаг для отслеживания клика пользователя
    let isUserClick = false;
    let clickedLink = null;
    let clickTimeout = null;
    
    // Функция для проверки работы навигации
    function logNavigationStatus() {
        console.log("Navigation check:");
        navLinks.forEach(link => {
            console.log(`Link to ${link.getAttribute('href')}: visible=${!link.style.opacity || link.style.opacity !== '0'}, active=${link.classList.contains('active')}`);
        });
    }

    // Предотвращаем исчезновение ссылок при клике
    navLinks.forEach(link => {
        // Добавляем обработчик mouseover для отладки
        link.addEventListener('mouseover', () => {
            if (window.innerWidth > 768) {
                // Проверяем, что элемент видим
                if (link.style.opacity === '0') {
                    console.warn('Link was invisible on hover, fixing...');
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }
            }
        });
        
        link.addEventListener('click', (e) => {
            // Для отладки
            console.log(`Clicked on link to ${link.getAttribute('href')}`);
            
            // Обрабатываем только в десктопном режиме
            if (window.innerWidth > 768) {
                // Устанавливаем флаг клика и сохраняем ссылку
                isUserClick = true;
                clickedLink = link;
                
                // Добавляем класс active и убираем у других ссылок
                navLinks.forEach(item => item.classList.remove('active'));
                link.classList.add('active');
                
                // Проверяем, что ссылки видимы после клика
                navLinks.forEach(item => {
                    // Сбрасываем любые inline стили, которые могли быть применены
                    if (window.innerWidth > 768) {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }
                });
                
                // Логируем статус навигации
                logNavigationStatus();
                
                // Сбрасываем флаг через таймаут
                if (clickTimeout) clearTimeout(clickTimeout);
                clickTimeout = setTimeout(() => {
                    isUserClick = false;
                    clickedLink = null;
                }, 500);
            }
        });
    });

    function highlightNavLink() {
        // Если был клик пользователя, не меняем класс active
        if (isUserClick && clickedLink) return;
        
        // Только для десктопного режима используем автоматическое отслеживание позиции прокрутки
        if (window.innerWidth <= 768) return;
        
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
