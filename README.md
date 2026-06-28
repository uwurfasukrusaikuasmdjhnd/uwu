# Estates & Co. — Catálogo de Propiedades (SPA en React)

SPA desarrollada en **React + Vite + React-Bootstrap + SweetAlert2**, siguiendo la misma
arquitectura de servicios / rutas / componentes usada en las guías del curso (Login,
rutas protegidas y CRUD de usuarios). Consume un catálogo de propiedades inmobiliarias
desde un backend PHP conectado a base de datos.

## 1. Identidad visual

Paleta "casa de remates de lujo": maderas nobles, cuero y café tostado, con un acento
"oro viejo" que actúa como sello de marca (precio en cinta dorada sobre cada foto,
divisores ornamentales). Tipografía display **Fraunces** (editorial, con carácter) +
texto **Inter** (limpia y legible). Todo el sistema de color vive en variables CSS en
`src/index.css` (`--espresso`, `--cacao`, `--caramelo`, `--oro`, `--lino`, `--crema`),
por lo que puedes ajustar tonos sin tocar los componentes.

## 2. Estructura del proyecto

```
src/
├── components/
│   ├── Header.jsx              # Hero + buscador en tiempo real
│   ├── PropertyCard.jsx        # Card de Bootstrap: foto, título, ubicación, precio
│   ├── PropertyGrid.jsx        # Grilla responsiva + estados de carga/vacío
│   ├── PropertyDetailModal.jsx # Modal con carousel, descripción e íconos
│   └── PropertyFormModal.jsx   # Modal de creación/edición
├── services/
│   └── propertyService.js      # fetch al backend PHP (GET/POST/PUT/DELETE)
├── data/
│   └── mockProperties.js       # Datos de respaldo si el backend no responde
├── utils/format.js             # Formateo de moneda y normalización de imágenes
├── App.jsx                     # Orquesta carga, búsqueda, CRUD y modales
└── index.css                   # Tokens de color/tipografía e identidad visual

api-php-example/                # Referencia de backend (opcional, para adaptar)
├── db.php
├── propiedades.php
└── schema.sql
```

## 3. Cómo correr el proyecto en desarrollo

```bash
npm install
cp .env.example .env        # y ajusta VITE_API_URL a tu endpoint PHP real
npm run dev
```

La app queda disponible en `http://localhost:5173`.

## 4. Conectar tu backend PHP real

1. En `.env`, define `VITE_API_URL` apuntando a tu archivo PHP (el que ya conecta a la
   base de datos de evaluaciones anteriores), por ejemplo:
   `VITE_API_URL=http://localhost/api/propiedades.php`
2. Tu endpoint debe responder en GET con:
   ```json
   { "ok": true, "data": [ { "id": 1, "title": "...", "location": "...", "price": 0, ... } ] }
   ```
   (también acepta un arreglo plano `[...]` si así lo prefieres).
3. Si tu base de datos usa otros nombres de columna, no necesitas tocar el front-end:
   solo ajusta el `mapRow()` en tu PHP para traducir esos nombres al formato esperado
   (`title`, `location`, `price`, `surface_m2`, `bedrooms`, `bathrooms`, `parking`,
   `pool`, `year_built`, `description`, `images`).
4. En `api-php-example/` encontrarás una implementación de referencia (`propiedades.php`,
   `db.php`, `schema.sql`) que puedes adaptar directamente a tu base de datos existente.
5. Mientras el backend no esté disponible, la SPA sigue funcionando mostrando datos de
   demostración (`src/data/mockProperties.js`) y te avisa con un banner en la parte
   superior del catálogo — así nunca tendrás la pantalla en blanco durante el desarrollo.

## 5. Edición y eliminación (3.5 / 3.6)

Por defecto, **editar y eliminar actualizan el estado de React de inmediato** (para que
la interfaz responda al instante, tal como pide la pauta), y además intentan sincronizar
el cambio contra tu backend (`PUT` / `DELETE` en `propertyService.js`) como bonus. Si el
backend aún no implementa esas rutas, el intento falla en silencio (se registra en la
consola del navegador) sin afectar la experiencia de uso.

## 6. Despliegue en AWS (instancia Ubuntu Server)

1. **Compila la app:**
   ```bash
   npm run build
   ```
   Esto genera la carpeta `dist/` con los archivos estáticos listos para producción.
2. **En la instancia Ubuntu Server**, instala Nginx (o Apache) y PHP:
   ```bash
   sudo apt update
   sudo apt install nginx php php-mysql mysql-server -y
   ```
3. Copia el contenido de `dist/` a `/var/www/html/` (el front-end React) y los archivos
   de `api-php-example/` (o tu propio backend) a una subcarpeta, por ejemplo
   `/var/www/html/api/`.
4. Importa `schema.sql` (o tu esquema real) en MySQL y ajusta las credenciales en `db.php`.
5. Actualiza `VITE_API_URL` en `.env` con la IP pública o dominio de la instancia antes
   de volver a compilar (`npm run build`), o sirve el front-end y el backend bajo el
   mismo dominio para evitar configurar CORS.
6. Abre el puerto 80 (y 443 si usas HTTPS) en el Security Group de la instancia AWS.

## 7. Checklist según la pauta de evaluación

- [x] **3.1** Carga de datos desde backend con `useEffect` + `fetch` (`propertyService.js`).
- [x] **3.2** Catálogo con Cards de Bootstrap: título, foto, ubicación y precio; clic abre el modal.
- [x] **3.3** Modal de detalle con carousel de Bootstrap, descripción e íconos (superficie,
      dormitorios, baños, piscina condicional, estacionamientos, año de construcción).
- [x] **3.4** Buscador en tiempo real sobre los datos cargados, sin recargar la página.
- [x] **3.5** Edición de propiedades reflejada al instante en la interfaz (+ intento de
      sincronización con backend).
- [x] **3.6** Eliminación con confirmación previa vía SweetAlert2 (+ intento de DELETE al backend).
- [x] **3.7** Interfaz responsiva, con identidad visual propia (paleta café/madera, tipografía
      editorial, micro-interacciones de hover).
