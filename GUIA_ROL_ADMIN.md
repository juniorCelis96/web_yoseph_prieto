# 🔐 Guía: Agregar Rol Admin en Supabase Dashboard

## 📍 Paso 1: Encontrar User Metadata en Supabase Dashboard

### Ubicación exacta:

1. **Ve a tu proyecto en Supabase Dashboard**
   - Abre https://supabase.com
   - Selecciona tu proyecto

2. **Navega a Authentication → Users**
   - En el menú lateral izquierdo, haz clic en **"Authentication"**
   - Luego haz clic en **"Users"** (o "Usuarios" si está en español)

3. **Busca tu usuario**
   - En la lista de usuarios, encuentra el que acabas de crear
   - Haz clic en el **email del usuario** (o en cualquier parte de la fila)

4. **Abre la sección de detalles**
   - Se abrirá un panel lateral derecho o una página con los detalles del usuario
   - Busca la sección **"User Metadata"** o **"Metadata"**

### Si no ves User Metadata:

A veces está en una pestaña o sección expandible:
- Busca pestañas como: **"Details"**, **"Metadata"**, **"User Metadata"**
- O busca un botón **"Edit"** o **"Edit User"**
- También puede estar en la parte inferior del panel de detalles

---

## 📝 Paso 2: Agregar el Rol Admin

### Opción A: Desde el Dashboard (Recomendado)

1. **En la sección "User Metadata"**:
   - Verás un editor JSON o campos de Key-Value
   - Si es JSON, debería verse algo como: {} o {"key": "value"}

2. **Agregar el rol**:
   
   **Si es editor JSON:**
   `json
   {
     "role": "admin"
   }
   `
   
   **Si es Key-Value (campos separados):**
   - Haz clic en **"Add a new key"** o **"+"**
   - **Key**: ole
   - **Value**: dmin
   - Haz clic en **"Save"** o **"Update"**

3. **Verificar**:
   - Deberías ver "role": "admin" en el metadata
   - Guarda los cambios

### Opción B: Via SQL (Alternativo)

Si no encuentras la opción en el Dashboard, puedes usar SQL:

1. Ve a **SQL Editor** en Supabase
2. Ejecuta este query (reemplaza el email con el de tu usuario):

`sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'::jsonb
)
WHERE email = 'admin@yosephprieto.com';
`

---

## 🔗 Paso 3: Cómo se Conecta con el Login

### Flujo de Autenticación:

`
1. Usuario accede a: /login/[uuid]
   ↓
2. Ingresa email y contraseña
   ↓
3. El formulario envía a NextAuth.js
   ↓
4. NextAuth.js llama a src/lib/auth.ts
   ↓
5. auth.ts valida:
   ✅ UUID en URL correcto
   ✅ Email coincide con ADMIN_EMAIL
   ✅ Contraseña correcta (Supabase Auth)
   ✅ Usuario tiene role: admin en metadata
   ↓
6. Si todo es correcto → Crea sesión JWT
   ↓
7. Redirige a /admin
`

### Código que verifica el rol:

En src/lib/auth.ts línea 51-52:
`	ypescript
const userMetadata = authData.user.user_metadata
const isAdmin = userMetadata?.role === 'admin' || credentials.email === adminEmail
`

**Esto significa:**
- Busca ole: 'admin' en user_metadata
- O acepta si el email coincide con ADMIN_EMAIL (fallback)

---

## ✅ Paso 4: Verificar que Funciona

### Checklist:

1. **Usuario creado en Supabase** ✅
2. **User Metadata tiene ole: admin** ⬅️ **ESTO ES LO QUE NECESITAS**
3. **ADMIN_EMAIL en .env.local coincide con el email del usuario**
4. **Variables de Supabase configuradas en .env.local**
5. **Servidor reiniciado**

### Probar:

1. Ve a: http://localhost:3000/login/24f901ff-e665-44d4-9d9f-28c8ee059501
2. Ingresa:
   - Email: (el que creaste en Supabase)
   - Contraseña: (la que configuraste)
3. Deberías acceder a /admin

---

## 🐛 Si No Funciona

### Error: "Credenciales inválidas"

**Verifica:**
1. El email en Supabase coincide exactamente con ADMIN_EMAIL en .env.local
2. La contraseña es correcta
3. El usuario tiene ole: admin en User Metadata
4. Las variables de Supabase están configuradas
5. El servidor fue reiniciado después de configurar variables

### No encuentro User Metadata en el Dashboard

**Alternativas:**
1. Usa el método SQL (Paso 2, Opción B)
2. O verifica que estás en la versión correcta del Dashboard
3. A veces está en **"Edit User"** → **"Metadata"**

---

## 📸 Ubicación Visual en Dashboard

`
Supabase Dashboard
├── Authentication (menú lateral)
│   ├── Users ← Haz clic aquí
│   │   └── [Lista de usuarios]
│   │       └── [Tu usuario] ← Haz clic
│   │           └── Panel de detalles
│   │               ├── Email
│   │               ├── Created At
│   │               └── User Metadata ← AQUÍ está el rol
│   │                   └── { "role": "admin" }
`

---

## 🎯 Resumen Rápido

1. **Supabase Dashboard** → **Authentication** → **Users**
2. **Haz clic en tu usuario**
3. **Busca "User Metadata"** (puede estar en una pestaña o sección)
4. **Agrega**: Key: ole, Value: dmin
5. **Guarda**
6. **Prueba el login** con ese email y contraseña

¡El sistema ya está conectado! Solo necesitas agregar el rol en metadata.
