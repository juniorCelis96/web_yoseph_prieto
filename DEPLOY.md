# Guía de Despliegue

## Despliegue en Vercel

### Pasos para desplegar:

1. **Preparar el proyecto:**
   ```bash
   npm install
   npm run build
   ```

2. **Conectar con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio de GitHub/GitLab/Bitbucket
   - Vercel detectará automáticamente que es un proyecto Next.js

3. **Configurar Variables de Entorno (opcional):**
   - `NEXT_PUBLIC_SITE_URL`: URL completa de tu sitio (ej: https://yosephprieto.com)
   - Esto se usa para los meta tags y SEO

4. **Configuración de Build:**
   - Framework Preset: Next.js
   - Build Command: `npm run build` (automático)
   - Output Directory: `.next` (automático)
   - Install Command: `npm install` (automático)

5. **Desplegar:**
   - Haz clic en "Deploy"
   - Espera a que termine el build
   - Tu sitio estará disponible en la URL proporcionada

### Solución de Problemas Comunes:

#### Error 404 NOT_FOUND

Si recibes un error 404 después del despliegue:

1. **Verifica que el build fue exitoso:**
   - Revisa los logs de build en Vercel
   - Asegúrate de que no hay errores de compilación

2. **Verifica la configuración de Next.js:**
   - El archivo `next.config.js` está presente
   - La configuración es correcta

3. **Verifica las rutas:**
   - Asegúrate de que `src/app/page.tsx` existe
   - Verifica que no hay rutas dinámicas mal configuradas

4. **Limpia la caché de Vercel:**
   - En el dashboard de Vercel, ve a Settings > General
   - Haz clic en "Clear Build Cache"
   - Redespliega

5. **Verifica las versiones de Node.js:**
   - En Vercel Settings > General > Node.js Version
   - Usa Node.js 18.x o superior (recomendado: 20.x)

#### Error de Build

Si el build falla:

1. **Verifica las dependencias:**
   ```bash
   npm install
   npm run build
   ```

2. **Revisa los errores de ESLint:**
   - Los errores de linting pueden bloquear el build
   - Revisa `.eslintrc.json` para ajustar las reglas

3. **Verifica TypeScript:**
   - Asegúrate de que no hay errores de tipos
   - Ejecuta `npx tsc --noEmit` localmente

### Configuración Recomendada:

- **Node.js Version:** 20.x
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (automático)
- **Install Command:** `npm install`

### Variables de Entorno Recomendadas:

```env
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

### Notas Importantes:

- Next.js 15 y React 19 son versiones muy nuevas, asegúrate de que Vercel las soporte
- Si tienes problemas, considera usar versiones más estables:
  - Next.js 14.x
  - React 18.x

### Alternativas de Despliegue:

- **Netlify:** Similar a Vercel, también soporta Next.js
- **AWS Amplify:** Para proyectos empresariales
- **Railway:** Alternativa moderna y fácil de usar
- **Render:** Otra opción popular
