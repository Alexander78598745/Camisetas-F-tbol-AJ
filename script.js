// Estado global de la aplicación
let productos = {
    camisetas: [],
    chandales: [],
    ninos: []
};

let categoriaActual = 'camisetas';
let adminMode = false;
let proximoId = 1;

// Número de WhatsApp (se actualiza desde config.js)
let numeroWhatsApp = '34643461840';

// Estado de autenticación
let adminAutenticado = false;

// Función para cargar datos iniciales (GitHub Pages compatible)
async function cargarDatosIniciales() {
    try {
        // Intentar cargar desde localStorage primero
        const productosGuardados = localStorage.getItem('productos');
        const proximoIdGuardado = localStorage.getItem('proximoId');
        
        if (productosGuardados && proximoIdGuardado) {
            productos = JSON.parse(productosGuardados);
            proximoId = parseInt(proximoIdGuardado);
        } else {
            // Si no hay datos locales, cargar desde archivo JSON
            const response = await fetch('productos-data.json');
            if (response.ok) {
                const data = await response.json();
                productos = data.productos;
                proximoId = data.proximoId || 1;
                // Guardar en localStorage para futuras visitas
                localStorage.setItem('productos', JSON.stringify(productos));
                localStorage.setItem('proximoId', proximoId.toString());
            } else {
                // Datos de respaldo si no se puede cargar el JSON
                productos = {
                    camisetas: [
                        {
                            id: 1,
                            nombre: 'FC Barcelona',
                            precio: 45,
                            liga: 'laliga1',
                            imagen: 'images/barcelona-1.jpg',
                            imagenes: ['images/barcelona-1.jpg', 'images/barcelona-2.jpg'],
                            categoria: 'camisetas',
                            fechaCreacion: new Date('2025-01-01'),
                            precio_personalizado: false
                        },
                        {
                            id: 2,
                            nombre: 'Real Madrid',
                            precio: 45,
                            liga: 'laliga1',
                            imagen: 'images/real-madrid-1.jpg',
                            imagenes: ['images/real-madrid-1.jpg', 'images/real-madrid-2.jpg'],
                            categoria: 'camisetas',
                            fechaCreacion: new Date('2025-01-02'),
                            precio_personalizado: false
                        },
                        {
                            id: 3,
                            nombre: 'Selección Española',
                            precio: 45,
                            liga: 'selecciones',
                            imagen: 'images/espana-1.jpg',
                            imagenes: ['images/espana-1.jpg', 'images/espana-2.jpg'],
                            categoria: 'camisetas',
                            fechaCreacion: new Date('2025-01-03'),
                            precio_personalizado: false
                        }
                    ],
                    chandales: [],
                    ninos: []
                };
                proximoId = 4;
            }
        }
        
        aplicarConfiguracionApp();
        
    } catch (error) {
        console.error('Error cargando datos:', error);
        // Usar datos de respaldo
        productos = {
            camisetas: [],
            chandales: [],
            ninos: []
        };
        proximoId = 1;
    }
}

function guardarDatos() {
    localStorage.setItem('productos', JSON.stringify(productos));
    localStorage.setItem('proximoId', proximoId.toString());
}

function aplicarConfiguracionApp() {
    // Aplicar configuración global manteniendo precios personalizados
    Object.keys(productos).forEach(categoria => {
        productos[categoria].forEach(producto => {
            if (!producto.precio_personalizado) {
                producto.precio = 45; // Precio por defecto
            }
        });
    });
    guardarDatos();
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    cargarDatosIniciales().then(() => {
        initializeApp();
    });
});

function initializeApp() {
    // Configurar navegación móvil
    setupMobileNav();
    
    // Configurar navegación suave
    setupSmoothScroll();
    
    // Configurar tabs de productos
    setupProductTabs();
    
    // Cargar productos iniciales
    cargarProductos(categoriaActual);
    
    // Configurar formularios
    setupForms();
    
    // Configurar modal de admin
    setupAdminModal();
    
    // Inicializar contadores y configuraciones
    actualizarContadores();
    
    // Configurar eventos de upload de imágenes
    setupImageUpload();
}

function setupMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
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

function setupProductTabs() {
    const tabs = document.querySelectorAll('.product-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remover active de todos los tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Agregar active al tab clickeado
            tab.classList.add('active');
            
            // Obtener categoría
            categoriaActual = tab.dataset.categoria;
            
            // Cargar productos de la categoría
            cargarProductos(categoriaActual);
        });
    });
}

function cargarProductos(categoria) {
    const container = document.getElementById('productos-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    const productosCategoria = productos[categoria] || [];
    
    if (productosCategoria.length === 0) {
        container.innerHTML = `
            <div class=\"no-products\">
                <i class=\"fas fa-tshirt\"></i>
                <p>No hay productos en esta categoría</p>
                ${adminMode ? '<button class=\"btn-primary\" onclick=\"mostrarModalSubirProducto()\">Agregar Producto</button>' : ''}
            </div>
        `;
        return;
    }
    
    productosCategoria.forEach(producto => {
        const productoHTML = crearElementoProducto(producto);
        container.appendChild(productoHTML);
    });
}

function crearElementoProducto(producto) {
    const div = document.createElement('div');
    div.className = 'product-card';
    
    // Usar la primera imagen o imagen por defecto
    const imagenPrincipal = producto.imagenes && producto.imagenes.length > 0 
        ? producto.imagenes[0] 
        : (producto.imagen || 'images/default-product.jpg');
    
    div.innerHTML = `
        <div class=\"product-image\">
            <img src=\"${imagenPrincipal}\" alt=\"${producto.nombre}\" 
                 onerror=\"this.src='images/default-product.jpg'\">
        </div>
        <div class=\"product-info\">
            <h3 class=\"product-name\">${producto.nombre}</h3>
            <p class=\"product-price\">${producto.precio}€</p>
            <div class=\"product-actions\">
                <button class=\"btn-whatsapp\" onclick=\"solicitarPorWhatsApp('${producto.nombre}', ${producto.precio})\">
                    <i class=\"fab fa-whatsapp\"></i> Solicitar
                </button>
                ${adminMode ? `
                    <button class=\"btn-edit\" onclick=\"editarProducto(${producto.id}, '${producto.categoria}')\">
                        <i class=\"fas fa-edit\"></i>
                    </button>
                    <button class=\"btn-delete\" onclick=\"eliminarProducto(${producto.id}, '${producto.categoria}')\">
                        <i class=\"fas fa-trash\"></i>
                    </button>
                ` : ''}
            </div>
        </div>
    `;
    
    return div;
}

function solicitarPorWhatsApp(nombreProducto, precio) {
    const mensaje = `Hola! Me interesa el producto: ${nombreProducto} - ${precio}€. ¿Podrían darme más información?`;
    const enlace = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(enlace, '_blank');
}

function setupForms() {
    // Formulario de personalización
    const formPersonalizada = document.getElementById('form-personalizacion');
    if (formPersonalizada) {
        formPersonalizada.addEventListener('submit', function(e) {
            e.preventDefault();
            procesarSolicitudPersonalizada();
        });
    }
}

function procesarSolicitudPersonalizada() {
    const nombre = document.getElementById('nombre-personalizada').value.trim();
    const numero = document.getElementById('numero-personalizada').value.trim();
    const equipo = document.getElementById('equipo-personalizada').value.trim();
    const talla = document.getElementById('talla-personalizada').value;
    
    if (!nombre || !numero || !equipo || !talla) {
        alert('Por favor, complete todos los campos');
        return;
    }
    
    const mensaje = `Hola! Quiero personalizar una camiseta:\\n\\n` +
                   `👤 Nombre: ${nombre}\\n` +
                   `🔢 Número: ${numero}\\n` +
                   `⚽ Equipo: ${equipo}\\n` +
                   `📏 Talla: ${talla}\\n\\n` +
                   `¿Podrían decirme el precio y disponibilidad?`;
    
    const enlace = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(enlace, '_blank');
    
    // Limpiar formulario
    document.getElementById('form-personalizacion').reset();
}

function setupAdminModal() {
    const adminLink = document.querySelector('.admin-link');
    if (adminLink) {
        adminLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (!adminAutenticado) {
                mostrarModalAutenticacion();
            } else {
                toggleAdminMode();
            }
        });
    }
}

function mostrarModalAutenticacion() {
    const password = prompt('Introduce la contraseña de administrador:');
    if (password === 'admin123') { // Cambia esta contraseña
        adminAutenticado = true;
        toggleAdminMode();
    } else if (password !== null) {
        alert('Contraseña incorrecta');
    }
}

function toggleAdminMode() {
    adminMode = !adminMode;
    const adminLink = document.querySelector('.admin-link');
    
    if (adminMode) {
        adminLink.textContent = '🔐 Salir Admin';
        adminLink.style.background = '#ff4444';
        mostrarControlesAdmin();
    } else {
        adminLink.textContent = 'Admin';
        adminLink.style.background = '';
        ocultarControlesAdmin();
    }
    
    // Recargar productos para mostrar/ocultar botones de edición
    cargarProductos(categoriaActual);
}

function mostrarControlesAdmin() {
    // Crear panel de admin si no existe
    let adminPanel = document.getElementById('admin-panel');
    if (!adminPanel) {
        adminPanel = document.createElement('div');
        adminPanel.id = 'admin-panel';
        adminPanel.className = 'admin-panel';
        adminPanel.innerHTML = `
            <div class=\"admin-controls\">
                <h3>Panel de Administración</h3>
                <div class=\"admin-buttons\">
                    <button class=\"btn-primary\" onclick=\"mostrarModalSubirProducto()\">
                        <i class=\"fas fa-plus\"></i> Subir Producto
                    </button>
                    <button class=\"btn-success\" onclick=\"exportarDatosGitHub()\">
                        <i class=\"fas fa-download\"></i> Exportar para GitHub
                    </button>
                </div>
            </div>
        `;
        
        const productosSection = document.getElementById('productos');
        if (productosSection) {
            productosSection.insertBefore(adminPanel, productosSection.firstChild);
        }
    }
    adminPanel.style.display = 'block';
}

function ocultarControlesAdmin() {
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel) {
        adminPanel.style.display = 'none';
    }
}

function mostrarModalSubirProducto() {
    // Crear modal si no existe
    let modal = document.getElementById('modal-subir-producto');
    if (!modal) {
        modal = crearModalSubirProducto();
        document.body.appendChild(modal);
    }
    
    modal.style.display = 'flex';
    setupImageUpload();
}

function crearModalSubirProducto() {
    const modal = document.createElement('div');
    modal.id = 'modal-subir-producto';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class=\"modal-content\">
            <div class=\"modal-header\">
                <h3>Subir Nuevo Producto</h3>
                <span class=\"close\" onclick=\"cerrarModal('modal-subir-producto')\">&times;</span>
            </div>
            <form id=\"form-subir-producto\">
                <div class=\"form-group\">
                    <label for=\"nombre-producto\">Nombre del Producto:</label>
                    <input type=\"text\" id=\"nombre-producto\" required>
                </div>
                
                <div class=\"form-group\">
                    <label for=\"categoria-producto\">Categoría:</label>
                    <select id=\"categoria-producto\" required>
                        <option value=\"camisetas\">Camisetas</option>
                        <option value=\"chandales\">Chandales</option>
                        <option value=\"ninos\">Niños</option>
                    </select>
                </div>
                
                <div class=\"form-group\">
                    <label for=\"precio-producto\">Precio (€):</label>
                    <input type=\"number\" id=\"precio-producto\" step=\"0.01\" required>
                </div>
                
                <div class=\"form-group\">
                    <label for=\"liga-producto\">Liga:</label>
                    <select id=\"liga-producto\">
                        <option value=\"laliga1\">La Liga</option>
                        <option value=\"premier\">Premier League</option>
                        <option value=\"serie-a\">Serie A</option>
                        <option value=\"bundesliga\">Bundesliga</option>
                        <option value=\"ligue1\">Ligue 1</option>
                        <option value=\"selecciones\">Selecciones</option>
                    </select>
                </div>
                
                <div class=\"form-group\">
                    <label>Imágenes del Producto:</label>
                    <div id=\"drop-zone-admin\" class=\"drop-zone\">
                        <i class=\"fas fa-cloud-upload-alt\"></i>
                        <p>Arrastra imágenes aquí o haz clic para seleccionar</p>
                    </div>
                    <input type=\"file\" id=\"imagenes-producto\" multiple accept=\"image/*\" style=\"display: none;\">
                    <div id=\"preview-imagenes-admin\" class=\"preview-container\"></div>
                </div>
                
                <div class=\"form-actions\">
                    <button type=\"button\" onclick=\"cerrarModal('modal-subir-producto')\">Cancelar</button>
                    <button type=\"submit\">Guardar Producto</button>
                </div>
            </form>
        </div>
    `;
    
    // Configurar eventos del formulario
    const form = modal.querySelector('#form-subir-producto');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        guardarNuevoProducto();
    });
    
    return modal;
}

let imagenesArray = [];

function setupImageUpload() {
    const dropZone = document.getElementById('drop-zone-admin');
    const fileInput = document.getElementById('imagenes-producto');
    
    if (!dropZone || !fileInput) return;
    
    dropZone.addEventListener('click', () => fileInput.click());
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        procesarImagenes(files);
    });
    
    fileInput.addEventListener('change', (e) => {
        procesarImagenes(e.target.files);
    });
}

function procesarImagenes(files) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagenesArray.push(e.target.result);
                mostrarPreviewImagenes();
            };
            reader.readAsDataURL(file);
        }
    });
}

function mostrarPreviewImagenes() {
    const preview = document.getElementById('preview-imagenes-admin');
    if (!preview) return;
    
    preview.innerHTML = '';
    
    imagenesArray.forEach((imagen, index) => {
        const div = document.createElement('div');
        div.className = 'preview-item';
        div.innerHTML = `
            <img src=\"${imagen}\" alt=\"Preview ${index + 1}\">
            <button type=\"button\" onclick=\"eliminarImagen(${index})\" class=\"btn-remove\">
                <i class=\"fas fa-times\"></i>
            </button>
            <div class=\"image-controls\">
                <button type=\"button\" onclick=\"moverImagen(${index}, -1)\" ${index === 0 ? 'disabled' : ''}>
                    <i class=\"fas fa-arrow-left\"></i>
                </button>
                <button type=\"button\" onclick=\"moverImagen(${index}, 1)\" ${index === imagenesArray.length - 1 ? 'disabled' : ''}>
                    <i class=\"fas fa-arrow-right\"></i>
                </button>
            </div>
        `;
        preview.appendChild(div);
    });
}

function eliminarImagen(index) {
    imagenesArray.splice(index, 1);
    mostrarPreviewImagenes();
}

function moverImagen(index, direccion) {
    const newIndex = index + direccion;
    if (newIndex >= 0 && newIndex < imagenesArray.length) {
        [imagenesArray[index], imagenesArray[newIndex]] = [imagenesArray[newIndex], imagenesArray[index]];
        mostrarPreviewImagenes();
    }
}

function guardarNuevoProducto() {
    const nombre = document.getElementById('nombre-producto').value.trim();
    const categoria = document.getElementById('categoria-producto').value;
    const precio = parseFloat(document.getElementById('precio-producto').value);
    const liga = document.getElementById('liga-producto').value;
    
    if (!nombre || !categoria || !precio || imagenesArray.length === 0) {
        alert('Por favor, complete todos los campos y agregue al menos una imagen');
        return;
    }
    
    const nuevoProducto = {
        id: proximoId++,
        nombre: nombre,
        precio: precio,
        liga: liga,
        imagen: imagenesArray[0], // Primera imagen como principal
        imagenes: [...imagenesArray],
        categoria: categoria,
        fechaCreacion: new Date().toISOString(),
        precio_personalizado: true
    };
    
    if (!productos[categoria]) {
        productos[categoria] = [];
    }
    
    productos[categoria].push(nuevoProducto);
    guardarDatos();
    
    // Limpiar formulario
    document.getElementById('form-subir-producto').reset();
    imagenesArray = [];
    document.getElementById('preview-imagenes-admin').innerHTML = '';
    
    // Cerrar modal
    cerrarModal('modal-subir-producto');
    
    // Recargar productos si estamos en la categoría actual
    if (categoriaActual === categoria) {
        cargarProductos(categoriaActual);
    }
    
    // Mostrar modal de exportación
    mostrarModalExportarGitHub();
}

function editarProducto(id, categoria) {
    const producto = productos[categoria].find(p => p.id === id);
    if (!producto) return;
    
    // Rellenar formulario con datos del producto
    document.getElementById('nombre-producto').value = producto.nombre;
    document.getElementById('categoria-producto').value = categoria;
    document.getElementById('precio-producto').value = producto.precio;
    document.getElementById('liga-producto').value = producto.liga || 'laliga1';
    
    // Cargar imágenes existentes
    imagenesArray = [...(producto.imagenes || [])];
    mostrarPreviewImagenes();
    
    // Mostrar modal
    mostrarModalSubirProducto();
    
    // Cambiar el comportamiento del formulario para editar
    const form = document.getElementById('form-subir-producto');
    form.onsubmit = function(e) {
        e.preventDefault();
        actualizarProducto(id, categoria);
    };
}

function actualizarProducto(id, categoria) {
    const nombre = document.getElementById('nombre-producto').value.trim();
    const nuevaCategoria = document.getElementById('categoria-producto').value;
    const precio = parseFloat(document.getElementById('precio-producto').value);
    const liga = document.getElementById('liga-producto').value;
    
    if (!nombre || !nuevaCategoria || !precio) {
        alert('Por favor, complete todos los campos obligatorios');
        return;
    }
    
    // Encontrar y actualizar producto
    const productoIndex = productos[categoria].findIndex(p => p.id === id);
    if (productoIndex === -1) return;
    
    const producto = productos[categoria][productoIndex];
    
    // Actualizar datos
    producto.nombre = nombre;
    producto.precio = precio;
    producto.liga = liga;
    producto.precio_personalizado = true;
    
    if (imagenesArray.length > 0) {
        producto.imagen = imagenesArray[0];
        producto.imagenes = [...imagenesArray];
    }
    
    // Si cambió de categoría, mover el producto
    if (categoria !== nuevaCategoria) {
        productos[categoria].splice(productoIndex, 1);
        if (!productos[nuevaCategoria]) {
            productos[nuevaCategoria] = [];
        }
        producto.categoria = nuevaCategoria;
        productos[nuevaCategoria].push(producto);
    }
    
    guardarDatos();
    
    // Limpiar y cerrar
    document.getElementById('form-subir-producto').reset();
    imagenesArray = [];
    document.getElementById('preview-imagenes-admin').innerHTML = '';
    cerrarModal('modal-subir-producto');
    
    // Recargar productos
    cargarProductos(categoriaActual);
    
    // Mostrar modal de exportación
    mostrarModalExportarGitHub();
}

function eliminarProducto(id, categoria) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        productos[categoria] = productos[categoria].filter(p => p.id !== id);
        guardarDatos();
        cargarProductos(categoriaActual);
    }
}

function exportarDatosGitHub() {
    mostrarModalExportarGitHub();
}

function mostrarModalExportarGitHub() {
    let modal = document.getElementById('modal-exportar-github');
    if (!modal) {
        modal = crearModalExportarGitHub();
        document.body.appendChild(modal);
    }
    
    // Generar JSON actualizado
    const datosExportar = {
        productos: productos,
        proximoId: proximoId
    };
    
    const jsonString = JSON.stringify(datosExportar, null, 2);
    document.getElementById('json-exportar').textContent = jsonString;
    
    modal.style.display = 'flex';
}

function crearModalExportarGitHub() {
    const modal = document.createElement('div');
    modal.id = 'modal-exportar-github';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class=\"modal-content modal-large\">
            <div class=\"modal-header\">
                <h3><i class=\"fab fa-github\"></i> Exportar para GitHub Pages</h3>
                <span class=\"close\" onclick=\"cerrarModal('modal-exportar-github')\">&times;</span>
            </div>
            <div class=\"modal-body\">
                <div class=\"export-instructions\">
                    <h4>Para que todos vean tus cambios:</h4>
                    <ol>
                        <li>Copia el código JSON de abajo</li>
                        <li>Ve a tu repositorio de GitHub</li>
                        <li>Edita el archivo <code>productos-data.json</code></li>
                        <li>Reemplaza todo el contenido con el código copiado</li>
                        <li>Haz commit de los cambios</li>
                    </ol>
                </div>
                
                <div class=\"json-container\">
                    <div class=\"json-header\">
                        <label>Código JSON actualizado:</label>
                        <button type=\"button\" onclick=\"copiarJSON()\" class=\"btn-copy\">
                            <i class=\"fas fa-copy\"></i> Copiar JSON
                        </button>
                    </div>
                    <pre id=\"json-exportar\" class=\"json-content\"></pre>
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

function copiarJSON() {
    const jsonContent = document.getElementById('json-exportar').textContent;
    navigator.clipboard.writeText(jsonContent).then(function() {
        const btn = document.querySelector('.btn-copy');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class=\"fas fa-check\"></i> ¡Copiado!';
        btn.style.background = '#28a745';
        
        setTimeout(function() {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(function(err) {
        alert('Error al copiar: ' + err);
    });
}

function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

function actualizarContadores() {
    // Actualizar contadores de productos en la navegación
    const contadores = document.querySelectorAll('.product-count');
    contadores.forEach(contador => {
        const categoria = contador.dataset.categoria;
        const count = productos[categoria] ? productos[categoria].length : 0;
        contador.textContent = count;
    });
}