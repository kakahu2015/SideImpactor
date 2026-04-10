import { mkdir, copyFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const scriptDir = dirname(fileURLToPath(import.meta.url))
const packageDir = resolve(scriptDir, "..")
const workspaceRootDir = resolve(packageDir, "../..")
const sourceDir = resolve(workspaceRootDir, "wasm/openssl/pkg")
const targetDir = resolve(packageDir, "lib/openssl-wasm")

const filesToCopy = [
  "openssl_wasm.js",
  "openssl_wasm.d.ts",
  "openssl_wasm_bg.wasm",
  "openssl_wasm_bg.wasm.d.ts",
]

await mkdir(targetDir, { recursive: true })

for (const fileName of filesToCopy) {
  await copyFile(resolve(sourceDir, fileName), resolve(targetDir, fileName))
}
