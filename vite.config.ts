import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias pour ton code
      reduxStore: path.resolve(__dirname, "src/redux"),
      assets: path.resolve(__dirname, "src/assets"),
      layouts: path.resolve(__dirname, "src/layouts"),
      contexts: path.resolve(__dirname, "src/contexts"),
      helper: path.resolve(__dirname, "src/helper"),
      theme: path.resolve(__dirname, "src/theme"),
      components: path.resolve(__dirname, "src/components"),
      utils: path.resolve(__dirname, "src/utils"),
      variable: path.resolve(__dirname, "src/variable"),
      views: path.resolve(__dirname, "src/views"),
      config: path.resolve(__dirname, "src/config"),

      // Polyfills Node (si tu en as besoin)
      crypto: "crypto-browserify",
      querystring: "querystring-es3",
      url: "url",

      react: path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom"),
    },
  },
});
