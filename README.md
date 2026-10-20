# Nuxt Admin Boilerplate

Lean starter extracted from the Engiora admin dashboard structure.

## What’s included

- Nuxt 3 + Tailwind + Pinia (persisted) + PrimeVue + Yup
- Auth store + auth middleware + auth service (`login`, `fetchUser`, password reset)
- HTTP helper (`composables/use-http-request.js`)
- Stores: auth, toast, loading, sidebar, tab
- Layout shells: `default`, `auth`, `plain`
- Pages: login, forgot password, dashboards index
- Shared breakpoints / color tokens in `tailwind.config.js`

### Global components (`components/global/`)

| Component | Use |
|-----------|-----|
| `InputField` | Text / password / date / time inputs + Yup |
| `TextareaField` | Textarea + validation |
| `DropdownField` | PrimeVue Dropdown / MultiSelect |
| `MultiSelectBasic` | Lightweight multi-select |
| `FileUploadField` | Image / PDF upload UI |
| `QuillEditor` | Rich text editor |
| `Table` | Data table + actions / checkboxes |
| `Pagination` / `Pagination2` | Pagers |
| `Search` | Search input |
| `Button` | Primary / secondary / danger buttons |
| `ButtonSwitch` / `ButtonSwitch2` | Tabbed section switchers |
| `SideSwitch` | Vertical tab switcher |
| `Modal` | Simple modal shell |
| `Card` / `RecordsCard` | Cards / KPI-style cards |
| `Title` / `BodyTitle` | Page headings |
| `Toast` / `Loading` | Feedback overlays |

## Not included

- `node_modules` (install after you copy this folder)
- Domain pages (schools, community, etc.)
- Heavy brand assets

## Quick start

1. Copy this `boilerplate` folder to your new project location (or rename it).
2. Create `.env` from `.env.example` and set `API_URL`.
3. Install and run:

```bash
npm install
npm run dev
```

4. Open http://localhost:3002 — unauthenticated users go to `/auth/login`. After login, they land on `/dashboards`.

## Production

The app runs with `ssr: false`, so it is deployed as static files served by nginx (no Node process). Requires Node 22.12+.

```bash
npm ci
npm run generate   # outputs to .output/public
```

`API_URL` is baked in at build time, so set it in `.env` before running `npm run generate`.

nginx serves `.output/public` and falls back to `index.html` for client-side routes:

```nginx
root /home/ploi/client.venpadi.com/.output/public;
index index.html;

location /_nuxt/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    try_files $uri =404;
}

location / {
    try_files $uri $uri/ /index.html;
}
```

## Suggested next steps

- Wire real API roles in `services/auth.js`
- Expand `components/layouts/Sidebar.vue` nav items
- Add feature stores under `store/` as needed
- Adjust branding in `nuxt.config.ts` and layouts
