# Radio — prototype

Stack: Vite 5 · React 18 · TypeScript 5 · Tailwind CSS 3 · react-router-dom 6

## Start

```bash
npm install
npm run dev        # http://localhost:5173
```

---

## Where to change things

### Palette
`src/styles/tokens.css` — toutes les valeurs dans `:root`.  
Couleurs : `--bg`, `--fg`, `--accent`, `--grid-line`.

### Grille
Props du composant `<GridBackground />` dans `src/App.tsx` :

| Prop | Défaut |
|---|---|
| `cellSize` | `var(--grid-size)` (8 px) |
| `lineColor` | `var(--grid-line)` |
| `lineOpacity` | _(non défini)_ |
| `bgColor` | `var(--bg)` |

Ou modifier directement `--grid-size` et `--grid-line` dans `tokens.css`.

### Transitions d'image
- **Durée / easing** → `--media-transition-duration` et `--media-transition-easing` dans `tokens.css`
- **Type** → prop `transitionType` sur `<MediaStage />` dans `src/pages/Home.tsx`
  - `'crossfade'` ✅ implémenté
  - `'cut'` / `'slide'` → switch prêt dans `src/components/MediaStage.tsx`, à compléter
- **Mode de fusion** → `--media-blend-mode` dans `tokens.css` (ex. `multiply`, `screen`…)
- **Intervalle auto** → prop `autoRotateMs` sur `<MediaStage />` (default 6000 ms)

### Images
1. Déposer les fichiers dans `public/images/`
2. Mettre à jour `public/images/manifest.json` (format ci-dessous)

```json
[
  {
    "src": "/images/monimage.jpg",
    "alt": "Description",
    "meta": { "dominantColor": "#abc", "palette": [], "tags": [] }
  }
]
```

### Flux audio
`src/App.tsx`, attribut `src` de la balise `<audio>`.  
Chercher `TODO: replace stream URL`.

### Hub Nina Protocol
`src/pages/Home.tsx` → prop `hubId` sur `<NinaEmbed />`.  
`src/hooks/useNinaReleases.ts` → squelette prêt pour `@nina-protocol/nina-sdk`.
