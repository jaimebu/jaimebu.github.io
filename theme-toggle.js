// Función para alternar tema
function toggleTheme() {
    // Alternar la clase dark-theme en el body
    document.body.classList.toggle('dark-theme');
    console.log('Tema alternado. Tema actual:', document.body.classList.contains('dark-theme') ? 'oscuro' : 'claro');
    // Guardar preferencia
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    updateSVGForTheme('gilab_img', 'gilab_img_light.png', 'gilab_img_dark.png');
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
    updateSVGForTheme('gilab_img', 'gilab_img_light.png', 'gilab_img_dark.png');



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




function updateSVGForTheme(id, imgLight, imgDark) {
    const teaserImg = document.getElementById(id);
    if (teaserImg) {
        if (document.body.classList.contains('dark-theme')) {
            teaserImg.src = imgDark;
        } else {
            teaserImg.src = imgLight;
        }
    }
}


window.addEventListener('load', function() {
        document.documentElement.classList.add('page-loaded');
    });
