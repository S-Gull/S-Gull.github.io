import { cargarTestimonios_vc_ga,mostrarMapaConPin_vc_ga,setupFormSubmission_vc_ga, setupMobileMenu_vc_ga, setupScrollAnimations_vc_ga} from "./landing.js";
import { ModalDialog_vc_ga } from "./modal.js";
 // Crear instancia del modal_vc_ga
export const modal_vc_ga = new ModalDialog_vc_ga();
document.addEventListener('DOMContentLoaded', ()=>{
  
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
          };

      setupMobileMenu_vc_ga();
      setupScrollAnimations_vc_ga();
      cargarTestimonios_vc_ga();
      // Configurar el formulario con la instancia del modal_vc_ga
      setupFormSubmission_vc_ga({
        modalInstance: modal_vc_ga
          });
      mostrarMapaConPin_vc_ga(10.437916, -66.860999, "¡Baldox.Co!");
})