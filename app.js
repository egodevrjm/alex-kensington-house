const state = {
  view: "dashboard",
  floorId: HOUSE_DATA.floors[2].id,
  roomId: "entrance-hall",
  showAtlas: true,
  staffFilter: "All",
  imageFilter: "All",
  systemsFilter: "All",
  modalTarget: null,
  mode: localStorage.getItem("albury.mode") || localStorage.getItem("kensington.mode") || "residence",
  bookings: loadBookings()
};

function loadBookings() {
  const saved = localStorage.getItem("albury.bookings") || localStorage.getItem("kensington.bookings");
  if (saved) return JSON.parse(saved).map(normalizeBooking);
  return HOUSE_DATA.bookings.map(([date, time, space, host, setup]) => normalizeBooking({ date, time, space, host, setup }));
}

function saveBookings() {
  localStorage.setItem("albury.bookings", JSON.stringify(state.bookings));
}

function normalizeBooking(booking) {
  return {
    ...booking,
    space: String(booking.space || "").replaceAll("AL.X Studio", "Music Nobile").replaceAll("Studio-Control-Listening Room", "Control / Listening Room"),
    setup: String(booking.setup || "").replaceAll("AL.X Studio", "Music Nobile").replaceAll("AL.X", "Music Nobile").replaceAll("studio", "music floor")
  };
}

function $(selector) {
  return document.querySelector(selector);
}

function create(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

const SVG_NS = "http://www.w3.org/2000/svg";

function createSvgElement(tag, attrs = {}) {
  const element = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (value !== undefined && value !== null) element.setAttribute(key, value);
  });
  return element;
}

function imageBlock(src, label, options = {}) {
  const wrapper = create("div", "image-slot");
  const image = new Image();
  image.src = src;
  image.alt = label;
  image.onload = () => {
    wrapper.classList.add("loaded");
    wrapper.innerHTML = "";
    wrapper.appendChild(image);
    if (options.zoom !== false) {
      const zoomButton = create("button", "image-zoom", "Open image");
      zoomButton.type = "button";
      zoomButton.addEventListener("click", (event) => {
        event.stopPropagation();
        openImageModal({
          src,
          label,
          meta: options.meta || "Albury House image",
          path: src,
          floorId: options.floorId,
          roomId: options.roomId
        });
      });
      wrapper.appendChild(zoomButton);
    }
  };
  image.onerror = () => {
    wrapper.classList.add("missing");
    wrapper.innerHTML = `<span>${label}</span><small>Asset pending</small>`;
  };
  wrapper.innerHTML = `<span>${label}</span><small>Image pending</small>`;
  return wrapper;
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function formatDateLabel() {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date());
}

function init() {
  document.title = HOUSE_DATA.houseName;
  $("#brandName").textContent = HOUSE_DATA.houseName;
  $("#brandSubtitle").textContent = HOUSE_DATA.houseSubtitle;
  $("#currentDate").textContent = formatDateLabel();
  renderNav();
  renderModeSelect();
  renderDashboard();
  renderTour();
  renderImageArchive();
  renderSystems();
  renderStaff();
  renderMeals();
  renderBookings();
  renderWellness();
  renderArrivals();
  renderCollections();
  renderManual();
  bindEvents();
}

function bindEvents() {
  $("#houseModeSelect").addEventListener("change", (event) => {
    state.mode = event.target.value;
    localStorage.setItem("albury.mode", state.mode);
    renderDashboard();
  });

  $("#staffSearch").addEventListener("input", renderStaff);

  $("#bookingForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    state.bookings.unshift({
      space: form.get("space"),
      date: form.get("date"),
      time: form.get("time"),
      host: form.get("host"),
      setup: form.get("setup") || "Setup pending."
    });
    saveBookings();
    event.target.reset();
    setDefaultBookingDate();
    renderDashboard();
    renderBookings();
  });

  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.jump));
  });

  $("#atlasButton").addEventListener("click", () => {
    state.showAtlas = true;
    renderTour();
  });

  $("#modalClose").addEventListener("click", closeImageModal);
  $("#modalBackdrop").addEventListener("click", closeImageModal);
  $("#modalTourButton").addEventListener("click", () => {
    if (!state.modalTarget) return;
    const target = { ...state.modalTarget };
    closeImageModal();
    openTourRoom(target.floorId, target.roomId);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeImageModal();
  });
}

function renderNav() {
  const nav = $("#navList");
  nav.innerHTML = "";
  HOUSE_DATA.nav.forEach(([id, label]) => {
    const button = create("button", id === state.view ? "active" : "", label);
    button.type = "button";
    button.addEventListener("click", () => setView(id));
    nav.appendChild(button);
  });
}

function setView(id) {
  state.view = id;
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
  $(`#${id}View`).classList.add("active");
  $("#pageTitle").textContent = HOUSE_DATA.nav.find((item) => item[0] === id)[1];
  renderNav();
}

function renderModeSelect() {
  const select = $("#houseModeSelect");
  select.innerHTML = HOUSE_DATA.modes.map((mode) => `<option value="${mode.id}">${mode.name}</option>`).join("");
  select.value = state.mode;
}

function renderDashboard() {
  const mode = HOUSE_DATA.modes.find((item) => item.id === state.mode) || HOUSE_DATA.modes[0];
  const todaysBookings = state.bookings.filter((booking) => booking.date === todayIso());
  $("#modeTitle").textContent = mode.name;
  $("#modeText").textContent = mode.text;
  $("#residenceStatus").textContent = mode.name;
  $("#todayBookingsCount").textContent = todaysBookings.length;
  $("#todayArrivalsCount").textContent = HOUSE_DATA.arrivals.length;
  $("#roomsReadyCount").textContent = HOUSE_DATA.readiness.filter(([, status]) => status === "Ready").length;

  renderMiniList("#dashboardMeals", HOUSE_DATA.meals.slice(0, 4).map(([time, name, location, note]) => ({
    title: `${time} ${name}`,
    meta: location,
    note
  })));

  const bookingItems = state.bookings.slice(0, 5).map((booking) => ({
    title: `${booking.time} ${booking.space}`,
    meta: booking.host,
    note: booking.setup
  }));
  renderMiniList("#dashboardBookings", bookingItems);

  renderMiniList("#dashboardArrivals", HOUSE_DATA.arrivals.slice(0, 5).map(([time, route, name, note]) => ({
    title: `${time} ${name}`,
    meta: route,
    note
  })));

  const grid = $("#readinessGrid");
  grid.innerHTML = "";
  HOUSE_DATA.readiness.forEach(([room, status]) => {
    const card = create("article", "readiness-card");
    card.innerHTML = `<strong>${room}</strong><span>${status}</span>`;
    grid.appendChild(card);
  });

  renderFloorGuide("#dashboardFloorGuide", "dashboard");

  const systems = allRoomSystems();
  renderMiniList("#dashboardSystems", systems.slice(0, 4).map((system) => ({
    title: `${system.room_name} ${system.temperature}`,
    meta: `${system.floor_name} / ${system.scent}`,
    note: `${system.music} with ${system.ambient_noise.toLowerCase()}`
  })));

  const strip = $("#dashboardImageStrip");
  strip.innerHTML = "";
  HOUSE_DATA.featureImages.forEach(([floor, label, type, image, floorId, roomId]) => {
    const card = create("button", "image-card");
    card.appendChild(imageBlock(image, label, { meta: `${floor} / ${type}`, floorId, roomId }));
    const copy = create("span", "image-card-copy");
    copy.innerHTML = `<strong>${label}</strong><small>${floor} / ${type}</small>`;
    card.appendChild(copy);
    card.addEventListener("click", () => openTourRoom(floorId, roomId));
    strip.appendChild(card);
  });
}

function renderMiniList(selector, items) {
  const container = $(selector);
  container.innerHTML = "";
  items.forEach((item) => {
    const row = create("article", "mini-row");
    row.innerHTML = `<strong>${item.title}</strong><span>${item.meta}</span><p>${item.note}</p>`;
    container.appendChild(row);
  });
}

function renderTour() {
  $("#atlasImage").innerHTML = "";
  renderHouseAtlasMap("#atlasImage");
  $("#atlasStage").classList.toggle("active", state.showAtlas);
  $("#atlasButton").classList.toggle("active", state.showAtlas);
  renderFloorGuide("#atlasFloorGuide", "atlas");

  const floorButtons = $("#floorButtons");
  floorButtons.innerHTML = "";
  HOUSE_DATA.floors.forEach((floor) => {
    const button = create("button", floor.id === state.floorId ? "active" : "");
    button.innerHTML = `<strong>${floor.name}</strong><span>${floor.role}</span>`;
    button.addEventListener("click", () => {
      state.showAtlas = false;
      state.floorId = floor.id;
      state.roomId = floor.rooms[0][0];
      renderTour();
    });
    floorButtons.appendChild(button);
  });

  const floor = HOUSE_DATA.floors.find((item) => item.id === state.floorId);
  $("#selectedFloorRole").textContent = floor.role;
  $("#selectedFloorName").textContent = floor.name;
  $("#selectedFloorMood").textContent = floor.mood;
  const floorPlan = $("#floorPlanImage");
  floorPlan.innerHTML = "";
  floorPlan.appendChild(renderFloorPlanMap(floor, { size: "large", interactive: true }));
  const floorPlanPath = create("small", "asset-path", `Generated SVG outline. Future illustrated crop: ${floor.planImage}`);
  floorPlan.appendChild(floorPlanPath);

  const roomGrid = $("#roomGrid");
  roomGrid.innerHTML = "";
  floor.rooms.forEach(([id, name, description, image]) => {
    const card = create("button", id === state.roomId ? "room-card active" : "room-card");
    card.appendChild(imageBlock(image, name, { meta: floor.name, floorId: floor.id, roomId: id }));
    const copy = create("span", "room-card-copy");
    const match = imageMatchForRoom(image, name);
    copy.innerHTML = `<strong>${name}</strong><small>${description}</small><em class="${match.className}">${match.label}</em>`;
    card.appendChild(copy);
    card.addEventListener("click", () => {
      state.roomId = id;
      renderTour();
    });
    roomGrid.appendChild(card);
  });

  renderRoomDetail(floor);
}

function renderHouseAtlasMap(selector) {
  const container = $(selector);
  const atlas = create("div", "generated-atlas");
  HOUSE_DATA.floorGuide.forEach((guideFloor) => {
    const floor = HOUSE_DATA.floors.find((item) => item.id === guideFloor.id);
    if (!floor) return;
    const button = create("button", floor.id === state.floorId && !state.showAtlas ? "active" : "");
    button.type = "button";
    button.appendChild(renderFloorPlanMap(floor, { size: "mini", interactive: false }));
    const copy = create("span", "generated-atlas-copy");
    copy.innerHTML = `<strong>${guideFloor.key}</strong><span>${floor.name}</span><small>${floor.role}</small>`;
    button.appendChild(copy);
    button.addEventListener("click", () => {
      state.floorId = floor.id;
      state.roomId = floor.rooms[0][0];
      state.showAtlas = false;
      renderTour();
    });
    atlas.appendChild(button);
  });
  container.appendChild(atlas);
}

function renderFloorPlanMap(floor, options = {}) {
  const plan = FLOOR_PLAN_SHAPES[floor.id];
  const wrapper = create("div", `outline-map ${options.size === "mini" ? "mini" : "large"}`);
  if (!plan) {
    wrapper.innerHTML = `<span>${floor.name}</span><small>Outline pending</small>`;
    return wrapper;
  }

  const svg = createSvgElement("svg", {
    viewBox: "0 0 920 344",
    role: "img",
    "aria-label": `${floor.name} generated outline map`
  });

  svg.appendChild(createSvgElement("path", {
    class: "map-shell",
    d: plan.outline || "M14 30H906V314H14Z"
  }));

  const shapes = [...(plan.rooms || []), ...(plan.service || [])];
  const roomIds = new Set(floor.rooms.map(([id]) => id));
  shapes.forEach(([id, label, x, y, width, height, kind]) => {
    const group = createSvgElement("g", {
      class: `map-zone map-${kind || "daily"} ${id === state.roomId ? "active" : ""} ${roomIds.has(id) ? "clickable" : ""}`,
      "data-room-id": id
    });
    group.appendChild(createSvgElement("rect", {
      x,
      y,
      width,
      height,
      rx: 2,
      ry: 2
    }));
    const title = createSvgElement("title");
    title.textContent = label;
    group.appendChild(title);

    const text = createSvgElement("text", {
      x: x + width / 2,
      y: y + height / 2,
      "text-anchor": "middle",
      "dominant-baseline": "middle"
    });
    labelLines(label, options.size === "mini" ? 9 : 14).forEach((line, index, lines) => {
      const tspan = createSvgElement("tspan", {
        x: x + width / 2,
        dy: index === 0 ? `${(1 - lines.length) * 0.55}em` : "1.1em"
      });
      tspan.textContent = line;
      text.appendChild(tspan);
    });
    group.appendChild(text);

    if (options.interactive && roomIds.has(id)) {
      group.setAttribute("tabindex", "0");
      group.setAttribute("role", "button");
      group.setAttribute("aria-label", `Open ${label}`);
      group.addEventListener("click", () => {
        state.showAtlas = false;
        state.roomId = id;
        renderTour();
      });
      group.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          state.showAtlas = false;
          state.roomId = id;
          renderTour();
        }
      });
    }

    svg.appendChild(group);
  });

  const route = createSvgElement("path", {
    class: "map-route",
    d: floor.id === "raised-ground"
      ? "M82 270H332V180H724V276H854"
      : floor.id === "first-floor"
        ? "M84 94H690V250H884"
        : "M72 248H610V88H836"
  });
  svg.appendChild(route);

  const label = createSvgElement("text", {
    class: "map-title",
    x: 24,
    y: 22
  });
  label.textContent = floor.name;
  svg.appendChild(label);

  wrapper.appendChild(svg);
  const legend = create("div", "outline-legend");
  legend.innerHTML = `
    <span><i class="legend-daily"></i>Daily</span>
    <span><i class="legend-social"></i>Social</span>
    <span><i class="legend-music"></i>Music</span>
    <span><i class="legend-wellness"></i>Wellness</span>
    <span><i class="legend-service"></i>Service</span>
  `;
  if (options.size !== "mini") wrapper.appendChild(legend);
  const note = create("small", "outline-note", plan.note);
  if (options.size !== "mini") wrapper.appendChild(note);
  return wrapper;
}

function labelLines(label, maxLength) {
  const forced = label.split(" / ");
  const lines = forced.flatMap((part) => {
    if (part.length <= maxLength) return [part];
    const words = part.split(" ");
    const output = [];
    let line = "";
    words.forEach((word) => {
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
  });
  return lines.slice(0, 3);
}

function renderRoomDetail(floor) {
  const room = floor.rooms.find((item) => item[0] === state.roomId) || floor.rooms[0];
  const [id, name, description, image] = room;
  const match = imageMatchForRoom(image, name);
  const roomOps = roomDetailFor(id, floor);
  const detail = $("#roomDetail");
  detail.innerHTML = "";
  detail.appendChild(imageBlock(image, name, { meta: floor.name, floorId: floor.id, roomId: id }));
  const body = create("div", "room-detail-copy");
  body.innerHTML = `
    <p class="overline">${floor.name}</p>
    <h2>${name}</h2>
    <p>${description}</p>
    <div class="detail-tags">
      <span>${floor.role}</span>
      <span>${match.label}</span>
      <span>${roomOps.owner}</span>
    </div>
    <dl>
      <div><dt>Use</dt><dd>${roomOps.use}</dd></div>
      <div><dt>Readiness</dt><dd>${roomOps.readiness}</dd></div>
      <div><dt>Service note</dt><dd>${roomOps.service}</dd></div>
      <div><dt>Digital panel</dt><dd>${roomOps.system.panel_id} online / Assistant: ${roomOps.system.assistant}</dd></div>
      <div><dt>Room scene</dt><dd>${roomOps.system.temperature}, ${roomOps.system.scent}, ${roomOps.system.ambient_noise}</dd></div>
      <div><dt>Image path</dt><dd>${image}</dd></div>
      <div><dt>Room key</dt><dd>${id}</dd></div>
      <div><dt>Access</dt><dd>${floor.id.includes("basement") ? "Service route available" : floor.id === "first-floor" ? "Main stair or service stair" : "Main stair and lift"}</dd></div>
    </dl>
  `;
  detail.appendChild(body);
}

function renderFloorGuide(selector, variant) {
  const container = $(selector);
  container.innerHTML = "";
  HOUSE_DATA.floorGuide.forEach((floor) => {
    const button = create("button", floor.id === state.floorId && !state.showAtlas ? "active" : "");
    button.innerHTML = `
      <span class="floor-key">${floor.key}</span>
      <span class="floor-guide-copy">
        <strong>${floor.name}</strong>
        <small>${floor.role}</small>
        <em>${floor.zone} / ${floor.stats}</em>
      </span>
    `;
    button.addEventListener("click", () => {
      state.floorId = floor.id;
      state.roomId = HOUSE_DATA.floors.find((item) => item.id === floor.id).rooms[0][0];
      state.showAtlas = false;
      if (variant === "dashboard") setView("tour");
      renderTour();
    });
    container.appendChild(button);
  });
}

function imageMatchForRoom(image, roomName) {
  const archiveMatch = HOUSE_DATA.imageArchive.find(([, label, type, archiveImage]) => archiveImage === image && label === roomName);
  if (archiveMatch) return { label: archiveMatch[2], className: "match-exact" };

  const overviewMatch = HOUSE_DATA.imageArchive.find(([, , type, archiveImage]) => archiveImage === image && type.includes("overview"));
  if (overviewMatch) return { label: overviewMatch[2], className: "match-overview" };

  const anyMatch = HOUSE_DATA.imageArchive.find(([, , , archiveImage]) => archiveImage === image);
  if (anyMatch) return { label: "Shared reference image", className: "match-reference" };

  return { label: "Asset pending", className: "match-pending" };
}

function roomDetailFor(roomId, floor) {
  const details = {
    "entrance-hall": ["Primary arrival, flowers, art first impression.", "Front-door ready; guest coats route to cloak storage.", "Crispin handles arrivals; security monitors pavement."],
    "kitchen-breakfast": ["Daily heart of the house and informal meals.", "Breakfast table, coffee, still water, garden door check.", "Chef and steward use service path when occupied."],
    "music-room": ["Bechstein-led writing, rehearsal and live capture.", "Piano humidity checked; scores and mic points ready.", "Engineers route through Music Nobile threshold or service stair."],
    "control-listening": ["Playback, monitoring, turntables and rough cut review.", "Console clear; monitors and patching ready.", "Imogen owns AV support and session reset."],
    "supper-room": ["Private dinners, artist meals and post-session food.", "Candles, linen, glassware, acoustic comfort.", "Pantry supports light service; kitchen supports heavy prep."],
    "indoor-pool": ["Swimming, recovery and late-night quiet.", "Water, towels and humidity checked.", "Leander owns chemistry and air handling."],
    "bar-games": ["Nocturnal house mode, games and private drinks.", "Bar stocked; lamps low; glassware checked.", "Crispin or temporary bar staff run service."],
    "cinema": ["Films, concert footage, screenings and rough cuts.", "AV, blackout and refreshment cabinet ready.", "Imogen checks media before guest use."],
    "archive-wardrobe": ["Museum-grade fashion archive and fittings context.", "Humidity, low light and handling protocols active.", "Honor oversees conservation access."],
    "roof-terrace": ["Private air, coffee, champagne and skyline pause.", "Weather, blankets, lanterns and terrace bar checked.", "Garden and service teams reset discreetly."]
  };
  const [use, readiness, service] = details[roomId] || [
    `${floor.role} support space within ${floor.name}.`,
    "Check lighting, climate, surfaces and guest-facing details before use.",
    floor.id === "first-floor" ? "Service stair keeps staff and musicians off the family route." : "House team routes support according to current house mode."
  ];

  const ownerByFloor = {
    "lower-basement": "Wellness / systems",
    "upper-basement": "House operations",
    "raised-ground": "House manager",
    "first-floor": "Music Nobile",
    "second-floor": "Housekeeping",
    "third-floor": "Housekeeping",
    "top-floor": "Private suite"
  };

  return { use, readiness, service, owner: ownerByFloor[floor.id] || "House", system: roomSystemFor(roomId, floor) };
}

function allRoomSystems() {
  return HOUSE_DATA.floors.flatMap((floor) => floor.rooms.map(([id, name]) => roomSystemFor(id, floor, name)));
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
    assistant: HOUSE_DATA.smartHome.assistantName,
    network: HOUSE_DATA.smartHome.network,
    status: "Panel online",
    temperature: settings[0],
    scent: settings[1],
    air: settings[2],
    music: settings[3],
    ambient_noise: settings[4],
    lighting: floor.id === "upper-basement" ? "Evening low scene" : floor.id === "top-floor" ? "Private warm scene" : "Adaptive house scene",
    privacy: floor.id === "top-floor" ? "Private access" : floor.id.includes("basement") ? "Service-aware" : "Guest-aware",
    service_route: floor.id === "first-floor" || floor.id.includes("basement") ? "Service stair available" : "Main stair and lift"
  };
}

function openTourRoom(floorId, roomId) {
  if (floorId === "tour") {
    state.showAtlas = true;
    setView("tour");
    renderTour();
    return;
  }

  state.floorId = floorId;
  state.roomId = roomId;
  state.showAtlas = false;
  setView("tour");
  renderTour();
}

function openImageModal({ src, label, meta, path, floorId, roomId }) {
  state.modalTarget = floorId && roomId ? { floorId, roomId } : null;
  $("#modalImage").src = src;
  $("#modalImage").alt = label;
  $("#modalTitle").textContent = label;
  $("#modalMeta").textContent = meta || "Albury House image";
  $("#modalPath").textContent = path || src;
  $("#modalTourButton").hidden = !state.modalTarget || floorId === "tour";
  $("#imageModal").classList.add("active");
  $("#imageModal").setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeImageModal() {
  const modal = $("#imageModal");
  if (!modal.classList.contains("active")) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  $("#modalImage").removeAttribute("src");
  state.modalTarget = null;
}

function renderImageArchive() {
  const filters = ["All", ...new Set(HOUSE_DATA.imageArchive.map(([floor]) => floor))];
  const filterRow = $("#imageFilters");
  filterRow.innerHTML = "";
  filters.forEach((floor) => {
    const button = create("button", floor === state.imageFilter ? "active" : "", floor);
    button.addEventListener("click", () => {
      state.imageFilter = floor;
      renderImageArchive();
    });
    filterRow.appendChild(button);
  });

  const images = HOUSE_DATA.imageArchive.filter(([floor]) => state.imageFilter === "All" || floor === state.imageFilter);
  $("#imageCount").textContent = `${images.length} image${images.length === 1 ? "" : "s"}`;
  const grid = $("#imageArchiveGrid");
  grid.innerHTML = "";
  images.forEach(([floor, label, type, image, floorId, roomId]) => {
    const card = create("button", "archive-image-card");
    card.appendChild(imageBlock(image, label, { meta: `${floor} / ${type}`, floorId, roomId }));
    const copy = create("span", "archive-image-copy");
    copy.innerHTML = `<strong>${label}</strong><small>${floor} / ${type}</small><em>${image}</em>`;
    card.appendChild(copy);
    card.addEventListener("click", () => openTourRoom(floorId, roomId));
    grid.appendChild(card);
  });
}

function renderSystems() {
  const filters = ["All", ...HOUSE_DATA.floorGuide.map((floor) => floor.name)];
  const filterRow = $("#systemsFilters");
  filterRow.innerHTML = "";
  filters.forEach((floorName) => {
    const button = create("button", floorName === state.systemsFilter ? "active" : "", floorName);
    button.addEventListener("click", () => {
      state.systemsFilter = floorName;
      renderSystems();
    });
    filterRow.appendChild(button);
  });

  const systems = allRoomSystems().filter((system) => state.systemsFilter === "All" || system.floor_name === state.systemsFilter);
  $("#systemsCount").textContent = `${systems.length} panel${systems.length === 1 ? "" : "s"} online`;
  $("#systemsOverview").textContent = HOUSE_DATA.smartHome.overview;
  $("#systemsAssistant").textContent = HOUSE_DATA.smartHome.assistantName;
  $("#systemsNetwork").textContent = HOUSE_DATA.smartHome.network;
  $("#systemsCapabilityCount").textContent = `${HOUSE_DATA.smartHome.capabilities.length} control layers`;

  const capabilityGrid = $("#systemsCapabilityGrid");
  capabilityGrid.innerHTML = "";
  HOUSE_DATA.smartHome.capabilities.forEach(([id, name, detail]) => {
    const card = create("article", "capability-card");
    card.innerHTML = `<strong>${name}</strong><span>${id}</span><p>${detail}</p>`;
    capabilityGrid.appendChild(card);
  });

  const grid = $("#systemsGrid");
  grid.innerHTML = "";
  systems.forEach((system) => {
    const card = create("button", "system-card");
    card.innerHTML = `
      <span class="system-panel-id">${system.panel_id}</span>
      <h3>${system.room_name}</h3>
      <small>${system.floor_name} / ${system.status}</small>
      <div class="system-readout">
        <div><span>Temp</span><strong>${system.temperature}</strong></div>
        <div><span>Scent</span><strong>${system.scent}</strong></div>
        <div><span>Air</span><strong>${system.air}</strong></div>
        <div><span>Music</span><strong>${system.music}</strong></div>
        <div><span>Noise</span><strong>${system.ambient_noise}</strong></div>
        <div><span>Privacy</span><strong>${system.privacy}</strong></div>
      </div>
    `;
    card.addEventListener("click", () => openTourRoom(system.floor_id, system.room_id));
    grid.appendChild(card);
  });
}

function renderStaff() {
  const categories = ["All", ...new Set(HOUSE_DATA.staff.map(([category]) => category))];
  const filterRow = $("#staffFilters");
  filterRow.innerHTML = "";
  categories.forEach((category) => {
    const button = create("button", category === state.staffFilter ? "active" : "", category);
    button.addEventListener("click", () => {
      state.staffFilter = category;
      renderStaff();
    });
    filterRow.appendChild(button);
  });

  const search = $("#staffSearch").value.toLowerCase();
  const staff = HOUSE_DATA.staff.filter(([category, name, role, detail, status]) => {
    const matchesFilter = state.staffFilter === "All" || category === state.staffFilter;
    const matchesSearch = [category, name, role, detail, status].join(" ").toLowerCase().includes(search);
    return matchesFilter && matchesSearch;
  });

  const grid = $("#staffGrid");
  grid.innerHTML = "";
  staff.forEach(([category, name, role, detail, status]) => {
    const card = create("article", "staff-card");
    card.innerHTML = `
      <div><span class="avatar">${name.split(" ").map((part) => part[0]).join("")}</span><span class="staff-status">${status}</span></div>
      <p class="overline">${category}</p>
      <h3>${name}</h3>
      <strong>${role}</strong>
      <p>${detail}</p>
    `;
    grid.appendChild(card);
  });
}

function renderMeals() {
  const timeline = $("#mealsTimeline");
  timeline.innerHTML = "";
  HOUSE_DATA.meals.forEach(([time, name, location, note, owner]) => {
    const item = create("article", "timeline-item");
    item.innerHTML = `<time>${time}</time><div><h3>${name}</h3><span>${location} / ${owner}</span><p>${note}</p></div>`;
    timeline.appendChild(item);
  });
}

function renderBookings() {
  const select = $("#bookingForm select[name='space']");
  select.innerHTML = HOUSE_DATA.bookingSpaces.map((space) => `<option>${space}</option>`).join("");
  setDefaultBookingDate();

  const list = $("#bookingsList");
  list.innerHTML = "";
  state.bookings
    .map((booking, index) => ({ ...booking, originalIndex: index }))
    .slice()
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
    .forEach((booking) => {
      const card = create("article", "booking-card");
      card.innerHTML = `
        <div>
          <time>${booking.date} / ${booking.time}</time>
          <h3>${booking.space}</h3>
          <span>${booking.host}</span>
          <p>${booking.setup}</p>
        </div>
        <button aria-label="Remove booking">Remove</button>
      `;
      card.querySelector("button").addEventListener("click", () => {
        state.bookings.splice(booking.originalIndex, 1);
        saveBookings();
        renderDashboard();
        renderBookings();
      });
      list.appendChild(card);
    });
}

function setDefaultBookingDate() {
  const input = $("#bookingForm input[name='date']");
  if (input && !input.value) input.value = todayIso();
}

function renderWellness() {
  const grid = $("#wellnessGrid");
  grid.innerHTML = "";
  HOUSE_DATA.wellness.forEach(([time, space, activity, status]) => {
    const card = create("article", "wellness-card");
    card.innerHTML = `<time>${time}</time><h3>${space}</h3><p>${activity}</p><span>${status}</span>`;
    grid.appendChild(card);
  });
}

function renderArrivals() {
  const board = $("#arrivalsBoard");
  board.innerHTML = "";
  HOUSE_DATA.arrivals.forEach(([time, route, name, note]) => {
    const card = create("article", "arrival-card");
    card.innerHTML = `<time>${time}</time><div><h3>${name}</h3><span>${route}</span><p>${note}</p></div>`;
    board.appendChild(card);
  });
}

function renderCollections() {
  const grid = $("#collectionsGrid");
  grid.innerHTML = "";
  HOUSE_DATA.collections.forEach(([name, count, detail]) => {
    const card = create("article", "collection-card");
    card.innerHTML = `<span>${count}</span><h3>${name}</h3><p>${detail}</p>`;
    grid.appendChild(card);
  });
}

function renderManual() {
  const grid = $("#manualGrid");
  grid.innerHTML = "";
  HOUSE_DATA.manual.forEach(([title, text]) => {
    const card = create("article", "manual-card");
    card.innerHTML = `<h3>${title}</h3><p>${text}</p>`;
    grid.appendChild(card);
  });
}

init();
