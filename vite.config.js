import { defineConfig } from "vite";

export default defineConfig({
  base: "/portfolio/", // GitHub Pages expects the repository name in the path
  build: {
    assetsDir: "assets",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]"
      }
    }
  }
});

