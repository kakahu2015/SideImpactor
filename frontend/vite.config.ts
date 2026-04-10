import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const frontendDir = dirname(fileURLToPath(import.meta.url))
const repoRootDir = resolve(frontendDir, "..")

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    fs: {
      allow: [repoRootDir],
    },
    proxy: {
      "/wisp": { target: "ws://localhost:8787", ws: true },
    },
  },
  resolve: {
    alias: {
      webmuxd: resolve(repoRootDir, "dependencies/webmuxd/lib/webmuxd.js"),
    },
    preserveSymlinks: true,
  },
  optimizeDeps: {
    include: ["@lbr77/anisette-js/browser"],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/, /\/lib\/webmuxd\.js/, /\/lib\/core\/.*\.js/],
    },
  },
})
