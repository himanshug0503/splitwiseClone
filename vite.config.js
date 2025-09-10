import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      "/api": {
        target: "http://localhost:5000", // your backend server
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    outDir: "dist",
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
});
