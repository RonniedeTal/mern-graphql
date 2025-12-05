import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const isProduction =
    mode === "production" || process.env.NODE_ENV === "production";

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/graphql": {
          target: "http://localhost:5000",
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: "../server/public",
      emptyOutDir: true,
      sourcemap: false,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
    define: {
      "import.meta.env.VITE_API_URL": JSON.stringify(
        process.env.VITE_API_URL || "http://localhost:5000/graphql"
      ),
    },
  };
});
