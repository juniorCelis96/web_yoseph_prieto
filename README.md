# Web Yoseph Prieto Oficial

P�gina web profesional y est�tica para el artista musical "Yoseph Prieto Oficial", dise�ada para fortalecer su marca art�stica en el entorno digital.

## ?? Tecnolog�as

- **Next.js 15** (App Router) con React 19
- **Tailwind CSS** para estilos utilitarios
- **Stylus** para CSS Modules (archivos .module.styl)
- **React Hook Form + Zod** para formularios y validaci�n
- **Zustand** para estado global (si es necesario)
- **Radix UI** y **Shadcn UI** para componentes base
- **Lucide React** para iconos

## ?? Estructura del Proyecto

```
src/
??? app/              # P�ginas y layouts de Next.js
??? components/       # Componentes React reutilizables
??? data/            # Archivos de datos est�ticos
??? lib/             # Utilidades y helpers
```

## ?? Caracter�sticas

- ? Dise�o responsive mobile-first
- ? P�gina de inicio con Hero impactante
- ? Secci�n de biograf�a y trayectoria
- ? Galer�a de m�sica con reproductores integrados
- ? Galer�a de im�genes y videos
- ? Secci�n de eventos pr�ximos y pasados
- ? Formulario de contacto con validaci�n
- ? Integraci�n con WhatsApp Business
- ? Enlaces a redes sociales
- ? SEO optimizado
- ? Meta tags para compartir en redes sociales

## ??? Instalaci�n

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producci�n
npm run build

# Iniciar servidor de producci�n
npm start
```

## ?? Configuraci�n

### Datos del Artista

Edita los archivos en `src/data/` para personalizar:
- `artistData.ts` - Informaci�n del artista, contacto, biograf�a
- `musicData.ts` - Lanzamientos musicales
- `eventsData.ts` - Eventos y presentaciones
- `galleryData.ts` - Im�genes y videos
- `socialMediaData.ts` - Enlaces a redes sociales

### WhatsApp

Actualiza el n�mero de WhatsApp en `src/data/artistData.ts`:
```typescript
contact: {
  whatsapp: '+1234567890', // Tu n�mero aqu�
  // ...
}
```

## ?? Personalizaci�n

### Colores

Los colores principales se pueden modificar en `tailwind.config.js`:
- `primary` - Color principal
- `accent` - Color de acento

### Fuentes

Las fuentes se configuran en `src/app/layout.tsx`:
- Inter - Fuente principal
- Poppins - Fuente de display

## ?? P�ginas

- `/` - P�gina de inicio con todas las secciones
- `/#biografia` - Secci�n de biograf�a
- `/#musica` - Secci�n de m�sica
- `/#galeria` - Galer�a de im�genes
- `/#eventos` - Eventos
- `/#contacto` - Formulario de contacto

## ?? Convenciones

- Standard.js para estilo de c�digo (2 espacios, sin punto y coma, comillas simples)
- Componentes funcionales con named exports
- Preferir Server Components sobre Client Components
- Tailwind para utilidades comunes y Stylus modules para estilos complejos espec�ficos

## ?? Licencia

Todos los derechos reservados - Yoseph Prieto Oficial
