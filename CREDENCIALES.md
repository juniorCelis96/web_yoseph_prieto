# 🔐 Credenciales de Acceso

## Configuración Inicial

Para acceder al sistema de administración, necesitas configurar las credenciales en tu archivo `.env.local`:

```env
# UUID fijo (debe estar en la URL)
ADMIN_UUID=24f901ff-e665-44d4-9d9f-28c8ee059501

# Credenciales de administrador
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

## ⚠️ Credenciales por Defecto

**Usuario:** `admin`  
**Contraseña:** `admin123`

**⚠️ IMPORTANTE:** Cambia estas credenciales en producción por seguridad.

## 🔑 Cómo Acceder

1. **URL de acceso:**
   ```
   http://localhost:3000/login/24f901ff-e665-44d4-9d9f-28c8ee059501
   ```

2. **Ingresa las credenciales:**
   - Usuario: `admin`
   - Contraseña: `admin123`

3. **Haz clic en "Iniciar Sesión"**

4. **Serás redirigido al panel de administración:** `/admin`

## 🔒 Cambiar Credenciales

Para cambiar las credenciales:

1. Edita el archivo `.env.local`
2. Cambia los valores de `ADMIN_USERNAME` y `ADMIN_PASSWORD`
3. Reinicia el servidor (`npm run dev`)

Ejemplo:
```env
ADMIN_USERNAME=tu_usuario
ADMIN_PASSWORD=tu_contraseña_segura
```

## 📝 Notas de Seguridad

- El UUID en la URL (`24f901ff-e665-44d4-9d9f-28c8ee059501`) es obligatorio y actúa como primera capa de seguridad
- Las credenciales de usuario/contraseña son la segunda capa de seguridad
- Nunca compartas tus credenciales
- Usa contraseñas seguras en producción
- El archivo `.env.local` no debe subirse a Git (ya está en `.gitignore`)
