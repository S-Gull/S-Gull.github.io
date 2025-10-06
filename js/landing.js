import { modal_vc_ga } from "./app.js";


// Funciones
export const setupMobileMenu_vc_ga = () => {
    const menuToggle_vc_ga = document.querySelector('[data-menu-toggle]');
    const menu_vc_ga = document.querySelector('[data-menu]');
    
    if (menuToggle_vc_ga && menu_vc_ga) {
        menuToggle_vc_ga.addEventListener('click', () => {
            menu_vc_ga.classList.toggle('hidden');
            menu_vc_ga.classList.toggle('md:flex');
        });
    }
}

export const setupScrollAnimations_vc_ga = () => {
    const observerOptions_vc_ga = {
        threshold: 0.1
    };
    
    const handleIntersection_vc_ga = (entries_vc_ga) => {
        entries_vc_ga.forEach(entry_vc_ga => {
            if (entry_vc_ga.isIntersecting) {
                entry_vc_ga.target.classList.add('animate-fade-in');
                observer_vc_ga.unobserve(entry_vc_ga.target);
            }
        });
    }
    
    const observer_vc_ga = new IntersectionObserver(handleIntersection_vc_ga, observerOptions_vc_ga);
    
    document.querySelectorAll('.benefit-item, .service-card, .animate-on-scroll').forEach(el_vc_ga => {
        observer_vc_ga.observe(el_vc_ga);
    });
}

export const cargarTestimonios_vc_ga = async () => {
    const contenedor_vc_ga = document.getElementById('testimonios-contenedor');
    contenedor_vc_ga.innerHTML = '';

    const todosRes_vc_ga = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3');
    const todos_vc_ga = await todosRes_vc_ga.json();

    const usersRes_vc_ga = await fetch('https://jsonplaceholder.typicode.com/users');
    const users_vc_ga = await usersRes_vc_ga.json();

    const obtenerUsuariosAleatorios_vc_ga = (users_vc_ga_param, n_vc_ga) => {
        const copia_vc_ga = [...users_vc_ga_param];
        const seleccionados_vc_ga = [];
        for (let i_vc_ga = 0; i_vc_ga < n_vc_ga; i_vc_ga++) {
            const index_vc_ga = Math.floor(Math.random() * copia_vc_ga.length);
            seleccionados_vc_ga.push(copia_vc_ga.splice(index_vc_ga, 1)[0]);
        }
        return seleccionados_vc_ga;
    }

    const usuariosAleatorios_vc_ga = obtenerUsuariosAleatorios_vc_ga(users_vc_ga, 3);

    // Array de testimonios_vc_ga variados
    const testimonios_vc_ga = [
        "Baldox ha transformado completamente nuestra forma de gestionar nóminas. Ahora es más rápido, seguro y confiable.",
        "Con Baldox redujimos los errores en nóminas en un 95%. ¡Una solución increíble!",
        "La automatización de Baldox nos ahorra 20 horas semanales en gestión de nóminas.",
        "Nunca pensé que gestionar nóminas podría ser tan sencillo. Baldox superó nuestras expectativas.",
        "La seguridad y cumplimiento normativo de Baldox nos da total tranquilidad con nuestras nóminas.",
        "Baldox ha simplificado nuestro proceso de nóminas de forma radical. ¡Revolucionario!",
        "Implementamos Baldox en 3 días y los resultados fueron inmediatos. ¡Eficiencia máxima!",
        "Con Baldox, nuestro equipo de RRHH puede enfocarse en estrategia en lugar de papeleo.",
        "Los reportes automatizados de Baldox nos dan insights valiosos para tomar decisiones.",
        "Baldox se integra perfectamente con nuestros otros sistemas. La solución completa que necesitábamos."
    ];

    // Función para obtener testimonios_vc_ga aleatorios sin repetición
    const obtenerTestimoniosAleatorios_vc_ga = (n) => {
        const copiaTestimonios_vc_ga = [...testimonios_vc_ga];
        const seleccionados_vc_ga = [];
        for (let i = 0; i < n; i++) {
            const randomIndex_vc_ga = Math.floor(Math.random() * copiaTestimonios_vc_ga.length);
            seleccionados_vc_ga.push(copiaTestimonios_vc_ga.splice(randomIndex_vc_ga, 1)[0]);
        }
        return seleccionados_vc_ga;
    };

    const testimoniosAleatorios_vc_ga = obtenerTestimoniosAleatorios_vc_ga(3);

    usuariosAleatorios_vc_ga.forEach((user_vc_ga, index_vc_ga) => {
        const todo_vc_ga = todos_vc_ga[index_vc_ga];
        const avatarUrl_vc_ga = `https://i.pravatar.cc/150?img=${user_vc_ga.id}`;

        const card_vc_ga = document.createElement('div');
        card_vc_ga.className = 'testimonio-card bg-light dark:bg-dark-700 p-6 rounded-xl shadow-md flex flex-col items-center text-center';
        card_vc_ga.innerHTML = `
            <img src="${avatarUrl_vc_ga}" alt="Avatar de ${user_vc_ga.name}" class="w-24 h-24 rounded-full mb-4 object-cover border-2 border-accent1 shadow-md">
            <p class="text-secondary mb-6 italic">"${testimoniosAleatorios_vc_ga[index_vc_ga]}"</p>
            <h3 class="font-inter font-semibold text-primary">${user_vc_ga.name}</h3>
            <p class="text-accent1 text-sm">${user_vc_ga.company.name}</p>
        `;

        contenedor_vc_ga.appendChild(card_vc_ga);
    });
}


export const setupFormSubmission_vc_ga = (options_vc_ga = {}) => {
    const {
        formId: formId_vc_ga = 'contactForm',
        submitBtnSelector: submitBtnSelector_vc_ga = 'button[type="submit"]',
        actionUrl: actionUrl_vc_ga = 'php/registrar.php',
        spinnerHtml: spinnerHtml_vc_ga = '<span class="animate-spin">⏳</span> Enviando...',
        resetOnSuccess: resetOnSuccess_vc_ga = true,
        successTitle: successTitle_vc_ga = 'Éxito',
        errorTitle: errorTitle_vc_ga = 'Error'
    } = options_vc_ga;

    const form_vc_ga = document.getElementById(formId_vc_ga);
    if (!form_vc_ga) return;


    form_vc_ga.addEventListener('submit', async (e_vc_ga) => {
        e_vc_ga.preventDefault();

        const submitBtn_vc_ga = form_vc_ga.querySelector(submitBtnSelector_vc_ga);
        if (!submitBtn_vc_ga) return;

        const originalBtnText_vc_ga = submitBtn_vc_ga.innerHTML;
        submitBtn_vc_ga.disabled = true;
        submitBtn_vc_ga.innerHTML = spinnerHtml_vc_ga;

        try {
            const response_vc_ga = await fetch(actionUrl_vc_ga, {
                method: 'POST',
                body: new FormData(form_vc_ga)
            });

            if (!response_vc_ga.ok) {
                throw new Error(`HTTP error! status: ${response_vc_ga.status}`);
            }
            const text_vc_ga = await response_vc_ga.text();
            const result_vc_ga = await JSON.parse(text_vc_ga);
            if (result_vc_ga.success) {
                modal_vc_ga.showSuccess_vc_ga(successTitle_vc_ga, result_vc_ga.message);        
                if (resetOnSuccess_vc_ga) form_vc_ga.reset();
            } else {
                modal_vc_ga.showError_vc_ga(errorTitle_vc_ga, result_vc_ga.message);
            }
        } catch (error_vc_ga) {
            console.error('Error:', error_vc_ga);
            modal_vc_ga.showError_vc_ga(errorTitle_vc_ga, 'Error de conexión. Intenta de nuevo.');
        } finally {
            submitBtn_vc_ga.disabled = false;
            submitBtn_vc_ga.innerHTML = originalBtnText_vc_ga;
        }
    });
};

        // Función para mostrar el mapa con un pin
export const mostrarMapaConPin_vc_ga = (latitud_vc_jc, longitud_vc_jc, popupTexto_vc_jc = "¡Ubicación!")=> {
            // 1. Crear mapa
            const mapa_vc_ga = L.map('map').setView([latitud_vc_jc, longitud_vc_jc], 15);
            
            // 2. Añadir capa de OpenStreetMap (OBLIGATORIO: incluir atribución)
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapa_vc_ga);

            // 3. Añadir marcador (pin)
            L.marker([latitud_vc_jc, longitud_vc_jc])
                .addTo(mapa_vc_ga)
                .bindPopup(popupTexto_vc_jc)
                .openPopup();
        }