import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Forzar modo producción cuando se construye para deploy
  const isProduction = mode === 'production' || process.env.NODE_ENV === 'production'
  
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/graphql': {
          target: 'http://localhost:5000',
          changeOrigin: true
        }
      }
    },
    build: {
      outDir: '../server/public',
      emptyOutDir: true,
      sourcemap: false,
      // Configuración específica para producción
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Eliminar console.log en producción
        }
      }
    },
    // Esto es clave: definir las variables de entorno en el build
    define: {
      // Solo si necesitas forzar la URL en producción
      ...(isProduction ? {
        'import.meta.env.VITE_API_URL': JSON.stringify('https://mern-graphql-1bb4.onrender.com/graphql')
      } : {})
    }
  }
})