# Guía de Imágenes

## Ubicación de las Imágenes

Todas las imágenes deben colocarse en la carpeta `public/` en la raíz del proyecto.

## Imágenes Requeridas

### Logo
- **Archivo:** `logo_yp_transparente.png`
- **Ubicación:** `public/logo_yp_transparente.png`
- **Uso:** Logo en el Navbar

### Biografía
- **Archivo:** `yp_img_biografia.jpg`
- **Ubicación:** `public/yp_img_biografia.jpg`
- **Uso:** Imagen principal en la sección de biografía

### Música (Carátulas)
- **Archivo:** `yp_img_caratula_1_album.jpg`
- **Ubicación:** `public/yp_img_caratula_1_album.jpg`
- **Uso:** Carátula para todas las canciones en la sección de música

### Galería
- **Archivos:** 
  - `yp_gallery_1.jpg`
  - `yp_gallery_2.jpg`
  - `yp_gallery_3.jpg`
  - `yp_gallery_4.jpg`
  - `yp_gallery_5.jpg`
  - `yp_gallery_6.jpg`
  - `yp_gallery_7.jpg`
- **Ubicación:** `public/yp_gallery_1.jpg`, `public/yp_gallery_2.jpg`, etc.
- **Uso:** Carrusel de imágenes en la sección de galería

## Estructura de Carpetas

```
web_yoseph_prieto/
├── public/
│   ├── logo_yp_transparente.png
│   ├── yp_img_biografia.jpg
│   ├── yp_img_caratula_1_album.jpg
│   ├── yp_gallery_1.jpg
│   ├── yp_gallery_2.jpg
│   ├── yp_gallery_3.jpg
│   ├── yp_gallery_4.jpg
│   ├── yp_gallery_5.jpg
│   ├── yp_gallery_6.jpg
│   └── yp_gallery_7.jpg
└── ...
```

## Notas Importantes

1. **Formato de archivos:** Las imágenes pueden ser `.jpg`, `.jpeg`, `.png` o `.webp`
2. **Nombres exactos:** Los nombres de archivo deben coincidir exactamente con los especificados arriba
3. **Rutas:** Las rutas en el código usan `/nombre_archivo.extensión` (con la barra inicial)
4. **Fallback:** Si una imagen no se encuentra, se mostrará una imagen de placeholder de Unsplash automáticamente

## Verificación

Para verificar que las imágenes están correctamente ubicadas:

1. Asegúrate de que todos los archivos estén en `public/`
2. Los nombres deben coincidir exactamente (incluyendo mayúsculas/minúsculas)
3. Reinicia el servidor de desarrollo después de agregar imágenes nuevas
