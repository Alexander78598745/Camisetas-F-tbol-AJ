# Camisetas AJ - Tienda Online de Fútbol

🏆 **Una tienda web moderna y espectacular para camisetas de fútbol**

## 🌟 Características Principales

### 📱 Progressive Web App (PWA)
- **Instalable**: Los usuarios pueden instalar la web como una app nativa
- **Funciona offline**: Navegación básica disponible sin conexión
- **Notificaciones push**: Para ofertas y novedades
- **Rápida**: Carga instantánea con caché inteligente

### 🎨 Diseño Moderno
- **Colores de marca**: Rojo, negro, blanco y azul turquesa
- **Responsivo**: Perfecta en móviles, tablets y escritorio
- **Animaciones**: Transiciones suaves y efectos visuales
- **Temática futbolística**: Diseño enfocado al deporte

### 🛍️ Catálogo Completo
- **Camisetas**: Equipos principales de Europa
- **Chándales**: Conjuntos completos de entrenamiento
- **Niños**: Ropa deportiva para los más pequeños
- **Ligas principales**: La Liga, Premier League, Serie A, Bundesliga, Ligue 1

### 🎨 Personalización
- **Nombres**: Añade cualquier nombre
- **Números**: Del 1 al 99
- **Parches**: Logos oficiales de ligas
- **Vista previa**: Ve cómo queda antes de pedir

### 📲 Integración WhatsApp
- **Pedidos directos**: Botón flotante siempre visible
- **Mensajes personalizados**: Incluye detalles del producto
- **Fácil contacto**: Un clic para hablar contigo

### 🛠️ Panel de Administración
- **Subida fácil**: Drag & drop para imágenes
- **Gestión completa**: Añadir/eliminar productos
- **Categorización**: Organiza por liga y tipo
- **Previsualización**: Ve cómo se verá antes de publicar

## 🚀 Instalación y Uso

### 1. Configuración Inicial

1. **Descargar archivos**: Guarda todos los archivos en una carpeta
2. **Logo**: El logo ya está configurado desde `user_input_files/LOGO TRANSPARENTE.png`
3. **WhatsApp**: Edita el número en `script.js`:
   ```javascript
   const numeroWhatsApp = '34XXXXXXXXX'; // Cambia por tu número
   ```

### 2. Hospedaje Web

**Opciones recomendadas (gratuitas):**
- **Netlify**: netlify.com (muy fácil, drag & drop)
- **Vercel**: vercel.com (integración con GitHub)
- **GitHub Pages**: pages.github.com (gratuito con cuenta GitHub)
- **Firebase Hosting**: firebase.google.com (de Google)

**Pasos con Netlify (más fácil):**
1. Ve a netlify.com
2. Arrastra toda la carpeta del proyecto
3. ¡Tu web estará online en segundos!

### 3. Convertir en APP (PWA)

**Para usuarios de Android:**
1. Abrir la web en Chrome
2. Tocar menú (3 puntos) > "Añadir a pantalla de inicio"
3. ¡Ya tienes la app instalada!

**Para usuarios de iPhone:**
1. Abrir en Safari
2. Tocar el botón compartir
3. "Añadir a pantalla de inicio"

## 📋 Cómo Usar el Panel de Admin

1. **Acceder**: Haz clic en "Admin" en el menú superior
2. **Subir productos**:
   - Selecciona categoría (camisetas/chándales/niños)
   - Escribe nombre del equipo
   - Elige la liga
   - Establece el precio
   - Arrastra imágenes o haz clic para seleccionar
   - Haz clic en "Subir Producto"

3. **Gestionar productos**:
   - Ve todos los productos en la lista
   - Elimina los que no necesites
   - Los cambios se ven inmediatamente

## 📦 Estructura de Archivos

```
camisetas-aj/
│
├── index.html          # Página principal
├── styles.css          # Estilos y diseño
├── script.js           # Funcionalidad JavaScript
├── manifest.json       # Configuración PWA
├── sw.js              # Service Worker
└── user_input_files/
    └── LOGO TRANSPARENTE.png
```

## 🎯 Equipos Destacados Incluidos

### 🇪🇸 La Liga (España)
- FC Barcelona
- Real Madrid
- Atlético Madrid

### 🇬🇧 Premier League (Inglaterra)
- Manchester City
- Chelsea FC

*Puedes añadir más equipos fácilmente desde el panel de admin*

## 🔧 Personalización Avanzada

### Cambiar Colores
Edita las variables CSS en `styles.css`:
```css
:root {
    --primary-color: #FF0000;    /* Rojo principal */
    --secondary-color: #00BFFF;  /* Azul turquesa */
    --dark-color: #1a1a1a;       /* Negro/gris oscuro */
    --light-color: #ffffff;      /* Blanco */
}
```

### Añadir Más Ligas
En `script.js`, añade más opciones:
```javascript
// En el HTML de ligas, duplica una card y cambia los datos
// En el select del admin, añade más opciones
```

## 📱 Funcionalidades Móviles

- **Touch optimizado**: Navegación táctil perfecta
- **Zoom inteligente**: Las imágenes se adaptan al tamaño
- **Menú hamburguesa**: Navegación compacta en móviles
- **Botón WhatsApp flotante**: Siempre visible y accesible

## 🔒 Seguridad y Rendimiento

- **HTTPS requerido**: Para funcionalidad PWA completa
- **Caché inteligente**: Páginas cargan instantáneamente
- **Optimización de imágenes**: Carga rápida sin perder calidad
- **Código limpio**: Fácil de mantener y actualizar

## 🎆 Próximas Mejoras Sugeridas

1. **Carrito de compras**: Para múltiples productos
2. **Sistema de pagos**: PayPal, Stripe, etc.
3. **Base de datos**: Para productos persistentes
4. **Galería avanzada**: Múltiples imágenes por producto
5. **Sistema de usuarios**: Cuentas y favoritos
6. **Búsqueda**: Filtro por equipo, liga, precio

## 📧 Soporte

Para dudas o mejoras, contacta por WhatsApp usando el botón de la web.

---

¡Tu tienda de camisetas de fútbol está lista para conquistar el mundo digital! 🏆⚽