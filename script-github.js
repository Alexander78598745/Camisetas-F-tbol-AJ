let productos = [];
let categorias = [];
let currentProductId = 1;
let editingProductId = null;
let imagenesArray = [];

// Función para cargar datos iniciales (GitHub Pages compatible)
async function cargarDatosIniciales() {
    try {
        // Intentar cargar desde localStorage primero
        const productosGuardados = localStorage.getItem('productos');
        const categoriasGuardadas = localStorage.getItem('categorias');
        
        if (productosGuardados && categoriasGuardadas) {
            productos = JSON.parse(productosGuardados);
            categorias = JSON.parse(categoriasGuardadas);
        } else {
            // Si no hay datos locales, cargar desde archivo JSON
            const response = await fetch('productos-data.json');
            if (response.ok) {
                const data = await response.json();
                productos = data.productos;
                categorias = data.categorias;
                // Guardar en localStorage para futuras visitas
                localStorage.setItem('productos', JSON.stringify(productos));
                localStorage.setItem('categorias', JSON.stringify(categorias));
            } else {
                // Datos de respaldo si no se puede cargar el JSON
                productos = [];
                categorias = ['Equipos', 'Selecciones', 'Retro', 'Personalizada'];
            }
        }
        
        // Calcular el próximo ID
        if (productos.length > 0) {
            currentProductId = Math.max(...productos.map(p => p.id)) + 1;
        }
        
        mostrarProductos();
        cargarCategorias();
        cargarEquiposPersonalizacion();
        aplicarConfiguracionApp();
        
    } catch (error) {
        console.error('Error cargando datos:', error);
        // Usar datos de respaldo
        productos = [];
        categorias = ['Equipos', 'Selecciones', 'Retro', 'Personalizada'];
        mostrarProductos();
        cargarCategorias();
    }
}

function guardarDatos() {
    localStorage.setItem('productos', JSON.stringify(productos));
    localStorage.setItem('categorias', JSON.stringify(categorias));
}

function mostrarProductos() {
    const contenedor = document.getElementById('productos-container');
    if (!contenedor) return;
    
    contenedor.innerHTML = '';
    
    if (productos.length === 0) {
        contenedor.innerHTML = '<p class="text-center text-muted">No hay productos disponibles.</p>';
        return;
    }
    
    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'col-md-4 mb-4';
        
        // Usar la primera imagen o una imagen por defecto
        const imagenPrincipal = producto.imagenes && producto.imagenes.length > 0 
            ? producto.imagenes[0] 
            : 'images/default-product.jpg';
        
        productoDiv.innerHTML = `
            <div class="card h-100 producto-card">
                <div class="position-relative">
                    <img src="${imagenPrincipal}" class="card-img-top" alt="${producto.nombre}" 
                         style="height: 200px; object-fit: cover;" 
                         onerror="this.src='images/default-product.jpg'">
                    <span class="badge bg-primary position-absolute top-0 end-0 m-2">${producto.categoria}</span>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text flex-grow-1">${producto.descripcion || 'Sin descripción'}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 mb-0 text-primary">${producto.precio}€</span>
                        <div class="btn-group" role="group">
                            <button class="btn btn-outline-primary btn-sm" onclick="editarProducto(${producto.id})">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button class="btn btn-outline-danger btn-sm" onclick="eliminarProducto(${producto.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        contenedor.appendChild(productoDiv);
    });
}

function cargarCategorias() {
    const select = document.getElementById('categoria-producto');
    if (!select) return;
    
    select.innerHTML = '';
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        select.appendChild(option);
    });
}

function cargarEquiposPersonalizacion() {
    const select = document.getElementById('equipo-personalizado');
    if (!select) return;
    
    select.innerHTML = '<option value="">Selecciona un equipo</option>';
    
    const equiposUnicos = [...new Set(productos.map(p => p.nombre))];
    equiposUnicos.forEach(equipo => {
        const option = document.createElement('option');
        option.value = equipo;
        option.textContent = equipo;
        select.appendChild(option);
    });
}

function aplicarConfiguracionApp() {
    productos.forEach(producto => {
        if (!producto.precio_personalizado) {
            producto.precio = 45;
        }
    });
    guardarDatos();
}

function mostrarFormularioNuevaCategoria() {
    document.getElementById('form-nueva-categoria').style.display = 'block';
}

function guardarNuevaCategoria() {
    const nombreCategoria = document.getElementById('nombre-nueva-categoria').value.trim();
    
    if (!nombreCategoria) {
        alert('Por favor, ingrese un nombre para la categoría');
        return;
    }
    
    if (categorias.includes(nombreCategoria)) {
        alert('Esta categoría ya existe');
        return;
    }
    
    categorias.push(nombreCategoria);
    guardarDatos();
    cargarCategorias();
    
    // Limpiar formulario y ocultarlo
    document.getElementById('nombre-nueva-categoria').value = '';
    document.getElementById('form-nueva-categoria').style.display = 'none';
    
    // Seleccionar la nueva categoría
    document.getElementById('categoria-producto').value = nombreCategoria;
    
    alert('Categoría creada exitosamente');
}

function subirProducto() {
    const nombre = document.getElementById('nombre-producto').value.trim();
    const precio = parseFloat(document.getElementById('precio-producto').value);
    const categoria = document.getElementById('categoria-producto').value;
    const descripcion = document.getElementById('descripcion-producto').value.trim();
    
    if (!nombre || !precio || !categoria) {
        alert('Por favor, complete todos los campos obligatorios');
        return;
    }
    
    if (imagenesArray.length === 0) {
        alert('Por favor, agregue al menos una imagen');
        return;
    }
    
    const nuevoProducto = {
        id: currentProductId++,
        nombre: nombre,
        precio: precio,
        categoria: categoria,
        descripcion: descripcion,
        imagenes: [...imagenesArray],
        precio_personalizado: true
    };
    
    productos.push(nuevoProducto);
    guardarDatos();
    mostrarProductos();
    cargarEquiposPersonalizacion();
    
    // Limpiar formulario
    document.getElementById('form-subir-producto').reset();
    imagenesArray = [];
    document.getElementById('preview-imagenes').innerHTML = '';
    
    // Cerrar modal y mostrar éxito
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalSubirProducto'));
    modal.hide();
    
    // Mostrar modal con JSON para actualizar archivo
    mostrarModalActualizarJSON();
}

function editarProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    
    editingProductId = id;
    
    document.getElementById('edit-nombre-producto').value = producto.nombre;
    document.getElementById('edit-precio-producto').value = producto.precio;
    document.getElementById('edit-categoria-producto').value = producto.categoria;
    document.getElementById('edit-descripcion-producto').value = producto.descripcion || '';
    
    // Mostrar imágenes actuales
    const previewContainer = document.getElementById('edit-preview-imagenes');
    previewContainer.innerHTML = '';
    
    if (producto.imagenes && producto.imagenes.length > 0) {
        producto.imagenes.forEach((imagen, index) => {
            const imgDiv = document.createElement('div');
            imgDiv.className = 'col-md-3 mb-2 position-relative';
            imgDiv.innerHTML = `
                <img src="${imagen}" class="img-fluid rounded" 
                     style="height: 100px; object-fit: cover; width: 100%;"
                     onerror="this.src='images/default-product.jpg'">
                <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0" 
                        onclick="eliminarImagenEdicion(${index})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            previewContainer.appendChild(imgDiv);
        });
    }
    
    const modal = new bootstrap.Modal(document.getElementById('modalEditarProducto'));
    modal.show();
}

function guardarCambiosProducto() {
    const producto = productos.find(p => p.id === editingProductId);
    if (!producto) return;
    
    const nombre = document.getElementById('edit-nombre-producto').value.trim();
    const precio = parseFloat(document.getElementById('edit-precio-producto').value);
    const categoria = document.getElementById('edit-categoria-producto').value;
    const descripcion = document.getElementById('edit-descripcion-producto').value.trim();
    
    if (!nombre || !precio || !categoria) {
        alert('Por favor, complete todos los campos obligatorios');
        return;
    }
    
    producto.nombre = nombre;
    producto.precio = precio;
    producto.categoria = categoria;
    producto.descripcion = descripcion;
    producto.precio_personalizado = true; // Marcar como precio personalizado
    
    guardarDatos();
    mostrarProductos();
    cargarEquiposPersonalizacion();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditarProducto'));
    modal.hide();
    
    editingProductId = null;
    
    // Mostrar modal con JSON actualizado
    mostrarModalActualizarJSON();
}

function eliminarProducto(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        productos = productos.filter(p => p.id !== id);
        guardarDatos();
        mostrarProductos();
        cargarEquiposPersonalizacion();
    }
}

function eliminarImagenEdicion(index) {
    const producto = productos.find(p => p.id === editingProductId);
    if (producto && producto.imagenes) {
        producto.imagenes.splice(index, 1);
        editarProducto(editingProductId); // Recargar el modal
    }
}

function solicitarPersonalizada() {
    const nombre = document.getElementById('nombre-personalizada').value.trim();
    const numero = document.getElementById('numero-personalizada').value.trim();
    const talla = document.getElementById('talla-personalizada').value;
    const equipo = document.getElementById('equipo-personalizado').value;
    
    if (!nombre || !numero || !talla) {
        alert('Por favor, complete todos los campos');
        return;
    }
    
    let mensaje = `Hola, quiero solicitar una camiseta personalizada:\n\n`;
    mensaje += `👤 Nombre: ${nombre}\n`;
    mensaje += `🔢 Número: ${numero}\n`;
    mensaje += `📏 Talla: ${talla}\n`;
    if (equipo) {
        mensaje += `⚽ Equipo: ${equipo}\n`;
    }
    mensaje += `\n¿Podrían proporcionarme más información sobre precios y disponibilidad?`;
    
    const numeroWhatsApp = '1234567890'; // Cambiar por el número real
    const enlace = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    
    window.open(enlace, '_blank');
}

// Funciones para manejo de imágenes
function setupImageUpload() {
    const dropZone = document.getElementById('drop-zone');
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
    const preview = document.getElementById('preview-imagenes');
    if (!preview) return;
    
    preview.innerHTML = '';
    
    imagenesArray.forEach((imagen, index) => {
        const div = document.createElement('div');
        div.className = 'col-md-3 mb-2 position-relative';
        div.innerHTML = `
            <img src="${imagen}" class="img-fluid rounded" style="height: 100px; object-fit: cover; width: 100%;">
            <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0" onclick="eliminarImagen(${index})">
                <i class="fas fa-times"></i>
            </button>
            <div class="position-absolute bottom-0 start-0 m-1">
                <button type="button" class="btn btn-light btn-sm" onclick="moverImagen(${index}, -1)" ${index === 0 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-left"></i>
                </button>
                <button type="button" class="btn btn-light btn-sm" onclick="moverImagen(${index}, 1)" ${index === imagenesArray.length - 1 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-right"></i>
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

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    cargarDatosIniciales();
    setupImageUpload();
    
    // Event listeners para los formularios
    const formSubir = document.getElementById('form-subir-producto');
    if (formSubir) {
        formSubir.addEventListener('submit', function(e) {
            e.preventDefault();
            subirProducto();
        });
    }
    
    const formEditar = document.getElementById('form-editar-producto');
    if (formEditar) {
        formEditar.addEventListener('submit', function(e) {
            e.preventDefault();
            guardarCambiosProducto();
        });
    }
    
    const formPersonalizada = document.getElementById('form-personalizada');
    if (formPersonalizada) {
        formPersonalizada.addEventListener('submit', function(e) {
            e.preventDefault();
            solicitarPersonalizada();
        });
    }
    
    const formCategoria = document.getElementById('form-nueva-categoria');
    if (formCategoria) {
        formCategoria.addEventListener('submit', function(e) {
            e.preventDefault();
            guardarNuevaCategoria();
        });
    }
});

// Función para mostrar el modal con JSON actualizado
function mostrarModalActualizarJSON() {
    const jsonData = {
        productos: productos,
        categorias: categorias
    };
    
    const jsonString = JSON.stringify(jsonData, null, 2);
    document.getElementById('json-content').textContent = jsonString;
    
    const modal = new bootstrap.Modal(document.getElementById('modalActualizarJSON'));
    modal.show();
}

// Función para copiar JSON al portapapeles
function copiarJSON() {
    const jsonContent = document.getElementById('json-content').textContent;
    navigator.clipboard.writeText(jsonContent).then(function() {
        // Cambiar temporalmente el texto del botón
        const boton = document.getElementById('btn-copiar-json');
        const textoOriginal = boton.innerHTML;
        boton.innerHTML = '<i class="fas fa-check me-2"></i>¡Copiado!';
        boton.classList.remove('btn-primary');
        boton.classList.add('btn-success');
        
        setTimeout(function() {
            boton.innerHTML = textoOriginal;
            boton.classList.remove('btn-success');
            boton.classList.add('btn-primary');
        }, 2000);
    }).catch(function(err) {
        alert('Error al copiar: ' + err);
    });
}

// Función para exportar todos los datos (botón adicional en admin)
function exportarTodosLosDatos() {
    mostrarModalActualizarJSON();
}