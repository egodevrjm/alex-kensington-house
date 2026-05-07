import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PROTOCOL_VERSION = '2025-03-26';
const SERVER_INFO = { name: 'albury-house-mcp', version: '1.0.0' };

let cachedData = null;
function loadHouseData() {
  if (cachedData) return cachedData;
  const candidates = [
    path.join(process.cwd(), 'data.js'),
    path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'data.js'),
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'data.js'),
  ];
  let source = null;
  for (const p of candidates) {
    try {
      source = fs.readFileSync(p, 'utf8');
      break;
    } catch {}
  }
  if (!source) throw new Error('Could not locate data.js');
  source = source.replace(/\nexport\s+\{[^}]+\};\s*$/m, '');
  cachedData = new Function(`${source}\nreturn HOUSE_DATA;`)();
  return cachedData;
}

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function shapeRoom([id, name, description, image], floor) {
  return { id, name, description, image, floor_id: floor.id, floor_name: floor.name };
}

function allRooms(data) {
  return data.floors.flatMap((f) => f.rooms.map((r) => shapeRoom(r, f)));
}

function findRoom(data, roomId) {
  for (const floor of data.floors) {
    const room = floor.rooms.find((r) => r[0] === roomId);
    if (room) return shapeRoom(room, floor);
  }
  return null;
}

function shapeStaff([department, name, role, responsibilities, status]) {
  return { department, name, role, responsibilities, status };
}
function shapeMeal([time, name, location, notes, lead]) {
  return { time, name, location, notes, lead };
}
function shapeBooking([date, time, space, purpose, notes]) {
  return { date, time, space, purpose, notes };
}
function shapeWellness([time, area, activity, status]) {
  return { time, area, activity, status };
}
function shapeArrival([time, gate, who, notes]) {
  return { time, gate, who, notes };
}
function shapeReadiness([area, status]) {
  return { area, status };
}
function shapeCollection([category, scale, notes]) {
  return { category, scale, notes };
}
function shapeManual([topic, guidance]) {
  return { topic, guidance };
}
function shapeImage([floor, label, kind, src, floorId, roomId]) {
  return { floor, label, kind, src, floor_id: floorId, room_id: roomId };
}

function roomSystemFor(data, roomId, floor, roomName) {
  const defaults = data.smartHome?.floorDefaults?.[floor.id] || ['20.5 C', 'House neutral', 'Balanced air', 'House quiet', 'Soft hush'];
  const settings = data.smartHome?.roomOverrides?.[roomId] || defaults;
  const roomIndex = floor.rooms.findIndex(([id]) => id === roomId) + 1;
  const rawFloorKey = data.floorGuide.find((item) => item.id === floor.id)?.key || floor.id.slice(0, 2).toUpperCase();
  const floorKey = rawFloorKey.startsWith('-') ? `B${rawFloorKey.slice(1)}` : rawFloorKey;
  return {
    room_id: roomId,
    room_name: roomName,
    floor_id: floor.id,
    floor_name: floor.name,
    panel_id: `AH-${floorKey}-${String(roomIndex).padStart(2, '0')}`,
    assistant: data.smartHome?.assistantName || 'Albury',
    network: data.smartHome?.network || 'Private house mesh',
    status: 'Panel online',
    temperature: settings[0],
    scent: settings[1],
    air: settings[2],
    music: settings[3],
    ambient_noise: settings[4],
    lighting: floor.id === 'upper-basement' ? 'Evening low scene' : floor.id === 'top-floor' ? 'Private warm scene' : 'Adaptive house scene',
    privacy: floor.id === 'top-floor' ? 'Private access' : floor.id.includes('basement') ? 'Service-aware' : 'Guest-aware',
    service_route: floor.id === 'first-floor' || floor.id.includes('basement') ? 'Service stair available' : 'Main stair and lift',
  };
}

function allRoomSystems(data) {
  return data.floors.flatMap((floor) => floor.rooms.map(([id, name]) => roomSystemFor(data, id, floor, name)));
}

const TOOLS = [
  {
    name: 'house_overview',
    description: 'High-level overview of Albury House: navigation sections, operating modes, floor guide, and feature rooms.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    handler: (data) => ({
      house_name: data.houseName,
      subtitle: data.houseSubtitle,
      sections: data.nav.map(([id, label]) => ({ id, label })),
      modes: data.modes,
      floor_guide: data.floorGuide,
      smart_home: {
        assistant: data.smartHome.assistantName,
        network: data.smartHome.network,
        overview: data.smartHome.overview,
        capabilities: data.smartHome.capabilities,
      },
      feature_rooms: data.featureImages.map(([floor, room, caption, image, floorId, roomId]) => ({
        floor, room, caption, image, floor_id: floorId, room_id: roomId,
      })),
    }),
  },
  {
    name: 'list_floors',
    description: 'List every floor of the house with id, name, role and mood.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    handler: (data) => data.floors.map(({ id, name, role, mood, planImage }) => ({
      id, name, role, mood, plan_image: planImage, room_count: data.floors.find((f) => f.id === id).rooms.length,
    })),
  },
  {
    name: 'list_floor_guide',
    description: 'Return the interactive vertical floor guide for Albury House.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    handler: (data) => data.floorGuide,
  },
  {
    name: 'get_floor',
    description: 'Get a single floor including all its rooms.',
    inputSchema: {
      type: 'object',
      required: ['floor_id'],
      properties: { floor_id: { type: 'string', description: 'Floor id, e.g. "raised-ground", "first-floor".' } },
      additionalProperties: false,
    },
    handler: (data, { floor_id }) => {
      const floor = data.floors.find((f) => f.id === floor_id);
      if (!floor) throw new Error(`Unknown floor: ${floor_id}`);
      return {
        id: floor.id,
        name: floor.name,
        role: floor.role,
        mood: floor.mood,
        plan_image: floor.planImage,
        rooms: floor.rooms.map((r) => shapeRoom(r, floor)),
      };
    },
  },
  {
    name: 'list_rooms',
    description: 'List every room across the house. Optionally filter by floor.',
    inputSchema: {
      type: 'object',
      properties: { floor_id: { type: 'string', description: 'Optional floor id to filter by.' } },
      additionalProperties: false,
    },
    handler: (data, args = {}) => {
      const rooms = allRooms(data);
      return args.floor_id ? rooms.filter((r) => r.floor_id === args.floor_id) : rooms;
    },
  },
  {
    name: 'get_room',
    description: 'Look up a room by id and return its full record.',
    inputSchema: {
      type: 'object',
      required: ['room_id'],
      properties: { room_id: { type: 'string' } },
      additionalProperties: false,
    },
    handler: (data, { room_id }) => {
      const room = findRoom(data, room_id);
      if (!room) throw new Error(`Unknown room: ${room_id}`);
      return room;
    },
  },
  {
    name: 'search_rooms',
    description: 'Free-text search across room names and descriptions.',
    inputSchema: {
      type: 'object',
      required: ['query'],
      properties: { query: { type: 'string' }, limit: { type: 'integer', minimum: 1, maximum: 50 } },
      additionalProperties: false,
    },
    handler: (data, { query, limit = 10 }) => {
      const q = String(query).toLowerCase();
      return allRooms(data)
        .filter((r) => r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q))
        .slice(0, limit);
    },
  },
  {
    name: 'list_staff',
    description: 'List staff. Optionally filter by department or status.',
    inputSchema: {
      type: 'object',
      properties: {
        department: { type: 'string', description: 'e.g. "House", "Housekeeping", "Kitchen".' },
        status: { type: 'string', description: 'e.g. "On duty", "On call", "Scheduled".' },
      },
      additionalProperties: false,
    },
    handler: (data, args = {}) => {
      let staff = data.staff.map(shapeStaff);
      if (args.department) staff = staff.filter((s) => s.department.toLowerCase() === args.department.toLowerCase());
      if (args.status) staff = staff.filter((s) => s.status.toLowerCase() === args.status.toLowerCase());
      return staff;
    },
  },
  {
    name: 'get_meals_schedule',
    description: 'Return today\'s meal service schedule.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    handler: (data) => data.meals.map(shapeMeal),
  },
  {
    name: 'list_bookings',
    description: 'List room bookings. Optionally filter by date (YYYY-MM-DD) or space name.',
    inputSchema: {
      type: 'object',
      properties: {
        date: { type: 'string', description: 'ISO date e.g. 2026-05-04.' },
        space: { type: 'string', description: 'Booking space, e.g. "Music Nobile".' },
      },
      additionalProperties: false,
    },
    handler: (data, args = {}) => {
      let bookings = data.bookings.map(shapeBooking);
      if (args.date) bookings = bookings.filter((b) => b.date === args.date);
      if (args.space) bookings = bookings.filter((b) => b.space.toLowerCase().includes(args.space.toLowerCase()));
      return { spaces: data.bookingSpaces, bookings };
    },
  },
  {
    name: 'get_wellness_schedule',
    description: 'Return today\'s wellness/spa schedule.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    handler: (data) => data.wellness.map(shapeWellness),
  },
  {
    name: 'list_arrivals',
    description: 'Return scheduled arrivals (deliveries, guests, contractors).',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    handler: (data) => data.arrivals.map(shapeArrival),
  },
  {
    name: 'get_readiness',
    description: 'Return readiness status for principal spaces.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    handler: (data) => data.readiness.map(shapeReadiness),
  },
  {
    name: 'list_collections',
    description: 'Return the house collections summary (art, fashion archive, books, vinyl, watches, jewellery).',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    handler: (data) => data.collections.map(shapeCollection),
  },
  {
    name: 'get_house_manual',
    description: 'Return house manual entries covering privacy, routes, archive handling, etc.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    handler: (data) => data.manual.map(shapeManual),
  },
  {
    name: 'list_control_capabilities',
    description: 'Return the whole-house digital control layers: temperature, scent, air, music, ambient noise, lighting, privacy and service.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    handler: (data) => ({
      assistant: data.smartHome.assistantName,
      network: data.smartHome.network,
      overview: data.smartHome.overview,
      capabilities: data.smartHome.capabilities.map(([id, name, description]) => ({ id, name, description })),
    }),
  },
  {
    name: 'list_room_systems',
    description: 'List digital control panel profiles for every room. Optionally filter by floor id.',
    inputSchema: {
      type: 'object',
      properties: { floor_id: { type: 'string', description: 'Optional floor id to filter by.' } },
      additionalProperties: false,
    },
    handler: (data, args = {}) => {
      let systems = allRoomSystems(data);
      if (args.floor_id) systems = systems.filter((system) => system.floor_id === args.floor_id);
      return systems;
    },
  },
  {
    name: 'get_room_system',
    description: 'Get the digital control panel profile for a single room.',
    inputSchema: {
      type: 'object',
      required: ['room_id'],
      properties: { room_id: { type: 'string' } },
      additionalProperties: false,
    },
    handler: (data, { room_id }) => {
      const system = allRoomSystems(data).find((item) => item.room_id === room_id);
      if (!system) throw new Error(`Unknown room system: ${room_id}`);
      return system;
    },
  },
  {
    name: 'list_house_modes',
    description: 'Return the operating modes of the house (Residence, Away, Music Nobile, Event, Quiet).',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    handler: (data) => data.modes,
  },
  {
    name: 'list_image_archive',
    description: 'Return the room/overview image archive. Optionally filter by floor or kind.',
    inputSchema: {
      type: 'object',
      properties: {
        floor_id: { type: 'string' },
        kind: { type: 'string', description: 'e.g. "Exact room image", "Floor overview reference", "Contact sheet".' },
      },
      additionalProperties: false,
    },
    handler: (data, args = {}) => {
      let images = data.imageArchive.map(shapeImage);
      if (args.floor_id) images = images.filter((i) => i.floor_id === args.floor_id);
      if (args.kind) images = images.filter((i) => i.kind.toLowerCase() === args.kind.toLowerCase());
      return images;
    },
  },
];

const RESOURCES = [
  { uri: 'house://overview', name: 'House Overview', description: 'Sections, modes, and feature rooms.', mimeType: 'application/json' },
  { uri: 'house://floor-guide', name: 'Floor Guide', description: 'Interactive floor guide metadata.', mimeType: 'application/json' },
  { uri: 'house://floors', name: 'Floors', description: 'All floors with their rooms.', mimeType: 'application/json' },
  { uri: 'house://images', name: 'Image Archive', description: 'Room and overview image archive.', mimeType: 'application/json' },
  { uri: 'house://systems', name: 'Digital Room Systems', description: 'Smart assistant and room control panel profiles.', mimeType: 'application/json' },
  { uri: 'house://staff', name: 'Staff Directory', description: 'Full staff list.', mimeType: 'application/json' },
  { uri: 'house://meals', name: 'Meals Schedule', description: 'Today\'s meal service.', mimeType: 'application/json' },
  { uri: 'house://bookings', name: 'Bookings', description: 'Room bookings and bookable spaces.', mimeType: 'application/json' },
  { uri: 'house://wellness', name: 'Wellness Schedule', description: 'Spa and wellness schedule.', mimeType: 'application/json' },
  { uri: 'house://arrivals', name: 'Arrivals', description: 'Scheduled arrivals.', mimeType: 'application/json' },
  { uri: 'house://readiness', name: 'Readiness', description: 'Readiness status by space.', mimeType: 'application/json' },
  { uri: 'house://collections', name: 'Collections', description: 'Art, fashion, books, vinyl, watches, jewellery.', mimeType: 'application/json' },
  { uri: 'house://manual', name: 'House Manual', description: 'Operating manual entries.', mimeType: 'application/json' },
];

function readResource(data, uri) {
  switch (uri) {
    case 'house://overview':
      return {
        house_name: data.houseName,
        subtitle: data.houseSubtitle,
        sections: data.nav.map(([id, label]) => ({ id, label })),
        modes: data.modes,
        floor_guide: data.floorGuide,
        smart_home: {
          assistant: data.smartHome.assistantName,
          network: data.smartHome.network,
          overview: data.smartHome.overview,
          capabilities: data.smartHome.capabilities,
        },
      };
    case 'house://floor-guide':
      return data.floorGuide;
    case 'house://floors':
      return data.floors.map((f) => ({
        id: f.id, name: f.name, role: f.role, mood: f.mood,
        rooms: f.rooms.map((r) => shapeRoom(r, f)),
      }));
    case 'house://staff':
      return data.staff.map(shapeStaff);
    case 'house://images':
      return data.imageArchive.map(shapeImage);
    case 'house://systems':
      return {
        assistant: data.smartHome.assistantName,
        network: data.smartHome.network,
        overview: data.smartHome.overview,
        capabilities: data.smartHome.capabilities.map(([id, name, description]) => ({ id, name, description })),
        rooms: allRoomSystems(data),
      };
    case 'house://meals':
      return data.meals.map(shapeMeal);
    case 'house://bookings':
      return { spaces: data.bookingSpaces, bookings: data.bookings.map(shapeBooking) };
    case 'house://wellness':
      return data.wellness.map(shapeWellness);
    case 'house://arrivals':
      return data.arrivals.map(shapeArrival);
    case 'house://readiness':
      return data.readiness.map(shapeReadiness);
    case 'house://collections':
      return data.collections.map(shapeCollection);
    case 'house://manual':
      return data.manual.map(shapeManual);
    default:
      throw new Error(`Unknown resource: ${uri}`);
  }
}

function jsonRpcResult(id, result) {
  return { jsonrpc: '2.0', id, result };
}
function jsonRpcError(id, code, message, data) {
  const err = { code, message };
  if (data !== undefined) err.data = data;
  return { jsonrpc: '2.0', id: id ?? null, error: err };
}

function handleRpc(message, data) {
  const { id, method, params } = message;
  switch (method) {
    case 'initialize':
      return jsonRpcResult(id, {
        protocolVersion: PROTOCOL_VERSION,
        serverInfo: SERVER_INFO,
        capabilities: {
          tools: { listChanged: false },
          resources: { listChanged: false, subscribe: false },
        },
        instructions:
          'Albury House intranet MCP. Use tools to query floors, rooms, digital room systems, images, staff, meals, bookings, wellness, arrivals, collections, and the house manual. Resources are also available under house://*.',
      });

    case 'ping':
      return jsonRpcResult(id, {});

    case 'tools/list':
      return jsonRpcResult(id, {
        tools: TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema })),
      });

    case 'tools/call': {
      const tool = TOOLS.find((t) => t.name === params?.name);
      if (!tool) return jsonRpcError(id, -32602, `Unknown tool: ${params?.name}`);
      try {
        const result = tool.handler(data, params?.arguments ?? {});
        return jsonRpcResult(id, {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          isError: false,
        });
      } catch (err) {
        return jsonRpcResult(id, {
          content: [{ type: 'text', text: `Error: ${err.message}` }],
          isError: true,
        });
      }
    }

    case 'resources/list':
      return jsonRpcResult(id, { resources: RESOURCES });

    case 'resources/read': {
      const uri = params?.uri;
      try {
        const contents = readResource(data, uri);
        return jsonRpcResult(id, {
          contents: [{ uri, mimeType: 'application/json', text: JSON.stringify(contents, null, 2) }],
        });
      } catch (err) {
        return jsonRpcError(id, -32602, err.message);
      }
    }

    case 'prompts/list':
      return jsonRpcResult(id, { prompts: [] });

    default:
      if (method?.startsWith('notifications/')) return null;
      return jsonRpcError(id, -32601, `Method not found: ${method}`);
  }
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Mcp-Session-Id, Authorization',
  'Access-Control-Expose-Headers': 'Mcp-Session-Id',
};

export default async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (request.method === 'GET') {
    const accept = request.headers.get('accept') || '';
    if (accept.includes('text/html')) {
      return new Response(landingPage(), {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8', ...CORS_HEADERS },
      });
    }
    return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST, OPTIONS', ...CORS_HEADERS } });
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST, OPTIONS', ...CORS_HEADERS } });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json(jsonRpcError(null, -32700, 'Parse error'), { status: 400, headers: CORS_HEADERS });
  }

  let data;
  try {
    data = loadHouseData();
  } catch (err) {
    return Response.json(jsonRpcError(body?.id ?? null, -32603, `Server data error: ${err.message}`), {
      status: 500, headers: CORS_HEADERS,
    });
  }

  const messages = Array.isArray(body) ? body : [body];
  const responses = [];
  for (const msg of messages) {
    const reply = handleRpc(msg, data);
    if (reply) responses.push(reply);
  }

  if (responses.length === 0) {
    return new Response(null, { status: 202, headers: CORS_HEADERS });
  }

  const payload = Array.isArray(body) ? responses : responses[0];
  return Response.json(payload, {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
};

export const config = { path: '/mcp' };

function landingPage() {
  const tools = TOOLS.map((t) => `<li><code>${t.name}</code> &mdash; ${t.description}</li>`).join('');
  const resources = RESOURCES.map((r) => `<li><code>${r.uri}</code> &mdash; ${r.description}</li>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><title>Albury House MCP</title>
<style>body{font:14px/1.5 system-ui,sans-serif;max-width:780px;margin:3rem auto;padding:0 1.25rem;color:#1a1a1a}
code{background:#f4f1ec;padding:.1rem .35rem;border-radius:3px}h1{margin-bottom:.25rem}
.muted{color:#666;margin-top:0}ul{padding-left:1.25rem}li{margin:.35rem 0}</style></head><body>
<h1>Albury House MCP</h1>
<p class="muted">Streamable-HTTP Model Context Protocol server. POST JSON-RPC requests to this URL.</p>
<h2>Tools</h2><ul>${tools}</ul>
<h2>Resources</h2><ul>${resources}</ul>
<h2>Connect</h2>
<p>Configure an MCP client with the server URL of this page. Example for an HTTP MCP client:</p>
<pre><code>{
  "mcpServers": {
    "albury-house": { "url": "<this-url>" }
  }
}</code></pre>
</body></html>`;
}
