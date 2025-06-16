import { iniciarSesion_vc, landing, login, register, RegistrarUsuario_vc, toggleEye } from "./login.js";
if (landing) {
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            primary: '#0D0A0B',
            secondary: '#454955',
            light: '#F3EFF5',
            accent1: '#72B01D',
            accent2: '#3F7D20',
            dark: {
              900: '#0D0A0B',
              800: '#1a1a1a',
              700: '#2d2d2d',
            }
          },
          fontFamily: {
            inter: ['Inter', 'sans-serif'],
            verdana: ['Verdana', 'sans-serif'],
          },
          animation: {
            'fade-in': 'fadeIn 0.5s ease-in',
            'slide-down': 'slideDown 0.5s ease-out',
            'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'underline': 'underline 0.3s ease-out forwards'
          },
          keyframes: {
            fadeIn: {
              '0%': { opacity: '0' },
              '100%': { opacity: '1' },
            },
            slideDown: {
              '0%': { transform: 'translateY(-20px)', opacity: '0' },
              '100%': { transform: 'translateY(0)', opacity: '1' },
            },
            pulse: {
              '0%, 100%': { opacity: '1' },
              '50%': { opacity: '0.8' },
            },
            underline: {
              '0%': { width: '0' },
              '100%': { width: '100%' },
            }
          }
        }
      }
    }
}
if (login) {
     tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'dark': '#0D0A0B',
                        'gray': '#454955',
                        'light': '#F3EFF5',
                        'primary': '#72B01D',
                        'primary-dark': '#3F7D20'
                    }
                }
            }
        }
    login.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('login');
      iniciarSesion_vc();
    });
}

if (register) {
         tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'dark': '#0D0A0B',
                        'gray': '#454955',
                        'light': '#F3EFF5',
                        'primary': '#72B01D',
                        'primary-dark': '#3F7D20'
                    }
                }
            }
        }
    register.addEventListener('submit', e => {
      e.preventDefault();
      console.log('registrar');
      RegistrarUsuario_vc()
    });
    
}
    // Menú móvil, animaciones y modo oscuro
    document.addEventListener('DOMContentLoaded', function() {
      // Menú móvil
      const menuToggle = document.querySelector('[data-menu-toggle]');
      const menu = document.querySelector('[data-menu]');
      
      if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
          menu.classList.toggle('hidden');
          menu.classList.toggle('md:flex');
        });
      }
      
      // Smooth scrolling para enlaces internos
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
          });
        });
      });
      
      // Observador de intersección para animaciones al hacer scroll
      const observerOptions = {
        threshold: 0.1
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      // Observar elementos con clase "animate-on-scroll"
      document.querySelectorAll('.benefit-item, .service-card, .animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
      if (register || login) {
        toggleEye();
      }
      
    });
