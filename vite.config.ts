import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isDemo = mode === "demo";

  if (isDemo) {
    return {
      base: "./",
      build: {
        outDir: "demo",
      },
    };
  }

  return {
    build: {
      lib: {
        entry: "src/index.ts",
        name: "bresenham",
        formats: ["es", "cjs", "umd"],
        fileName: (format) =>
          `index.${{ es: "mjs", umd: "umd.js", cjs: "cjs" }[format]}`,
      },
    },
  };
});
