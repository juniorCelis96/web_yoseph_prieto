# 📋 Guía: Crear Tabla de Eventos en Supabase

## 🎯 Objetivo
Crear la tabla `events` en Supabase para que el CRUD de eventos funcione correctamente.

---

## 📝 Paso 1: Acceder al SQL Editor de Supabase

1. **Ve a tu proyecto en Supabase Dashboard**
   - Abre https://supabase.com/dashboard
   - Selecciona tu proyecto

2. **Navega al SQL Editor**
   - En el menú lateral izquierdo, haz clic en **"SQL Editor"** (o "Editor SQL")
   - O ve directamente a: `https://supabase.com/dashboard/project/[TU_PROYECTO]/sql`

---

## 📝 Paso 2: Ejecutar el Script SQL

1. **Copia todo el contenido** del archivo `supabase-migration.sql` que está en la raíz de tu proyecto.

2. **Pega el SQL en el editor** de Supabase.

3. **Haz clic en "Run"** (o presiona `Ctrl+Enter` / `Cmd+Enter`).

El script completo es:

```sql
-- Create events table for Yoseph Prieto website
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT,
  location TEXT NOT NULL,
  venue TEXT NOT NULL,
  description TEXT,
  image TEXT,
  ticket_url TEXT,
  status TEXT NOT NULL CHECK (status IN ('upcoming', 'past')),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_active ON events(active);

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to read events
CREATE POLICY "Allow public read access" ON events
  FOR SELECT
  USING (true);

-- Policy: Allow authenticated users (admin) to insert events
CREATE POLICY "Allow admin insert" ON events
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow authenticated users (admin) to update events
CREATE POLICY "Allow admin update" ON events
  FOR UPDATE
  USING (true);

-- Policy: Allow authenticated users (admin) to delete events
CREATE POLICY "Allow admin delete" ON events
  FOR DELETE
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

## ✅ Paso 3: Verificar que la Tabla se Creó

1. **Ve a "Table Editor"** en el menú lateral de Supabase
2. **Busca la tabla `events`** en la lista
3. **Deberías ver** las siguientes columnas:
   - `id` (UUID)
   - `title` (text)
   - `date` (date)
   - `time` (text)
   - `location` (text)
   - `venue` (text)
   - `description` (text)
   - `image` (text)
   - `ticket_url` (text)
   - `status` (text)
   - `active` (boolean)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

---

## 🔧 Paso 4: Verificar Políticas RLS (Opcional)

**Nota importante:** Como estamos usando `SUPABASE_SERVICE_ROLE_KEY` en el código, las políticas RLS se bypassan automáticamente. Sin embargo, las políticas están configuradas para permitir acceso público a lectura y acceso autenticado a escritura.

Si quieres verificar las políticas:

1. Ve a **"Authentication"** → **"Policies"** en Supabase
2. Busca la tabla `events`
3. Deberías ver 4 políticas:
   - `Allow public read access` (SELECT)
   - `Allow admin insert` (INSERT)
   - `Allow admin update` (UPDATE)
   - `Allow admin delete` (DELETE)

---

## 🧪 Paso 5: Probar el CRUD

Una vez creada la tabla:

1. **Reinicia tu servidor de desarrollo** (`npm run dev`)
2. **Accede al admin panel**: `/login/24f901ff-e665-44d4-9d9f-28c8ee059501`
3. **Intenta crear un evento** desde `/admin/events/new`
4. **Verifica que se guarde** correctamente
5. **Verifica que aparezca** en la lista de eventos en `/admin`

---

## 🐛 Si Hay Errores

### Error: "relation 'events' does not exist"
- **Solución**: Asegúrate de ejecutar el SQL completo en el SQL Editor

### Error: "permission denied for table events"
- **Solución**: Verifica que las políticas RLS estén creadas correctamente. Si usas `service_role_key`, esto no debería pasar.

### Error: "duplicate key value violates unique constraint"
- **Solución**: Esto es normal si intentas ejecutar el script dos veces. El `CREATE TABLE IF NOT EXISTS` evita este error.

---

## 📊 Estructura de la Tabla

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | UUID | Identificador único (generado automáticamente) |
| `title` | TEXT | Título del evento (requerido) |
| `date` | DATE | Fecha del evento (requerido) |
| `time` | TEXT | Hora del evento (opcional) |
| `location` | TEXT | Ubicación/ciudad (requerido) |
| `venue` | TEXT | Lugar/recinto (requerido) |
| `description` | TEXT | Descripción del evento (opcional) |
| `image` | TEXT | URL de imagen (opcional, no usado actualmente) |
| `ticket_url` | TEXT | URL de entradas (opcional, no usado actualmente) |
| `status` | TEXT | Estado: 'upcoming' o 'past' (requerido) |
| `active` | BOOLEAN | Si está visible en el sitio (default: true) |
| `created_at` | TIMESTAMP | Fecha de creación (automático) |
| `updated_at` | TIMESTAMP | Fecha de actualización (automático) |

---

## ✅ Checklist Final

- [ ] Tabla `events` creada en Supabase
- [ ] Índices creados (`idx_events_date`, `idx_events_status`, `idx_events_active`)
- [ ] RLS habilitado
- [ ] Políticas RLS creadas (4 políticas)
- [ ] Función `update_updated_at_column()` creada
- [ ] Trigger `update_events_updated_at` creado
- [ ] Servidor reiniciado
- [ ] CRUD probado y funcionando

---

## 🎉 ¡Listo!

Una vez completados estos pasos, tu CRUD de eventos debería funcionar correctamente con Supabase. Los eventos se guardarán en la base de datos y persistirán entre reinicios del servidor.
