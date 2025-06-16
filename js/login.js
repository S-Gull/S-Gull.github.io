"use strict";

// IMPORTAR FUNCIONES (asumiendo que validación.js existe)
// import { validacionUsuario_vc } from "../function/validacion.js";

// EXPORTAR VARIABLE GLOBAL
export let users_vc = [];
export const landing = document.getElementById("landing")
export const login = document.getElementById("login")
export const register = document.getElementById("register")

// FUNCIÓN PARA MOSTRAR MODAL (se mantiene igual)
// export const mostrarAlerta_vc = (mensaje_vc) => {
//   const modal_vc = document.getElementById('miModal');
//   const span_vc = document.getElementsByClassName("close")[0];
//   const textmodal_vc = document.getElementById('textoModal');
//   textmodal_vc.innerText = mensaje_vc;
//   modal_vc.style.display = "block";
  
//   span_vc.addEventListener('click', (e) => {
//     modal_vc.style.display = "none";
//   });
  
//   modal_vc.addEventListener('click', (e) => {
//     if (e.target == modal_vc) {
//       modal_vc.style.display = "none";
//     }
//   });
// }

// INICIAR SESIÓN (modificada para usar correo)
export const iniciarSesion_vc = () => {
  // Obtener valores del formulario
  const correo_vc = document.getElementById('correo').value;
  const clave_vc = document.getElementById('clave').value;

  // Validar campos vacíos
  if (correo_vc === "" || clave_vc === "") {
    // mostrarAlerta_vc('Por favor completa todos los campos');
    console.log("por favor completa todos los campos")
    return;
  }

  // Obtener usuarios de localStorage
  const usuariosExistentes_vc = JSON.parse(localStorage.getItem('users_vc')) || [];
  
  // Buscar usuario por correo
  const usuarioEncontrado_vc = usuariosExistentes_vc.find(user => 
    user.correo === correo_vc && user.clave === clave_vc
  );

  if (usuarioEncontrado_vc) {
    console.log("inicio de sesión exitoso")
    // mostrarAlerta_vc('Inicio de sesión exitoso');
    // Redirigir después de 1 segundo
    setTimeout(() => {
      location.href = "./index.html";
    }, 1000);
  } else {
    console.log('Correo o contraseña incorrectos');
  }
}

// REGISTRAR USUARIO (modificada para nuevos campos)
export const RegistrarUsuario_vc = () => {
  // Obtener valores del formulario
  const datos = {
    nombre: document.getElementById('nombre').value,
    telefono: document.getElementById('tlf').value,
    correo: document.getElementById('correo').value,
    clave: document.getElementById('clave').value
  };

//   // Validación básica
//   if (!validacionUsuario_vc(datos)) {
//     mostrarAlerta_vc('Error en la validación');
//     return;
//   }

  // Obtener usuarios existentes
  const usuariosExistentes = JSON.parse(localStorage.getItem('users_vc')) || [];
  
  // Verificar si el correo ya existe
  if (usuariosExistentes.some(user => user.correo === datos.correo)) {
    console.log("El correo ya esta registrado")
    // mostrarAlerta_vc('El correo ya está registrado');
    return;
  }

  // Agregar nuevo usuario
  usuariosExistentes.push({
    nombre: datos.nombre,
    telefono: datos.telefono,
    correo: datos.correo,
    clave: datos.clave
  });

  // Guardar en localStorage
  localStorage.setItem('users_vc', JSON.stringify(usuariosExistentes));
  console.log('¡Registro exitoso! Ahora puedes iniciar sesión');
}

//Cambiar el icono del ojo y asi mostrar contraseña
export const toggleEye = ()=> {
            const passwordInput = document.getElementById('clave');
            const toggleButton = document.getElementById('togglePassword');
            
            toggleButton.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                // Toggle eye icon
                if (type === 'password') {
                    toggleButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray eye-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    `;
                } else {
                    toggleButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray eye-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                    `;
                }
            });
        };