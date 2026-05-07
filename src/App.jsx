import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BadgeDollarSign,
  BookOpen,
  CalendarDays,
  ChevronRight,
  CircleDot,
  Disc3,
  Gem,
  Grid3X3,
  Home,
  Images,
  Map,
  Palette,
  Search,
  Shirt,
  SlidersHorizontal,
  Sparkles,
  Watch,
  UsersRound,
  X
} from "lucide-react";
import { HOUSE_DATA, FLOOR_PLAN_SHAPES, ROOM_GALLERIES, COLLECTION_ITEMS } from "../data.js";

const tabs = [
  ["explore", "Explore", Home],
  ["atlas", "Atlas", Map],
  ["collection", "Collection", Palette],
  ["library", "Library", Images],
  ["ops", "Operations", SlidersHorizontal],
  ["team", "Team", UsersRound]
];

const initialFloor = HOUSE_DATA.floors.find((floor) => floor.id === "raised-ground") || HOUSE_DATA.floors[0];
const today = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric"
}).format(new Date());

function App() {
  const [activeTab, setActiveTab] = useState("explore");
  const [floorId, setFloorId] = useState(initialFloor.id);
  const [roomId, setRoomId] = useState(initialFloor.rooms[0][0]);
  const [modeId, setModeId] = useState(localStorage.getItem("albury.mode") || "residence");
  const [query, setQuery] = useState("");
  const [collectionQuery, setCollectionQuery] = useState("");
  const [collectionType, setCollectionType] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const floor = useMemo(() => HOUSE_DATA.floors.find((item) => item.id === floorId) || initialFloor, [floorId]);
  const room = useMemo(() => floor.rooms.find(([id]) => id === roomId) || floor.rooms[0], [floor, roomId]);
  const mode = HOUSE_DATA.modes.find((item) => item.id === modeId) || HOUSE_DATA.modes[0];
  const roomOps = roomDetailFor(room[0], floor);
  const connections = useMemo(() => roomConnections(floor, room[0]), [floor, room]);
  const allRooms = useMemo(() => HOUSE_DATA.floors.flatMap((item) => item.rooms.map((roomItem) => ({
    floorId: item.id,
    floorName: item.name,
    floorRole: item.role,
    id: roomItem[0],
    name: roomItem[1],
    description: roomItem[2],
    image: roomItem[3]
  }))), []);
  const filteredRooms = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return allRooms;
    return allRooms.filter((item) => [item.name, item.floorName, item.floorRole, item.description].join(" ").toLowerCase().includes(term));
  }, [allRooms, query]);
  const collectionTypes = useMemo(() => ["All", ...Array.from(new Set(COLLECTION_ITEMS.map((item) => item.type)))], []);
  const filteredCollection = useMemo(() => {
    const term = collectionQuery.trim().toLowerCase();
    return COLLECTION_ITEMS.filter((item) => {
      const typeMatch = collectionType === "All" || item.type === collectionType;
      const textMatch = !term || [item.type, item.description, item.provenance, item.value, item.floor, item.placement].join(" ").toLowerCase().includes(term);
      return typeMatch && textMatch;
    });
  }, [collectionQuery, collectionType]);

  const openRoom = (nextFloorId, nextRoomId, tab = activeTab) => {
    const nextFloor = HOUSE_DATA.floors.find((item) => item.id === nextFloorId);
    if (!nextFloor) return;
    setFloorId(nextFloorId);
    setRoomId(nextRoomId || nextFloor.rooms[0][0]);
    setActiveTab(tab);
  };

  const setMode = (event) => {
    setModeId(event.target.value);
    localStorage.setItem("albury.mode", event.target.value);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="House navigation">
        <div className="brand">
          <span className="brand-mark">A</span>
          <div>
            <strong>{HOUSE_DATA.houseName}</strong>
            <span>{HOUSE_DATA.houseSubtitle}</span>
          </div>
        </div>

        <nav className="primary-tabs">
          {tabs.map(([id, label, Icon]) => (
            <button key={id} className={activeTab === id ? "active" : ""} type="button" onClick={() => setActiveTab(id)}>
              <Icon size={17} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <label className="mode-select">
          <span>House Mode</span>
          <select value={modeId} onChange={setMode}>
            {HOUSE_DATA.modes.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>

        <div className="floor-stack">
          {[...HOUSE_DATA.floors].reverse().map((item) => {
            const guide = HOUSE_DATA.floorGuide.find((guideFloor) => guideFloor.id === item.id);
            return (
              <button key={item.id} type="button" className={item.id === floor.id ? "active" : ""} onClick={() => openRoom(item.id, item.rooms[0][0])}>
                <span>{guide?.key}</span>
                <strong>{item.name}</strong>
                <small>{item.role}</small>
              </button>
            );
          })}
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p>{today}</p>
            <h1>{activeTab === "explore" ? room[1] : tabs.find(([id]) => id === activeTab)?.[1]}</h1>
          </div>
          <div className="top-actions">
            <span>{mode.name}</span>
            <button type="button" onClick={() => setActiveTab("library")}>
              <Images size={16} />
              <span>{HOUSE_DATA.imageArchive.length} images</span>
            </button>
          </div>
        </header>

        {activeTab === "explore" && (
          <ExploreView
            floor={floor}
            room={room}
            roomOps={roomOps}
            connections={connections}
            mode={mode}
            openRoom={openRoom}
            openImage={setSelectedImage}
          />
        )}

        {activeTab === "atlas" && (
          <AtlasView floor={floor} roomId={room[0]} openRoom={openRoom} />
        )}

        {activeTab === "library" && (
          <LibraryView
            query={query}
            setQuery={setQuery}
            rooms={filteredRooms}
            openRoom={(nextFloor, nextRoom) => openRoom(nextFloor, nextRoom, "explore")}
            openImage={setSelectedImage}
          />
        )}

        {activeTab === "collection" && (
          <CollectionView
            items={filteredCollection}
            allItems={COLLECTION_ITEMS}
            types={collectionTypes}
            activeType={collectionType}
            setActiveType={setCollectionType}
            query={collectionQuery}
            setQuery={setCollectionQuery}
            openRoom={(nextFloor, nextRoom) => openRoom(nextFloor, nextRoom, "explore")}
          />
        )}

        {activeTab === "ops" && (
          <OperationsView mode={mode} openRoom={(nextFloor, nextRoom) => openRoom(nextFloor, nextRoom, "explore")} />
        )}

        {activeTab === "team" && (
          <TeamView />
        )}
      </main>

      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} openRoom={openRoom} />
      )}
    </div>
  );
}

function ExploreView({ floor, room, roomOps, connections, mode, openRoom, openImage }) {
  const [id, name, description, image] = room;
  const gallery = ROOM_GALLERIES[`${floor.id}:${id}`] || [{ label: "Room view", src: image }];
  const [activeImage, setActiveImage] = useState(gallery[0]);

  useEffect(() => {
    setActiveImage(gallery[0]);
  }, [floor.id, id, gallery[0].src]);

  return (
    <section className="explore-grid">
      <div className="room-stage">
        <button className="room-image-button" type="button" onClick={() => openImage({ src: activeImage.src, label: `${name} / ${activeImage.label}`, meta: floor.name, floorId: floor.id, roomId: id })}>
          <RoomImage src={activeImage.src} alt={`${name} / ${activeImage.label}`} />
        </button>
        <div className="room-copy">
          <p>{floor.name} / {floor.role}</p>
          <h2>{name}</h2>
          <span>{description}</span>
        </div>
        {gallery.length > 1 && (
          <div className="room-gallery" aria-label={`${name} image views`}>
            {gallery.map((item) => (
              <button
                key={item.src}
                type="button"
                className={item.src === activeImage.src ? "active" : ""}
                onClick={() => setActiveImage(item)}
              >
                <RoomImage src={item.src} alt="" loading="lazy" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <aside className="context-panel">
        <section className="panel mode-panel">
          <Sparkles size={18} />
          <div>
            <strong>{mode.name}</strong>
            <p>{mode.text}</p>
          </div>
        </section>

        <section className="panel">
          <PanelTitle icon={Grid3X3} title="Floor Map" />
          <FloorPlan floor={floor} activeRoomId={id} openRoom={openRoom} />
        </section>

        <section className="panel">
          <PanelTitle icon={CircleDot} title="Move Through House" />
          <div className="movement-grid">
            {connections.map((connection) => (
              <button key={connection.key} type="button" onClick={() => openRoom(connection.floorId, connection.roomId)}>
                {movementIcon(connection.kind)}
                <span>{connection.label}</span>
                <strong>{connection.roomName}</strong>
                <small>{connection.floorName}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="panel">
          <PanelTitle icon={SlidersHorizontal} title="Room Controls" />
          <div className="readouts">
            <Readout label="Temp" value={roomOps.system.temperature} />
            <Readout label="Scent" value={roomOps.system.scent} />
            <Readout label="Music" value={roomOps.system.music} />
            <Readout label="Noise" value={roomOps.system.ambient_noise} />
            <Readout label="Access" value={roomOps.system.service_route} />
            <Readout label="Owner" value={roomOps.owner} />
          </div>
        </section>
      </aside>
    </section>
  );
}

function AtlasView({ floor, roomId, openRoom }) {
  return (
    <section className="atlas-layout">
      <div className="atlas-stack">
        {[...HOUSE_DATA.floors].reverse().map((item) => {
          const guide = HOUSE_DATA.floorGuide.find((guideFloor) => guideFloor.id === item.id);
          return (
            <button key={item.id} className={item.id === floor.id ? "active" : ""} type="button" onClick={() => openRoom(item.id, item.rooms[0][0])}>
              <span>{guide?.key}</span>
              <div>
                <strong>{item.name}</strong>
                <small>{item.role}</small>
              </div>
              <ChevronRight size={17} />
            </button>
          );
        })}
      </div>
      <div className="atlas-map">
        <div className="section-head">
          <div>
            <p>{floor.mood}</p>
            <h2>{floor.name}</h2>
          </div>
          <span>{floor.rooms.length} rooms</span>
        </div>
        <FloorPlan floor={floor} activeRoomId={roomId} openRoom={openRoom} />
        <div className="room-list">
          {floor.rooms.map(([id, name, description, image]) => (
            <button key={id} type="button" onClick={() => openRoom(floor.id, id, "explore")}>
              <RoomImage src={image} alt="" loading="lazy" />
              <span>
                <strong>{name}</strong>
                <small>{description}</small>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function LibraryView({ query, setQuery, rooms, openRoom, openImage }) {
  return (
    <section className="library-view">
      <div className="library-toolbar">
        <label>
          <Search size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search room, floor, use or mood" />
        </label>
        <span>{rooms.length} rooms</span>
      </div>
      <div className="library-grid">
        {rooms.map((room) => (
          <article key={`${room.floorId}:${room.id}`} className="library-card">
            <button type="button" className="library-image" onClick={() => openImage({ src: room.image, label: room.name, meta: room.floorName, floorId: room.floorId, roomId: room.id })}>
              <RoomImage src={room.image} alt={room.name} loading="lazy" />
            </button>
            <button type="button" className="library-copy" onClick={() => openRoom(room.floorId, room.id)}>
              <strong>{room.name}</strong>
              <span>{room.floorName}</span>
              <small>{room.description}</small>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function CollectionView({ items, allItems, types, activeType, setActiveType, query, setQuery, openRoom }) {
  const stats = collectionStats(allItems);
  const typeCounts = Object.fromEntries(types.map((type) => [
    type,
    type === "All" ? allItems.length : allItems.filter((item) => item.type === type).length
  ]));
  const highlights = [
    allItems.find((item) => item.value.includes("Priceless")) || allItems[0],
    allItems.find((item) => item.description.includes("Bacon")) || allItems[1],
    allItems.find((item) => item.description.includes("Patek")) || allItems[2]
  ].filter(Boolean);

  return (
    <section className="collection-view">
      <div className="collection-hero">
        <div>
          <p>House Collection</p>
          <h2>Everything Alex lives with, wears, plays and protects.</h2>
          <span>Art, McQueen archive, rare books, first pressings, jewellery and watches are treated as part of the Kensington house rather than a separate database.</span>
        </div>
        <div className="collection-metrics">
          <Metric value={stats.total} label="Objects" />
          <Metric value={stats.art} label="Artworks" />
          <Metric value={stats.museum} label="Museum grade" />
        </div>
      </div>

      <div className="collection-toolbar">
        <label>
          <Search size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search artist, object, provenance or value" />
        </label>
        <div className="collection-tabs" aria-label="Collection type filters">
          {types.map((type) => (
            <button key={type} type="button" className={activeType === type ? "active" : ""} onClick={() => setActiveType(type)}>
              {collectionIcon(type)}
              <span>{type}</span>
              <strong>{typeCounts[type]}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="collection-feature-grid">
        {highlights.map((item) => (
          <article key={`highlight:${item.id}`} className={`collection-feature collection-${item.type.toLowerCase()}`}>
            <span>{item.type}</span>
            <h3>{item.description}</h3>
            <p>{item.provenance}</p>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>

      <div className="collection-layout">
        <aside className="collection-map">
          <PanelTitle icon={BadgeDollarSign} title="Collection Placement" />
          {collectionPlacementGroups(allItems).map((group) => (
            <button key={group.floor} type="button" onClick={() => group.room && openRoom(group.room[0], group.room[1])}>
              <span>{group.count}</span>
              <div>
                <strong>{group.floor}</strong>
                <small>{group.note}</small>
              </div>
            </button>
          ))}
        </aside>

        <div className="collection-table" role="table" aria-label="Alex Wilson collection">
          <div className="collection-row collection-header" role="row">
            <span>Type</span>
            <span>Object</span>
            <span>Provenance</span>
            <span>Value / Research</span>
          </div>
          {items.map((item) => (
            <article key={item.id} className="collection-row" role="row">
              <span className={`collection-type collection-${item.type.toLowerCase()}`}>{collectionIcon(item.type)} {item.type}</span>
              <strong>{item.description}</strong>
              <small>{item.provenance}</small>
              <em>{item.value}</em>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OperationsView({ mode, openRoom }) {
  const systems = HOUSE_DATA.floors.flatMap((floor) => floor.rooms.map(([id, name]) => roomSystemFor(id, floor, name)));
  return (
    <section className="ops-layout">
      <div className="ops-hero">
        <div>
          <p>Current Mode</p>
          <h2>{mode.name}</h2>
          <span>{mode.text}</span>
        </div>
        <div className="hero-metrics">
          <Metric value={HOUSE_DATA.bookings.length} label="Bookings" />
          <Metric value={HOUSE_DATA.arrivals.length} label="Arrivals" />
          <Metric value={HOUSE_DATA.readiness.filter(([, status]) => status === "Ready").length} label="Ready Rooms" />
        </div>
      </div>
      <div className="ops-columns">
        <OpsList title="Today" icon={CalendarDays} items={HOUSE_DATA.meals.map(([time, name, place, note]) => [time, name, `${place} / ${note}`])} />
        <OpsList title="Arrivals" icon={ArrowRight} items={HOUSE_DATA.arrivals.map(([time, route, name, note]) => [time, name, `${route} / ${note}`])} />
        <OpsList title="Readiness" icon={CircleDot} items={HOUSE_DATA.readiness.map(([room, status]) => [status, room, "House readiness board"])} />
      </div>
      <div className="systems-grid">
        {systems.slice(0, 24).map((system) => (
          <button key={system.panel_id} type="button" onClick={() => openRoom(system.floor_id, system.room_id)}>
            <span>{system.panel_id}</span>
            <strong>{system.room_name}</strong>
            <small>{system.temperature} / {system.scent}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

function TeamView() {
  return (
    <section className="team-grid">
      {HOUSE_DATA.staff.map(([category, name, role, detail, status]) => (
        <article key={name} className="team-card">
          <span>{status}</span>
          <div className="avatar">{name.split(" ").map((part) => part[0]).join("")}</div>
          <p>{category}</p>
          <h2>{name}</h2>
          <strong>{role}</strong>
          <small>{detail}</small>
        </article>
      ))}
    </section>
  );
}

function FloorPlan({ floor, activeRoomId, openRoom }) {
  const plan = FLOOR_PLAN_SHAPES[floor.id];
  if (!plan) return null;
  const roomIds = new Set(floor.rooms.map(([id]) => id));
  return (
    <div className="floor-plan">
      <svg viewBox="0 0 920 344" role="img" aria-label={`${floor.name} floor plan`}>
        <path className="map-shell" d={plan.outline || "M14 30H906V314H14Z"} />
        {[...(plan.rooms || []), ...(plan.service || [])].map(([id, label, x, y, width, height, kind]) => {
          const canOpen = roomIds.has(id);
          return (
            <g
              key={id}
              className={`map-zone map-${kind || "daily"} ${activeRoomId === id ? "active" : ""} ${canOpen ? "clickable" : ""}`}
              role={canOpen ? "button" : undefined}
              tabIndex={canOpen ? 0 : undefined}
              onClick={() => canOpen && openRoom(floor.id, id)}
              onKeyDown={(event) => {
                if (canOpen && (event.key === "Enter" || event.key === " ")) openRoom(floor.id, id);
              }}
            >
              <rect x={x} y={y} width={width} height={height} rx="3" />
              <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="middle">
                {labelLines(label, 14).map((line, index, lines) => (
                  <tspan key={line} x={x + width / 2} dy={index === 0 ? `${(1 - lines.length) * 0.55}em` : "1.1em"}>{line}</tspan>
                ))}
              </text>
            </g>
          );
        })}
        <path className="map-route" d={floor.id === "raised-ground" ? "M82 270H332V180H724V276H854" : floor.id === "first-floor" ? "M84 94H690V250H884" : "M72 248H610V88H836"} />
      </svg>
      <div className="map-note">{plan.note}</div>
    </div>
  );
}

function ImageModal({ image, onClose, openRoom }) {
  return (
    <div className="image-modal" role="dialog" aria-modal="true">
      <button className="modal-backdrop" type="button" aria-label="Close image" onClick={onClose} />
      <div className="modal-dialog">
        <button className="modal-close" type="button" aria-label="Close" onClick={onClose}><X size={20} /></button>
        <RoomImage src={image.src} alt={image.label} />
        <div className="modal-copy">
          <div>
            <p>{image.meta}</p>
            <h2>{image.label}</h2>
            <span>{image.src}</span>
          </div>
          <button type="button" onClick={() => {
            onClose();
            openRoom(image.floorId, image.roomId, "explore");
          }}>Open Room</button>
        </div>
      </div>
    </div>
  );
}

function PanelTitle({ icon: Icon, title }) {
  return (
    <div className="panel-title">
      <Icon size={17} />
      <h2>{title}</h2>
    </div>
  );
}

function RoomImage({ src, alt, loading }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const fallbackSrc = src.endsWith(".webp") ? src.replace(/\.webp$/, ".png") : "";

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
    />
  );
}

function Readout({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Metric({ value, label }) {
  return (
    <article>
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}

function OpsList({ title, icon: Icon, items }) {
  return (
    <section className="ops-list">
      <PanelTitle icon={Icon} title={title} />
      {items.map(([time, name, note]) => (
        <article key={`${title}:${time}:${name}`}>
          <time>{time}</time>
          <div>
            <strong>{name}</strong>
            <small>{note}</small>
          </div>
        </article>
      ))}
    </section>
  );
}

function collectionIcon(type) {
  const icons = {
    All: <Sparkles size={15} />,
    Art: <Palette size={15} />,
    Fashion: <Shirt size={15} />,
    Book: <BookOpen size={15} />,
    Vinyl: <Disc3 size={15} />,
    Jewellery: <Gem size={15} />,
    Watch: <Watch size={15} />
  };
  return icons[type] || icons.All;
}

function collectionStats(items) {
  return {
    total: items.length,
    art: items.filter((item) => item.type === "Art").length,
    museum: items.filter((item) => /museum|priceless|bacon|hirst|mcqueen/i.test(`${item.description} ${item.value}`)).length
  };
}

function collectionPlacementGroups(items) {
  const roomTargets = {
    "Whole House": ["raised-ground", "entrance-hall"],
    "Top Floor": ["top-floor", "archive-wardrobe"],
    "First Floor / Music Nobile": ["first-floor", "control-listening"]
  };
  return Object.values(items.reduce((groups, item) => {
    if (!groups[item.floor]) {
      groups[item.floor] = {
        floor: item.floor,
        count: 0,
        note: item.placement,
        room: roomTargets[item.floor]
      };
    }
    groups[item.floor].count += 1;
    return groups;
  }, {}));
}

function movementIcon(kind) {
  const icons = {
    previous: <ArrowLeft size={16} />,
    next: <ArrowRight size={16} />,
    up: <ArrowUp size={16} />,
    down: <ArrowDown size={16} />,
    near: <ChevronRight size={16} />
  };
  return icons[kind] || icons.near;
}

function roomConnections(floor, roomId) {
  const floorIndex = HOUSE_DATA.floors.findIndex((item) => item.id === floor.id);
  const roomIndex = floor.rooms.findIndex(([id]) => id === roomId);
  const connections = [];
  const addConnection = (kind, label, targetFloor, targetRoom) => {
    if (!targetFloor || !targetRoom) return;
    const key = `${targetFloor.id}:${targetRoom[0]}`;
    if (key === `${floor.id}:${roomId}` || connections.some((item) => item.key === key)) return;
    connections.push({ key, kind, label, floorId: targetFloor.id, floorName: targetFloor.name, roomId: targetRoom[0], roomName: targetRoom[1] });
  };

  addConnection("previous", "Previous room", floor, floor.rooms[roomIndex - 1]);
  addConnection("next", "Next room", floor, floor.rooms[roomIndex + 1]);
  const upperFloor = HOUSE_DATA.floors[floorIndex + 1];
  const lowerFloor = HOUSE_DATA.floors[floorIndex - 1];
  addConnection("up", "One floor up", upperFloor, upperFloor?.rooms[Math.min(roomIndex, upperFloor.rooms.length - 1)]);
  addConnection("down", "One floor down", lowerFloor, lowerFloor?.rooms[Math.min(roomIndex, lowerFloor.rooms.length - 1)]);

  floor.rooms.forEach((item) => {
    if (connections.length < 6) addConnection("near", "Same floor", floor, item);
  });

  return connections;
}

function labelLines(label, maxLength) {
  return label.split(" / ").flatMap((part) => {
    if (part.length <= maxLength) return [part];
    const output = [];
    let line = "";
    part.split(" ").forEach((word) => {
      const next = line ? `${line} ${word}` : word;
      if (next.length > maxLength && line) {
        output.push(line);
        line = word;
      } else {
        line = next;
      }
    });
    if (line) output.push(line);
    return output;
  }).slice(0, 3);
}

function roomDetailFor(roomId, floor) {
  const ownerByFloor = {
    "lower-basement": "Wellness / systems",
    "upper-basement": "House operations",
    "raised-ground": "House manager",
    "first-floor": "Music Nobile",
    "second-floor": "Housekeeping",
    "third-floor": "Housekeeping",
    "top-floor": "Private suite"
  };
  return { owner: ownerByFloor[floor.id] || "House", system: roomSystemFor(roomId, floor) };
}

function roomSystemFor(roomId, floor, roomName) {
  const room = floor.rooms.find(([id]) => id === roomId);
  const defaults = HOUSE_DATA.smartHome.floorDefaults[floor.id] || ["20.5 C", "House neutral", "Balanced air", "House quiet", "Soft hush"];
  const settings = HOUSE_DATA.smartHome.roomOverrides[roomId] || defaults;
  const roomIndex = floor.rooms.findIndex(([id]) => id === roomId) + 1;
  const rawFloorKey = HOUSE_DATA.floorGuide.find((item) => item.id === floor.id)?.key || floor.id.slice(0, 2).toUpperCase();
  const floorKey = rawFloorKey.startsWith("-") ? `B${rawFloorKey.slice(1)}` : rawFloorKey;
  return {
    room_id: roomId,
    room_name: roomName || room?.[1] || roomId,
    floor_id: floor.id,
    floor_name: floor.name,
    panel_id: `AH-${floorKey}-${String(roomIndex).padStart(2, "0")}`,
    temperature: settings[0],
    scent: settings[1],
    air: settings[2],
    music: settings[3],
    ambient_noise: settings[4],
    service_route: floor.id === "first-floor" || floor.id.includes("basement") ? "Service stair" : "Main stair and lift"
  };
}

export default App;
