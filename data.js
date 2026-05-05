const HOUSE_DATA = {
  nav: [
    ["dashboard", "Dashboard"],
    ["tour", "House Tour"],
    ["images", "Images"],
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
      id: "studio",
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
      text: "Reduced movement, warm low lighting, no unnecessary service crossings, studio and wellness held for private use."
    }
  ],
  featureImages: [
    ["Raised Ground Floor", "Entrance Hall", "Arrival", "assets/rooms/entrance-hall.png", "raised-ground", "entrance-hall"],
    ["Raised Ground Floor", "Kitchen / Breakfast Room", "Daily heart", "assets/rooms/kitchen-breakfast.png", "raised-ground", "kitchen-breakfast"],
    ["First Floor / Music Nobile", "Music Room", "Bechstein heart", "assets/rooms/music-room.png", "first-floor", "music-room"],
    ["Lower Basement", "Indoor Pool", "Recovery", "assets/rooms/indoor-pool.png", "lower-basement", "indoor-pool"],
    ["Top Floor", "Archive Wardrobe", "Fashion archive", "assets/rooms/archive-wardrobe.png", "top-floor", "archive-wardrobe"]
  ],
  floors: [
    {
      id: "lower-basement",
      name: "Lower Basement",
      role: "Wellness, wine and plant",
      mood: "Stone, water, recovery",
      planImage: "assets/atlas/floors/lower-basement.png",
      rooms: [
        ["indoor-pool", "Indoor Pool", "Long dark-stone pool with perimeter lighting, acoustic ceiling treatment and concealed ventilation.", "assets/rooms/indoor-pool.png"],
        ["spa-lounge", "Spa Lounge", "Quiet lounge beside the pool for decompression, towels, water, tea and post-swim recovery.", "assets/rooms/lower-basement-wellness-overview.png"],
        ["steam-room", "Steam Room", "Steam room in dark stone with mist, bronze fittings and controlled low light.", "assets/rooms/lower-basement-wellness-overview.png"],
        ["cold-plunge", "Cold Plunge", "Compact recovery plunge with shower route, robe storage and spa-grade drainage.", "assets/rooms/lower-basement-wellness-overview.png"],
        ["treatment-room", "Treatment Room", "Quiet plaster recovery room with massage table, task lighting and hidden storage.", "assets/rooms/lower-basement-wellness-overview.png"],
        ["gym", "Gym", "Matte black equipment, mirror wall, rubber flooring, weights, cable system and mobility tools.", "assets/rooms/lower-basement-wellness-overview.png"],
        ["wellness-bar", "Wellness Bar", "Small pool-level bar for water, tea, mixers, champagne and recovery drinks.", "assets/rooms/lower-basement-wellness-overview.png"],
        ["plant-room", "Plant Room", "Pool systems, air handling, boilers, pumps and backup systems.", "assets/rooms/lower-basement-wellness-overview.png"],
        ["lift-motor-room", "Lift Motor Room", "Operational lift infrastructure, hidden from guest routes but essential to all-level access.", "assets/rooms/lower-basement-wellness-overview.png"]
      ]
    },
    {
      id: "upper-basement",
      name: "Upper Basement / Lower Ground",
      role: "Private club and service engine",
      mood: "After-hours, hidden logistics",
      planImage: "assets/atlas/floors/upper-basement-lower-ground.png",
      rooms: [
        ["bar-games", "Bar / Games Room", "Dark walnut, smoked mirror, black marble bar, banquettes, games and low amber lamps.", "assets/rooms/bar-games.png"],
        ["cinema", "Cinema / Screening Room", "Dark acoustic shell with deep modular seating, Atmos, blackout lighting and refreshment cabinet.", "assets/rooms/cinema.png"],
        ["wine-bourbon-room", "Wine / Bourbon Room", "Glass-fronted wine and bourbon storage, tasting table and amber light.", "assets/rooms/wine-bourbon-room.png"],
        ["basement-powder", "Powder Room", "Dark lacquer and stone powder room serving bar and cinema level.", "assets/rooms/cinema.png"],
        ["service-kitchen", "Prep Kitchen / Service Kitchen", "Professional private-house service kitchen for catering, plating and dishwasher runs.", "assets/rooms/bar-games.png"],
        ["laundry", "Laundry & Garment Care", "Washer and dryer bank, steamers, pressing table, hanging rails and linen storage.", "assets/rooms/bar-games.png"],
        ["delivery-hold", "Delivery Hold / Event Staging", "Receives flowers, garment bags, catering cases, instruments and production crates.", "assets/rooms/bar-games.png"],
        ["staff-office", "Staff Office", "Coordination nook for manuals, schedules, event plans, readiness logs and secure files.", "assets/rooms/bar-games.png"],
        ["housekeeping-store", "Housekeeping Store", "Cleaning supplies, guest supplies, candles, linens, vases and paper goods.", "assets/rooms/bar-games.png"],
        ["service-stair-hall", "Service Stair Hall", "Back-of-house hub linking service entrance, studio, guest floors and support zones.", "assets/rooms/bar-games.png"],
        ["plant-mep", "Plant Room / MEP", "Lower-ground mechanical and electrical support for the house operations layer.", "assets/rooms/bar-games.png"],
        ["powder-room", "Powder Room", "Compact dark powder room for the private club and cinema level.", "assets/rooms/cinema.png"]
      ]
    },
    {
      id: "raised-ground",
      name: "Raised Ground Floor",
      role: "Daily living and garden",
      mood: "Arrival, kitchen, warmth",
      planImage: "assets/atlas/floors/raised-ground-floor.png",
      rooms: [
        ["entrance-hall", "Entrance Hall", "Black front door, restored stair sightline, warm plaster, flowers and the Nara work.", "assets/rooms/entrance-hall.png"],
        ["main-stair", "Main Stair Hall", "Restored stair, runner, art on landings, bronze details and warm lighting.", "assets/rooms/main-stair.png"],
        ["cloakroom", "Cloakroom / Guest WC", "Dark jewel-box room with stone, bronze, flattering mirror light and one small artwork.", "assets/rooms/cloakroom.png"],
        ["coat-cupboard", "Coat Cupboard", "Hidden joinery for guest coats, umbrellas and daily outerwear.", "assets/rooms/coat-cupboard.png"],
        ["kitchen-breakfast", "Kitchen / Breakfast Room", "Architectural kitchen with dark cabinetry, stone counters and the original chipped pine table.", "assets/rooms/kitchen-breakfast.png"],
        ["garden-room", "Garden Room", "Rear sitting room opening to terrace and garden with soft seating, books and concealed speakers.", "assets/rooms/garden-room.png"],
        ["study-library", "Study / Library", "True working study with desk, books, works on paper, laptop and reading chair.", "assets/rooms/study-library.png"],
        ["flower-room", "Flower Room / Garden Pantry", "Stone counter, sink, vase storage, terrace glassware, candles and garden-event prep.", "assets/rooms/flower-room.png"],
        ["boot-room", "Garden Lobby / Boot Room", "Stone floor, hooks, umbrellas, boots, cushions, throws and outdoor kit.", "assets/rooms/boot-room.png"],
        ["rear-terrace", "Rear Terrace", "Stone terrace with outdoor dining, lanterns, planters and heaters.", "assets/rooms/rear-terrace.png"],
        ["main-garden", "Main Garden", "Private walled Kensington garden with disciplined planting, terrace, lawn and far seating pocket.", "assets/rooms/rear-terrace.png"],
        ["front-garden", "Front Garden / Forecourt", "Formal front threshold with railings, planting, arrival control and the black front door approach.", "assets/rooms/entrance-hall.png"]
      ]
    },
    {
      id: "first-floor",
      name: "First Floor / Music Nobile",
      role: "Music, playback, dining",
      mood: "Self-contained after dark",
      planImage: "assets/atlas/floors/first-floor-music-nobile.png",
      rooms: [
        ["music-nobile-threshold", "Music Nobile Glass Threshold", "Smoked or fluted glass door with acoustic seal and restrained Music Nobile mark.", "assets/rooms/music-nobile-threshold.png"],
        ["first-landing", "First-Floor Landing / Gallery", "Gallery-like arrival zone with art, rug, console and controlled lighting.", "assets/rooms/music-nobile-threshold.png"],
        ["principal-salon", "Principal Salon", "Main social lounge for drinks, conversation, waiting before dinner and post-session sprawl.", "assets/rooms/principal-salon.png"],
        ["music-room", "Music Room", "Working music room with 1910 C. Bechstein grand, hidden acoustic treatment and tall windows.", "assets/rooms/music-room.png"],
        ["control-listening", "Studio-Control-Listening Room", "Private control room and playback salon with monitors, console, vinyl wall and sofa.", "assets/rooms/control-listening.png"],
        ["supper-room", "Dining Room / Supper Room", "Flexible private dining room for dinners, artist meals, label meetings and family suppers.", "assets/rooms/supper-room.png"],
        ["drinks-pantry", "Drinks Bar & Service Pantry", "Bar, sink, glasswasher, ice, fridges, coffee, plate warmer and service stair connection.", "assets/rooms/control-listening.png"],
        ["first-powder", "First-Floor Powder Room", "Sharper evening powder room with dark stone, bronze and flattering atmosphere.", "assets/rooms/music-nobile-threshold.png"],
        ["musician-route", "Service Stair / Musician Route", "Discreet route for musicians, engineers, caterers, staff and deliveries.", "assets/rooms/music-nobile-threshold.png"]
      ]
    },
    {
      id: "second-floor",
      name: "Second Floor",
      role: "Principal guest floor",
      mood: "Calm, grown-up, settled",
      planImage: "assets/atlas/floors/second-floor.png",
      rooms: [
        ["second-landing", "Second-Floor Landing", "Soft landing with linen detail, art, lamp and calm circulation.", "assets/rooms/second-floor-guest-overview.png"],
        ["principal-guest", "Principal Guest Bedroom", "Former Homer and Rosie room, mature and settled without shrine quality.", "assets/rooms/second-floor-guest-overview.png"],
        ["principal-guest-bath", "Principal Guest Ensuite", "Stone bathroom with bath, walk-in shower, warm light and understated luxury.", "assets/rooms/second-floor-guest-overview.png"],
        ["principal-dressing", "Principal Guest Dressing Room", "Fitted wardrobes, luggage bench, drawers, mirror and guest storage.", "assets/rooms/second-floor-guest-overview.png"],
        ["guest-bedroom-2", "Guest Bedroom 2", "Quiet guest bedroom with art, chair, good lamps and fitted storage.", "assets/rooms/second-floor-guest-overview.png"],
        ["guest-bath-2", "Ensuite Bathroom 2", "Stone-led bathroom with shower, vanity and heated-floor atmosphere.", "assets/rooms/second-floor-guest-overview.png"],
        ["guest-bedroom-3", "Guest Bedroom 3", "Slightly younger guest room suitable for friends or family.", "assets/rooms/second-floor-guest-overview.png"],
        ["guest-bath-3", "Ensuite Bathroom 3", "Compact high-quality bathroom with stone, bronze and good lighting.", "assets/rooms/second-floor-guest-overview.png"],
        ["linen-press", "Linen Press / Landing Nook", "Towels, bedding, guest supplies and a small domestic pause point.", "assets/rooms/second-floor-guest-overview.png"]
      ]
    },
    {
      id: "third-floor",
      name: "Third Floor",
      role: "Flexible guest floor",
      mood: "Younger, looser, friendlier",
      planImage: "assets/atlas/floors/third-floor.png",
      rooms: [
        ["third-landing", "Third-Floor Landing", "Narrower upper landing with warm lighting, art and simple circulation.", "assets/rooms/third-floor-guest-overview.png"],
        ["guest-bedroom-4", "Guest Bedroom 4", "Relaxed guest room for friends or musicians.", "assets/rooms/third-floor-guest-overview.png"],
        ["guest-bath-4", "Ensuite Bathroom 4", "Compact stone bathroom with shower, brass fittings and good storage.", "assets/rooms/third-floor-guest-overview.png"],
        ["guest-bedroom-5", "Guest Bedroom 5", "Flexible guest bedroom with a younger feel.", "assets/rooms/third-floor-guest-overview.png"],
        ["guest-bath-5", "Ensuite Bathroom 5", "Guest bathroom with vanity, shower and warm wall light.", "assets/rooms/third-floor-guest-overview.png"],
        ["guest-bedroom-6", "Guest Bedroom 6", "Smaller guest bedroom, intimate and comfortable.", "assets/rooms/third-floor-guest-overview.png"],
        ["guest-bath-6", "Ensuite Bathroom 6", "Clean practical stone bathroom.", "assets/rooms/third-floor-guest-overview.png"],
        ["guest-sitting-room", "Guest Sitting Room", "Shared lounge with sofa, hidden TV, books and late-night guest spillover.", "assets/rooms/third-floor-guest-overview.png"],
        ["third-linen", "Linen / Housekeeping Cupboard", "Towels, spare bedding, guest supplies and housekeeping support.", "assets/rooms/third-floor-guest-overview.png"]
      ]
    },
    {
      id: "top-floor",
      name: "Top Floor",
      role: "Alex's private apartment",
      mood: "Private, tailored, air",
      planImage: "assets/atlas/floors/top-floor.png",
      rooms: [
        ["private-landing", "Private Landing / Gallery", "Darker, quieter threshold into Alex's floor with art, books, lamp and console.", "assets/rooms/private-landing.png"],
        ["primary-bedroom", "Primary Bedroom", "Dark tailored bedroom with low bed, city view, contemporary art and restrained objects.", "assets/rooms/primary-bedroom.png"],
        ["private-lounge", "Private Lounge / Upright Piano", "Decompression room with sofa, upright piano, books, turntable and low lamps.", "assets/rooms/private-lounge.png"],
        ["daily-bathroom", "Dark Daily Bathroom", "Shower-focused dark stone bathroom with strong shower, grooming storage and low light.", "assets/rooms/private-suite-overview.png"],
        ["light-bath", "Light Bathing / Dressing Bathroom", "Softer bath room with pale stone, robe storage, mirror and morning light.", "assets/rooms/private-suite-overview.png"],
        ["seasonal-dressing", "Current-Season Dressing Room", "Active wardrobe room for seasonal capsules, fittings, outfit pulls and travel packing.", "assets/rooms/current-season-dressing.png"],
        ["archive-wardrobe", "Archive Wardrobe", "Museum-grade fashion archive with climate-controlled cases, vitrines and flat drawers.", "assets/rooms/archive-wardrobe.png"],
        ["watch-safe", "Watch & Jewellery Safe", "Integrated safe for watches, family pieces, jewellery and high-value accessories.", "assets/rooms/watch-safe.png"],
        ["rare-books", "Rare Books Case / Reading Nook", "Protected book area for first editions, intimate and almost sacred.", "assets/rooms/top-floor-archive-suite-overview.png"],
        ["roof-terrace", "Private Roof Terrace", "All-weather seating, planters, terrace bar, lanterns, blankets and Kensington skyline views.", "assets/rooms/roof-terrace.png"]
      ]
    }
  ],
  imageArchive: [
    ["Lower Basement", "Indoor Pool", "Room", "assets/rooms/indoor-pool.png", "lower-basement", "indoor-pool"],
    ["Lower Basement", "Wellness Overview", "Overview", "assets/rooms/lower-basement-wellness-overview.png", "lower-basement", "spa-lounge"],
    ["Upper Basement / Lower Ground", "Bar / Games Room", "Room", "assets/rooms/bar-games.png", "upper-basement", "bar-games"],
    ["Upper Basement / Lower Ground", "Cinema / Screening Room", "Room", "assets/rooms/cinema.png", "upper-basement", "cinema"],
    ["Upper Basement / Lower Ground", "Wine / Bourbon Room", "Room", "assets/rooms/wine-bourbon-room.png", "upper-basement", "wine-bourbon-room"],
    ["Raised Ground Floor", "Entrance Hall", "Room", "assets/rooms/entrance-hall.png", "raised-ground", "entrance-hall"],
    ["Raised Ground Floor", "Main Stair Hall", "Room", "assets/rooms/main-stair.png", "raised-ground", "main-stair"],
    ["Raised Ground Floor", "Cloakroom / Guest WC", "Room", "assets/rooms/cloakroom.png", "raised-ground", "cloakroom"],
    ["Raised Ground Floor", "Coat Cupboard", "Room", "assets/rooms/coat-cupboard.png", "raised-ground", "coat-cupboard"],
    ["Raised Ground Floor", "Kitchen / Breakfast Room", "Room", "assets/rooms/kitchen-breakfast.png", "raised-ground", "kitchen-breakfast"],
    ["Raised Ground Floor", "Garden Room", "Room", "assets/rooms/garden-room.png", "raised-ground", "garden-room"],
    ["Raised Ground Floor", "Study / Library", "Room", "assets/rooms/study-library.png", "raised-ground", "study-library"],
    ["Raised Ground Floor", "Flower Room / Garden Pantry", "Room", "assets/rooms/flower-room.png", "raised-ground", "flower-room"],
    ["Raised Ground Floor", "Garden Lobby / Boot Room", "Room", "assets/rooms/boot-room.png", "raised-ground", "boot-room"],
    ["Raised Ground Floor", "Rear Terrace", "Room", "assets/rooms/rear-terrace.png", "raised-ground", "rear-terrace"],
    ["First Floor / Music Nobile", "Music Nobile Glass Threshold", "Room", "assets/rooms/music-nobile-threshold.png", "first-floor", "music-nobile-threshold"],
    ["First Floor / Music Nobile", "Principal Salon", "Room", "assets/rooms/principal-salon.png", "first-floor", "principal-salon"],
    ["First Floor / Music Nobile", "Music Room", "Room", "assets/rooms/music-room.png", "first-floor", "music-room"],
    ["First Floor / Music Nobile", "Studio-Control-Listening Room", "Room", "assets/rooms/control-listening.png", "first-floor", "control-listening"],
    ["First Floor / Music Nobile", "Dining Room / Supper Room", "Room", "assets/rooms/supper-room.png", "first-floor", "supper-room"],
    ["Second Floor", "Second Floor Guest Overview", "Overview", "assets/rooms/second-floor-guest-overview.png", "second-floor", "principal-guest"],
    ["Third Floor", "Third Floor Guest Overview", "Overview", "assets/rooms/third-floor-guest-overview.png", "third-floor", "guest-bedroom-4"],
    ["Top Floor", "Private Landing / Gallery", "Room", "assets/rooms/private-landing.png", "top-floor", "private-landing"],
    ["Top Floor", "Primary Bedroom", "Room", "assets/rooms/primary-bedroom.png", "top-floor", "primary-bedroom"],
    ["Top Floor", "Private Lounge / Upright Piano", "Room", "assets/rooms/private-lounge.png", "top-floor", "private-lounge"],
    ["Top Floor", "Private Suite Overview", "Overview", "assets/rooms/private-suite-overview.png", "top-floor", "daily-bathroom"],
    ["Top Floor", "Current-Season Dressing Room", "Room", "assets/rooms/current-season-dressing.png", "top-floor", "seasonal-dressing"],
    ["Top Floor", "Archive Wardrobe", "Room", "assets/rooms/archive-wardrobe.png", "top-floor", "archive-wardrobe"],
    ["Top Floor", "Watch & Jewellery Safe", "Room", "assets/rooms/watch-safe.png", "top-floor", "watch-safe"],
    ["Top Floor", "Archive Suite Overview", "Overview", "assets/rooms/top-floor-archive-suite-overview.png", "top-floor", "rare-books"],
    ["Top Floor", "Private Roof Terrace", "Room", "assets/rooms/roof-terrace.png", "top-floor", "roof-terrace"],
    ["Whole House", "Generated Room Contact Sheet", "Contact sheet", "assets/rooms/room-archive-contact-sheet.png", "tour", "atlas"]
  ],
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
    ["18:30", "Studio Supper Prep", "First-Floor Pantry", "Cold plates, salad, pasta hold, champagne and still water.", "Crispin"],
    ["20:15", "Dinner", "Dining Room / Supper Room", "Eight covers, candles, low florals, Wool wall light checked.", "Rafael"],
    ["23:30", "Late Studio Food", "Music Nobile", "Toasties, fruit, water, tea and dirty-return cleared by service stair.", "Tolly"]
  ],
  bookingSpaces: [
    "Music Nobile",
    "Music Room",
    "Studio-Control-Listening Room",
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
    ["House Tone", "Ready, private, warm and calm. Competence should be felt before it is seen."]
  ]
};
