# Albury House

Private house intranet web app for Albury House.

## Open

Open `index.html` in a browser.

## Image Slots And Floor Maps

The House Tour currently renders generated SVG outline maps from
`FLOOR_PLAN_SHAPES` in `data.js`. The maps are clickable in the app and cover
all seven floors.

The full-house atlas image is read from:

- `assets/atlas/albury-house-atlas.png`

Per-floor atlas crops are read from:

- `assets/atlas/floors/top-floor.png`
- `assets/atlas/floors/third-floor.png`
- `assets/atlas/floors/second-floor.png`
- `assets/atlas/floors/first-floor-music-nobile.png`
- `assets/atlas/floors/raised-ground-floor.png`
- `assets/atlas/floors/upper-basement-lower-ground.png`
- `assets/atlas/floors/lower-basement.png`

Room tour images are read from `assets/kensington_house_images/`, which contains
the full 72-image Kensington set.

Examples:

- `assets/kensington_house_images/ground_entrance.png`
- `assets/kensington_house_images/first_musicroom.png`
- `assets/kensington_house_images/top_archive.png`
- `assets/kensington_house_images/top_roofterrace.png`

The full room list and image paths live in `data.js`.
The legacy curated room images remain in `assets/rooms/` for reference.

## Current Sections

- Dashboard
- House Tour
- Image Archive
- Digital Systems
- Staff Directory
- Meals Schedule
- Room Booking
- Wellness Spa Schedule
- Arrivals
- Collections
- House Manual

Bookings and house mode are stored in browser local storage.

## MCP Server

A Model Context Protocol server is exposed at `/mcp` (POST, JSON-RPC 2.0,
streamable-HTTP transport). It surfaces the house data — floors, rooms, staff,
meals, bookings, digital room systems, wellness, arrivals, readiness,
collections and the manual — as MCP tools and `house://*` resources.

To connect from an HTTP-capable MCP client:

```json
{
  "mcpServers": {
    "albury-house": {
      "url": "https://<your-site>.netlify.app/mcp"
    }
  }
}
```

A browser GET request to `/mcp` returns a human-readable index of the
available tools and resources. The function reads `data.js` at runtime, so the
website and MCP server share a single source of truth.
