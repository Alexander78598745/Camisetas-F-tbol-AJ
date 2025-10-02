# Tienda de Camisetas - GitHub Pages

## Instrucciones para GitHub Pages

### Problema Solucionado
Esta versión está adaptada para funcionar correctamente en GitHub Pages, solucionando:
- **Imágenes**: Ahora usa archivos estáticos en lugar de localStorage
- **Productos**: Carga datos iniciales desde `productos-data.json`
- **Persistencia**: Los cambios se guardan en localStorage del dominio de GitHub Pages

### Archivos Principales

1. **`index.html`** - Página principal (usar el mismo que tenías)
2. **`script-github.js`** - JavaScript adaptado para GitHub Pages 
3. **`productos-data.json`** - Datos iniciales de productos
4. **`images/`** - Carpeta para imágenes estáticas

### Pasos para Subir a GitHub Pages

1. **Preparar las imágenes**:
   - Crea una carpeta `images` en tu repositorio
   - Sube las imágenes de los productos con nombres descriptivos:
     ```
     images/
     ├── real-madrid-1.jpg
     ├── real-madrid-2.jpg
     ├── barcelona-1.jpg
     ├── barcelona-2.jpg
     ├── espana-1.jpg
     ├── espana-2.jpg
     └── default-product.jpg
     ```

2. **Actualizar el index.html**:
   - Cambia la referencia del script:
   ```html
   <script src="script-github.js"></script>
   ```

3. **Subir archivos**:
   - `index.html`
   - `script-github.js`
   - `productos-data.json`
   - Carpeta `images/` con todas las imágenes

4. **Configurar GitHub Pages**:
   - Ve a Settings > Pages en tu repositorio
   - Selecciona "Deploy from a branch"
   - Elige "main" branch y "/ (root)"

### Ventajas de esta Versión
- ✅ **Funciona en GitHub Pages**: Imágenes y datos visibles desde el primer acceso
- ✅ **Datos iniciales**: Productos predefinidos se cargan automáticamente
- ✅ **Persistencia local**: Los cambios se siguen guardando en localStorage
- ✅ **Compatibilidad**: Mantiene toda la funcionalidad de admin

### Notas Importantes

- Los productos que agregues desde la interfaz de admin se guardan solo en el navegador del usuario
- Las imágenes subidas dinámicamente no serán visibles para otros usuarios
- Para que nuevos productos sean visibles para todos, deben agregarse al `productos-data.json`

### Estructura de Archivos
```
tu-repositorio/
├── index.html
├── script-github.js
├── productos-data.json
├── images/
│   ├── real-madrid-1.jpg
│   ├── barcelona-1.jpg
│   └── default-product.jpg
└── README.md
```