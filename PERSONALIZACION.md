# Guía de Personalización

Esta guía te ayudará a personalizar la página web de Yoseph Prieto con tus propios datos, imágenes y contenido.

## 📝 Personalizar Datos del Artista

### 1. Información Básica (`src/data/artistData.ts`)

Edita el archivo `src/data/artistData.ts` para actualizar:

- **Nombre del artista**: `name` y `fullName`
- **Tagline**: `tagline`
- **Biografía**: `bio` (corta) y `longBio` (extendida)
- **Contacto**: WhatsApp, email, teléfono
- **Ubicación**: Ciudad y país

```typescript
export const artistData = {
  name: 'Tu Nombre',
  fullName: 'Tu Nombre Completo',
  tagline: 'Tu tagline aquí',
  // ...
}
```

### 2. Música (`src/data/musicData.ts`)

Agrega tus lanzamientos musicales:

```typescript
{
  id: '1',
  title: 'Nombre de la Canción',
  type: 'single', // 'single', 'album', o 'ep'
  releaseDate: '2024-01-15',
  coverImage: 'URL_de_la_imagen',
  description: 'Descripción del lanzamiento',
  spotifyUrl: 'URL_de_Spotify',
  youtubeUrl: 'URL_de_YouTube',
  featured: true // true para destacar
}
```

### 3. Eventos (`src/data/eventsData.ts`)

Agrega tus eventos:

```typescript
{
  id: '1',
  title: 'Nombre del Evento',
  date: '2025-02-15', // Formato YYYY-MM-DD
  time: '20:00',
  location: 'Ciudad',
  venue: 'Lugar del evento',
  description: 'Descripción del evento',
  image: 'URL_de_la_imagen',
  ticketUrl: 'URL_para_comprar_entradas',
  status: 'upcoming' // 'upcoming' o 'past'
}
```

### 4. Galería (`src/data/galleryData.ts`)

Agrega imágenes y videos:

```typescript
{
  id: '1',
  type: 'image', // 'image' o 'video'
  url: 'URL_completa',
  thumbnail: 'URL_miniatura', // Opcional para imágenes
  title: 'Título',
  description: 'Descripción opcional',
  category: 'studio' // 'studio', 'live', 'music-video', etc.
}
```

### 5. Redes Sociales (`src/data/socialMediaData.ts`)

Actualiza tus enlaces de redes sociales:

```typescript
{
  id: 'instagram',
  name: 'Instagram',
  url: 'https://instagram.com/tu_usuario',
  icon: 'instagram',
  username: '@tu_usuario'
}
```

## 🎨 Personalizar Colores y Estilos

### Colores (`tailwind.config.js`)

Modifica los colores en `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Tu paleta de colores principal
    500: '#0ea5e9', // Color principal
    // ...
  },
  accent: {
    // Tu paleta de acento
    500: '#d946ef',
    // ...
  }
}
```

### Fuentes (`src/app/layout.tsx`)

Cambia las fuentes importadas:

```typescript
import { TuFuente } from 'next/font/google'

const tuFuente = TuFuente({
  subsets: ['latin'],
  variable: '--font-tu-fuente'
})
```

## 🖼️ Agregar Imágenes

### Opción 1: Imágenes Locales

1. Crea una carpeta `public/images/`
2. Coloca tus imágenes allí
3. Referencia con `/images/tu-imagen.jpg`

### Opción 2: URLs Externas

Usa URLs completas de servicios como:
- Unsplash (para imágenes de prueba)
- Cloudinary
- Tu propio servidor

**Importante**: Agrega los dominios permitidos en `next.config.js`:

```javascript
images: {
  domains: ['tudominio.com', 'cdn.tuservicio.com']
}
```

## 📱 Personalizar WhatsApp

Actualiza el número en `src/data/artistData.ts`:

```typescript
contact: {
  whatsapp: '+1234567890', // Formato internacional sin espacios
  // ...
}
```

El botón de WhatsApp se generará automáticamente con el formato correcto.

## 🔍 SEO y Meta Tags

Edita `src/app/layout.tsx` para personalizar:

- Título de la página
- Descripción
- Keywords
- Open Graph (para compartir en redes sociales)
- Twitter Cards

```typescript
export const metadata: Metadata = {
  title: 'Tu Título',
  description: 'Tu descripción',
  // ...
}
```

## 🎵 Integrar Reproductores de Música

### Spotify

1. Obtén el enlace de tu canción/álbum desde Spotify
2. Agrega la URL en `musicData.ts`:

```typescript
spotifyUrl: 'https://open.spotify.com/track/TU_ID'
```

### YouTube

1. Obtén el ID del video de YouTube
2. Agrega la URL completa en `musicData.ts`:

```typescript
youtubeUrl: 'https://www.youtube.com/watch?v=TU_ID'
```

## 📧 Configurar Formulario de Contacto

El formulario actualmente envía los datos a WhatsApp. Para usar un backend:

1. Crea una API route en `src/app/api/contact/route.ts`
2. Actualiza `ContactForm.tsx` para enviar a tu API
3. Configura tu servicio de email (SendGrid, Resend, etc.)

## 🚀 Desplegar

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno si es necesario
3. Deploy automático en cada push

### Otros Servicios

- Netlify
- AWS Amplify
- Tu propio servidor con Node.js

## 📝 Notas Importantes

- **Imágenes**: Optimiza tus imágenes antes de subirlas para mejor rendimiento
- **SEO**: Completa todos los meta tags para mejor visibilidad
- **Responsive**: La página es mobile-first, prueba en diferentes dispositivos
- **Performance**: Usa Next.js Image para todas las imágenes
- **Analytics**: Considera agregar Google Analytics o similar

## 🆘 Soporte

Si tienes problemas o preguntas:
1. Revisa la documentación de Next.js
2. Verifica la consola del navegador para errores
3. Asegúrate de que todas las dependencias estén instaladas (`npm install`)
