# Login en producción – Comprobaciones

Si el login funciona en local pero **no en producción**, revisa lo siguiente.

## 1. Variables de entorno en producción (Vercel u otro)

En **Vercel** → tu proyecto → **Settings** → **Environment Variables**, define **todas** estas variables para **Production** (y opcionalmente Preview):

| Variable | Ejemplo / Notas |
|----------|------------------|
| `NEXTAUTH_URL` | `https://www.yosephprietooficial.com` (URL exacta del sitio, con `https://`, **sin** barra final) |
| `NEXTAUTH_SECRET` | El mismo secret que en local (o uno nuevo solo para producción) |
| `ADMIN_UUID` | El mismo UUID que en local (ej. `24f901ff-e665-44d4-9d9f-28c8ee059501`) |
| `ADMIN_EMAIL` | El mismo email que en local (debe coincidir con el usuario en Supabase Auth) |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key de Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key de Supabase |

Después de añadir o cambiar variables, haz un **Redeploy** (Deployments → ⋮ → Redeploy).

## 2. Ver por qué falla el login (logs en Vercel)

En el código se añadieron logs seguros (sin credenciales). En **Vercel**:

1. Ve a **Deployments** → el último deployment → **Functions**.
2. Abre la función que sirve `/api/auth/*` (o mira los logs en tiempo real).
3. O en el proyecto: **Logs** (pestaña Runtime Logs).

Al intentar iniciar sesión, verás un mensaje como `[next-auth] authorize: XXX`. Significado:

| Código | Qué revisar |
|--------|-------------|
| `MISSING_ADMIN_UUID` | No está definida `ADMIN_UUID` en producción. |
| `INVALID_OR_MISSING_UUID` | El UUID de la URL no coincide con `ADMIN_UUID` (o no se envía). |
| `MISSING_ADMIN_EMAIL` | No está definida `ADMIN_EMAIL` en producción. |
| `EMAIL_MISMATCH` | El email del formulario no coincide con `ADMIN_EMAIL`. |
| `MISSING_PASSWORD` | No se envía contraseña. |
| `SUPABASE_NOT_CONFIGURED` | Faltan o son inválidas las variables de Supabase en producción. |
| `SUPABASE_AUTH_ERROR: ...` | Supabase rechaza el login (contraseña, usuario deshabilitado, etc.). |
| `SUPABASE_NO_USER` | Supabase no devolvió usuario. |
| `NOT_ADMIN_ROLE` | El usuario en Supabase no tiene `user_metadata.role === 'admin'`. |

## 3. Supabase – Redirect URLs (si usas OAuth)

Si en el futuro usas proveedores OAuth (Google, etc.), en **Supabase** → **Authentication** → **URL Configuration** → **Redirect URLs** añade:

- `https://www.yosephprietooficial.com/**`
- `https://yosephprietooficial.com/**` (si usas también el dominio sin www)

Con **Credentials** (usuario/contraseña) no hace falta configurar redirect en Supabase para el login del admin.

## 4. Comprobar que las variables están cargadas

- Las variables deben estar en **Production** (y en **Preview** si quieres que funcione en preview deployments).
- Después de cualquier cambio en variables, es necesario **Redeploy**; no se aplican al deployment ya desplegado.

## 5. Resumen rápido

1. Añadir en producción: `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `ADMIN_UUID`, `ADMIN_EMAIL`, las tres de Supabase.
2. Redeploy.
3. Intentar login y revisar en **Logs** el código `[next-auth] authorize: XXX` para ver el fallo concreto.
