# Axion Next.js BFF

This folder is an optional Next.js backend-for-frontend edge for Axion Process OS.

The Axion API core remains `server.mjs`. The BFF forwards browser-facing API traffic to the core and gives the product a clean place for future SSR auth gates, public-domain routing, middleware, app-router pages and deployment-specific headers.

## Local

```bash
AXION_API_BASE_URL=http://127.0.0.1:8899 pnpm install
AXION_API_BASE_URL=http://127.0.0.1:8899 pnpm dev
```

Health:

- `GET /api/health` checks the BFF and upstream core.
- `GET /api/axion/health` proxies to `server.mjs` `/api/health`.
- `GET /api/core/health` is provided by `next.config.mjs` rewrites.

## Production

Set:

- `AXION_API_BASE_URL=https://your-api-core-domain`
- `NEXT_PUBLIC_APP_NAME=Axion Process OS`
- `PORT=3000`

Build with `next build`. The config uses `output: "standalone"` for self-hosted container deployment.
