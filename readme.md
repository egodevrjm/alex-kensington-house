# Albury House

React/Vite private house app for Albury House.

## Local Development

```sh
npm install
npm run dev
```

## Production Build

```sh
npm run build
```

The build publishes to `dist` and copies `assets/rooms` into `dist/assets/rooms`, so deployed room images resolve at `/assets/rooms/...`.

## App Structure

- `src/App.jsx` contains the React house explorer, atlas, image library, operations view and staff view.
- `src/app.css` contains the current responsive interface styling.
- `data.js` remains the shared house data source for the app and MCP function.
- `assets/rooms` contains the original PNGs plus WebP versions used by the React app.

## MCP Server

A Model Context Protocol server is exposed at `/mcp` through the Netlify function. It reads `data.js`, so the website and MCP server share the same house data.
