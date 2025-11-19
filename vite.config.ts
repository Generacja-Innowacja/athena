import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    dts({
      include: ["lib"],
      tsconfigPath: "./tsconfig.app.json",
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./lib"),
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, "lib/main.ts"),
      formats: ["es"],
    },
  },
});
