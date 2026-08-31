import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isDemo = mode === "demo";

  if (isDemo) {
    return {
      root: "demo",
      base: "./",
      build: {
        outDir: "../dist/docs",
        emptyOutDir: true,
        rollupOptions: {
          input: {
            index: "demo/index.html",
            graph: "demo/graph.html",
          },
        },
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
