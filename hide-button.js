// JavaScript - Auto-ocultamiento con timeout
const toggleBtn = document.getElementById('theme-toggle');
let hideTimeout;
let isHidden = false;

// Tiempo de inactividad para ocultar (en milisegundos)
const INACTIVITY_TIME = 2000; // 3 segundos

// Función para mostrar el botón
function showButton() {
    if (toggleBtn) {
        toggleBtn.classList.remove('hidden');
        isHidden = false;
        
        // Resetear el timeout de ocultamiento
        resetHideTimeout();
    }
}

// Función para ocultar el botón
function hideButton() {
    if (toggleBtn && !isHidden) {
        if (isMouseNearButton()) {
            resetHideTimeout(INACTIVITY_TIME / 8); // Si el ratón está cerca, esperar un poco más
            return;
        }
        toggleBtn.classList.add('hidden');
        isHidden = true;
    }
}

// Función para resetear el timeout de ocultamiento
function resetHideTimeout(time = INACTIVITY_TIME) {
    clearTimeout(hideTimeout);
    
    // Solo programar ocultamiento si el botón está visible
    if (!isHidden) {
        hideTimeout = setTimeout(hideButton, time);
    }
}

// Función para manejar la actividad del usuario
function handleUserActivity() {
    showButton();
}
console.log(toggleBtn);
// Configurar event listeners si el botón existe
if (toggleBtn) {
    console.log('Botón de alternancia de tema encontrado, configurando auto-ocultamiento.');
    // Eventos de actividad del usuario
    const activityEvents = [
        'scroll', 'touchstart', 'touchmove', 'wheel', 'hover'
    ];
    
    activityEvents.forEach(eventType => {
        window.addEventListener(eventType, handleUserActivity, { passive: true });
    });
    
    // Evento específico para el botón (por si hacen clic cuando está visible)
    toggleBtn.addEventListener('click', function() {
        // Mostrar inmediatamente si estaba oculto
        showButton();
        // Aquí puedes añadir tu función toggleTheme existente
        toggleTheme(); // Llama a tu función existente
    });
    
    // Iniciar el timeout al cargar la página
    resetHideTimeout();
    
    // También mostrar al hacer scroll cerca del final (opcional)
    window.addEventListener('scroll', function() {
        const scrollBottom = window.innerHeight + window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;
        
        // Si está cerca del final, mostrar
        if (scrollBottom > pageHeight - 200) {
            showButton();
        }
    }, { passive: true });
}

// Limpiar timeouts al salir (buena práctica)
window.addEventListener('beforeunload', function() {
    clearTimeout(hideTimeout);
});

// Función para comprobar si el ratón está cerca del botón
function isMouseNearButton() {
    if (!toggleBtn) return false;
    
    // Obtener posición del botón
    const rect = toggleBtn.getBoundingClientRect();
    
    // Calcular punto en la esquina superior derecha de la pantalla
    const topRightCornerX = window.innerWidth;
    const topRightCornerY = 0;
    
    // Obtener posición del ratón (necesitamos almacenarla)
    const mouseX = window.mouseX || 0;
    const mouseY = window.mouseY || 0;
    
    // Calcular distancia
    const distance = Math.sqrt(
        Math.pow(mouseX - topRightCornerX, 2) + 
        Math.pow(mouseY - topRightCornerY, 2)
    );
    
    // Distancia en píxeles para considerar "cerca" (ajustable)
    const NEAR_DISTANCE = 300; // 150px de radio
    
    return distance < NEAR_DISTANCE;
}

// Actualizar posición del ratón
window.addEventListener('mousemove', function(e) {
    window.mouseX = e.clientX;
    window.mouseY = e.clientY;
    if (isHidden && isMouseNearButton()) {
        showButton();
    }
});