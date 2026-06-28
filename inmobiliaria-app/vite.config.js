import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// Configuración estándar de Vite para el proyecto React.
// host: true permite probar la app desde otros dispositivos de la red local
// y facilita las pruebas cuando luego se despliegue en la instancia AWS (Ubuntu Server).
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
})
