# sideload.js

This repository is organized as a Bun workspace with four top-level areas:

- `frontend/`: browser signing UI
- `backend/`: Cloudflare Workers Wisp proxy demo
- `dependencies/webmuxd/`: the publishable `webmuxd` package consumed by the frontend
- `wasm/openssl/`: the Rust/WASM OpenSSL bridge whose build artifacts are copied into `dependencies/webmuxd/lib/openssl-wasm`

## Install

```bash
bun install
```

## Validate

```bash
bun run build
bun run lint
bun run test
cd frontend && bun run build
cd backend && bun run check
```

## Workspace Notes

- `frontend/src/main.ts` must consume `webmuxd` package exports instead of duplicating usbmux/lockdown/AFC/InstProxy logic.
- Changes to device communication, pairing, or TLS behavior belong in `dependencies/webmuxd/src/` first.
- `wasm/openssl/pkg` is treated as a build artifact source for the package copy step.
