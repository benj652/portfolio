import { defineConfig } from "vite";

export default defineConfig({
  base: "/", // Use root base path for preview
  build: {
    assetsDir: "assets",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]"
      }
    }
  }
});

