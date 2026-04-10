# AGENTS Guide

## Communication
- Reply to user in Chinese.
- Keep source code, identifiers, and comments in English.

## Package Manager
- Use `bun` for all Node.js dependency and script operations.

## Project Layout
- Core npm package source: `dependencies/webmuxd/src/`
- High-level iMobileDevice interactions: `dependencies/webmuxd/src/core/imobiledevice-client.ts`
- Browser demo app: `frontend/`
- Cloudflare Workers demo backend: `backend/`
- OpenSSL Rust/WASM project: `wasm/openssl/`

## Key Rule: Avoid Logic Duplication
- Do not re-implement usbmux/lockdown/AFC/InstProxy protocol logic in `frontend`.
- `frontend/src/main.ts` must consume workspace package exports from `webmuxd`.
- If behavior changes are needed, modify `dependencies/webmuxd/` first, then wire it in frontend.

## Build & Validate
- Root build: `bun run build`
- Root lint: `bun run lint`
- Root test: `bun run test`
- Frontend build: `cd frontend && bun run build`

## Change Style
- Keep changes minimal, focused, and consistent with existing style.
- Prefer removing dead code over keeping legacy paths.
