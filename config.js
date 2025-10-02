// Configuración de Camisetas AJ
// Edita estos valores para personalizar tu tienda

const CONFIG = {
    // Información de contacto
    whatsapp: {
        numero: '34643461840', // Número de WhatsApp real
        mensaje_default: '¡Hola Camisetas AJ! Me interesa conocer más sobre sus productos.'
    },
    
    // Información de la tienda
    tienda: {
        nombre: 'Camisetas AJ',
        descripcion: 'Tu tienda de fútbol favorita',
        email: 'camisetasfutbol.aj13@gmail.com',
        instagram: '@camisetasaj',
        facebook: 'CamisetasAJ',
        twitter: '@camisetasaj'
    },
    
    // Configuración de productos
    productos: {
        // Precios por defecto
        precios_default: {
            camisetas: 45,
            chandales: 65,
            ninos: 35
        },
        
        // Opciones de personalización
        personalizacion: {
            max_caracteres_nombre: 12,
            numero_min: 1,
            numero_max: 99,
            precio_personalizacion: 5 // €5 extra por personalización
        }
    },
    
    // Configuración de la web
    web: {
        // Colores principales (cambiar en styles.css también)
        colores: {
            primario: '#FF0000',
            secundario: '#00BFFF',
            oscuro: '#1a1a1a',
            claro: '#ffffff'
        },
        
        // Animaciones
        animaciones_habilitadas: true,
        
        // Modo admin
        admin: {
            clave_acceso: 'CamisetasAJ2025!', // Contraseña segura para admin
            mostrar_boton: true
        }
    },
    
    // Configuración PWA
    pwa: {
        habilitada: true,
        nombre_app: 'Camisetas AJ',
        nombre_corto: 'CamisetasAJ',
        descripcion_app: 'Tu tienda de camisetas de fútbol favorita'
    },
    
    // Ligas disponibles
    ligas: {
        'retro': {
            nombre: 'Retro',
            pais: 'Clásicas',
            icono: 'fas fa-history',
            color: '#8B4513'
        },
        'laliga1': {
            nombre: 'LaLiga (1ª)',
            pais: 'España',
            icono: 'user_input_files/laliga_icon-1-1024x1024.png',
            color: '#FF6B00'
        },
        'laliga2': {
            nombre: 'LaLiga (2ª)',
            pais: 'España',
            icono: 'user_input_files/laliga_icon-1-1024x1024 (1).png',
            color: '#FF9500'
        },
        'premier': {
            nombre: 'Premier League',
            pais: 'Inglaterra',
            icono: 'user_input_files/premierleague_icon-1-1024x1024.png',
            color: '#3D1952'
        },
        'bundesliga': {
            nombre: 'Bundesliga',
            pais: 'Alemania',
            icono: 'fas fa-medal',
            color: '#D20515'
        },
        'seriea': {
            nombre: 'Serie A',
            pais: 'Italia',
            icono: 'user_input_files/seriea_icon-1-1024x1024.png',
            color: '#0066CC'
        },
        'ligue1': {
            nombre: 'Ligue 1',
            pais: 'Francia',
            icono: 'user_input_files/ligue1_newlogo-1024x1024.png',
            color: '#1E3A8A'
        },
        'portuguesa': {
            nombre: 'Liga Portuguesa',
            pais: 'Portugal',
            icono: 'user_input_files/ligaportuguesa_icon-1-1024x1024.png',
            color: '#006633'
        },
        'mls': {
            nombre: 'MLS',
            pais: 'Estados Unidos',
            icono: 'user_input_files/mls_icon-1-1024x1024.png',
            color: '#002B5B'
        },
        'resto': {
            nombre: 'Resto del Mundo',
            pais: 'Internacional',
            icono: 'user_input_files/america_icon-2-1024x1024.png',
            color: '#FF6B35'
        },
        'selecciones': {
            nombre: 'Selecciones',
            pais: 'Nacionales',
            icono: 'fas fa-flag',
            color: '#FFD700'
        }
    }
};

// Función para aplicar configuración
function aplicarConfiguracion() {
    // Aplicar número de WhatsApp
    if (window.numeroWhatsApp !== undefined) {
        window.numeroWhatsApp = CONFIG.whatsapp.numero;
    }
    
    // Aplicar información de la tienda en el footer
    const footerSections = document.querySelectorAll('.footer-section');
    if (footerSections.length > 1) {
        footerSections[1].innerHTML = `
            <h4>Contacto</h4>
            <p><i class="fab fa-whatsapp"></i> WhatsApp: +${CONFIG.whatsapp.numero}</p>
            <p><i class="fas fa-envelope"></i> Email: ${CONFIG.tienda.email}</p>
        `;
    }
    
    // Actualizar meta tags para PWA
    if (CONFIG.pwa.habilitada) {
        document.title = CONFIG.pwa.nombre_app;
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = CONFIG.pwa.descripcion_app;
        }
    }
}

// Aplicar configuración cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', aplicarConfiguracion);
} else {
    aplicarConfiguracion();
}

// Exportar configuración para uso global
window.CONFIG = CONFIG;