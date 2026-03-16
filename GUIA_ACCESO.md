# Guía de Acceso al Sistema de Administración

## 📋 Pasos para Acceder

### 1. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
# Next.js Environment Variables
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-aqui-genera-con-openssl-rand-base64-32

# Admin Authentication - UUID FIJO
ADMIN_UUID=24f901ff-e665-44d4-9d9f-28c8ee059501

# Supabase Configuration (opcional para empezar, puedes usar datos mock)
NEXT_PUBLIC_SUPABASE_URL=tu-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-supabase-service-role-key
```

**⚠️ IMPORTANTE:** 
- Genera `NEXTAUTH_SECRET` ejecutando: `openssl rand -base64 32` (en terminal)
- El `ADMIN_UUID` ya está configurado: `24f901ff-e665-44d4-9d9f-28c8ee059501`

### 2. Instalar Dependencias (si no lo has hecho)

```bash
npm install
```

### 3. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

### 4. Acceder al Sistema

#### Opción A: Login Administrativo
1. Abre tu navegador en: **http://localhost:3000/login**
2. Verás el formulario de login con el UUID ya prellenado
3. Haz clic en **"Iniciar Sesión"**
4. Serás redirigido a **http://localhost:3000/admin**

#### Opción B: Acceso Directo (si ya estás autenticado)
- Ve directamente a: **http://localhost:3000/admin**

### 5. Panel de Administración

Una vez autenticado, podrás:
- ✅ Ver todos los eventos
- ✅ Crear nuevos eventos (`/admin/events/new`)
- ✅ Editar eventos existentes (`/admin/events/[id]`)
- ✅ Eliminar eventos
- ✅ Cerrar sesión

## 🔧 Configuración de Supabase (Opcional)

Si quieres usar la base de datos real:

1. **Crear proyecto en Supabase:**
   - Ve a https://supabase.com
   - Crea un nuevo proyecto
   - Obtén las credenciales (URL, Anon Key, Service Role Key)

2. **Ejecutar migración SQL:**
   - Ve al SQL Editor en Supabase
   - Copia y pega el contenido de `supabase-migration.sql`
   - Ejecuta el script

3. **Actualizar `.env.local`:**
   - Agrega las credenciales de Supabase

## 🚨 Solución de Problemas

### Error: "ADMIN_UUID not configured"
- Verifica que `.env.local` existe y tiene `ADMIN_UUID=24f901ff-e665-44d4-9d9f-28c8ee059501`
- Reinicia el servidor después de crear/modificar `.env.local`

### Error: "NEXTAUTH_SECRET not configured"
- Genera un secret: `openssl rand -base64 32`
- Agrégalo a `.env.local` como `NEXTAUTH_SECRET=tu-secret-generado`

### Error de conexión a Supabase
- Si aún no tienes Supabase configurado, las rutas de API fallarán
- Puedes configurar Supabase más tarde o usar datos mock temporalmente

### No puedo acceder a `/admin`
- Asegúrate de haber iniciado sesión primero en `/login`
- Verifica que las cookies estén habilitadas en tu navegador

## 📝 Notas

- El UUID está hardcodeado en el código: `24f901ff-e665-44d4-9d9f-28c8ee059501`
- La URL de login es fija: `/login` (no requiere UUID en la URL)
- La sesión se mantiene mientras navegas por el panel de administración
- Para cerrar sesión, usa el botón "Salir" en el dashboard
