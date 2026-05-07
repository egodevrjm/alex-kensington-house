const ROOM_IMAGE_BASE = "assets/rooms/";
const roomImage = (file) => `${ROOM_IMAGE_BASE}${file}`;

const HOUSE_DATA = {
  houseName: "Albury House",
  houseSubtitle: "Private house intranet",
  nav: [
    ["dashboard", "Dashboard"],
    ["tour", "House Tour"],
    ["explore", "Explore"],
    ["images", "Images"],
    ["systems", "Systems"],
    ["staff", "Staff"],
    ["meals", "Meals"],
    ["bookings", "Bookings"],
    ["wellness", "Wellness"],
    ["arrivals", "Arrivals"],
    ["collections", "Collections"],
    ["manual", "Manual"]
  ],
  modes: [
    {
      id: "residence",
      name: "In Residence",
      text: "Daily private London base. Food, laundry, wardrobe movement, guest readiness, security and service scale around Alex without becoming foreground theatre."
    },
    {
      id: "away",
      name: "Away",
      text: "Knight Frank maintains readiness: cleaning, plant, garden, pool, archive climate, security, systems and quiet inspection rhythms."
    },
    {
      id: "music-nobile",
      name: "Music Nobile",
      text: "First floor runs as a sealed music and entertaining suite. Musicians, engineers, service and late food move through the service route."
    },
    {
      id: "event",
      name: "Full House / Event",
      text: "Temporary staff, catering, security augmentation, AV, florals, cloakroom and cleaning scale the house for a private dinner, screening or party."
    },
    {
      id: "quiet",
      name: "Quiet Night",
      text: "Reduced movement, warm low lighting, no unnecessary service crossings, music floor and wellness held for private use."
    }
  ],
  floorGuide: [
    {
      id: "top-floor",
      key: "4",
      name: "Top Floor",
      role: "Alex's private apartment",
      zone: "Private / archive",
      stats: "10 rooms",
      route: "Main stair, lift, private threshold",
      note: "Bedroom, lounge, wardrobes, archive, rare books and roof terrace."
    },
    {
      id: "third-floor",
      key: "3",
      name: "Third Floor",
      role: "Flexible guest floor",
      zone: "Guest / friends",
      stats: "6 bedrooms/baths + sitting room",
      route: "Main stair, lift, service support",
      note: "Younger guest layer for friends, musicians and post-event stays."
    },
    {
      id: "second-floor",
      key: "2",
      name: "Second Floor",
      role: "Principal guest floor",
      zone: "Senior guest",
      stats: "3 guest suites",
      route: "Main stair, lift, housekeeping support",
      note: "Grown-up guest accommodation with the former Homer/Rosie room."
    },
    {
      id: "first-floor",
      key: "1",
      name: "First Floor / Music Nobile",
      role: "Music, playback, dining",
      zone: "Music / social",
      stats: "9 rooms",
      route: "Main stair glass threshold or service stair",
      note: "Self-contained piano nobile for sessions, listening, dinner and late service."
    },
    {
      id: "raised-ground",
      key: "G",
      name: "Raised Ground Floor",
      role: "Daily living and garden",
      zone: "Daily house",
      stats: "12 areas",
      route: "Front door, main stair, garden, lift",
      note: "Arrival, kitchen, study, garden room, flower room, terrace and garden."
    },
    {
      id: "upper-basement",
      key: "-1",
      name: "Upper Basement / Lower Ground",
      role: "Private club and service engine",
      zone: "Events / service",
      stats: "12 rooms",
      route: "Service entrance, service stair, lift",
      note: "Bar, cinema, tasting, service kitchen, garment care and event staging."
    },
    {
      id: "lower-basement",
      key: "-2",
      name: "Lower Basement",
      role: "Wellness, wine and plant",
      zone: "Wellness / systems",
      stats: "9 areas",
      route: "Lift, service stair, wellness circulation",
      note: "Pool, spa lounge, steam, cold plunge, treatment, gym and plant support."
    }
  ],
  featureImages: [
    ["Raised Ground Floor", "Entrance Hall", "Arrival", roomImage("ground_entrance.png"), "raised-ground", "entrance-hall"],
    ["Raised Ground Floor", "Kitchen / Breakfast Room", "Daily heart", roomImage("ground_kitchen.png"), "raised-ground", "kitchen-breakfast"],
    ["First Floor / Music Nobile", "Music Room", "Bechstein heart", roomImage("first_musicroom.png"), "first-floor", "music-room"],
    ["Lower Basement", "Indoor Pool", "Recovery", roomImage("lb_indoor-pool.png"), "lower-basement", "indoor-pool"],
    ["Top Floor", "Archive Wardrobe", "Fashion archive", roomImage("top_archive.png"), "top-floor", "archive-wardrobe"]
  ],
  floors: [
    {
      id: "lower-basement",
      name: "Lower Basement",
      role: "Wellness, wine and plant",
      mood: "Stone, water, recovery",
      planImage: "assets/atlas/floors/lower-basement.png",
      rooms: [
        ["indoor-pool", "Indoor Pool", "Long dark-stone pool with perimeter lighting, acoustic ceiling treatment and concealed ventilation.", roomImage("lb_indoor-pool.png")],
        ["spa-lounge", "Spa Lounge", "Quiet lounge beside the pool for decompression, towels, water, tea and post-swim recovery.", roomImage("lb_spa_lounge.png")],
        ["steam-room", "Steam Room", "Steam room in dark stone with mist, bronze fittings and controlled low light.", roomImage("lb_steam-room.png")],
        ["cold-plunge", "Cold Plunge", "Compact recovery plunge with shower route, robe storage and spa-grade drainage.", roomImage("lb_cold-plunge.png")],
        ["treatment-room", "Treatment Room", "Quiet plaster recovery room with massage table, task lighting and hidden storage.", roomImage("lb_treatment-room.png")],
        ["gym", "Gym", "Matte black equipment, mirror wall, rubber flooring, weights, cable system and mobility tools.", roomImage("lb_gym.png")],
        ["wellness-bar", "Wellness Bar", "Small pool-level bar for water, tea, mixers, champagne and recovery drinks.", roomImage("lb_wellness-bar.png")],
        ["plant-room", "Plant Room", "Pool systems, air handling, boilers, pumps and backup systems.", roomImage("lb_plant-room.png")],
        ["lift-motor-room", "Lift Motor Room", "Operational lift infrastructure, hidden from guest routes but essential to all-level access.", roomImage("lb_lift-motor-room.png")]
      ]
    },
    {
      id: "upper-basement",
      name: "Upper Basement / Lower Ground",
      role: "Private club and service engine",
      mood: "After-hours, hidden logistics",
      planImage: "assets/atlas/floors/upper-basement-lower-ground.png",
      rooms: [
        ["bar-games", "Bar / Games Room", "Dark walnut, smoked mirror, black marble bar, banquettes, games and low amber lamps.", roomImage("ub_bar.png")],
        ["cinema", "Cinema / Screening Room", "Dark acoustic shell with deep modular seating, Atmos, blackout lighting and refreshment cabinet.", roomImage("ub_cinema.png")],
        ["wine-bourbon-room", "Wine / Bourbon Room", "Glass-fronted wine and bourbon storage, tasting table and amber light.", roomImage("ub_winebourbon.png")],
        ["basement-powder", "Basement Powder Room", "Dark lacquer and stone powder room serving bar and cinema level.", roomImage("ub_basement-powder.png")],
        ["service-kitchen", "Prep Kitchen / Service Kitchen", "Professional private-house service kitchen for catering, plating and dishwasher runs.", roomImage("ub_service-kitchen.png")],
        ["laundry", "Laundry & Garment Care", "Washer and dryer bank, steamers, pressing table, hanging rails and linen storage.", roomImage("ub_laundry.png")],
        ["delivery-hold", "Delivery Hold / Event Staging", "Receives flowers, garment bags, catering cases, instruments and production crates.", roomImage("ub_delivery-hold.png")],
        ["staff-office", "Staff Office", "Coordination nook for manuals, schedules, event plans, readiness logs and secure files.", roomImage("ub_staff-office.png")],
        ["housekeeping-store", "Housekeeping Store", "Cleaning supplies, guest supplies, candles, linens, vases and paper goods.", roomImage("ub_housekeeping-store.png")],
        ["service-stair-hall", "Service Stair Hall", "Back-of-house hub linking service entrance, music floor, guest floors and support zones.", roomImage("ub_service-stair-hall.png")],
        ["plant-mep", "Plant Room / MEP", "Lower-ground mechanical and electrical support for the house operations layer.", roomImage("ub_plant-mep.png")],
        ["powder-room", "Powder Room", "Compact dark powder room for the private club and cinema level.", roomImage("ub_powder-room.png")]
      ]
    },
    {
      id: "raised-ground",
      name: "Raised Ground Floor",
      role: "Daily living and garden",
      mood: "Arrival, kitchen, warmth",
      planImage: "assets/atlas/floors/raised-ground-floor.png",
      rooms: [
        ["entrance-hall", "Entrance Hall", "Black front door, restored stair sightline, warm plaster, flowers and the Nara work.", roomImage("ground_entrance.png")],
        ["main-stair", "Main Stair Hall", "Restored stair, runner, art on landings, bronze details and warm lighting.", roomImage("ground_stair.png")],
        ["cloakroom", "Cloakroom / Guest WC", "Dark jewel-box room with stone, bronze, flattering mirror light and one small artwork.", roomImage("ground_cloakroom.png")],
        ["coat-cupboard", "Coat Cupboard", "Hidden joinery for guest coats, umbrellas and daily outerwear.", roomImage("ground_coats.png")],
        ["kitchen-breakfast", "Kitchen / Breakfast Room", "Architectural kitchen with dark cabinetry, stone counters and the original chipped pine table.", roomImage("ground_kitchen.png")],
        ["garden-room", "Garden Room", "Rear sitting room opening to terrace and garden with soft seating, books and concealed speakers.", roomImage("ground_garden.png")],
        ["study-library", "Study / Library", "True working study with desk, books, works on paper, laptop and reading chair.", roomImage("ground_study_library.png")],
        ["flower-room", "Flower Room / Garden Pantry", "Stone counter, sink, vase storage, terrace glassware, candles and garden-event prep.", roomImage("ground_flowerroom.png")],
        ["boot-room", "Garden Lobby / Boot Room", "Stone floor, hooks, umbrellas, boots, cushions, throws and outdoor kit.", roomImage("ground_bootroom.png")],
        ["rear-terrace", "Rear Terrace", "Stone terrace with outdoor dining, lanterns, planters and heaters.", roomImage("ground_rearterrace.png")],
        ["main-garden", "Main Garden", "Private walled garden with disciplined planting, terrace, lawn and far seating pocket.", roomImage("ground_garden.png")],
        ["front-garden", "Front Garden / Forecourt", "Formal front threshold with railings, planting, arrival control and the black front door approach.", roomImage("ground_front-garden.png")]
      ]
    },
    {
      id: "first-floor",
      name: "First Floor / Music Nobile",
      role: "Music, playback, dining",
      mood: "Self-contained after dark",
      planImage: "assets/atlas/floors/first-floor-music-nobile.png",
      rooms: [
        ["music-nobile-threshold", "Music Nobile Threshold", "Smoked or fluted glass door with acoustic seal and a restrained private music-floor mark.", roomImage("first_music-nobile-threshold.png")],
        ["first-landing", "First-Floor Landing / Gallery", "Gallery-like arrival zone with art, rug, console and controlled lighting.", roomImage("first_landing.png")],
        ["principal-salon", "Principal Salon", "Main social lounge for drinks, conversation, waiting before dinner and post-session sprawl.", roomImage("first_salon.png")],
        ["music-room", "Music Room", "Working music room with 1910 C. Bechstein grand, hidden acoustic treatment and tall windows.", roomImage("first_musicroom.png")],
        ["control-listening", "Control / Listening Room", "Private control room and playback salon with monitors, console, vinyl wall and sofa.", roomImage("first_listeningstudio.png")],
        ["supper-room", "Dining Room / Supper Room", "Flexible private dining room for dinners, artist meals, label meetings and family suppers.", roomImage("first_supper.png")],
        ["drinks-pantry", "Drinks Bar & Service Pantry", "Bar, sink, glasswasher, ice, fridges, coffee, plate warmer and service stair connection.", roomImage("first_drinks-pantry.png")],
        ["first-powder", "First-Floor Powder Room", "Sharper evening powder room with dark stone, bronze and flattering atmosphere.", roomImage("first_powder.png")],
        ["musician-route", "Service Stair / Musician Route", "Discreet route for musicians, engineers, caterers, staff and deliveries.", roomImage("first_musician-route.png")]
      ]
    },
    {
      id: "second-floor",
      name: "Second Floor",
      role: "Principal guest floor",
      mood: "Calm, grown-up, settled",
      planImage: "assets/atlas/floors/second-floor.png",
      rooms: [
        ["second-landing", "Second-Floor Landing", "Soft landing with linen detail, art, lamp and calm circulation.", roomImage("second_landing.png")],
        ["principal-guest", "Principal Guest Bedroom", "Former Homer and Rosie room, mature and settled without shrine quality.", roomImage("second_principal-guest.png")],
        ["principal-guest-bath", "Principal Guest Ensuite", "Stone bathroom with bath, walk-in shower, warm light and understated luxury.", roomImage("second_principal-guest-bath.png")],
        ["principal-dressing", "Principal Guest Dressing Room", "Fitted wardrobes, luggage bench, drawers, mirror and guest storage.", roomImage("second_principal-dressing.png")],
        ["guest-bedroom-2", "Guest Bedroom 2", "Quiet guest bedroom with art, chair, good lamps and fitted storage.", roomImage("second_guest-bedroom-2.png")],
        ["guest-bath-2", "Ensuite Bathroom 2", "Stone-led bathroom with shower, vanity and heated-floor atmosphere.", roomImage("second_guest-bath-2.png")],
        ["guest-bedroom-3", "Guest Bedroom 3", "Slightly younger guest room suitable for friends or family.", roomImage("second_guest-bedroom-3.png")],
        ["guest-bath-3", "Ensuite Bathroom 3", "Compact high-quality bathroom with stone, bronze and good lighting.", roomImage("second_guest-bath-3.png")],
        ["linen-press", "Linen Press / Landing Nook", "Towels, bedding, guest supplies and a small domestic pause point.", roomImage("second_linen-press.png")]
      ]
    },
    {
      id: "third-floor",
      name: "Third Floor",
      role: "Flexible guest floor",
      mood: "Younger, looser, friendlier",
      planImage: "assets/atlas/floors/third-floor.png",
      rooms: [
        ["third-landing", "Third-Floor Landing", "Narrower upper landing with warm lighting, art and simple circulation.", roomImage("third_landing.png")],
        ["guest-bedroom-4", "Guest Bedroom 4", "Relaxed guest room for friends or musicians.", roomImage("third_guest-bedroom-4.png")],
        ["guest-bath-4", "Ensuite Bathroom 4", "Compact stone bathroom with shower, brass fittings and good storage.", roomImage("third_guest-bath-4.png")],
        ["guest-bedroom-5", "Guest Bedroom 5", "Flexible guest bedroom with a younger feel.", roomImage("third_guest-bedroom-5.png")],
        ["guest-bath-5", "Ensuite Bathroom 5", "Guest bathroom with vanity, shower and warm wall light.", roomImage("third_guest-bath-5.png")],
        ["guest-bedroom-6", "Guest Bedroom 6", "Smaller guest bedroom, intimate and comfortable.", roomImage("third_guest-bedroom-6.png")],
        ["guest-bath-6", "Ensuite Bathroom 6", "Clean practical stone bathroom.", roomImage("third_guest-bath-6.png")],
        ["guest-sitting-room", "Guest Sitting Room", "Shared lounge with sofa, hidden TV, books and late-night guest spillover.", roomImage("third_guest-sitting-room.png")],
        ["third-linen", "Linen / Housekeeping Cupboard", "Towels, spare bedding, guest supplies and housekeeping support.", roomImage("third_linen.png")]
      ]
    },
    {
      id: "top-floor",
      name: "Top Floor",
      role: "Alex's private apartment",
      mood: "Private, tailored, air",
      planImage: "assets/atlas/floors/top-floor.png",
      rooms: [
        ["private-landing", "Private Landing / Gallery", "Darker, quieter threshold into Alex's floor with art, books, lamp and console.", roomImage("top_landing.png")],
        ["primary-bedroom", "Primary Bedroom", "Dark tailored bedroom with low bed, city view, contemporary art and restrained objects.", roomImage("top_bedroom.png")],
        ["private-lounge", "Private Lounge / Upright Piano", "Decompression room with sofa, upright piano, books, turntable and low lamps.", roomImage("top_lounge.png")],
        ["daily-bathroom", "Dark Daily Bathroom", "Shower-focused dark stone bathroom with strong shower, grooming storage and low light.", roomImage("top_daily-bathroom.png")],
        ["light-bath", "Light Bathing / Dressing Bathroom", "Softer bath room with pale stone, robe storage, mirror and morning light.", roomImage("top_light-bath.png")],
        ["seasonal-dressing", "Current-Season Dressing Room", "Active wardrobe room for seasonal capsules, fittings, outfit pulls and travel packing.", roomImage("top_currentseasondressing.png")],
        ["archive-wardrobe", "Archive Wardrobe", "Museum-grade fashion archive with climate-controlled cases, vitrines and flat drawers.", roomImage("top_archive.png")],
        ["watch-safe", "Watch & Jewellery Safe", "Integrated safe for watches, family pieces, jewellery and high-value accessories.", roomImage("top_watch-safe.png")],
        ["rare-books", "Rare Books Case / Reading Nook", "Protected book area for first editions, intimate and almost sacred.", roomImage("top_rare-books.png")],
        ["roof-terrace", "Private Roof Terrace", "All-weather seating, planters, terrace bar, lanterns, blankets and west London skyline views.", roomImage("top_roofterrace.png")]
      ]
    }
  ],
  imageArchive: [
    ["Lower Basement", "Indoor Pool", "Exact room image", roomImage("lb_indoor-pool.png"), "lower-basement", "indoor-pool"],
    ["Lower Basement", "Spa Lounge", "Exact room image", roomImage("lb_spa_lounge.png"), "lower-basement", "spa-lounge"],
    ["Lower Basement", "Steam Room", "Exact room image", roomImage("lb_steam-room.png"), "lower-basement", "steam-room"],
    ["Lower Basement", "Cold Plunge", "Exact room image", roomImage("lb_cold-plunge.png"), "lower-basement", "cold-plunge"],
    ["Lower Basement", "Treatment Room", "Exact room image", roomImage("lb_treatment-room.png"), "lower-basement", "treatment-room"],
    ["Lower Basement", "Gym", "Exact room image", roomImage("lb_gym.png"), "lower-basement", "gym"],
    ["Lower Basement", "Wellness Bar", "Exact room image", roomImage("lb_wellness-bar.png"), "lower-basement", "wellness-bar"],
    ["Lower Basement", "Plant Room", "Exact room image", roomImage("lb_plant-room.png"), "lower-basement", "plant-room"],
    ["Lower Basement", "Lift Motor Room", "Exact room image", roomImage("lb_lift-motor-room.png"), "lower-basement", "lift-motor-room"],
    ["Upper Basement / Lower Ground", "Bar / Games Room", "Exact room image", roomImage("ub_bar.png"), "upper-basement", "bar-games"],
    ["Upper Basement / Lower Ground", "Cinema / Screening Room", "Exact room image", roomImage("ub_cinema.png"), "upper-basement", "cinema"],
    ["Upper Basement / Lower Ground", "Wine / Bourbon Room", "Exact room image", roomImage("ub_winebourbon.png"), "upper-basement", "wine-bourbon-room"],
    ["Upper Basement / Lower Ground", "Basement Powder Room", "Exact room image", roomImage("ub_basement-powder.png"), "upper-basement", "basement-powder"],
    ["Upper Basement / Lower Ground", "Powder Room", "Exact room image", roomImage("ub_powder-room.png"), "upper-basement", "powder-room"],
    ["Upper Basement / Lower Ground", "Service Kitchen", "Exact room image", roomImage("ub_service-kitchen.png"), "upper-basement", "service-kitchen"],
    ["Upper Basement / Lower Ground", "Laundry / Garment Care", "Exact room image", roomImage("ub_laundry.png"), "upper-basement", "laundry"],
    ["Upper Basement / Lower Ground", "Delivery Hold", "Exact room image", roomImage("ub_delivery-hold.png"), "upper-basement", "delivery-hold"],
    ["Upper Basement / Lower Ground", "Staff Office", "Exact room image", roomImage("ub_staff-office.png"), "upper-basement", "staff-office"],
    ["Upper Basement / Lower Ground", "Housekeeping Store", "Exact room image", roomImage("ub_housekeeping-store.png"), "upper-basement", "housekeeping-store"],
    ["Upper Basement / Lower Ground", "Service Stair Hall", "Exact room image", roomImage("ub_service-stair-hall.png"), "upper-basement", "service-stair-hall"],
    ["Upper Basement / Lower Ground", "Plant / MEP", "Exact room image", roomImage("ub_plant-mep.png"), "upper-basement", "plant-mep"],
    ["Raised Ground Floor", "Entrance Hall", "Exact room image", roomImage("ground_entrance.png"), "raised-ground", "entrance-hall"],
    ["Raised Ground Floor", "Main Stair Hall", "Exact room image", roomImage("ground_stair.png"), "raised-ground", "main-stair"],
    ["Raised Ground Floor", "Cloakroom / Guest WC", "Exact room image", roomImage("ground_cloakroom.png"), "raised-ground", "cloakroom"],
    ["Raised Ground Floor", "Coat Cupboard", "Exact room image", roomImage("ground_coats.png"), "raised-ground", "coat-cupboard"],
    ["Raised Ground Floor", "Kitchen / Breakfast Room", "Exact room image", roomImage("ground_kitchen.png"), "raised-ground", "kitchen-breakfast"],
    ["Raised Ground Floor", "Garden Room", "Exact room image", roomImage("ground_garden.png"), "raised-ground", "garden-room"],
    ["Raised Ground Floor", "Rear Terrace", "Exact room image", roomImage("ground_rearterrace.png"), "raised-ground", "rear-terrace"],
    ["Raised Ground Floor", "Study / Library", "Exact room image", roomImage("ground_study_library.png"), "raised-ground", "study-library"],
    ["Raised Ground Floor", "Flower Room / Garden Pantry", "Exact room image", roomImage("ground_flowerroom.png"), "raised-ground", "flower-room"],
    ["Raised Ground Floor", "Garden Lobby / Boot Room", "Exact room image", roomImage("ground_bootroom.png"), "raised-ground", "boot-room"],
    ["Raised Ground Floor", "Front Garden / Forecourt", "Exact room image", roomImage("ground_front-garden.png"), "raised-ground", "front-garden"],
    ["First Floor / Music Nobile", "Music Nobile Threshold", "Exact room image", roomImage("first_music-nobile-threshold.png"), "first-floor", "music-nobile-threshold"],
    ["First Floor / Music Nobile", "First-Floor Landing / Gallery", "Exact room image", roomImage("first_landing.png"), "first-floor", "first-landing"],
    ["First Floor / Music Nobile", "Principal Salon", "Exact room image", roomImage("first_salon.png"), "first-floor", "principal-salon"],
    ["First Floor / Music Nobile", "Music Room", "Exact room image", roomImage("first_musicroom.png"), "first-floor", "music-room"],
    ["First Floor / Music Nobile", "Control / Listening Room", "Exact room image", roomImage("first_listeningstudio.png"), "first-floor", "control-listening"],
    ["First Floor / Music Nobile", "Dining Room / Supper Room", "Exact room image", roomImage("first_supper.png"), "first-floor", "supper-room"],
    ["First Floor / Music Nobile", "Drinks Pantry", "Exact room image", roomImage("first_drinks-pantry.png"), "first-floor", "drinks-pantry"],
    ["First Floor / Music Nobile", "First-Floor Powder Room", "Exact room image", roomImage("first_powder.png"), "first-floor", "first-powder"],
    ["First Floor / Music Nobile", "Musician Route", "Exact room image", roomImage("first_musician-route.png"), "first-floor", "musician-route"],
    ["Second Floor", "Second-Floor Landing", "Exact room image", roomImage("second_landing.png"), "second-floor", "second-landing"],
    ["Second Floor", "Principal Guest Bedroom", "Exact room image", roomImage("second_principal-guest.png"), "second-floor", "principal-guest"],
    ["Second Floor", "Principal Guest Ensuite", "Exact room image", roomImage("second_principal-guest-bath.png"), "second-floor", "principal-guest-bath"],
    ["Second Floor", "Principal Guest Dressing Room", "Exact room image", roomImage("second_principal-dressing.png"), "second-floor", "principal-dressing"],
    ["Second Floor", "Guest Bedroom 2", "Exact room image", roomImage("second_guest-bedroom-2.png"), "second-floor", "guest-bedroom-2"],
    ["Second Floor", "Ensuite Bathroom 2", "Exact room image", roomImage("second_guest-bath-2.png"), "second-floor", "guest-bath-2"],
    ["Second Floor", "Guest Bedroom 3", "Exact room image", roomImage("second_guest-bedroom-3.png"), "second-floor", "guest-bedroom-3"],
    ["Second Floor", "Ensuite Bathroom 3", "Exact room image", roomImage("second_guest-bath-3.png"), "second-floor", "guest-bath-3"],
    ["Second Floor", "Linen Press", "Exact room image", roomImage("second_linen-press.png"), "second-floor", "linen-press"],
    ["Third Floor", "Third-Floor Landing", "Exact room image", roomImage("third_landing.png"), "third-floor", "third-landing"],
    ["Third Floor", "Guest Bedroom 4", "Exact room image", roomImage("third_guest-bedroom-4.png"), "third-floor", "guest-bedroom-4"],
    ["Third Floor", "Ensuite Bathroom 4", "Exact room image", roomImage("third_guest-bath-4.png"), "third-floor", "guest-bath-4"],
    ["Third Floor", "Guest Bedroom 5", "Exact room image", roomImage("third_guest-bedroom-5.png"), "third-floor", "guest-bedroom-5"],
    ["Third Floor", "Ensuite Bathroom 5", "Exact room image", roomImage("third_guest-bath-5.png"), "third-floor", "guest-bath-5"],
    ["Third Floor", "Guest Bedroom 6", "Exact room image", roomImage("third_guest-bedroom-6.png"), "third-floor", "guest-bedroom-6"],
    ["Third Floor", "Ensuite Bathroom 6", "Exact room image", roomImage("third_guest-bath-6.png"), "third-floor", "guest-bath-6"],
    ["Third Floor", "Guest Sitting Room", "Exact room image", roomImage("third_guest-sitting-room.png"), "third-floor", "guest-sitting-room"],
    ["Third Floor", "Linen / Housekeeping Cupboard", "Exact room image", roomImage("third_linen.png"), "third-floor", "third-linen"],
    ["Top Floor", "Private Landing / Gallery", "Exact room image", roomImage("top_landing.png"), "top-floor", "private-landing"],
    ["Top Floor", "Primary Bedroom", "Exact room image", roomImage("top_bedroom.png"), "top-floor", "primary-bedroom"],
    ["Top Floor", "Private Lounge / Upright Piano", "Exact room image", roomImage("top_lounge.png"), "top-floor", "private-lounge"],
    ["Top Floor", "Dark Daily Bathroom", "Exact room image", roomImage("top_daily-bathroom.png"), "top-floor", "daily-bathroom"],
    ["Top Floor", "Light Bathing Bathroom", "Exact room image", roomImage("top_light-bath.png"), "top-floor", "light-bath"],
    ["Top Floor", "Current-Season Dressing Room", "Exact room image", roomImage("top_currentseasondressing.png"), "top-floor", "seasonal-dressing"],
    ["Top Floor", "Archive Wardrobe", "Exact room image", roomImage("top_archive.png"), "top-floor", "archive-wardrobe"],
    ["Top Floor", "Watch & Jewellery Safe", "Exact room image", roomImage("top_watch-safe.png"), "top-floor", "watch-safe"],
    ["Top Floor", "Safe / Reading Nook", "Exact room image", roomImage("top_safe-readingnook.png"), "top-floor", "watch-safe"],
    ["Top Floor", "Rare Books Case / Reading Nook", "Exact room image", roomImage("top_rare-books.png"), "top-floor", "rare-books"],
    ["Top Floor", "Private Roof Terrace", "Exact room image", roomImage("top_roofterrace.png"), "top-floor", "roof-terrace"]
  ],
  smartHome: {
    assistantName: "Albury",
    network: "Private house mesh",
    overview: "Every room has a discreet wall control panel and room-aware smart assistant for climate, scent, air, music, ambient noise, lighting and service requests.",
    capabilities: [
      ["temperature", "Temperature", "Room-level heating, cooling, underfloor warmth and fireplace lockouts where fitted."],
      ["scent", "Scent Profile", "Low-diffusion house scent presets by room type, with archive and wellness exceptions."],
      ["air", "Air Quality", "Fresh-air rate, filtration, humidity and CO2 monitoring tied to occupancy."],
      ["music", "Music", "Room or grouped playback through concealed speakers and specialist Music Nobile routing."],
      ["ambient_noise", "Ambient Noise", "Privacy masking, rain, fire, garden, pool or quiet-house acoustic beds."],
      ["lighting", "Lighting", "Scene-led architectural, task, evening and night lighting."],
      ["privacy", "Privacy", "Do-not-disturb state, guest lockout and staff/service visibility."],
      ["service", "Service Call", "Room-specific requests routed to house, kitchen, wellness, security or music staff."]
    ],
    floorDefaults: {
      "lower-basement": ["21.0 C", "Mineral eucalyptus", "Spa filtration / humidity managed", "Wellness low tempo", "Water hush"],
      "upper-basement": ["20.0 C", "Tobacco cedar", "Event extract / fresh-air boost", "Late bar or cinema", "Club room hush"],
      "raised-ground": ["21.5 C", "Green fig", "Fresh-air balanced", "House morning mix", "Garden air"],
      "first-floor": ["20.5 C", "Amber cedar", "Studio-grade fresh air", "Music Nobile routing", "Acoustic privacy mask"],
      "second-floor": ["20.0 C", "Clean linen", "Guest comfort mode", "Guest room soft playlist", "Soft rain"],
      "third-floor": ["20.0 C", "Clean linen", "Guest comfort mode", "Guest room soft playlist", "Soft rain"],
      "top-floor": ["20.5 C", "Hinoki smoke", "Private suite balanced", "Private library / piano", "City hush"]
    },
    roomOverrides: {
      "archive-wardrobe": ["18.0 C", "Scent disabled", "Archive humidity 45-50%", "Playback disabled", "Silent archive"],
      "rare-books": ["18.5 C", "Scent disabled", "Archive humidity 45-50%", "Playback disabled", "Silent archive"],
      "watch-safe": ["19.0 C", "Scent disabled", "Secure dry air", "Playback disabled", "Silent secure room"],
      "music-room": ["20.0 C", "Amber cedar low", "Studio quiet fresh air", "Session input / Bechstein mic preset", "Acoustic isolation"],
      "control-listening": ["20.0 C", "Amber cedar low", "Studio quiet fresh air", "Reference monitors / turntables", "Playback silence"],
      "supper-room": ["21.0 C", "Low amber resin", "Dinner occupancy boost", "Dinner / post-session", "Soft table privacy"],
      "cinema": ["19.5 C", "Dark cedar", "Silent air / blackout mode", "Cinema Atmos", "Blackout acoustic hush"],
      "bar-games": ["20.0 C", "Tobacco cedar", "Event extract", "Bar late", "Low club murmur"],
      "indoor-pool": ["29.0 C water / 30.0 C air", "Mineral eucalyptus", "Pool humidity active", "Pool calm", "Water hush"],
      "steam-room": ["Steam cycle", "Eucalyptus", "Steam extract", "Spa off", "Steam hush"],
      "cold-plunge": ["8.0 C water", "Mineral mint", "Fresh-air boost", "Spa off", "Water hush"],
      "treatment-room": ["22.5 C", "Lavender mineral", "Treatment quiet air", "Treatment calm", "Breathwork"],
      "gym": ["19.0 C", "Citrus mineral", "High fresh-air rate", "Training", "Energy low"],
      "kitchen-breakfast": ["21.0 C", "Green fig / coffee safe", "Kitchen extract linked", "Morning kitchen", "Garden air"],
      "garden-room": ["21.5 C", "Green fig", "Garden fresh air", "Afternoon house", "Garden air"],
      "primary-bedroom": ["19.0 C", "Hinoki smoke low", "Sleep air", "Private sleep", "City hush"],
      "private-lounge": ["20.5 C", "Hinoki smoke", "Private library / piano", "Private library / piano", "Fire hush"],
      "roof-terrace": ["Weather-led", "Outdoor scent disabled", "Outdoor sensors", "Terrace group", "City air"]
    }
  },
  staff: [
    ["House", "Ottilie Marchant", "House Manager / Knight Frank Lead", "Overall running of the house, contractors, budgets, readiness and inspections.", "On duty"],
    ["House", "Kit Peverell", "Deputy House Manager", "Deliveries, room readiness, event prep, guest movement and staff rota.", "On duty"],
    ["Housekeeping", "Mairi Elphinstone", "Head Housekeeper", "Cleaning standards, linens, guest rooms and seasonal turns.", "On duty"],
    ["Housekeeping", "Sabine Kroll", "Housekeeper", "Daily cleaning, guest prep, bathrooms, silver and glass.", "On duty"],
    ["Housekeeping", "Priya Nandha", "Housekeeper", "Laundry support, guest amenities and turndowns when occupied.", "On call"],
    ["Wardrobe", "Blythe Carrow", "Laundry & Garment-Care Specialist", "Pressing, steaming, wardrobe handling, linen and delicate garments.", "On duty"],
    ["Kitchen", "Rafael Bellocq", "Private Chef / On-Call Chef", "Daily meals, guest meals and sixteen-person suppers.", "In kitchen"],
    ["Kitchen", "Tolly Venn", "Kitchen Assistant / Steward", "Prep, dishwashing, pantry stocking and service kitchen operation.", "In kitchen"],
    ["Service", "Crispin Vale", "Butler / Front-of-House Steward", "Guest greeting, drinks, table service and Music Nobile support.", "On duty"],
    ["Security", "Saskia Rooke", "Security Lead", "External security, access control, contractor vetting and risk.", "On duty"],
    ["Security", "Niall Bracken", "Night Security / Concierge", "Overnight presence, alarm response and service entrance control.", "Tonight"],
    ["Garden", "Clem Frobisher", "Gardener", "Garden, terrace planting, irrigation and seasonal planting.", "Scheduled"],
    ["Systems", "Denzil Pike", "Maintenance Technician", "HVAC, pool, plant rooms, lighting, AV coordination and repairs.", "On call"],
    ["Music", "Imogen Straker", "AV / Music Systems Consultant", "Music Nobile, cinema, listening room and integrated speakers.", "Scheduled"],
    ["Wellness", "Leander Shaw", "Pool & Wellness Technician", "Pool chemistry, humidity, sauna, steam and cold plunge.", "Scheduled"],
    ["Archive", "Honor Ritson", "Wardrobe Conservation Consultant", "Fashion archive, humidity, mounts, flat storage and light exposure.", "Scheduled"],
    ["Art", "Marceline Quist", "Art Handler / Lighting Consultant", "Art movement, condition checks, lighting levels and UV management.", "Scheduled"]
  ],
  meals: [
    ["07:30", "Breakfast", "Kitchen / Breakfast Room", "Alex table set, grapefruit, coffee, eggs on request.", "Rafael"],
    ["12:45", "Lunch", "Garden Room", "Light lunch, garden tray possible if weather holds.", "Tolly"],
    ["18:30", "Music Nobile Supper Prep", "First-Floor Pantry", "Cold plates, salad, pasta hold, champagne and still water.", "Crispin"],
    ["20:15", "Dinner", "Dining Room / Supper Room", "Eight covers, candles, low florals, Wool wall light checked.", "Rafael"],
    ["23:30", "Late Music Nobile Food", "Music Nobile", "Toasties, fruit, water, tea and dirty-return cleared by service stair.", "Tolly"]
  ],
  bookingSpaces: [
    "Music Nobile",
    "Music Room",
    "Control / Listening Room",
    "Dining Room / Supper Room",
    "Cinema / Screening Room",
    "Bar / Games Room",
    "Principal Guest Suite",
    "Guest Bedroom 2",
    "Guest Bedroom 3",
    "Guest Bedroom 4",
    "Guest Bedroom 5",
    "Guest Bedroom 6",
    "Treatment Room",
    "Indoor Pool",
    "Roof Terrace",
    "Main Garden"
  ],
  bookings: [
    ["2026-05-04", "10:00", "Treatment Room", "Physio hold", "Quiet setup, water, towels, low heat."],
    ["2026-05-04", "15:30", "Music Nobile", "Playback", "Engineer via service stair, pantry coffee, Music Room patched."],
    ["2026-05-04", "20:15", "Dining Room / Supper Room", "Private dinner", "Eight covers, candles, Wool wall, service pantry live."],
    ["2026-05-05", "11:00", "Principal Guest Suite", "Guest arrival", "Flowers, luggage bench, bath towels, climate set."]
  ],
  wellness: [
    ["07:00", "Indoor Pool", "Open swim", "Ready"],
    ["08:30", "Gym", "Private training", "Reserved"],
    ["10:00", "Treatment Room", "Physio / massage", "Booked"],
    ["12:00", "Sauna", "Heat cycle", "Ready"],
    ["14:00", "Steam / Cold Plunge", "Maintenance check", "Technician"],
    ["18:00", "Indoor Pool", "Quiet swim", "Private"]
  ],
  arrivals: [
    ["08:15", "Front Door", "Florist", "Entrance, supper room and guest suite flowers."],
    ["09:40", "Service Entrance", "Garment bags", "Blythe to receive, top-floor dressing route."],
    ["11:20", "Service Entrance", "Catering case", "Service kitchen hold, marked for dinner."],
    ["14:45", "Service Entrance", "Engineer", "Music Nobile access, Imogen notified."],
    ["18:05", "Front Door", "Dinner guest cars", "Crispin front-of-house, Saskia monitoring pavement."]
  ],
  readiness: [
    ["Principal Guest Suite", "Ready"],
    ["Guest Bedroom 2", "Ready"],
    ["Guest Bedroom 3", "Turn-down pending"],
    ["Third-Floor Guest Sitting Room", "Ready"],
    ["Music Nobile", "Pantry check"],
    ["Music Room", "Piano humidity checked"],
    ["Cinema", "Ready"],
    ["Treatment Room", "Towels pending"],
    ["Roof Terrace", "Weather hold"]
  ],
  collections: [
    ["Art", "17 works", "Room-led placement across entrance, stair, salon, music, dining and private floor."],
    ["Fashion Archive", "$1.5M catalogued", "McQueen, Versace, Gucci, Raf Simons, Yohji, Helmut Lang, Margiela and Ossie Clark."],
    ["Books", "$170K", "First editions with Montale's Ossi di seppia as the private cornerstone."],
    ["Vinyl", "$60K+", "Collectible pressings plus working records. Turntables are functional, not decorative."],
    ["Watches", "40-50 pieces", "Patek, Homer's Rolex, Cartier Tank, Reverso, Speedmaster and family pieces."],
    ["Jewellery", "Minimal", "Dawson signet, Nella chain, single hoop, Stella vintage ring and high-value accessories."]
  ],
  manual: [
    ["Privacy", "No public photography, no casual filming, no guest access beyond booked zones without approval."],
    ["Service Routes", "Staff, musicians, engineers, catering and deliveries use the service entrance and service stair wherever possible."],
    ["Music Nobile", "First floor can run as a sealed suite. Bar pantry handles light service; heavy catering remains lower ground."],
    ["Archive Handling", "Top-floor archive access requires logging, low light, clean hands, no flash and consultant protocol for high-value garments."],
    ["Art and Light", "No unscheduled movement. Lighting levels and UV exposure remain under consultant settings."],
    ["Wellness", "Pool, sauna, steam and cold plunge require daily checks before guest use."],
    ["Guest Floors", "Guest bedrooms reset daily when occupied. Luggage, flowers, water and climate are checked before arrival."],
    ["House Tone", "Ready, private, warm and calm. Competence should be felt before it is seen."],
    ["Digital Room Controls", "Every room has a discreet control panel and Albury smart assistant. Room scenes may adjust temperature, scent, air quality, music, ambient noise, lighting, privacy and service calls."]
  ]
};

const FLOOR_PLAN_SHAPES = {
  "top-floor": {
    note: "Private suite, archive rooms and roof terrace",
    rooms: [
      ["private-lounge", "Private Lounge", 24, 38, 166, 124, "private"],
      ["primary-bedroom", "Primary Bedroom", 206, 38, 168, 124, "private"],
      ["daily-bathroom", "Dark Bath", 390, 38, 86, 84, "wellness"],
      ["light-bath", "Light Bath", 492, 38, 96, 84, "wellness"],
      ["rare-books", "Rare Books", 604, 38, 92, 84, "archive"],
      ["seasonal-dressing", "Dressing", 24, 182, 166, 112, "archive"],
      ["archive-wardrobe", "Archive Wardrobe", 206, 182, 168, 112, "archive"],
      ["watch-safe", "Watch Safe", 390, 142, 86, 152, "service"],
      ["private-landing", "Private Landing", 492, 142, 96, 152, "circulation"],
      ["roof-terrace", "Roof Terrace", 720, 38, 176, 256, "garden"]
    ],
    service: [
      ["top-lift", "Lift", 604, 142, 92, 70, "circulation"],
      ["top-stair", "Stair", 604, 224, 92, 70, "circulation"]
    ],
    outline: "M16 26H708V306H16Z M712 26H904V306H712Z"
  },
  "third-floor": {
    note: "Flexible bedrooms with shared sitting room",
    rooms: [
      ["guest-bedroom-4", "Guest Bedroom 4", 24, 42, 162, 136, "sleeping"],
      ["guest-bedroom-5", "Guest Bedroom 5", 202, 42, 162, 136, "sleeping"],
      ["guest-bedroom-6", "Guest Bedroom 6", 380, 42, 162, 136, "sleeping"],
      ["guest-sitting-room", "Guest Sitting", 662, 42, 236, 216, "social"],
      ["guest-bath-4", "Bath 4", 24, 196, 78, 92, "wellness"],
      ["guest-bath-5", "Bath 5", 202, 196, 78, 92, "wellness"],
      ["guest-bath-6", "Bath 6", 380, 196, 78, 92, "wellness"],
      ["third-linen", "Linen", 556, 196, 88, 92, "service"],
      ["third-landing", "Landing", 118, 196, 420, 92, "circulation"]
    ],
    service: [
      ["third-lift", "Lift", 556, 42, 88, 62, "circulation"],
      ["third-stair", "Stair", 556, 116, 88, 62, "circulation"]
    ],
    outline: "M16 30H906V300H16Z"
  },
  "second-floor": {
    note: "Principal guest suites and landing support",
    rooms: [
      ["principal-guest", "Principal Guest", 24, 42, 176, 146, "sleeping"],
      ["guest-bedroom-2", "Guest Bedroom 2", 216, 42, 160, 146, "sleeping"],
      ["guest-bedroom-3", "Guest Bedroom 3", 392, 42, 160, 146, "sleeping"],
      ["principal-dressing", "Dressing Room", 676, 42, 220, 86, "archive"],
      ["principal-guest-bath", "Principal Bath", 676, 146, 220, 128, "wellness"],
      ["guest-bath-2", "Bath 2", 24, 206, 84, 74, "wellness"],
      ["guest-bath-3", "Bath 3", 216, 206, 84, 74, "wellness"],
      ["linen-press", "Linen Press", 568, 206, 92, 74, "service"],
      ["second-landing", "Landing", 124, 206, 428, 74, "circulation"]
    ],
    service: [
      ["second-lift", "Lift", 568, 42, 92, 62, "circulation"],
      ["second-stair", "Stair", 568, 116, 92, 72, "circulation"]
    ],
    outline: "M16 30H906V292H16Z"
  },
  "first-floor": {
    note: "Self-contained Music Nobile with service route",
    rooms: [
      ["music-nobile-threshold", "Threshold", 22, 42, 98, 106, "circulation"],
      ["principal-salon", "Principal Salon", 136, 42, 204, 134, "social"],
      ["music-room", "Music Room", 356, 42, 170, 134, "music"],
      ["control-listening", "Control / Listening", 22, 194, 242, 112, "music"],
      ["supper-room", "Supper Room", 280, 194, 248, 112, "social"],
      ["drinks-pantry", "Drinks Pantry", 652, 194, 118, 112, "service"],
      ["first-powder", "Powder", 786, 194, 62, 112, "wellness"],
      ["musician-route", "Musician Route", 862, 42, 42, 264, "service"],
      ["first-landing", "Landing", 544, 42, 294, 134, "circulation"]
    ],
    service: [
      ["first-lift", "Lift", 544, 194, 92, 112, "circulation"]
    ],
    outline: "M14 30H914V318H14Z"
  },
  "raised-ground": {
    note: "Arrival, daily living, kitchen and garden",
    rooms: [
      ["front-garden", "Front Garden", 22, 226, 230, 88, "garden"],
      ["entrance-hall", "Entrance Hall", 268, 132, 126, 96, "circulation"],
      ["main-stair", "Main Stair", 410, 132, 126, 96, "circulation"],
      ["cloakroom", "Guest WC", 552, 132, 82, 96, "wellness"],
      ["coat-cupboard", "Coats", 650, 132, 74, 96, "service"],
      ["kitchen-breakfast", "Kitchen / Breakfast", 22, 36, 244, 166, "daily"],
      ["garden-room", "Garden Room", 282, 36, 206, 82, "daily"],
      ["study-library", "Study / Library", 504, 36, 150, 82, "work"],
      ["flower-room", "Flower Room", 668, 36, 126, 82, "service"],
      ["boot-room", "Boot Room", 808, 36, 90, 82, "service"],
      ["rear-terrace", "Rear Terrace", 648, 246, 250, 68, "garden"],
      ["main-garden", "Main Garden", 648, 132, 250, 96, "garden"]
    ],
    service: [
      ["ground-lift", "Lift", 552, 246, 82, 68, "circulation"]
    ],
    outline: "M14 24H906V326H14Z"
  },
  "upper-basement": {
    note: "Private club rooms and back-of-house engine",
    rooms: [
      ["bar-games", "Bar / Games", 22, 42, 226, 174, "social"],
      ["cinema", "Cinema", 264, 42, 178, 174, "social"],
      ["wine-bourbon-room", "Wine / Bourbon", 458, 42, 154, 174, "social"],
      ["basement-powder", "Powder", 628, 42, 82, 80, "wellness"],
      ["service-kitchen", "Service Kitchen", 726, 42, 172, 80, "service"],
      ["laundry", "Laundry", 628, 136, 128, 80, "service"],
      ["delivery-hold", "Delivery Hold", 772, 136, 126, 80, "service"],
      ["staff-office", "Staff Office", 628, 232, 128, 72, "service"],
      ["housekeeping-store", "Housekeeping", 772, 232, 126, 72, "service"],
      ["service-stair-hall", "Service Hall", 458, 232, 154, 72, "circulation"],
      ["plant-mep", "Plant / MEP", 264, 232, 178, 72, "service"],
      ["powder-room", "Powder", 22, 232, 226, 72, "wellness"]
    ],
    service: [
      ["upper-basement-lift", "Lift", 458, 136, 70, 80, "circulation"],
      ["upper-basement-stair", "Stair", 542, 136, 70, 80, "circulation"]
    ],
    outline: "M14 30H906V318H14Z"
  },
  "lower-basement": {
    note: "Wellness suite, pool, gym and plant",
    rooms: [
      ["indoor-pool", "Indoor Pool", 22, 42, 204, 214, "wellness"],
      ["spa-lounge", "Spa Lounge", 242, 42, 208, 102, "wellness"],
      ["treatment-room", "Treatment", 466, 42, 124, 102, "wellness"],
      ["steam-room", "Steam", 606, 42, 86, 102, "wellness"],
      ["cold-plunge", "Cold Plunge", 708, 42, 92, 102, "wellness"],
      ["gym", "Gym", 466, 166, 226, 116, "work"],
      ["wellness-bar", "Wellness Bar", 242, 166, 208, 116, "social"],
      ["plant-room", "Plant", 708, 166, 92, 116, "service"],
      ["lift-motor-room", "Lift Motor", 816, 42, 82, 240, "service"]
    ],
    service: [
      ["lower-basement-stair", "Stair", 606, 166, 86, 116, "circulation"]
    ],
    outline: "M14 30H906V294H14Z"
  }
};
