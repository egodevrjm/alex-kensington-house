const state = {
  view: "dashboard",
  floorId: HOUSE_DATA.floors[2].id,
  roomId: "entrance-hall",
  showAtlas: true,
  staffFilter: "All",
  imageFilter: "All",
  mode: localStorage.getItem("kensington.mode") || "residence",
  bookings: loadBookings()
};

function loadBookings() {
  const saved = localStorage.getItem("kensington.bookings");
  if (saved) return JSON.parse(saved);
  return HOUSE_DATA.bookings.map(([date, time, space, host, setup]) => ({ date, time, space, host, setup }));
}

function saveBookings() {
  localStorage.setItem("kensington.bookings", JSON.stringify(state.bookings));
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

function imageBlock(src, label) {
  const wrapper = create("div", "image-slot");
  const image = new Image();
  image.src = src;
  image.alt = label;
  image.onload = () => {
    wrapper.classList.add("loaded");
    wrapper.innerHTML = "";
    wrapper.appendChild(image);
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
  $("#currentDate").textContent = formatDateLabel();
  renderNav();
  renderModeSelect();
  renderDashboard();
  renderTour();
  renderImageArchive();
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
    localStorage.setItem("kensington.mode", state.mode);
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

  const strip = $("#dashboardImageStrip");
  strip.innerHTML = "";
  HOUSE_DATA.featureImages.forEach(([floor, label, type, image, floorId, roomId]) => {
    const card = create("button", "image-card");
    card.appendChild(imageBlock(image, label));
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
  $("#atlasImage").appendChild(imageBlock("assets/atlas/kensington-townhouse-atlas.png", "Kensington Townhouse Atlas"));
  $("#atlasStage").classList.toggle("active", state.showAtlas);
  $("#atlasButton").classList.toggle("active", state.showAtlas);

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
  floorPlan.appendChild(imageBlock(floor.planImage, `${floor.name} floor plan`));
  const floorPlanPath = create("small", "asset-path", floor.planImage);
  floorPlan.appendChild(floorPlanPath);

  const roomGrid = $("#roomGrid");
  roomGrid.innerHTML = "";
  floor.rooms.forEach(([id, name, description, image]) => {
    const card = create("button", id === state.roomId ? "room-card active" : "room-card");
    card.appendChild(imageBlock(image, name));
    const copy = create("span", "room-card-copy");
    copy.innerHTML = `<strong>${name}</strong><small>${description}</small>`;
    card.appendChild(copy);
    card.addEventListener("click", () => {
      state.roomId = id;
      renderTour();
    });
    roomGrid.appendChild(card);
  });

  renderRoomDetail(floor);
}

function renderRoomDetail(floor) {
  const room = floor.rooms.find((item) => item[0] === state.roomId) || floor.rooms[0];
  const [id, name, description, image] = room;
  const detail = $("#roomDetail");
  detail.innerHTML = "";
  detail.appendChild(imageBlock(image, name));
  const body = create("div", "room-detail-copy");
  body.innerHTML = `
    <p class="overline">${floor.name}</p>
    <h2>${name}</h2>
    <p>${description}</p>
    <dl>
      <div><dt>Image path</dt><dd>${image}</dd></div>
      <div><dt>Room key</dt><dd>${id}</dd></div>
      <div><dt>Access</dt><dd>${floor.id.includes("basement") ? "Service route available" : floor.id === "first-floor" ? "Main stair or service stair" : "Main stair and lift"}</dd></div>
    </dl>
  `;
  detail.appendChild(body);
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
    card.appendChild(imageBlock(image, label));
    const copy = create("span", "archive-image-copy");
    copy.innerHTML = `<strong>${label}</strong><small>${floor} / ${type}</small><em>${image}</em>`;
    card.appendChild(copy);
    card.addEventListener("click", () => openTourRoom(floorId, roomId));
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
