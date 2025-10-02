# 🚀 Cómo Subir tu Tienda a GitHub Pages

## ❌ Problema Identificado
Cuando subes la página a GitHub Pages:
- **No salen las imágenes**: Están guardadas en localStorage como datos base64
- **No salen los productos**: Los datos están en localStorage local, no en el servidor

## ✅ Solución Completa

### 📁 Archivos que Necesitas

1. **`index.html`** - Copia el contenido de `index-github-pages.html`
2. **`script-github.js`** - JavaScript adaptado para GitHub Pages ✅
3. **`productos-data.json`** - Datos iniciales de productos ✅  
4. **`images/`** - Carpeta con imágenes estáticas

### 🔧 Pasos para Implementar

#### 1. Actualiza tu index.html
```html
<!-- CAMBIAR ESTA LÍNEA: -->
<script src="script.js"></script>

<!-- POR ESTA: -->
<script src="script-github.js"></script>
```

#### 2. Crear Carpeta de Imágenes
En tu repositorio de GitHub, crea una carpeta llamada `images/` y sube imágenes con estos nombres:
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

#### 3. Subir Archivos a GitHub
Sube estos archivos a tu repositorio:
- ✅ `index.html` (modificado)
- ✅ `script-github.js` 
- ✅ `productos-data.json`
- ✅ Carpeta `images/` completa

#### 4. Configurar GitHub Pages
1. Ve a **Settings** > **Pages** en tu repositorio
2. En **Source**, selecciona **Deploy from a branch**
3. Selecciona **main** branch y **/ (root)**
4. Haz clic en **Save**

### 🎯 Resultado Esperado

✅ **Al acceder a tu página de GitHub Pages:**
- Se verán todos los productos predefinidos
- Las imágenes se mostrarán correctamente
- El admin seguirá funcionando
- Los cambios se guardarán en el navegador del usuario

### 📝 Notas Importantes

- **Productos iniciales**: Se cargan desde `productos-data.json`
- **Nuevos productos**: Se guardan solo en el navegador del usuario
- **Imágenes dinámicas**: Solo las ve quien las sube (limitación de GitHub Pages)
- **Para productos públicos**: Agrégalos directamente al `productos-data.json`

### 🔍 Estructura Final del Repositorio
```
tu-repositorio/
├── index.html              (modificado para usar script-github.js)
├── script-github.js         (✅ creado)
├── productos-data.json      (✅ creado)
├── images/                  (📁 crear y subir imágenes)
│   ├── real-madrid-1.jpg
│   ├── barcelona-1.jpg
│   ├── espana-1.jpg
│   └── default-product.jpg
└── README.md
```

### ⚡ Ventajas de Esta Solución

1. **Funciona inmediatamente** en GitHub Pages
2. **Productos visibles** desde el primer acceso
3. **Imágenes estáticas** que cargan correctamente
4. **Mantiene funcionalidad** de admin
5. **Compatible** con todos los navegadores

¿Todo claro? ¡Sigue estos pasos y tu tienda funcionará perfectamente en GitHub Pages! 🎉