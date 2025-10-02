// Estado global de la aplicación
let productos = {
    camisetas: [
        {
            id: 1,
            nombre: 'FC Barcelona',
            precio: 45,
            liga: 'laliga1',
            imagen: null,
            imagenes: [],
            categoria: 'camisetas',
            fechaCreacion: new Date('2025-01-01')
        },
        {
            id: 2,
            nombre: 'Real Madrid',
            precio: 45,
            liga: 'laliga1',
            imagen: null,
            imagenes: [],
            categoria: 'camisetas',
            fechaCreacion: new Date('2025-01-02')
        },
        {
            id: 3,
            nombre: 'Atlético Madrid',
            precio: 42,
            liga: 'laliga1',
            imagen: null,
            imagenes: [],
            categoria: 'camisetas',
            fechaCreacion: new Date('2025-01-03')
        },
        {
            id: 4,
            nombre: 'Manchester City',
            precio: 48,
            liga: 'premier',
            imagen: null,
            imagenes: [],
            categoria: 'camisetas',
            fechaCreacion: new Date('2025-01-04')
        },
        {
            id: 5,
            nombre: 'Chelsea FC',
            precio: 46,
            liga: 'premier',
            imagen: null,
            imagenes: [],
            categoria: 'camisetas',
            fechaCreacion: new Date('2025-01-05')
        }
    ],
    chandales: [
        {
            id: 6,
            nombre: 'Chándal Barcelona',
            precio: 65,
            liga: 'laliga1',
            imagen: null,
            imagenes: [],
            categoria: 'chandales',
            fechaCreacion: new Date('2025-01-06')
        },
        {
            id: 7,
            nombre: 'Chándal Real Madrid',
            precio: 65,
            liga: 'laliga1',
            imagen: null,
            imagenes: [],
            categoria: 'chandales',
            fechaCreacion: new Date('2025-01-07')
        },
        {
            id: 8,
            nombre: 'Chándal Manchester City',
            precio: 70,
            liga: 'premier',
            imagen: null,
            imagenes: [],
            categoria: 'chandales',
            fechaCreacion: new Date('2025-01-08')
        }
    ],
    ninos: [
        {
            id: 9,
            nombre: 'Conjunto Niño Barcelona',
            precio: 35,
            liga: 'laliga1',
            imagen: null,
            imagenes: [],
            categoria: 'ninos',
            fechaCreacion: new Date('2025-01-09')
        },
        {
            id: 10,
            nombre: 'Conjunto Niño Real Madrid',
            precio: 35,
            liga: 'laliga1',
            imagen: null,
            imagenes: [],
            categoria: 'ninos',
            fechaCreacion: new Date('2025-01-10')
        },
        {
            id: 11,
            nombre: 'Conjunto Niño Chelsea',
            precio: 38,
            liga: 'premier',
            imagen: null,
            imagenes: [],
            categoria: 'ninos',
            fechaCreacion: new Date('2025-01-11')
        }
    ]
};

let categoriaActual = 'camisetas';
let adminMode = false;

// Número de WhatsApp (se actualiza desde config.js)
let numeroWhatsApp = '34643461840'; // Número actualizado

// Estado de autenticación
let adminAutenticado = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Configurar navegación móvil
    setupMobileNav();
    
    // Configurar navegación suave
    setupSmoothScroll();
    
    // Cargar datos guardados
    cargarDatosGuardados();
    
    // Configurar tabs de productos
    setupProductTabs();
    
    // Cargar productos iniciales
    cargarProductos(categoriaActual);
    
    // Configurar admin panel
    setupAdminPanel();
    
    // Configurar personalización
    setupPersonalizacion();
    
    // Configurar liga cards
    setupLigaCards();
    
    // Configurar animaciones en scroll
    setupScrollAnimations();
    
    // Registrar Service Worker para PWA
    registerServiceWorker();
    
    // Aplicar configuración cuando esté disponible
    if (window.CONFIG) {
        aplicarConfiguracionApp();
    } else {
        // Esperar a que se cargue config.js
        setTimeout(() => {
            if (window.CONFIG) {
                aplicarConfiguracionApp();
            }
        }, 100);
    }
    
    // Cargar novedades
    cargarNovedades();
    
    // Actualizar estadísticas del admin
    actualizarEstadisticasAdmin();
}

// Navegación móvil
function setupMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Navegación suave
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Configurar tabs de productos
function setupProductTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los tabs
            tabBtns.forEach(tab => tab.classList.remove('active'));
            // Agregar clase active al tab clickeado
            btn.classList.add('active');
            
            // Cambiar categoría actual
            categoriaActual = btn.dataset.category;
            cargarProductos(categoriaActual);
        });
    });
}

// Cargar productos
function cargarProductos(categoria) {
    const grid = document.getElementById('productosGrid');
    const productosCategoria = productos[categoria] || [];
    
    grid.innerHTML = '';
    
    if (productosCategoria.length === 0) {
        grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #666;">No hay productos en esta categoría</p>';
        return;
    }
    
    productosCategoria.forEach(producto => {
        const productoCard = crearProductoCard(producto);
        grid.appendChild(productoCard);
    });
    
    // Aplicar animación fade-in
    grid.querySelectorAll('.producto-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

// Crear card de producto
function crearProductoCard(producto) {
    const card = document.createElement('div');
    card.className = 'producto-card';
    
    const iconoCategoria = {
        'camisetas': 'fas fa-tshirt',
        'chandales': 'fas fa-running',
        'ninos': 'fas fa-child'
    };
    
    // Verificar si tiene imágenes múltiples
    const tieneImagenes = producto.imagenes && producto.imagenes.length > 0;
    const imagenPrincipal = tieneImagenes ? producto.imagenes[0] : producto.imagen;
    
    card.innerHTML = `
        <div class="producto-imagen" ${tieneImagenes ? `onclick="abrirGaleria(${JSON.stringify(producto.imagenes).replace(/"/g, '&quot;')}, '${producto.nombre}')"` : ''}>
            ${imagenPrincipal ? 
                `<img src="${imagenPrincipal}" alt="${producto.nombre}" style="width:100%;height:100%;object-fit:cover;">` :
                `<i class="${iconoCategoria[producto.categoria]}"></i>`
            }
            ${tieneImagenes && producto.imagenes.length > 1 ? 
                `<div class="galeria-indicator">📷 ${producto.imagenes.length} fotos</div>` : ''
            }
        </div>
        <div class="producto-info">
            <h3>${producto.nombre}</h3>
            <div class="producto-precio">€${producto.precio}</div>
            <div class="producto-acciones">
                <button class="btn btn-primary btn-small" onclick="solicitarProducto('${producto.nombre}', ${producto.precio})">
                    <i class="fab fa-whatsapp"></i> Pedir
                </button>
                <button class="btn btn-secondary btn-small" onclick="personalizarProducto('${producto.nombre}')">
                    <i class="fas fa-edit"></i> Personalizar
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Configurar liga cards
function setupLigaCards() {
    const ligaCards = document.querySelectorAll('.liga-card');
    
    ligaCards.forEach(card => {
        card.addEventListener('click', () => {
            const liga = card.dataset.liga;
            filtrarPorLiga(liga);
        });
    });
}

// Filtrar productos por liga
function filtrarPorLiga(liga) {
    // Scroll a la sección de productos
    document.getElementById('productos').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Filtrar y mostrar productos de la liga seleccionada
    setTimeout(() => {
        const grid = document.getElementById('productosGrid');
        const sectionTitle = document.querySelector('#productos .section-title');
        const todosLosProductos = [...productos.camisetas, ...productos.chandales, ...productos.ninos];
        const productosFiltrados = todosLosProductos.filter(p => p.liga === liga);
        
        // Actualizar título de la sección
        const ligaNames = {
            'retro': 'Retro - Clásicas',
            'laliga1': 'LaLiga (1ª División) - España',
            'laliga2': 'LaLiga (2ª División) - España',
            'premier': 'Premier League - Inglaterra',
            'bundesliga': 'Bundesliga - Alemania',
            'seriea': 'Serie A - Italia',
            'ligue1': 'Ligue 1 - Francia',
            'portuguesa': 'Liga Portuguesa - Portugal',
            'mls': 'MLS - Estados Unidos',
            'resto': 'Resto del Mundo',
            'selecciones': 'Selecciones Nacionales'
        };
        
        sectionTitle.textContent = ligaNames[liga] || 'Liga Seleccionada';
        
        grid.innerHTML = '';
        
        if (productosFiltrados.length === 0) {
            grid.innerHTML = `
                <div style="
                    text-align: center; 
                    grid-column: 1/-1; 
                    color: #666; 
                    padding: 2rem;
                    background: #f8f9fa;
                    border-radius: 10px;
                    margin: 1rem 0;
                ">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; color: #ccc;"></i>
                    <h3>No hay productos de esta liga disponibles</h3>
                    <p>Próximamente agregaremos más equipos de esta liga.</p>
                    <button onclick="cargarProductos('camisetas')" class="btn btn-secondary" style="margin-top: 1rem;">
                        Ver Todos los Productos
                    </button>
                </div>
            `;
            return;
        }
        
        productosFiltrados.forEach(producto => {
            const productoCard = crearProductoCard(producto);
            grid.appendChild(productoCard);
        });
        
        // Actualizar tabs - quitar active de todos los tabs
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        
        // Agregar botón para volver a ver todos
        const volverBtn = document.createElement('div');
        volverBtn.style.cssText = `
            text-align: center;
            grid-column: 1/-1;
            margin-top: 1rem;
        `;
        volverBtn.innerHTML = `
            <button onclick="volverATodos()" class="btn btn-outline" style="
                background: transparent;
                color: var(--primary-color);
                border: 2px solid var(--primary-color);
                padding: 10px 20px;
                border-radius: 25px;
                font-weight: 600;
            ">
                <i class="fas fa-arrow-left"></i> Ver Todos los Productos
            </button>
        `;
        grid.appendChild(volverBtn);
        
        // Aplicar animación a las cards
        grid.querySelectorAll('.producto-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
        });
    }, 500);
}

// Función para volver a mostrar todos los productos (hacer global)
window.volverATodos = function() {
    const sectionTitle = document.querySelector('#productos .section-title');
    sectionTitle.textContent = 'Equipos Destacados';
    
    // Activar el primer tab (camisetas)
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.tab-btn[data-category="camisetas"]').classList.add('active');
    
    categoriaActual = 'camisetas';
    cargarProductos(categoriaActual);
};

// Configurar personalización
function setupPersonalizacion() {
    const inputNombre = document.getElementById('input-nombre');
    const inputNumero = document.getElementById('input-numero');
    const previewNombre = document.getElementById('preview-nombre');
    const previewNumero = document.getElementById('preview-numero');
    
    if (inputNombre && inputNumero) {
        inputNombre.addEventListener('input', (e) => {
            const nombre = e.target.value.toUpperCase();
            previewNombre.textContent = nombre || 'NOMBRE';
        });
        
        inputNumero.addEventListener('input', (e) => {
            const numero = e.target.value;
            previewNumero.textContent = numero || '10';
        });
    }
    
    // Cargar equipos existentes en el select
    cargarEquiposEnPersonalizar();
}

// Cargar equipos existentes en el select de personalizar
function cargarEquiposEnPersonalizar() {
    const equipoSelect = document.getElementById('input-equipo');
    if (!equipoSelect) return;
    
    // Limpiar opciones existentes (excepto la primera)
    while (equipoSelect.children.length > 1) {
        equipoSelect.removeChild(equipoSelect.lastChild);
    }
    
    // Obtener todos los productos
    const datosGuardados = localStorage.getItem('camisetasAJ_productos');
    let todosLosProductos = {};
    
    if (datosGuardados) {
        todosLosProductos = JSON.parse(datosGuardados);
    } else {
        // Usar productos por defecto
        todosLosProductos = productos;
    }
    
    // Crear set de equipos únicos
    const equiposUnicos = new Set();
    
    // Recorrer todas las categorías
    Object.values(todosLosProductos).forEach(categoria => {
        if (Array.isArray(categoria)) {
            categoria.forEach(producto => {
                if (producto.nombre) {
                    equiposUnicos.add(producto.nombre);
                }
            });
        }
    });
    
    // Ordenar alfabéticamente
    const equiposOrdenados = Array.from(equiposUnicos).sort();
    
    // Añadir opciones al select
    equiposOrdenados.forEach(equipo => {
        const option = document.createElement('option');
        option.value = equipo;
        option.textContent = equipo;
        equipoSelect.appendChild(option);
    });
}

// Solicitar producto por WhatsApp con opciones
function solicitarProducto(nombre, precio) {
    // Crear modal de opciones
    const modal = document.createElement('div');
    modal.className = 'pedido-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 400px;
            width: 90%;
            text-align: center;
            position: relative;
        ">
            <button onclick="cerrarModalPedido()" style="
                position: absolute;
                top: 10px;
                right: 15px;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #999;
            ">×</button>
            
            <h3 style="color: var(--dark-color); margin-bottom: 1rem;">
                🛍️ ${nombre}
            </h3>
            <p style="color: var(--primary-color); font-size: 1.2rem; font-weight: bold; margin-bottom: 1.5rem;">
                €${precio}
            </p>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--dark-color);">
                    👕 Talla:
                </label>
                <select id="talla-pedido" style="
                    width: 100%;
                    padding: 10px;
                    border: 2px solid #ddd;
                    border-radius: 10px;
                    font-size: 1rem;
                ">
                    <option value="">Seleccionar talla</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="2XL">2XL</option>
                    <option value="3XL">3XL</option>
                </select>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 1rem; font-weight: 600; color: var(--dark-color);">
                    ✨ ¿Deseas personalización?
                </label>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button onclick="seleccionarPersonalizacion(false)" style="
                        background: var(--secondary-color);
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-weight: 600;
                    ">No</button>
                    <button onclick="seleccionarPersonalizacion(true)" style="
                        background: var(--primary-color);
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-weight: 600;
                    ">Sí</button>
                </div>
            </div>
            
            <div id="opciones-personalizacion" style="display: none; margin-bottom: 1.5rem;">
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--dark-color);">
                        📝 Nombre:
                    </label>
                    <input type="text" id="nombre-pedido" placeholder="Nombre" maxlength="12" style="
                        width: 100%;
                        padding: 10px;
                        border: 2px solid #ddd;
                        border-radius: 10px;
                        font-size: 1rem;
                    ">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--dark-color);">
                        🔢 Número:
                    </label>
                    <input type="number" id="numero-pedido" placeholder="Número" min="1" max="99" style="
                        width: 100%;
                        padding: 10px;
                        border: 2px solid #ddd;
                        border-radius: 10px;
                        font-size: 1rem;
                    ">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--dark-color);">
                        🏆 Parche:
                    </label>
                    <select id="parche-pedido" style="
                        width: 100%;
                        padding: 10px;
                        border: 2px solid #ddd;
                        border-radius: 10px;
                        font-size: 1rem;
                    ">
                        <option value="">Sin parche</option>
                        <option value="Liga">🏆 Parche de Liga</option>
                        <option value="Champions League">⭐ Parche Champions League</option>
                    </select>
                </div>
            </div>
            
            <button onclick="enviarPedidoWhatsApp('${nombre}', ${precio})" style="
                background: #25D366;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                font-size: 1rem;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            ">
                <i class="fab fa-whatsapp"></i> Enviar Pedido
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Funciones del modal
    window.cerrarModalPedido = function() {
        document.body.removeChild(modal);
        delete window.cerrarModalPedido;
        delete window.seleccionarPersonalizacion;
        delete window.enviarPedidoWhatsApp;
    };
    
    window.seleccionarPersonalizacion = function(personalizar) {
        const opciones = document.getElementById('opciones-personalizacion');
        opciones.style.display = personalizar ? 'block' : 'none';
    };
    
    window.enviarPedidoWhatsApp = function(nombreProducto, precioProducto) {
        const talla = document.getElementById('talla-pedido').value;
        const opciones = document.getElementById('opciones-personalizacion');
        const personalizado = opciones.style.display !== 'none';
        
        if (!talla) {
            alert('Por favor selecciona una talla');
            return;
        }
        
        let mensaje = `🛍️ ¡Hola! Me interesa este producto:\n\n`;
        mensaje += `👕 PRODUCTO: ${nombreProducto}\n`;
        mensaje += `💰 PRECIO: €${precioProducto}\n`;
        mensaje += `📏 TALLA: ${talla}\n`;
        
        if (personalizado) {
            const nombre = document.getElementById('nombre-pedido').value;
            const numero = document.getElementById('numero-pedido').value;
            const parche = document.getElementById('parche-pedido').value;
            
            if (nombre || numero || parche) {
                mensaje += `\n✨ PERSONALIZACIÓN:\n`;
                if (nombre) mensaje += `📝 Nombre: ${nombre}\n`;
                if (numero) mensaje += `🔢 Número: ${numero}\n`;
                if (parche) mensaje += `🏆 Parche: ${parche}\n`;
            }
        }
        
        mensaje += `\n❓ ¿Podrían confirmar disponibilidad y precio final?\n\n`;
        mensaje += `🚚 Envío gratuito\n`;
        mensaje += `⏱️ Entrega: 10-13 días`;
        
        abrirWhatsAppConMensaje(mensaje);
        window.cerrarModalPedido();
    };
}

// Personalizar producto
function personalizarProducto(nombre) {
    // Scroll a sección de personalización
    document.getElementById('personalizar').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Opcional: Pre-llenar con el nombre del producto
    setTimeout(() => {
        const titulo = document.querySelector('#personalizar .section-title');
        titulo.textContent = `Personaliza tu ${nombre}`;
    }, 500);
}

// Solicitar camiseta personalizada
function solicitarPersonalizada() {
    const equipo = document.getElementById('input-equipo').value || 'Cualquier equipo';
    const nombre = document.getElementById('input-nombre').value || 'Alexander';
    const numero = document.getElementById('input-numero').value || '10';
    const talla = document.getElementById('input-talla').value || 'M';
    const parche = document.getElementById('input-parche').value || 'Liga';
    
    let mensaje = `¡Hola! Quiero personalizar una camiseta:%0A`;
    mensaje += `*Personalización:*%0A`;
    mensaje += `⚽*Equipo:* ${equipo}%0A`;
    mensaje += `🖋️*Nombre:* ${nombre}%0A`;
    mensaje += `#️⃣*Número:* ${numero}%0A`;
    mensaje += `📏*Talla:* ${talla}%0A`;
    mensaje += `🛡️*Parche:* ${parche}%0A`;
    mensaje += `¿Se encuentra Disponible?`;
    
    abrirWhatsAppConMensaje(mensaje);
}

// Abrir WhatsApp
function abrirWhatsApp() {
    const mensaje = `¡Hola Camisetas AJ! Me interesa conocer más sobre sus productos.`;
    abrirWhatsAppConMensaje(mensaje);
}

function abrirWhatsAppConMensaje(mensaje) {
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
    window.open(url, '_blank');
}

// Cargar datos guardados del localStorage
function cargarDatosGuardados() {
    const productosGuardados = localStorage.getItem('camisetasAJ_productos');
    const ligasGuardadas = localStorage.getItem('camisetasAJ_ligas');
    const categoriasGuardadas = localStorage.getItem('camisetasAJ_categorias');
    
    if (productosGuardados) {
        try {
            const datosProductos = JSON.parse(productosGuardados);
            // Sobrescribir completamente con los datos guardados para mantener las ediciones
            productos = datosProductos;
        } catch (e) {
            console.error('Error cargando productos:', e);
        }
    }
    
    if (ligasGuardadas) {
        try {
            const datosLigas = JSON.parse(ligasGuardadas);
            // Mergear con ligas existentes en CONFIG
            if (window.CONFIG && window.CONFIG.ligas) {
                Object.assign(window.CONFIG.ligas, datosLigas);
            }
            // Actualizar HTML de ligas
            actualizarLigasHTML(datosLigas);
        } catch (e) {
            console.error('Error cargando ligas:', e);
        }
    }
    
    if (categoriasGuardadas) {
        try {
            const datosCategorias = JSON.parse(categoriasGuardadas);
            cargarCategoriasGuardadas(datosCategorias);
        } catch (e) {
            console.error('Error cargando categorías:', e);
        }
    }
}

// Cargar categorías guardadas en select y tabs
function cargarCategoriasGuardadas(categorias) {
    const categoriaSelect = document.getElementById('categoria-select');
    const tabsContainer = document.querySelector('.categoria-tabs');
    
    Object.keys(categorias).forEach(categoriaId => {
        const categoria = categorias[categoriaId];
        
        // Añadir al select si no existe
        if (categoriaSelect) {
            const optionExiste = Array.from(categoriaSelect.options).some(opt => opt.value === categoriaId);
            if (!optionExiste) {
                const nuevaOpcion = document.createElement('option');
                nuevaOpcion.value = categoriaId;
                nuevaOpcion.textContent = categoria.nombre;
                categoriaSelect.appendChild(nuevaOpcion);
            }
        }
        
        // Añadir tab si no existe
        if (tabsContainer && !document.querySelector(`[data-category="${categoriaId}"]`)) {
            const nuevoTab = document.createElement('button');
            nuevoTab.className = 'tab-btn';
            nuevoTab.setAttribute('data-category', categoriaId);
            nuevoTab.textContent = categoria.nombre;
            tabsContainer.appendChild(nuevoTab);
            
            // Añadir event listener
            nuevoTab.addEventListener('click', function() {
                filtrarProductos(categoriaId);
            });
        }
    });
}

// Guardar datos en localStorage
function guardarDatos() {
    // Guardar TODOS los productos (incluidos los editados)
    const productosParaGuardar = {};
    Object.keys(productos).forEach(categoria => {
        productosParaGuardar[categoria] = productos[categoria]; // Guardar todos los productos
    });
    
    localStorage.setItem('camisetasAJ_productos', JSON.stringify(productosParaGuardar));
}

// Autenticación de admin con modal elegante
function autenticarAdmin() {
    return new Promise((resolve) => {
        // Crear modal de autenticación
        const modal = document.createElement('div');
        modal.className = 'admin-modal';
        
        modal.innerHTML = `
            <div class="admin-modal-content">
                <h3>🔐 Acceso de Administrador</h3>
                <input type="password" 
                       id="admin-password-input" 
                       placeholder="Ingresa la contraseña" 
                       style="text-align: center;">
                <div class="admin-modal-buttons">
                    <button class="admin-modal-btn secondary" onclick="cancelarLogin()">
                        Cancelar
                    </button>
                    <button class="admin-modal-btn primary" onclick="confirmarLogin()">
                        Acceder
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Enfocar el input
        setTimeout(() => {
            document.getElementById('admin-password-input').focus();
        }, 100);
        
        // Funciones del modal
        window.cancelarLogin = function() {
            document.body.removeChild(modal);
            delete window.cancelarLogin;
            delete window.confirmarLogin;
            resolve(false);
        };
        
        window.confirmarLogin = function() {
            const clave = document.getElementById('admin-password-input').value;
            const claveCorrecta = window.CONFIG ? window.CONFIG.web.admin.clave_acceso : 'CamisetasAJ2025!';
            
            if (clave === claveCorrecta) {
                adminAutenticado = true;
                document.body.removeChild(modal);
                delete window.cancelarLogin;
                delete window.confirmarLogin;
                resolve(true);
            } else {
                // Mostrar error
                const input = document.getElementById('admin-password-input');
                input.style.borderColor = 'red';
                input.value = '';
                input.placeholder = 'Contraseña incorrecta, inténtalo de nuevo';
                input.focus();
                
                // Restaurar estilo después de 2 segundos
                setTimeout(() => {
                    input.style.borderColor = '#e1e5e9';
                    input.placeholder = 'Ingresa la contraseña';
                }, 2000);
            }
        };
        
        // Permitir Enter para confirmar
        document.getElementById('admin-password-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                window.confirmarLogin();
            }
        });
        
        // Cerrar con Escape
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                document.removeEventListener('keydown', escapeHandler);
                window.cancelarLogin();
            }
        });
    });
}

// Admin Panel
function setupAdminPanel() {
    const adminLink = document.querySelector('.admin-link');
    const adminSection = document.getElementById('admin');
    const uploadZone = document.getElementById('uploadZone');
    const imagenesInput = document.getElementById('imagenes-input');
    
    // Toggle admin mode con autenticación
    adminLink.addEventListener('click', async (e) => {
        e.preventDefault();
        
        if (!adminMode && !adminAutenticado) {
            const autenticado = await autenticarAdmin();
            if (!autenticado) {
                return;
            }
        }
        
        adminMode = !adminMode;
        
        if (adminMode) {
            adminSection.style.display = 'block';
            adminSection.scrollIntoView({ behavior: 'smooth' });
            cargarProductosAdmin();
            cargarLigasEnSelect();
            setupImageDragDrop(); // Configurar drag & drop de imágenes
        } else {
            adminSection.style.display = 'none';
        }
    });
    
    // Drag and drop para imágenes
    if (uploadZone) {
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.style.background = 'rgba(255, 0, 0, 0.1)';
        });
        
        uploadZone.addEventListener('dragleave', () => {
            uploadZone.style.background = 'transparent';
        });
        
        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.style.background = 'transparent';
            
            const files = e.dataTransfer.files;
            handleImageFiles(files);
        });
        
        uploadZone.addEventListener('click', () => {
            imagenesInput.click();
        });
    }
    
    if (imagenesInput) {
        imagenesInput.addEventListener('change', (e) => {
            handleImageFiles(e.target.files);
        });
    }
}

// Manejar archivos de imagen
function handleImageFiles(files) {
    const uploadZone = document.getElementById('uploadZone');
    
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Crear preview de imagen
                const preview = document.createElement('div');
                preview.style.cssText = `
                    display: inline-block;
                    margin: 10px;
                    position: relative;
                `;
                
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.cssText = `
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                    border-radius: 8px;
                    border: 2px solid var(--primary-color);
                `;
                
                const removeBtn = document.createElement('button');
                removeBtn.innerHTML = '×';
                removeBtn.style.cssText = `
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: none;
                    background: var(--primary-color);
                    color: white;
                    cursor: pointer;
                    font-size: 12px;
                `;
                
                removeBtn.onclick = () => preview.remove();
                
                preview.appendChild(img);
                preview.appendChild(removeBtn);
                uploadZone.appendChild(preview);
            };
            reader.readAsDataURL(file);
        }
    });
}

// CORRECCIÓN CRÍTICA: Asegurar que setupImageDragDrop se ejecute correctamente
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar sistema de imágenes después de cargar DOM
    setTimeout(() => {
        if (typeof setupImageDragDrop === 'function') {
            setupImageDragDrop();
            console.log('✅ Sistema de imágenes inicializado');
        }
    }, 100);
});

// FUNCIÓN CORREGIDA: subirProducto con debugging completo
function subirProducto() {
    console.log('🚀 INICIANDO SUBIDA DE PRODUCTO - VERSIÓN CORREGIDA');
    
    try {
        // Obtener elementos del DOM
        const categoriaEl = document.getElementById('categoria-select');
        const equipoEl = document.getElementById('equipo-input');
        const ligaEl = document.getElementById('liga-select');
        const precioEl = document.getElementById('precio-input');
        
        if (!categoriaEl || !equipoEl || !ligaEl || !precioEl) {
            console.error('❌ Elementos del formulario no encontrados');
            alert('Error: Formulario no disponible');
            return;
        }
        
        const categoria = categoriaEl.value;
        const equipo = equipoEl.value.trim();
        const liga = ligaEl.value;
        const precioInput = precioEl.value.trim();
        
        console.log('📝 Datos capturados:', { categoria, equipo, liga, precioInput });
        
        // Validación
        if (!equipo || !precioInput) {
            console.warn('⚠️ Campos obligatorios vacíos');
            mostrarModalError('Por favor, completa todos los campos obligatorios');
            return;
        }
        
        const precio = parseFloat(precioInput);
        if (isNaN(precio) || precio <= 0) {
            console.warn('⚠️ Precio inválido:', precioInput);
            mostrarModalError('Por favor, ingresa un precio válido');
            return;
        }
        
        // Obtener imágenes
        let imagenesOrdenadas = [];
        if (typeof window.imagenesArray !== 'undefined' && window.imagenesArray.length > 0) {
            imagenesOrdenadas = window.imagenesArray.map(img => img.src);
            console.log('📸 Imágenes obtenidas del array global:', imagenesOrdenadas.length);
        } else if (typeof obtenerImagenesOrdenadas === 'function') {
            imagenesOrdenadas = obtenerImagenesOrdenadas();
            console.log('📸 Imágenes obtenidas de función:', imagenesOrdenadas.length);
        } else {
            console.warn('⚠️ No se encontraron imágenes');
        }
        
        // Crear producto
        const nuevoProducto = {
            id: Date.now(),
            nombre: equipo,
            precio: precio,
            liga: liga,
            imagen: imagenesOrdenadas.length > 0 ? imagenesOrdenadas[0] : null,
            imagenes: imagenesOrdenadas,
            categoria: categoria,
            fechaCreacion: new Date(),
            precio_personalizado: true, // Marcar como precio personalizado
            editado_manualmente: true // Proteger de sobrescritura automática
        };
        
        console.log('🆕 Producto creado:', nuevoProducto);
        
        // Asegurar que existe la categoría
        if (!productos[categoria]) {
            productos[categoria] = [];
            console.log('📁 Categoría creada:', categoria);
        }
        
        // Agregar producto
        productos[categoria].push(nuevoProducto);
        console.log('✅ Producto añadido. Total en', categoria + ':', productos[categoria].length);
        
        // Guardar en localStorage
        if (typeof guardarDatos === 'function') {
            guardarDatos();
            console.log('💾 Datos guardados en localStorage');
        } else {
            console.error('❌ Función guardarDatos no disponible');
        }
        
        // Limpiar formulario
        limpiarFormularioCompleto();
        
        // Actualizar vistas
        actualizarVistasDespuesDeAgregar(categoria);
        
        // Mostrar modal de éxito
        mostrarModalExito();
        
        console.log('🎉 ¡PROCESO COMPLETADO EXITOSAMENTE!');
        
    } catch (error) {
        console.error('❌ ERROR CRÍTICO en subirProducto:', error);
        mostrarModalError('Error interno: ' + error.message);
    }
}

// Función para obtener imágenes ordenadas correctamente
function obtenerImagenesOrdenadas() {
    if (typeof imagenesArray !== 'undefined' && imagenesArray.length > 0) {
        return imagenesArray.map(img => img.src);
    }
    return [];
}

// Limpiar formulario completamente
function limpiarFormularioCompleto() {
    document.getElementById('equipo-input').value = '';
    document.getElementById('precio-input').value = '';
    const imagenesInput = document.getElementById('imagenes-input');
    if (imagenesInput) {
        imagenesInput.value = '';
    }
    
    // Resetear área de drag & drop
    imagenesArray = [];
    const uploadZone = document.getElementById('uploadZone');
    const previewContainer = document.getElementById('imagenesPreview');
    if (previewContainer) {
        previewContainer.remove();
    }
    if (uploadZone) {
        uploadZone.innerHTML = `
            <i class="fas fa-cloud-upload-alt"></i>
            <p>Arrastra imágenes aquí o haz clic para seleccionar</p>
        `;
    }
    
    console.log('🧹 Formulario limpiado completamente');
}

// Actualizar vistas después de agregar producto
function actualizarVistasDespuesDeAgregar(categoria) {
    // Recargar productos si estamos en la misma categoría
    if (typeof categoriaActual !== 'undefined' && categoriaActual === categoria) {
        cargarProductos(categoriaActual);
    }
    
    // Recargar admin panel
    if (typeof cargarProductosAdmin === 'function') {
        cargarProductosAdmin();
    }
    
    // Recargar novedades
    if (typeof cargarNovedades === 'function') {
        cargarNovedades();
    }
    
    // Actualizar estadísticas
    if (typeof actualizarEstadisticasAdmin === 'function') {
        actualizarEstadisticasAdmin();
    }
}

// Modal de éxito elegante
function mostrarModalExito() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            border-radius: 15px;
            padding: 40px;
            text-align: center;
            max-width: 450px;
            width: 90%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
        ">
            <div style="
                background: #4CAF50;
                color: white;
                border-radius: 50%;
                width: 80px;
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
                font-size: 40px;
            ">✓</div>
            
            <h2 style="
                color: #333;
                margin: 0 0 15px 0;
                font-size: 24px;
                font-weight: 600;
            ">¡Producto Subido Exitosamente!</h2>
            
            <p style="
                color: #666;
                margin: 0 0 25px 0;
                font-size: 16px;
                line-height: 1.4;
            ">Tu producto ha sido añadido al catálogo correctamente.<br>Las imágenes se han guardado en el orden que especificaste.</p>
            
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button onclick="cerrarModalExito()" style="
                    background: #4CAF50;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='#45a049'" onmouseout="this.style.background='#4CAF50'">
                    <i class="fas fa-check"></i> Perfecto
                </button>
                
                <button onclick="subirOtroProducto()" style="
                    background: var(--primary-color, #ff0000);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.3s ease;
                " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                    <i class="fas fa-plus"></i> Subir Otro
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Funciones para el modal
    window.cerrarModalExito = function() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
            delete window.cerrarModalExito;
            delete window.subirOtroProducto;
        }, 300);
    };
    
    window.subirOtroProducto = function() {
        window.cerrarModalExito();
        // El formulario ya está limpio, solo enfocar en el campo de nombre
        setTimeout(() => {
            const equipoInput = document.getElementById('equipo-input');
            if (equipoInput) {
                equipoInput.focus();
            }
        }, 350);
    };
    
    // CSS para animaciones
    if (!document.getElementById('modal-animations')) {
        const style = document.createElement('style');
        style.id = 'modal-animations';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ASEGURAR que la función mostrarModalError exista
if (typeof mostrarModalError === 'undefined') {
    window.mostrarModalError = function(mensaje) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                border-radius: 15px;
                padding: 30px;
                text-align: center;
                max-width: 400px;
                width: 90%;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            ">
                <div style="
                    background: #f44336;
                    color: white;
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    font-size: 30px;
                ">!</div>
                
                <h3 style="color: #333; margin: 0 0 15px 0;">Error</h3>
                <p style="color: #666; margin: 0 0 25px 0;">${mensaje}</p>
                
                <button onclick="this.closest('div').parentNode.remove()" style="
                    background: #f44336;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                ">Entendido</button>
            </div>
        `;
        
        document.body.appendChild(modal);
    };
}

// FUNCIÓN CRÍTICA: Inicializar sistema de imágenes globalmente
window.inicializarSistemaImagenes = function() {
    // Asegurar variable global
    if (typeof window.imagenesArray === 'undefined') {
        window.imagenesArray = [];
    }
    
    // Configurar drag & drop si los elementos existen
    const uploadZone = document.getElementById('uploadZone');
    const imagenesInput = document.getElementById('imagenes-input');
    
    if (uploadZone && imagenesInput) {
        console.log('🎨 Configurando sistema de imágenes...');
        
        // Event listener para input de archivos
        imagenesInput.addEventListener('change', (e) => {
            manejarArchivos(e.target.files);
        });
        
        // Drag & Drop eventos
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadZone.style.background = 'rgba(255, 0, 0, 0.1)';
            uploadZone.style.borderColor = 'red';
        });
        
        uploadZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadZone.style.background = 'transparent';
            uploadZone.style.borderColor = '#ddd';
        });
        
        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadZone.style.background = 'transparent';
            uploadZone.style.borderColor = '#ddd';
            manejarArchivos(e.dataTransfer.files);
        });
        
        // Click para seleccionar archivos
        uploadZone.addEventListener('click', (e) => {
            if (!e.target.closest('.imagen-preview-item')) {
                imagenesInput.click();
            }
        });
    }
    
    function manejarArchivos(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageData = {
                        src: e.target.result,
                        file: file,
                        id: Date.now() + Math.random()
                    };
                    window.imagenesArray.push(imageData);
                    mostrarPreviewImagen(imageData);
                    console.log('📸 Imagen añadida. Total:', window.imagenesArray.length);
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    function mostrarPreviewImagen(imageData) {
        let previewContainer = document.getElementById('imagenesPreview');
        if (!previewContainer) {
            previewContainer = document.createElement('div');
            previewContainer.id = 'imagenesPreview';
            previewContainer.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-top: 15px;
                padding: 10px;
                border: 2px dashed #ddd;
                border-radius: 8px;
                background: #f9f9f9;
            `;
            uploadZone.appendChild(previewContainer);
        }
        
        const previewItem = document.createElement('div');
        previewItem.style.cssText = `
            position: relative;
            width: 80px;
            height: 80px;
            border-radius: 8px;
            overflow: hidden;
            border: 2px solid #ddd;
        `;
        
        previewItem.innerHTML = `
            <img src="${imageData.src}" style="width: 100%; height: 100%; object-fit: cover;">
            <button onclick="eliminarImagenGlobal('${imageData.id}')" style="
                position: absolute;
                top: -5px;
                right: -5px;
                background: red;
                color: white;
                border: none;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 12px;
                cursor: pointer;
            ">×</button>
            <div style="
                position: absolute;
                bottom: -5px;
                left: -5px;
                background: #333;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
            ">${window.imagenesArray.length}</div>
        `;
        
        previewContainer.appendChild(previewItem);
    }
    
    // Función global para eliminar imagen
    window.eliminarImagenGlobal = function(imageId) {
        window.imagenesArray = window.imagenesArray.filter(img => img.id !== imageId);
        actualizarPreviewsImagenes();
        console.log('🗑️ Imagen eliminada. Total:', window.imagenesArray.length);
    };
    
    function actualizarPreviewsImagenes() {
        const previewContainer = document.getElementById('imagenesPreview');
        if (previewContainer) {
            previewContainer.innerHTML = '';
            window.imagenesArray.forEach(imageData => {
                mostrarPreviewImagen(imageData);
            });
        }
    }
    
    console.log('✅ Sistema de imágenes inicializado correctamente');
};

// Ejecutar inicialización cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.inicializarSistemaImagenes);
} else {
    window.inicializarSistemaImagenes();
}

// Agregar producto al array
function agregarProducto(producto) {
    // Asignar ID único (mayor a 1000 para distinguir de productos por defecto)
    producto.id = Date.now();
    
    productos[producto.categoria].push(producto);
    
    // Guardar en localStorage
    guardarDatos();
    
    // Limpiar formulario y resetear imágenes
    document.getElementById('equipo-input').value = '';
    document.getElementById('precio-input').value = '';
    document.getElementById('imagenes-input').value = '';
    
    // Limpiar y resetear el área de upload
    imagenesArray = []; // Limpiar array de imágenes
    const uploadZone = document.getElementById('uploadZone');
    const previewContainer = document.getElementById('imagenesPreview');
    if (previewContainer) {
        previewContainer.remove();
    }
    uploadZone.innerHTML = `
        <i class="fas fa-cloud-upload-alt"></i>
        <p>Arrastra imágenes aquí o haz clic para seleccionar</p>
    `;
    
    // Recargar productos si estamos en la misma categoría
    if (categoriaActual === producto.categoria) {
        cargarProductos(categoriaActual);
    }
    
    // Recargar admin panel
    cargarProductosAdmin();
    
    alert('Producto agregado exitosamente!');
}

// Cargar productos en admin panel
function cargarProductosAdmin() {
    const listaAdmin = document.getElementById('lista-productos-admin');
    if (!listaAdmin) return;
    
    const todosLosProductos = [...productos.camisetas, ...productos.chandales, ...productos.ninos];
    
    listaAdmin.innerHTML = '';
    
    if (todosLosProductos.length === 0) {
        listaAdmin.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No hay productos</p>';
        return;
    }
    
    todosLosProductos.forEach(producto => {
        const item = document.createElement('div');
        item.className = 'producto-admin-item';
        item.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            margin: 0.5rem 0;
            background: var(--gray-color);
            border-radius: 12px;
            transition: all 0.3s ease;
            border-left: 4px solid var(--primary-color);
        `;
        
        const fechaFormateada = producto.fechaCreacion ? 
            new Date(producto.fechaCreacion).toLocaleDateString('es-ES') : 
            new Date().toLocaleDateString('es-ES');
        
        item.innerHTML = `
            <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                    ${producto.imagen ? 
                        `<img src="${producto.imagen}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;">` :
                        `<div style="width: 50px; height: 50px; background: var(--primary-color); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;"><i class="fas fa-tshirt"></i></div>`
                    }
                    <div>
                        <strong style="color: var(--dark-color); font-size: 1.1rem;">${producto.nombre}</strong>
                        <div style="display: flex; gap: 1rem; margin-top: 0.25rem;">
                            <span style="background: var(--secondary-color); color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.8rem;">${producto.categoria}</span>
                            <span style="color: var(--primary-color); font-weight: 600;">€${producto.precio}</span>
                            <span style="color: #666; font-size: 0.9rem;">📅 ${fechaFormateada}</span>
                            ${producto.imagenes && producto.imagenes.length > 1 ? 
                                `<span style="color: #666; font-size: 0.8rem;">📷 ${producto.imagenes.length} fotos</span>` : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button onclick="editarProducto(${producto.id}, '${producto.categoria}')" 
                        class="btn-rounded btn-edit-text" style="padding: 8px 12px; font-size: 0.8rem;">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button onclick="eliminarProductoAdmin(${producto.id}, '${producto.categoria}', this.closest('.producto-admin-item'))" 
                        class="btn-rounded" style="background: #dc3545; color: white; padding: 8px 12px; font-size: 0.8rem;">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        `;
        
        // Hover effect
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(5px)';
            item.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
            item.style.boxShadow = 'none';
        });
        
        listaAdmin.appendChild(item);
    });
    
    // Actualizar estadísticas
    actualizarEstadisticasAdmin();
}

// Función de editar producto - DESARROLLADA COMPLETAMENTE
function editarProducto(id, categoria) {
    // Encontrar el producto
    const producto = productos[categoria].find(p => p.id === id);
    if (!producto) {
        alert('Producto no encontrado');
        return;
    }
    
    // Crear modal de edición avanzado
    const modal = document.createElement('div');
    modal.className = 'edit-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            text-align: center;
            position: relative;
            max-height: 80vh;
            overflow-y: auto;
        ">
            <button onclick="cerrarModalEdicion()" style="
                position: absolute;
                top: 10px;
                right: 15px;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #999;
            ">×</button>
            
            <h3 style="color: var(--dark-color); margin-bottom: 1.5rem;">
                ✏️ Editar Producto
            </h3>
            
            <div style="margin-bottom: 1rem; text-align: left;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Nombre del equipo:</label>
                <input type="text" id="edit-nombre" value="${producto.nombre}" style="
                    width: 100%;
                    padding: 10px;
                    border: 2px solid #ddd;
                    border-radius: 10px;
                    font-size: 1rem;
                ">
            </div>
            
            <div style="margin-bottom: 1rem; text-align: left;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Precio (€):</label>
                <input type="number" id="edit-precio" value="${producto.precio}" style="
                    width: 100%;
                    padding: 10px;
                    border: 2px solid #ddd;
                    border-radius: 10px;
                    font-size: 1rem;
                ">
            </div>
            
            <div style="margin-bottom: 1.5rem; text-align: left;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Imágenes actuales (arrastra para reordenar):</label>
                <div id="edit-imagenes-actuales" style="
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-bottom: 10px;
                    min-height: 70px;
                    padding: 10px;
                    border: 2px dashed #ddd;
                    border-radius: 10px;
                ">
                    ${producto.imagenes && producto.imagenes.length > 0 ? 
                        producto.imagenes.map((img, index) => `
                            <div class="edit-imagen-item" draggable="true" data-index="${index}" style="
                                position: relative; 
                                display: inline-block;
                                cursor: move;
                            ">
                                <img src="${img}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px; border: 2px solid #ddd;">
                                <button onclick="eliminarImagenEdit(${index})" style="
                                    position: absolute;
                                    top: -5px;
                                    right: -5px;
                                    background: var(--primary-color);
                                    color: white;
                                    border: none;
                                    border-radius: 50%;
                                    width: 18px;
                                    height: 18px;
                                    font-size: 10px;
                                    cursor: pointer;
                                ">×</button>
                                <div style="
                                    position: absolute;
                                    bottom: -5px;
                                    left: -5px;
                                    background: var(--secondary-color);
                                    color: white;
                                    border-radius: 50%;
                                    width: 18px;
                                    height: 18px;
                                    font-size: 10px;
                                    font-weight: bold;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                ">${index + 1}</div>
                            </div>
                        `).join('') : 
                        '<p style="color: #666; margin: 0; text-align: center; padding: 20px;">No hay imágenes</p>'
                    }
                </div>
                <input type="file" id="edit-nuevas-imagenes" multiple accept="image/*" style="
                    width: 100%;
                    padding: 8px;
                    border: 2px solid #ddd;
                    border-radius: 10px;
                    font-size: 0.9rem;
                ">
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="guardarCambiosProducto(${id}, '${categoria}')" style="
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 10px;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 1rem;
                ">
                    💾 Guardar Cambios
                </button>
                <button onclick="cerrarModalEdicion()" style="
                    background: #666;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 10px;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 1rem;
                ">
                    Cancelar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Variables temporales para el modal
    let imagenesTemporales = [...(producto.imagenes || [])];
    
    // Configurar drag & drop inicial
    setTimeout(() => {
        configurarDragDropEdicion();
    }, 100);
    
    // Funciones del modal
    window.cerrarModalEdicion = function() {
        document.body.removeChild(modal);
        delete window.cerrarModalEdicion;
        delete window.eliminarImagenEdit;
        delete window.guardarCambiosProducto;
    };
    
    window.eliminarImagenEdit = function(index) {
        imagenesTemporales.splice(index, 1);
        actualizarVistaImagenes();
    };
    
    function actualizarVistaImagenes() {
        const container = document.getElementById('edit-imagenes-actuales');
        container.innerHTML = imagenesTemporales.length > 0 ? 
            imagenesTemporales.map((img, index) => `
                <div class="edit-imagen-item" draggable="true" data-index="${index}" style="
                    position: relative; 
                    display: inline-block;
                    cursor: move;
                    transition: all 0.3s ease;
                ">
                    <img src="${img}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px; border: 2px solid #ddd;">
                    <button onclick="eliminarImagenEdit(${index})" style="
                        position: absolute;
                        top: -5px;
                        right: -5px;
                        background: var(--primary-color);
                        color: white;
                        border: none;
                        border-radius: 50%;
                        width: 18px;
                        height: 18px;
                        font-size: 10px;
                        cursor: pointer;
                    ">×</button>
                    <div style="
                        position: absolute;
                        bottom: -5px;
                        left: -5px;
                        background: var(--secondary-color);
                        color: white;
                        border-radius: 50%;
                        width: 18px;
                        height: 18px;
                        font-size: 10px;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    ">${index + 1}</div>
                </div>
            `).join('') : 
            '<p style="color: #666; margin: 0; text-align: center; padding: 20px;">No hay imágenes</p>';
        
        // Configurar drag & drop para las imágenes
        configurarDragDropEdicion();
    }
    
    function configurarDragDropEdicion() {
        const items = document.querySelectorAll('.edit-imagen-item');
        
        items.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', item.dataset.index);
                item.style.opacity = '0.5';
            });
            
            item.addEventListener('dragend', (e) => {
                item.style.opacity = '1';
            });
            
            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                item.style.borderColor = 'var(--primary-color)';
                item.style.transform = 'scale(1.05)';
            });
            
            item.addEventListener('dragleave', (e) => {
                item.style.borderColor = '#ddd';
                item.style.transform = 'scale(1)';
            });
            
            item.addEventListener('drop', (e) => {
                e.preventDefault();
                item.style.borderColor = '#ddd';
                item.style.transform = 'scale(1)';
                
                const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
                const targetIndex = parseInt(item.dataset.index);
                
                if (draggedIndex !== targetIndex) {
                    // Reordenar el array
                    const draggedItem = imagenesTemporales.splice(draggedIndex, 1)[0];
                    imagenesTemporales.splice(targetIndex, 0, draggedItem);
                    
                    // Actualizar vista
                    actualizarVistaImagenes();
                }
            });
        });
    }
    
    window.guardarCambiosProducto = function(id, categoria) {
        console.log('💾 Guardando cambios para producto:', id, categoria);
        
        const nuevoNombre = document.getElementById('edit-nombre').value.trim();
        const nuevoPrecio = parseFloat(document.getElementById('edit-precio').value);
        const nuevasImagenesInput = document.getElementById('edit-nuevas-imagenes');
        
        if (!nuevoNombre) {
            mostrarModalError('El nombre no puede estar vacío');
            return;
        }
        
        if (isNaN(nuevoPrecio) || nuevoPrecio <= 0) {
            mostrarModalError('Precio inválido');
            return;
        }
        
        // Procesar nuevas imágenes si las hay
        if (nuevasImagenesInput && nuevasImagenesInput.files.length > 0) {
            let imagenesProcessadas = 0;
            const totalImagenes = nuevasImagenesInput.files.length;
            
            Array.from(nuevasImagenesInput.files).forEach((file, index) => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        imagenesTemporales.push(e.target.result);
                        imagenesProcessadas++;
                        
                        // Si es la última imagen, finalizar guardado
                        if (imagenesProcessadas === totalImagenes) {
                            finalizarGuardadoConImagenes();
                        }
                    };
                    reader.readAsDataURL(file);
                } else {
                    imagenesProcessadas++;
                    if (imagenesProcessadas === totalImagenes) {
                        finalizarGuardadoConImagenes();
                    }
                }
            });
        } else {
            finalizarGuardadoConImagenes();
        }
        
        function finalizarGuardadoConImagenes() {
            // Buscar el producto en la categoría correcta
            const index = productos[categoria].findIndex(p => p.id === id);
            if (index !== -1) {
                // Actualizar el producto
                productos[categoria][index].nombre = nuevoNombre;
                productos[categoria][index].precio = nuevoPrecio;
                productos[categoria][index].precio_personalizado = true; // Marcar como editado
                productos[categoria][index].editado_manualmente = true; // Proteger de sobrescritura
                productos[categoria][index].imagenes = [...imagenesTemporales];
                productos[categoria][index].imagen = imagenesTemporales.length > 0 ? imagenesTemporales[0] : null;
                
                console.log('✅ Producto actualizado:', productos[categoria][index]);
                
                // Guardar cambios en localStorage
                guardarDatos();
                
                // Recargar todas las vistas
                if (typeof cargarProductosAdmin === 'function') {
                    cargarProductosAdmin();
                }
                if (typeof cargarProductos === 'function' && typeof categoriaActual !== 'undefined') {
                    cargarProductos(categoriaActual);
                }
                if (typeof cargarNovedades === 'function') {
                    cargarNovedades();
                }
                if (typeof actualizarEstadisticasAdmin === 'function') {
                    actualizarEstadisticasAdmin();
                }
                
                // Mostrar modal de éxito para edición
                mostrarModalExitoEdicion();
                
                // Cerrar modal de edición
                setTimeout(() => {
                    if (typeof window.cerrarModalEdicion === 'function') {
                        window.cerrarModalEdicion();
                    }
                }, 1500);
                
            } else {
                console.error('❌ Producto no encontrado:', id, categoria);
                mostrarModalError('Error: Producto no encontrado');
            }
        }
    };
    
// Modal de éxito para edición
function mostrarModalExitoEdicion() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay-edit-success';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10001;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
        ">
            <div style="
                background: #2196F3;
                color: white;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
                font-size: 30px;
            ">✓</div>
            
            <h3 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">¡Cambios Guardados!</h3>
            <p style="color: #666; margin: 0; font-size: 14px;">El producto ha sido actualizado exitosamente</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-cerrar después de 1.5 segundos
    setTimeout(() => {
        if (modal.parentNode) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (modal.parentNode) {
                    document.body.removeChild(modal);
                }
            }, 300);
        }
    }, 1200);
}
}

// Eliminar producto
function eliminarProducto(id, categoria) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        productos[categoria] = productos[categoria].filter(p => p.id !== id);
        
        // Guardar cambios en localStorage
        guardarDatos();
        
        cargarProductosAdmin();
        
        if (categoriaActual === categoria) {
            cargarProductos(categoriaActual);
        }
    }
}

// Funciones para crear nuevas ligas
function mostrarCrearLiga() {
    document.getElementById('nueva-liga-group').style.display = 'block';
}

function cancelarCrearLiga() {
    document.getElementById('nueva-liga-group').style.display = 'none';
    document.getElementById('nueva-liga-nombre').value = '';
    document.getElementById('nueva-liga-pais').value = '';
}

function crearNuevaLiga() {
    const nombre = document.getElementById('nueva-liga-nombre').value.trim();
    const pais = document.getElementById('nueva-liga-pais').value.trim();
    
    if (!nombre || !pais) {
        alert('Por favor completa todos los campos de la nueva liga');
        return;
    }
    
    // Crear ID único para la liga
    const ligaId = nombre.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
    
    // Agregar nueva liga
    const nuevaLiga = {
        nombre: nombre,
        pais: pais,
        icono: 'fas fa-trophy',
        color: '#FF0000'
    };
    
    // Guardar en CONFIG y localStorage
    if (!window.CONFIG) window.CONFIG = { ligas: {} };
    if (!window.CONFIG.ligas) window.CONFIG.ligas = {};
    
    window.CONFIG.ligas[ligaId] = nuevaLiga;
    
    // Guardar en localStorage
    const ligasGuardadas = localStorage.getItem('camisetasAJ_ligas');
    let todasLasLigas = {};
    if (ligasGuardadas) {
        todasLasLigas = JSON.parse(ligasGuardadas);
    }
    todasLasLigas[ligaId] = nuevaLiga;
    localStorage.setItem('camisetasAJ_ligas', JSON.stringify(todasLasLigas));
    
    // Actualizar select de ligas
    cargarLigasEnSelect();
    
    // Actualizar HTML de ligas principales
    actualizarLigasHTML({ [ligaId]: nuevaLiga });
    
    // Limpiar formulario
    cancelarCrearLiga();
    
    alert(`Liga "${nombre}" creada exitosamente!`);
}

// Funciones para crear nuevas categorías
function mostrarCrearCategoria() {
    document.getElementById('nueva-categoria-group').style.display = 'block';
}

function cancelarCrearCategoria() {
    document.getElementById('nueva-categoria-group').style.display = 'none';
    document.getElementById('nueva-categoria-nombre').value = '';
}

function crearNuevaCategoria() {
    const nombre = document.getElementById('nueva-categoria-nombre').value.trim();
    
    if (!nombre) {
        alert('Por favor ingresa el nombre de la nueva categoría');
        return;
    }
    
    // Crear ID único para la categoría
    const categoriaId = nombre.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
    
    // Verificar que no exista ya
    const categoriaSelect = document.getElementById('categoria-select');
    const optionsExistentes = Array.from(categoriaSelect.options).map(opt => opt.value);
    
    if (optionsExistentes.includes(categoriaId)) {
        alert('Ya existe una categoría con ese nombre');
        return;
    }
    
    // Añadir nueva opción al select
    const nuevaOpcion = document.createElement('option');
    nuevaOpcion.value = categoriaId;
    nuevaOpcion.textContent = nombre;
    categoriaSelect.appendChild(nuevaOpcion);
    
    // Seleccionar la nueva categoría
    categoriaSelect.value = categoriaId;
    
    // Guardar categorías en localStorage
    const categoriasGuardadas = localStorage.getItem('camisetasAJ_categorias');
    let todasLasCategorias = {};
    if (categoriasGuardadas) {
        todasLasCategorias = JSON.parse(categoriasGuardadas);
    }
    todasLasCategorias[categoriaId] = { nombre: nombre };
    localStorage.setItem('camisetasAJ_categorias', JSON.stringify(todasLasCategorias));
    
    // Añadir tab al HTML si no existe
    const tabsContainer = document.querySelector('.categoria-tabs');
    if (tabsContainer && !document.querySelector(`[data-category="${categoriaId}"]`)) {
        const nuevoTab = document.createElement('button');
        nuevoTab.className = 'tab-btn';
        nuevoTab.setAttribute('data-category', categoriaId);
        nuevoTab.textContent = nombre;
        tabsContainer.appendChild(nuevoTab);
        
        // Añadir event listener
        nuevoTab.addEventListener('click', function() {
            filtrarProductos(categoriaId);
        });
    }
    
    // Limpiar formulario
    cancelarCrearCategoria();
    
    alert(`Categoría "${nombre}" creada exitosamente!`);
}

// Cargar ligas en el select del admin
function cargarLigasEnSelect() {
    const select = document.getElementById('liga-select');
    if (!select) return;
    
    // Limpiar opciones actuales (excepto las primeras 5 que son por defecto)
    const opciones = select.querySelectorAll('option');
    opciones.forEach((opcion, index) => {
        if (index >= 5) { // Mantener las primeras 5 ligas por defecto
            opcion.remove();
        }
    });
    
    // Agregar nuevas ligas
    if (window.CONFIG && window.CONFIG.ligas) {
        Object.keys(window.CONFIG.ligas).forEach(ligaId => {
            // Solo agregar si no es una de las ligas por defecto
            if (!['laliga', 'premier', 'seriea', 'bundesliga', 'ligue1'].includes(ligaId)) {
                const liga = window.CONFIG.ligas[ligaId];
                const option = document.createElement('option');
                option.value = ligaId;
                option.textContent = `${liga.nombre} (${liga.pais})`;
                select.appendChild(option);
            }
        });
    }
}

// Actualizar HTML de ligas principales
function actualizarLigasHTML(nuevasLigas) {
    const ligasGrid = document.querySelector('.ligas-grid');
    if (!ligasGrid) return;
    
    Object.keys(nuevasLigas).forEach(ligaId => {
        const liga = nuevasLigas[ligaId];
        
        // Verificar si ya existe
        if (document.querySelector(`[data-liga="${ligaId}"]`)) return;
        
        const ligaCard = document.createElement('div');
        ligaCard.className = 'liga-card';
        ligaCard.setAttribute('data-liga', ligaId);
        
        ligaCard.innerHTML = `
            <div class="liga-logo">
                <i class="${liga.icono}"></i>
            </div>
            <h3>${liga.nombre}</h3>
            <p>${liga.pais}</p>
            <div class="liga-overlay">
                <span>Ver Equipos</span>
            </div>
        `;
        
        // Agregar event listener
        ligaCard.addEventListener('click', () => {
            filtrarPorLiga(ligaId);
        });
        
        ligasGrid.appendChild(ligaCard);
    });
}

// Animaciones en scroll
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observar elementos que queremos animar
    document.querySelectorAll('.liga-card, .section-title, .opcion-card').forEach(el => {
        observer.observe(el);
    });
}

// Service Worker para PWA
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    }
}

// Funciones de utilidad
function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
}

function hideLoading(element, originalContent) {
    element.innerHTML = originalContent;
}

// Manejo de errores
window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
});

// Optimización de rendimiento
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Función para cambiar tema (futura implementación)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Cargar tema guardado
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Inicializar tema al cargar
document.addEventListener('DOMContentLoaded', loadSavedTheme);

// Cargar últimas novedades
function cargarNovedades() {
    const grid = document.getElementById('novedadesGrid');
    if (!grid) return;
    
    // Obtener todos los productos y ordenar por fecha de creación
    const todosLosProductos = [...productos.camisetas, ...productos.chandales, ...productos.ninos];
    const productosOrdenados = todosLosProductos
        .sort((a, b) => new Date(b.fechaCreacion || '2025-01-01') - new Date(a.fechaCreacion || '2025-01-01'))
        .slice(0, 6); // Mostrar solo los últimos 6
    
    grid.innerHTML = '';
    
    if (productosOrdenados.length === 0) {
        grid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #666;">No hay productos nuevos</p>';
        return;
    }
    
    productosOrdenados.forEach(producto => {
        const productoCard = crearProductoCard(producto);
        productoCard.classList.add('novedad-item');
        grid.appendChild(productoCard);
    });
}

// Actualizar estadísticas del admin
function actualizarEstadisticasAdmin() {
    const totalProductos = document.getElementById('total-productos');
    const totalCategorias = document.getElementById('total-categorias');
    const totalLigas = document.getElementById('total-ligas');
    
    if (totalProductos) {
        const total = Object.values(productos).reduce((sum, categoria) => sum + categoria.length, 0);
        totalProductos.textContent = total;
    }
    
    if (totalCategorias) {
        totalCategorias.textContent = Object.keys(productos).length;
    }
    
    if (totalLigas && window.CONFIG && window.CONFIG.ligas) {
        totalLigas.textContent = Object.keys(window.CONFIG.ligas).length;
    }
}

// Función para manejar drag and drop de imágenes con orden
// Variable global para las imágenes del drag & drop
let imagenesArray = [];

function setupImageDragDrop() {
    // Resetear el array de imágenes
    imagenesArray = [];
    
    const uploadZone = document.getElementById('uploadZone');
    const imagenesInput = document.getElementById('imagenes-input');
    const previewContainer = document.getElementById('imagenesPreview') || createPreviewContainer();
    
    function createPreviewContainer() {
        const container = document.createElement('div');
        container.id = 'imagenesPreview';
        container.className = 'imagenes-preview';
        uploadZone.appendChild(container);
        return container;
    }
    
    imagenesInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
    
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadZone.style.background = 'rgba(255, 0, 0, 0.1)';
    });
    
    uploadZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadZone.style.background = 'transparent';
    });
    
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadZone.style.background = 'transparent';
        handleFiles(e.dataTransfer.files);
    });
    
    // Solo activar selector de archivos si se hace clic en la zona principal, no en las previews
    uploadZone.addEventListener('click', (e) => {
        // Evitar que se abra el selector si se hace clic en elementos específicos
        const isPreviewArea = e.target.closest('#imagenesPreview');
        const isPreviewItem = e.target.closest('.imagen-preview-item');
        const isRemoveBtn = e.target.closest('.remove-btn');
        const isOrderBadge = e.target.closest('.order-badge');
        const isImage = e.target.tagName === 'IMG';
        
        // Solo abrir el selector si NO se está interactuando con elementos de preview
        if (!isPreviewArea && !isPreviewItem && !isRemoveBtn && !isOrderBadge && !isImage) {
            imagenesInput.click();
        }
    });
    
    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageData = {
                        src: e.target.result,
                        file: file,
                        id: Date.now() + Math.random()
                    };
                    imagenesArray.push(imageData);
                    renderImagePreview(imageData, imagenesArray.length - 1);
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    function renderImagePreview(imageData, index) {
        const item = document.createElement('div');
        item.className = 'imagen-preview-item';
        item.draggable = true;
        item.dataset.index = index;
        item.dataset.id = imageData.id;
        
        item.innerHTML = `
            <img src="${imageData.src}" alt="Preview" style="width: 80px; height: 80px; object-fit: cover; border-radius: 5px;">
            <button class="remove-btn" onclick="removeImage('${imageData.id}')" style="
                position: absolute;
                top: -5px;
                right: -5px;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 12px;
                cursor: pointer;
            ">×</button>
            <div class="order-badge" style="
                position: absolute;
                bottom: -5px;
                left: -5px;
                background: var(--secondary-color);
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 10px;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
            ">${index + 1}</div>
        `;
        
        // Estilo del contenedor
        item.style.cssText = `
            display: inline-block;
            margin: 5px;
            position: relative;
            background: white;
            border-radius: 8px;
            padding: 5px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            cursor: move;
            border: 2px solid transparent;
            transition: all 0.3s ease;
        `;
        
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', imageData.id);
            item.style.opacity = '0.5';
        });
        
        item.addEventListener('dragend', (e) => {
            item.style.opacity = '1';
        });
        
        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            item.style.borderColor = 'var(--primary-color)';
        });
        
        item.addEventListener('dragleave', (e) => {
            item.style.borderColor = 'transparent';
        });
        
        item.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            item.style.borderColor = 'transparent';
            
            const draggedId = e.dataTransfer.getData('text/plain');
            const targetId = imageData.id;
            
            if (draggedId !== targetId) {
                reorderImages(draggedId, targetId);
            }
        });
        
        previewContainer.appendChild(item);
    }
    
    window.removeImage = function(imageId) {
        imagenesArray = imagenesArray.filter(img => img.id !== imageId);
        rerenderPreviews();
    };
    
    function reorderImages(draggedId, targetId) {
        const draggedIndex = imagenesArray.findIndex(img => img.id === draggedId);
        const targetIndex = imagenesArray.findIndex(img => img.id === targetId);
        
        if (draggedIndex !== -1 && targetIndex !== -1) {
            const draggedItem = imagenesArray.splice(draggedIndex, 1)[0];
            imagenesArray.splice(targetIndex, 0, draggedItem);
            rerenderPreviews();
        }
    }
    
    function rerenderPreviews() {
        previewContainer.innerHTML = '';
        imagenesArray.forEach((imageData, index) => {
            renderImagePreview(imageData, index);
        });
    }
    
    // Función para obtener las imágenes ordenadas
    window.getOrderedImages = function() {
        return imagenesArray.map(img => img.src);
    };
}

// Función para exportar productos
function exportarProductos() {
    const todosLosProductos = {
        productos: productos,
        ligas: window.CONFIG ? window.CONFIG.ligas : {},
        fecha: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(todosLosProductos, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `camisetas-aj-productos-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Función para eliminar producto desde admin con confirmación visual
function eliminarProductoAdmin(id, categoria, elemento) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.')) {
        // Animación de eliminación
        elemento.style.animation = 'fadeOut 0.3s ease';
        
        setTimeout(() => {
            productos[categoria] = productos[categoria].filter(p => p.id !== id);
            
            // Guardar cambios en localStorage
            guardarDatos();
            
            // Recargar admin y productos
            cargarProductosAdmin();
            actualizarEstadisticasAdmin();
            cargarNovedades();
            
            if (categoriaActual === categoria) {
                cargarProductos(categoriaActual);
            }
        }, 300);
    }
}

// Función para aplicar configuración desde config.js
function aplicarConfiguracionApp() {
    if (!window.CONFIG) return;
    
    // Actualizar número de WhatsApp
    numeroWhatsApp = window.CONFIG.whatsapp.numero;
    
    // Actualizar precios por defecto SOLO en productos NO editados
    Object.keys(productos).forEach(categoria => {
        productos[categoria].forEach(producto => {
            // SOLO actualizar si el producto NO ha sido editado manualmente
            if (!producto.precio_personalizado && !producto.editado_manualmente) {
                producto.precio = window.CONFIG.productos.precios_default[categoria] || producto.precio;
            }
        });
    });
    
    // Recargar productos si ya están cargados
    if (categoriaActual) {
        cargarProductos(categoriaActual);
    }
}

// Función para abrir galería de fotos
function abrirGaleria(imagenes, nombreProducto) {
    // Crear modal de galería
    const modal = document.createElement('div');
    modal.className = 'galeria-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    `;
    
    let imagenActual = 0;
    
    const contenido = document.createElement('div');
    contenido.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        text-align: center;
        position: relative;
    `;
    
    contenido.innerHTML = `
        <div style="color: white; margin-bottom: 20px; font-size: 1.2rem; font-weight: 600;">
            ${nombreProducto} - ${imagenActual + 1}/${imagenes.length}
        </div>
        <img src="${imagenes[imagenActual]}" style="max-width: 100%; max-height: 70vh; object-fit: contain; border-radius: 10px;">
        <div style="margin-top: 20px;">
            ${imagenes.length > 1 ? `
                <button onclick="cambiarImagen(-1)" style="background: var(--primary-color); color: white; border: none; padding: 10px 20px; margin: 0 10px; border-radius: 5px; cursor: pointer;">‹ Anterior</button>
                <button onclick="cambiarImagen(1)" style="background: var(--primary-color); color: white; border: none; padding: 10px 20px; margin: 0 10px; border-radius: 5px; cursor: pointer;">Siguiente ›</button>
            ` : ''}
            <button onclick="cerrarGaleria()" style="background: var(--secondary-color); color: white; border: none; padding: 10px 20px; margin: 0 10px; border-radius: 5px; cursor: pointer;">Cerrar</button>
        </div>
    `;
    
    modal.appendChild(contenido);
    document.body.appendChild(modal);
    
    // Funciones para navegación
    window.cambiarImagen = function(direccion) {
        imagenActual += direccion;
        if (imagenActual < 0) imagenActual = imagenes.length - 1;
        if (imagenActual >= imagenes.length) imagenActual = 0;
        
        const img = modal.querySelector('img');
        const contador = modal.querySelector('div').firstElementChild;
        img.src = imagenes[imagenActual];
        contador.textContent = `${nombreProducto} - ${imagenActual + 1}/${imagenes.length}`;
    };
    
    window.cerrarGaleria = function() {
        document.body.removeChild(modal);
        delete window.cambiarImagen;
        delete window.cerrarGaleria;
    };
    
    // Cerrar al hacer clic fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            window.cerrarGaleria();
        }
    });
    
    // Navegación con teclado
    const handleKeyboard = (e) => {
        if (e.key === 'Escape') window.cerrarGaleria();
        if (e.key === 'ArrowLeft') window.cambiarImagen(-1);
        if (e.key === 'ArrowRight') window.cambiarImagen(1);
    };
    
    document.addEventListener('keydown', handleKeyboard);
    
    // Limpiar event listener al cerrar
    const originalCerrar = window.cerrarGaleria;
    window.cerrarGaleria = function() {
        document.removeEventListener('keydown', handleKeyboard);
        originalCerrar();
    };
}