import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "bresenham",
      formats: ["es", "cjs", "umd"],
      fileName: (format) =>
        `index.${{ es: "mjs", umd: "umd.js", cjs: "cjs" }[format]}`,
    },
  },
});
