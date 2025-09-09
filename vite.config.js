import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
  },
  // 👇 Tells Vite to always serve index.html for unknown routes
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
