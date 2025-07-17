import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  assetsDir: "assets",
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  base: "/",
  resolve: {
    alias: {
      "@": "/src",
      components: "/src/components",
      utils: "/src/utils",
      styles: "/src/styles",
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
