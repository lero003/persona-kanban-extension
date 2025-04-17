# Persona Kanban (Chrome Extension)

A colorful, Persona‐inspired offline‑first Kanban board built with React, Vite and Manifest V3.

## Features

* Drag & Drop columns and cards  
* Offline‑first data persistence (IndexedDB / Dexie)  
* Checklist & attachment placeholders  
* Pop, primary‑color UI based on the *Persona* game series  
* Ready for future cloud‑sync (Firebase / Supabase)

## Quick Start

```bash
# 1. install dependencies
npm install

# 2. run dev build (watch mode)
npm run dev        # dist/ folder is created automatically

# 3. load into Chrome
#    - open chrome://extensions
#    - enable 'Developer mode'
#    - click 'Load unpacked'
#    - select the dist/ folder
```

### Production build

```bash
npm run build
```

Uploads the generated `dist/` folder directly to the Chrome Web Store.

## License

MIT