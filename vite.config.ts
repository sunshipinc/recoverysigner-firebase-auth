import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { lingui } from "@lingui/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    /**
     * Lowest possible target at the moment to support:
     * - Chrome >=64
     * - Firefox >=67
     * - Safari >=11.1
     * - Edge >=79
     *
     * @link https://vite.dev/guide/build#browser-compatibility
     */
    target: "es2015",
  },
  server: {
    port: 3000,
  },
  plugins: [
    react({
      babel: {
        plugins: ["macros"],
      },
    }),
    lingui(),
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      config: path.resolve(__dirname, "./src/config"),
      ducks: path.resolve(__dirname, "./src/ducks"),
      helpers: path.resolve(__dirname, "./src/helpers"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      locales: path.resolve(__dirname, "./src/locales"),
      types: path.resolve(__dirname, "./src/types"),
    },
  },
});
