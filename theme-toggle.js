// Función para alternar tema
function toggleTheme() {
    // Alternar la clase dark-theme en el body
    document.body.classList.toggle('dark-theme');
    console.log('Tema alternado. Tema actual:', document.body.classList.contains('dark-theme') ? 'oscuro' : 'claro');
    // Guardar preferencia
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    updateSVGForTheme();
}

// Inicializar tema
function initTheme() {
    // Comprobar preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
    } else {
        // Si no hay preferencia guardada, usar la del sistema
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (systemDark) {
            document.body.classList.add('dark-theme');
        }
    }
    updateSVGForTheme();
    /* add css style: * {
	transition: background-color 0.3s ease,
                color 0.3s ease,
                border-color 0.3s ease,
                fill 0.3s ease,
                stroke 0.3s ease;
    }*/



}

// Escuchar cambios en el sistema (solo si no hay preferencia manual)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }
});

// Inicializar cuando cargue la página
document.addEventListener('DOMContentLoaded', initTheme);




function updateSVGForTheme() {
    const teaserImg = document.getElementById('teaser');
    if (teaserImg) {
        if (document.body.classList.contains('dark-theme')) {
            teaserImg.src = 'teaser_dark_anydevice.svg';
        } else {
            teaserImg.src = 'teaser_anydevice.svg';
        }
    }
}


window.addEventListener('load', function() {
        document.documentElement.classList.add('page-loaded');
    });