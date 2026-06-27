export const KPIS = {
  total_farmers: 150000,
  active_farming_plans: 1136,
  expected_yield_tonnes: 8420,
  imminent_tonnes_14d: 1240,
  regions_active: 14,
  high_confidence_pct: 74,
  soil_samples: 205000
}

// location field = "District, Region" format
// will expand to "Ward, District, Region" as platform grows to village level
// Geophrey confirmed: going more granular over time
export const FORECAST = [
  { region: "Dodoma", district: "Dodoma MC", location: "Dodoma MC, Dodoma", crop: "Maize", total_tonnes: 1400, farmer_count: 312, avg_step: 15, days_to_harvest: 13, harvest_from: "2026-07-10", harvest_to: "2026-07-20", confidence: "high" },
  { region: "Mwanza", district: "Ilemela", location: "Ilemela, Mwanza", crop: "Maize", total_tonnes: 1200, farmer_count: 284, avg_step: 14, days_to_harvest: 15, harvest_from: "2026-07-12", harvest_to: "2026-07-22", confidence: "high" },
  { region: "Morogoro", district: "Morogoro MC", location: "Morogoro MC, Morogoro", crop: "Rice", total_tonnes: 900, farmer_count: 198, avg_step: 16, days_to_harvest: 11, harvest_from: "2026-07-08", harvest_to: "2026-07-18", confidence: "high" },
  { region: "Arusha", district: "Arusha CC", location: "Arusha CC, Arusha", crop: "Onion", total_tonnes: 520, farmer_count: 143, avg_step: 11, days_to_harvest: 9, harvest_from: "2026-07-06", harvest_to: "2026-07-16", confidence: "medium" },
  { region: "Mbeya", district: "Mbeya CC", location: "Mbeya CC, Mbeya", crop: "Rice", total_tonnes: 600, farmer_count: 167, avg_step: 15, days_to_harvest: 18, harvest_from: "2026-07-05", harvest_to: "2026-07-15", confidence: "high" },
  { region: "Arusha", district: "Meru", location: "Meru, Arusha", crop: "Maize", total_tonnes: 900, farmer_count: 156, avg_step: 14, days_to_harvest: 18, harvest_from: "2026-07-15", harvest_to: "2026-07-25", confidence: "high" },
  { region: "Mwanza", district: "Ukerewe", location: "Ukerewe, Mwanza", crop: "Rice", total_tonnes: 400, farmer_count: 122, avg_step: 15, days_to_harvest: 31, harvest_from: "2026-07-18", harvest_to: "2026-07-28", confidence: "high" },
  { region: "Mwanza", district: "Nyamagana", location: "Nyamagana, Mwanza", crop: "Groundnuts", total_tonnes: 310, farmer_count: 88, avg_step: 7, days_to_harvest: 33, harvest_from: "2026-07-20", harvest_to: "2026-07-30", confidence: "low" },
]

export const FARMERS = [
  { farmer_id: "MZ-10042", crop: "Maize", region: "Mwanza", district: "Ilemela", land_ha: 2.4, planting_date: "2026-04-12", last_activity_step: 12, total_steps: 19, npk_n: 68, npk_p: 42, npk_k: 55, moisture: 38, soil_score: 82, predicted_tonnes: 7.2, days_to_harvest: 15, harvest_from: "2026-07-12", harvest_to: "2026-07-22", confidence: "high" },
  { farmer_id: "MZ-10091", crop: "Onion", region: "Arusha", district: "Arusha CC", land_ha: 1.1, planting_date: "2026-03-28", last_activity_step: 11, total_steps: 19, npk_n: 55, npk_p: 60, npk_k: 48, moisture: 45, soil_score: 79, predicted_tonnes: 3.3, days_to_harvest: 9, harvest_from: "2026-07-06", harvest_to: "2026-07-16", confidence: "high" },
  { farmer_id: "MZ-10155", crop: "Maize", region: "Dodoma", district: "Dodoma MC", land_ha: 3.8, planting_date: "2026-04-05", last_activity_step: 14, total_steps: 19, npk_n: 72, npk_p: 38, npk_k: 61, moisture: 29, soil_score: 61, predicted_tonnes: 9.1, days_to_harvest: 13, harvest_from: "2026-07-10", harvest_to: "2026-07-20", confidence: "medium" },
  { farmer_id: "MZ-10203", crop: "Rice", region: "Morogoro", district: "Morogoro MC", land_ha: 1.7, planting_date: "2026-03-15", last_activity_step: 16, total_steps: 19, npk_n: 48, npk_p: 55, npk_k: 44, moisture: 62, soil_score: 88, predicted_tonnes: 6.1, days_to_harvest: 11, harvest_from: "2026-07-08", harvest_to: "2026-07-18", confidence: "high" },
  { farmer_id: "MZ-10318", crop: "Rice", region: "Mbeya", district: "Mbeya CC", land_ha: 2.2, planting_date: "2026-04-01", last_activity_step: 15, total_steps: 19, npk_n: 61, npk_p: 49, npk_k: 52, moisture: 55, soil_score: 75, predicted_tonnes: 7.7, days_to_harvest: 18, harvest_from: "2026-07-05", harvest_to: "2026-07-15", confidence: "high" },
  { farmer_id: "MZ-10421", crop: "Groundnuts", region: "Mwanza", district: "Nyamagana", land_ha: 1.3, planting_date: "2026-04-18", last_activity_step: 7, total_steps: 19, npk_n: 32, npk_p: 58, npk_k: 40, moisture: 34, soil_score: 44, predicted_tonnes: 1.9, days_to_harvest: 33, harvest_from: "2026-07-20", harvest_to: "2026-07-30", confidence: "low" },
  { farmer_id: "MZ-10509", crop: "Maize", region: "Arusha", district: "Meru", land_ha: 4.0, planting_date: "2026-03-22", last_activity_step: 14, total_steps: 19, npk_n: 74, npk_p: 45, npk_k: 63, moisture: 41, soil_score: 84, predicted_tonnes: 12.0, days_to_harvest: 18, harvest_from: "2026-07-15", harvest_to: "2026-07-25", confidence: "high" },
  { farmer_id: "MZ-10744", crop: "Rice", region: "Mwanza", district: "Ukerewe", land_ha: 1.5, planting_date: "2026-03-30", last_activity_step: 15, total_steps: 19, npk_n: 58, npk_p: 52, npk_k: 46, moisture: 58, soil_score: 77, predicted_tonnes: 5.0, days_to_harvest: 31, harvest_from: "2026-07-18", harvest_to: "2026-07-28", confidence: "high" },
]

export const TRENDS = [
  { crop: "Maize", this_season_tonnes: 2600, last_season_tonnes: 2130, pct_change: 22.1, price_signal: "down", price_signal_text: "Large supply incoming (+22%) — expect price softening" },
  { crop: "Rice", this_season_tonnes: 1500, last_season_tonnes: 1390, pct_change: 7.9, price_signal: "stable", price_signal_text: "Supply stable — price likely flat this month" },
  { crop: "Onion", this_season_tonnes: 520, last_season_tonnes: 754, pct_change: -31.0, price_signal: "up", price_signal_text: "Supply down 31% — price likely to spike in 2-3 weeks" },
  { crop: "Groundnuts", this_season_tonnes: 310, last_season_tonnes: 378, pct_change: -18.0, price_signal: "up", price_signal_text: "Low supply registered — price pressure upward" },
  { crop: "Avocado", this_season_tonnes: 380, last_season_tonnes: 252, pct_change: 50.8, price_signal: "down", price_signal_text: "Bumper season predicted (+51%) — lock price now" },
]

export const HEATMAP = [
  { region: "Morogoro", readiness_pct: 84 },
  { region: "Mbeya", readiness_pct: 79 },
  { region: "Dodoma", readiness_pct: 76 },
  { region: "Mwanza", readiness_pct: 68 },
  { region: "Arusha", readiness_pct: 62 },
  { region: "Kilimanjaro", readiness_pct: 48 },
  { region: "Kagera", readiness_pct: 31 },
  { region: "Iringa", readiness_pct: 29 },
  { region: "Tabora", readiness_pct: 18 },
  { region: "Rukwa", readiness_pct: 14 },
  { region: "Singida", readiness_pct: 11 },
  { region: "Shinyanga", readiness_pct: 9 },
  { region: "Kigoma", readiness_pct: 7 },
  { region: "Ruvuma", readiness_pct: 5 },
]

export const RFQS = [
  { rfq_id: "RFQ-001", crop: "Maize", region: "Arusha", qty_kg: 400, currency: "USD", grade: "A", needed_by: "2026-07-08", match_status: "matched", match_text: "3 farmers within 50km have 400kg+ Maize ready in 12 days — connect now" },
  { rfq_id: "RFQ-002", crop: "Rice", region: "Dar es Salaam", qty_kg: 2300000, currency: "EUR", grade: "Mixed", needed_by: "2026-07-05", match_status: "partial", match_text: "Morogoro + Mbeya combined: 1,500T ready Jul 8-18 — 800T gap remaining" },
  { rfq_id: "RFQ-003", crop: "Sweet Pepper", region: "Dar es Salaam", qty_kg: 4000, currency: "TZS", grade: "Hass Export", needed_by: "2026-07-18", match_status: "no_match", match_text: "No sweet pepper harvest in matched regions — consider Kilimanjaro" },
]

export const AGGREGATION_POINTS = [
  { id: "AP-001", name: "Mwanza Village Store", type: "village_warehouse", region: "Mwanza", capacity_tons: 500, current_stock_tons: 120 },
  { id: "AP-002", name: "Dodoma Grain Store", type: "grain_storage", region: "Dodoma", capacity_tons: 2000, current_stock_tons: 340 },
  { id: "AP-003", name: "Arusha Cold Storage", type: "cold_storage", region: "Arusha", capacity_tons: 800, current_stock_tons: 90 },
  { id: "AP-004", name: "DSM Port Warehouse", type: "port_warehouse", region: "Dar es Salaam", capacity_tons: 5000, current_stock_tons: 1200 },
  { id: "AP-005", name: "Morogoro Collection Ctr", type: "collection_center", region: "Morogoro", capacity_tons: 1000, current_stock_tons: 210 },
  { id: "AP-006", name: "Mbeya Fulfillment Ctr", type: "fulfillment_center", region: "Mbeya", capacity_tons: 1500, current_stock_tons: 380 },
]

// ─── Live market prices (Kariakoo + surrounding markets, Dar es Salaam) ───────

export const LIVE_PRICES = [
  { crop: "Onion", market: "Kariakoo", region: "Dar es Salaam", qty: "200T", price: 810000, unit: "T", currency: "TZS", grade: "A", season: "In Season", change_24h: -5.2, category: "Vegetables" },
  { crop: "Watermelon", market: "Kariakoo", region: "Dar es Salaam", qty: "97 pcs", price: 500, unit: "pc", currency: "TZS", grade: "Mixed", season: "In Season", change_24h: 2.3, category: "Fruits" },
  { crop: "Avocado", market: "Buguruni", region: "Dar es Salaam", qty: "5000T", price: 10000, unit: "T", currency: "TZS", grade: "A", season: "In Season", change_24h: 0, category: "Fruits" },
  { crop: "Chinese cabbage", market: "Buguruni", region: "Dar es Salaam", qty: "100kg", price: 30000, unit: "100kg", currency: "TZS", grade: "B", season: "In Season", change_24h: 8.4, category: "Vegetables" },
  { crop: "Rice", market: "Magomeni", region: "Dar es Salaam", qty: "200kg", price: 2500, unit: "kg", currency: "TZS", grade: "A", season: "In Season", change_24h: -3.1, category: "Grains" },
  { crop: "Chickpeas", market: "Kisutu", region: "Dar es Salaam", qty: "500kg", price: 1200, unit: "kg", currency: "TZS", grade: "A", season: "In Season", change_24h: -5.1, category: "Legumes" },
  { crop: "Maize", market: "Tandale", region: "Dar es Salaam", qty: "20T", price: 60000, unit: "T", currency: "TZS", grade: "A", season: "In Season", change_24h: 0, category: "Grains" },
  { crop: "Maize", market: "Toangoma", region: "Dar es Salaam", qty: "200 pcs", price: 258, unit: "pc", currency: "TZS", grade: "B", season: "In Season", change_24h: 2.1, category: "Grains" },
  { crop: "Sweet Pepper", market: "Kariakoo", region: "Dar es Salaam", qty: "300kg", price: 11000, unit: "kg", currency: "TZS", grade: "A", season: "In Season", change_24h: 4.8, category: "Vegetables" },
  { crop: "Groundnuts", market: "Tandale", region: "Dar es Salaam", qty: "1T", price: 2500, unit: "kg", currency: "TZS", grade: "A", season: "In Season", change_24h: -2.0, category: "Legumes" },
  { crop: "Potato", market: "Buguruni", region: "Dar es Salaam", qty: "800kg", price: 900, unit: "kg", currency: "TZS", grade: "B", season: "In Season", change_24h: 1.5, category: "Vegetables" },
  { crop: "Tomato", market: "Kariakoo", region: "Dar es Salaam", qty: "400kg", price: 1100, unit: "kg", currency: "TZS", grade: "A", season: "In Season", change_24h: -8.3, category: "Vegetables" },
]

// ─── Active buyer demand / RFQs with full detail ──────────────────────────────

export const DEMAND_DATA = [
  { id: "RFQ-001", crop: "Maize", buyer: "Arusha Central Market", location: "Arusha, Tanzania", qty_kg: 400, price_per_unit: 2300, currency: "USD", grade: "A", needed_by: "2026-07-08", frequency: "one-time", status: "urgent", days_left: 11 },
  { id: "RFQ-002", crop: "Rice", buyer: "Union Square Greenmarket", location: "New York, USA", qty_kg: 2300000, price_per_unit: 2300, currency: "EUR", grade: "Mixed", needed_by: "2026-07-05", frequency: "monthly", status: "urgent", days_left: 8 },
  { id: "RFQ-003", crop: "Sweet Pepper", buyer: "Kariakoo Market", location: "Dar es Salaam", qty_kg: 4000, price_per_unit: 11000, currency: "TZS", grade: "Hass Export", needed_by: "2026-07-18", frequency: "weekly", status: "active", days_left: 21 },
  { id: "RFQ-004", crop: "Maize", buyer: "Buyuni Market", location: "Dar es Salaam", qty_kg: 1000, price_per_unit: 500, currency: "TZS", grade: "B", needed_by: "2026-07-25", frequency: "seasonal", status: "active", days_left: 28 },
  { id: "RFQ-005", crop: "Onion", buyer: "Nairobi Fresh Markets Ltd", location: "Nairobi, Kenya", qty_kg: 50000, price_per_unit: 1800, currency: "KES", grade: "A", needed_by: "2026-08-01", frequency: "monthly", status: "active", days_left: 35 },
  { id: "RFQ-006", crop: "Avocado", buyer: "Dubai Organic Hub", location: "Dubai, UAE", qty_kg: 20000, price_per_unit: 12000, currency: "USD", grade: "Hass Export", needed_by: "2026-08-10", frequency: "weekly", status: "active", days_left: 44 },
]

// ─── WhatsApp / SMS pre-harvest pipeline ─────────────────────────────────────

export const PRE_HARVEST = [
  { farmer: "MZ-10042", crop: "Maize", region: "Mwanza", location: "Ilemela, Mwanza", qty_t: 3, eta_days: 14, status: "verified", channel: "WhatsApp" },
  { farmer: "MZ-11204", crop: "Rice", region: "Morogoro", location: "Morogoro MC, Morogoro", qty_t: 1.5, eta_days: 18, status: "pending_verify", channel: "SMS" },
  { farmer: "MZ-10831", crop: "Maize", region: "Morogoro", location: "Kilosa, Morogoro", qty_t: 2.1, eta_days: 22, status: "verified", channel: "WhatsApp" },
  { farmer: "MZ-12001", crop: "Onion", region: "Arusha", location: "Arusha CC, Arusha", qty_t: 0.8, eta_days: 9, status: "flagged", channel: "SMS" },
  { farmer: "MZ-11509", crop: "Rice", region: "Mbeya", location: "Mbeya CC, Mbeya", qty_t: 4.2, eta_days: 16, status: "verified", channel: "WhatsApp" },
  { farmer: "MZ-13302", crop: "Groundnuts", region: "Mwanza", location: "Nyamagana, Mwanza", qty_t: 1.1, eta_days: 30, status: "pending_verify", channel: "WhatsApp" },
  { farmer: "MZ-11844", crop: "Maize", region: "Dodoma", location: "Dodoma MC, Dodoma", qty_t: 5.8, eta_days: 12, status: "verified", channel: "WhatsApp" },
]

// ─── Global crop supply outlook ───────────────────────────────────────────────

export const GLOBAL_CROPS = [
  { crop: "Maize", top_regions: ["Dodoma TZ", "Mwanza TZ", "Nairobi KE"], global_volume_kt: 48200, season_status: "peak", yoy_change: 8.2 },
  { crop: "Rice", top_regions: ["Morogoro TZ", "Mbeya TZ", "Kampala UG"], global_volume_kt: 31400, season_status: "rising", yoy_change: 3.1 },
  { crop: "Onion", top_regions: ["Arusha TZ", "Singida TZ", "Nairobi KE"], global_volume_kt: 12800, season_status: "low", yoy_change: -18.4 },
  { crop: "Avocado", top_regions: ["Kilimanjaro TZ", "Mbeya TZ", "Accra GH"], global_volume_kt: 8900, season_status: "peak", yoy_change: 51.2 },
  { crop: "Groundnuts", top_regions: ["Mwanza TZ", "Dodoma TZ", "Lagos NG"], global_volume_kt: 6200, season_status: "low", yoy_change: -12.1 },
  { crop: "Sweet Pepper", top_regions: ["Kilimanjaro TZ", "Arusha TZ", "Accra GH"], global_volume_kt: 3800, season_status: "rising", yoy_change: 6.4 },
  { crop: "Potato", top_regions: ["Mbeya TZ", "Iringa TZ", "Kigali RW"], global_volume_kt: 9100, season_status: "peak", yoy_change: 12.7 },
]

// ─── Price & volume history for TrendCharts ───────────────────────────────────

export const PRICE_HISTORY = {
  Maize: [
    { month: "Jan", price: 480, volume: 1800 },
    { month: "Feb", price: 510, volume: 2100 },
    { month: "Mar", price: 500, volume: 1950 },
    { month: "Apr", price: 490, volume: 2300 },
    { month: "May", price: 520, volume: 2600 },
    { month: "Jun", price: 500, volume: 2750 },
    { month: "Jul (forecast)", price: 465, volume: 3100, forecast: true },
    { month: "Aug (forecast)", price: 440, volume: 3400, forecast: true },
  ],
  Rice: [
    { month: "Jan", price: 1050, volume: 900 },
    { month: "Feb", price: 1080, volume: 1100 },
    { month: "Mar", price: 1100, volume: 1050 },
    { month: "Apr", price: 1090, volume: 980 },
    { month: "May", price: 1120, volume: 1200 },
    { month: "Jun", price: 1150, volume: 1300 },
    { month: "Jul (forecast)", price: 1130, volume: 1500, forecast: true },
    { month: "Aug (forecast)", price: 1110, volume: 1600, forecast: true },
  ],
  Onion: [
    { month: "Jan", price: 880, volume: 600 },
    { month: "Feb", price: 920, volume: 580 },
    { month: "Mar", price: 950, volume: 540 },
    { month: "Apr", price: 1010, volume: 490 },
    { month: "May", price: 980, volume: 510 },
    { month: "Jun", price: 950, volume: 520 },
    { month: "Jul (forecast)", price: 1050, volume: 480, forecast: true },
    { month: "Aug (forecast)", price: 1180, volume: 420, forecast: true },
  ],
  Avocado: [
    { month: "Jan", price: 8000, volume: 120 },
    { month: "Feb", price: 8500, volume: 140 },
    { month: "Mar", price: 9000, volume: 160 },
    { month: "Apr", price: 9500, volume: 200 },
    { month: "May", price: 10000, volume: 280 },
    { month: "Jun", price: 10000, volume: 320 },
    { month: "Jul (forecast)", price: 8500, volume: 420, forecast: true },
    { month: "Aug (forecast)", price: 7200, volume: 500, forecast: true },
  ],
}

// ─── AI insights (shown in TrendCharts + InsightSummaryBar) ──────────────────

export const AI_INSIGHTS = [
  {
    id: 1, type: "price_drop", severity: "high", crop: "Maize", region: "Mwanza + Dodoma",
    title: "Maize price likely to drop 8–12% by late July",
    body: "2,600T of Maize expected from Dodoma and Mwanza combined in the next 13–15 days. This is 22% above last season's supply for the same period. Based on historic price-volume correlation, expect TZS 440–465/kg by late July vs current TZS 500/kg.",
    action: "Lock sale price now or store until August when supply normalizes.",
    icon: "📉", color: "#E24B4A", bg: "#FCEBEB", tag: "Price signal",
  },
  {
    id: 2, type: "price_spike", severity: "high", crop: "Onion", region: "Arusha",
    title: "Onion prices set to spike — supply down 31%",
    body: "Only 520T of Onion registered in farming plans vs 754T last season — a 31% shortfall. Arusha is the primary supply region. With 143 farmers at step 11/19, harvest is 9 days away but volume is significantly lower than demand. Expect TZS 1,050–1,180/kg by August.",
    action: "Buyers: secure Onion supply now before prices spike. Sellers: hold stock if possible.",
    icon: "📈", color: "#0F6E56", bg: "#E1F5EE", tag: "Price signal",
  },
  {
    id: 3, type: "supply_peak", severity: "medium", crop: "Avocado", region: "Mbeya + Kilimanjaro",
    title: "Bumper Avocado season incoming — 51% above last year",
    body: "380T of Avocado registered across Mbeya and Kilimanjaro, vs 252T last season. Soil scores in Rungwe district are averaging 80/100 — optimal for yield. Price pressure likely downward from TZS 10,000 to TZS 7,000–8,500/T by August as supply peaks.",
    action: "Export buyers: best opportunity to lock volume at current prices before competition increases.",
    icon: "🥑", color: "#185FA5", bg: "#E6F1FB", tag: "Supply alert",
  },
  {
    id: 4, type: "rfq_match", severity: "urgent", crop: "Maize", region: "Arusha",
    title: "RFQ-001 can be fulfilled — 3 farmers matched",
    body: "Open RFQ for 400kg Grade A Maize from Arusha Central Market (needed by Jul 8) has 3 farmers within 50km at step 14+ with combined yield of 6.1T. RFQ requires only 0.4T — fully coverable. Farmer MZ-10509 alone has 12T expected on Jul 15.",
    action: "Connect RFQ-001 buyer with MZ-10509 immediately. Pre-harvest deal possible.",
    icon: "🤝", color: "#534AB7", bg: "#EEEDFE", tag: "RFQ match",
  },
  {
    id: 5, type: "warehouse_alert", severity: "medium", crop: "All crops", region: "Mwanza",
    title: "Mwanza Village Store at 24% capacity — 380T incoming",
    body: "Mwanza Village Store has 380T of free capacity (500T total, 120T used). Combined incoming Maize + Rice + Groundnuts from Mwanza region forecasted at 380T in next 15–33 days. Storage will reach near-full. Alert aggregators now to plan logistics.",
    action: "Notify Mwanza aggregators to pre-book transport and consider overflow to Dodoma Grain Store.",
    icon: "🏗", color: "#854F0B", bg: "#FAEEDA", tag: "Warehouse alert",
  },
  {
    id: 6, type: "data_gap", severity: "low", crop: "Groundnuts", region: "Mwanza",
    title: "Groundnut prediction confidence is low — incomplete data",
    body: "88 farmers registered for Groundnuts in Mwanza but average activity step is only 7/19. Soil data is also below average (score 44/100). Yield prediction of 310T carries low confidence. Actual supply could vary ±40%.",
    action: "Send SMS reminder to Groundnut farmers in Mwanza to update activity logs via WhatsApp.",
    icon: "⚠", color: "#888780", bg: "#F1EFE8", tag: "Data quality",
  },
]

// ─── Harvest timeline for bar chart (derived from FORECAST, kept separate for chart shape) ─

export const HARVEST_TIMELINE = [
  { crop: "Onion", region: "Arusha", days: 9, tonnes: 520, step: 11, confidence: "medium" },
  { crop: "Rice", region: "Morogoro", days: 11, tonnes: 900, step: 16, confidence: "high" },
  { crop: "Avocado", region: "Mbeya", days: 12, tonnes: 160, step: 14, confidence: "high" },
  { crop: "Maize", region: "Dodoma", days: 13, tonnes: 1400, step: 15, confidence: "high" },
  { crop: "Maize", region: "Mwanza", days: 15, tonnes: 1200, step: 14, confidence: "high" },
  { crop: "Rice", region: "Mbeya", days: 18, tonnes: 600, step: 15, confidence: "high" },
  { crop: "Maize", region: "Arusha", days: 18, tonnes: 900, step: 14, confidence: "high" },
  { crop: "Rice", region: "Mwanza", days: 31, tonnes: 400, step: 15, confidence: "high" },
  { crop: "Groundnuts", region: "Mwanza", days: 33, tonnes: 310, step: 7, confidence: "low" },
]

// ─── Regional soil averages ───────────────────────────────────────────────────

export const SOIL_DATA = [
  { region: "Morogoro", avg_n: 52, avg_p: 54, avg_k: 46, avg_moisture: 58, avg_score: 82 },
  { region: "Mbeya", avg_n: 62, avg_p: 50, avg_k: 52, avg_moisture: 54, avg_score: 77 },
  { region: "Mwanza", avg_n: 55, avg_p: 50, avg_k: 48, avg_moisture: 40, avg_score: 68 },
  { region: "Arusha", avg_n: 62, avg_p: 53, avg_k: 53, avg_moisture: 44, avg_score: 73 },
  { region: "Dodoma", avg_n: 60, avg_p: 37, avg_k: 55, avg_moisture: 28, avg_score: 58 },
  { region: "Tabora", avg_n: 44, avg_p: 31, avg_k: 50, avg_moisture: 22, avg_score: 51 },
  { region: "Kagera", avg_n: 58, avg_p: 48, avg_k: 44, avg_moisture: 61, avg_score: 72 },
  { region: "Kilimanjaro", avg_n: 70, avg_p: 58, avg_k: 60, avg_moisture: 49, avg_score: 86 },
  { region: "Iringa", avg_n: 65, avg_p: 55, avg_k: 57, avg_moisture: 52, avg_score: 80 },
]

// ─── Aggregation network tiers ────────────────────────────────────────────────

export const NETWORK_DATA = {
  village_warehouses: [
    { name: "Ilemela Village Store", region: "Mwanza", capacity_t: 50, stock_t: 22, crops: ["Maize", "Groundnuts"] },
    { name: "Kilosa Village Hub", region: "Morogoro", capacity_t: 80, stock_t: 41, crops: ["Rice", "Maize"] },
    { name: "Monduli Collection Point", region: "Arusha", capacity_t: 40, stock_t: 8, crops: ["Onion"] },
    { name: "Bahi Village Store", region: "Dodoma", capacity_t: 60, stock_t: 18, crops: ["Maize"] },
  ],
  local_markets: [
    { name: "Kariakoo Market", region: "Dar es Salaam", capacity_t: 500, stock_t: 210, crops: ["Onion","Rice","Maize","Vegetables"] },
    { name: "Tandale Market", region: "Dar es Salaam", capacity_t: 300, stock_t: 140, crops: ["Maize","Groundnuts"] },
    { name: "Arusha Central Market", region: "Arusha", capacity_t: 400, stock_t: 180, crops: ["Onion","Avocado"] },
    { name: "Mbeya Town Market", region: "Mbeya", capacity_t: 250, stock_t: 95, crops: ["Rice","Potato"] },
  ],
  grain_storage: [
    { name: "Dodoma Grain Store", region: "Dodoma", capacity_t: 2000, stock_t: 340, crops: ["Maize","Rice"] },
    { name: "Mwanza Grain Hub", region: "Mwanza", capacity_t: 1500, stock_t: 420, crops: ["Maize","Rice","Groundnuts"] },
    { name: "Tabora Grain Centre", region: "Tabora", capacity_t: 1200, stock_t: 180, crops: ["Maize","Groundnuts"] },
  ],
  cold_storage: [
    { name: "Arusha Cold Storage", region: "Arusha", capacity_t: 800, stock_t: 90, crops: ["Avocado","Sweet Pepper","Vegetables"] },
    { name: "DSM Cold Hub", region: "Dar es Salaam", capacity_t: 1200, stock_t: 380, crops: ["Avocado","Onion"] },
    { name: "Kilimanjaro Cold Facility", region: "Kilimanjaro", capacity_t: 600, stock_t: 140, crops: ["Avocado","Coffee"] },
  ],
  port_warehouses: [
    { name: "DSM Port Warehouse A", region: "Dar es Salaam", capacity_t: 5000, stock_t: 1200, crops: ["Rice","Maize","Legumes"] },
    { name: "DSM Port Warehouse B", region: "Dar es Salaam", capacity_t: 3000, stock_t: 890, crops: ["Avocado","Coffee","Tea"] },
  ],
  fulfillment_centers: [
    { name: "Mbeya Fulfillment Ctr", region: "Mbeya", capacity_t: 1500, stock_t: 380, crops: ["Rice","Maize"] },
    { name: "Morogoro FC", region: "Morogoro", capacity_t: 1000, stock_t: 210, crops: ["Rice","Maize"] },
    { name: "DSM South FC", region: "Dar es Salaam", capacity_t: 2000, stock_t: 650, crops: ["Maize","Rice","Legumes"] },
  ],
}

// ─── Farming stage intel (19-step farming cycle with forecasted volumes) ──────

export const STAGE_VOLUME = [
  { stage: 1, name: "Field inspection", crops: [{ crop: "Maize", tonnes: 12000, regions: ["Tabora","Kigoma","Rukwa"] }, { crop: "Rice", tonnes: 8400, regions: ["Kagera","Iringa"] }], action: "contract_farming" },
  { stage: 2, name: "Soil testing", crops: [{ crop: "Carrot", tonnes: 70000, regions: ["Arusha","Kilimanjaro"] }, { crop: "Maize", tonnes: 31000, regions: ["Singida","Shinyanga"] }], action: "contract_farming" },
  { stage: 3, name: "Farm clearing", crops: [{ crop: "Maize", tonnes: 45000, regions: ["Dodoma","Tabora","Mwanza"] }, { crop: "Groundnuts", tonnes: 18000, regions: ["Mwanza","Shinyanga"] }], action: "contract_farming" },
  { stage: 4, name: "Improving soil fertility", crops: [{ crop: "Rice", tonnes: 22000, regions: ["Morogoro","Mbeya"] }, { crop: "Onion", tonnes: 9800, regions: ["Arusha","Singida"] }], action: "contract_farming" },
  { stage: 5, name: "Main field prep", crops: [{ crop: "Maize", tonnes: 38000, regions: ["Dodoma","Mwanza"] }, { crop: "Sweet Pepper", tonnes: 4200, regions: ["Kilimanjaro","Arusha"] }], action: "contract_farming" },
  { stage: 6, name: "Harrowing", crops: [{ crop: "Cabbage", tonnes: 400, regions: ["Arusha","Kilimanjaro"] }, { crop: "Maize", tonnes: 28000, regions: ["Dodoma","Kagera"] }], action: "contract_farming" },
  { stage: 7, name: "Water harvesting structures", crops: [{ crop: "Rice", tonnes: 15000, regions: ["Mbeya","Morogoro"] }, { crop: "Maize", tonnes: 19000, regions: ["Mwanza","Tabora"] }], action: "contract_farming" },
  { stage: 8, name: "Making ridges", crops: [{ crop: "Onion", tonnes: 11000, regions: ["Arusha","Singida"] }, { crop: "Potato", tonnes: 8800, regions: ["Mbeya","Iringa"] }], action: "contract_farming" },
  { stage: 9, name: "Irrigation system", crops: [{ crop: "Rice", tonnes: 18000, regions: ["Morogoro","Mbeya","Kagera"] }, { crop: "Maize", tonnes: 24000, regions: ["Dodoma","Mwanza"] }], action: "contract_farming" },
  { stage: 10, name: "Sowing seeds", crops: [{ crop: "Maize", tonnes: 300000, regions: ["Dodoma","Mwanza","Arusha","Tabora"] }, { crop: "Rice", tonnes: 180000, regions: ["Morogoro","Mbeya","Kagera"] }], action: "book_supply" },
  { stage: 11, name: "Irrigation", crops: [{ crop: "Maize", tonnes: 95000, regions: ["Dodoma","Mwanza"] }, { crop: "Onion", tonnes: 42000, regions: ["Arusha","Singida"] }], action: "book_supply" },
  { stage: 12, name: "Weed control", crops: [{ crop: "Maize", tonnes: 68000, regions: ["Dodoma","Mwanza","Morogoro"] }, { crop: "Rice", tonnes: 44000, regions: ["Mbeya","Morogoro"] }], action: "book_supply" },
  { stage: 13, name: "Fertilizer application", crops: [{ crop: "Maize", tonnes: 52000, regions: ["Dodoma","Mwanza"] }, { crop: "Rice", tonnes: 31000, regions: ["Morogoro","Mbeya"] }], action: "book_supply" },
  { stage: 14, name: "Pest control", crops: [{ crop: "Maize", tonnes: 38000, regions: ["Dodoma","Mwanza","Arusha"] }, { crop: "Rice", tonnes: 22000, regions: ["Morogoro","Mbeya"] }], action: "book_supply" },
  { stage: 15, name: "Other techniques", crops: [{ crop: "Maize", tonnes: 28000, regions: ["Dodoma","Mwanza"] }, { crop: "Rice", tonnes: 18000, regions: ["Morogoro"] }], action: "book_supply" },
  { stage: 16, name: "Harvest preparation", crops: [{ crop: "Maize", tonnes: 14000, regions: ["Dodoma","Mwanza"] }, { crop: "Rice", tonnes: 9000, regions: ["Morogoro","Mbeya"] }, { crop: "Onion", tonnes: 5200, regions: ["Arusha"] }], action: "book_supply" },
  { stage: 17, name: "Harvesting", crops: [{ crop: "Rice", tonnes: 900, regions: ["Morogoro"] }, { crop: "Onion", tonnes: 520, regions: ["Arusha"] }], action: "book_supply" },
  { stage: 18, name: "Post-harvest handling", crops: [{ crop: "Rice", tonnes: 420, regions: ["Morogoro"] }], action: "book_supply" },
  { stage: 19, name: "Crop storage", crops: [{ crop: "Maize", tonnes: 280, regions: ["Dodoma"] }, { crop: "Rice", tonnes: 190, regions: ["Mbeya"] }], action: "book_supply" },
]

// ─── Transport listings (On Transport module) ─────────────────────────────────

export const TRANSPORT_LISTINGS = [
  { id: "TR-001", driver: "John Mwangi", vehicle: "Isuzu NPR", capacity_tonnes: 7, from_location: "Ilemela, Mwanza", to_location: "Kariakoo, Dar es Salaam", distance_km: 740, price_tzs: 320000, available_from: "2026-07-10", status: "available", crops_accepted: ["Maize","Rice","Groundnuts"] },
  { id: "TR-002", driver: "Amiri Transport Co.", vehicle: "Scania R-series", capacity_tonnes: 28, from_location: "Dodoma MC, Dodoma", to_location: "DSM Port Warehouse", distance_km: 450, price_tzs: 580000, available_from: "2026-07-08", status: "available", crops_accepted: ["Maize","Rice","Legumes"] },
  { id: "TR-003", driver: "Fatuma Logistics", vehicle: "Toyota Dyna", capacity_tonnes: 3, from_location: "Arusha CC, Arusha", to_location: "Buguruni Market, DSM", distance_km: 620, price_tzs: 195000, available_from: "2026-07-09", status: "available", crops_accepted: ["Onion","Vegetables","Avocado"] },
  { id: "TR-004", driver: "Mbeya Express", vehicle: "Mercedes Actros", capacity_tonnes: 20, from_location: "Mbeya CC, Mbeya", to_location: "Mbeya Fulfillment Ctr", distance_km: 18, price_tzs: 95000, available_from: "2026-07-07", status: "available", crops_accepted: ["Rice","Maize"] },
  { id: "TR-005", driver: "Hassan Trucks Ltd", vehicle: "Isuzu FTR", capacity_tonnes: 12, from_location: "Morogoro MC, Morogoro", to_location: "Magomeni Market, DSM", distance_km: 195, price_tzs: 210000, available_from: "2026-07-11", status: "booked", crops_accepted: ["Rice","Maize","Onion"] },
  { id: "TR-006", driver: "Kilosa Fast Freight", vehicle: "Toyota Dyna", capacity_tonnes: 4, from_location: "Kilosa, Morogoro", to_location: "Kariakoo, Dar es Salaam", distance_km: 310, price_tzs: 155000, available_from: "2026-07-12", status: "booked", crops_accepted: ["Rice","Vegetables"] },
]

// ─── Suppliers / aggregators directory ───────────────────────────────────────

export const SUPPLIERS = [
  { id: "SP-001", name: "Bytrade Ltd", type: "aggregator", region: "Mwanza", district: "Ilemela", crops: ["Maize","Rice","Groundnuts"], capacity_tonnes: 500, current_stock_tonnes: 120, verified: true, rating: 4.8, reviews: 24, phone: "0717262572", email: "bytrade@mazaohub.com", active_listings: 4 },
  { id: "SP-002", name: "Hassan Nguya", type: "market_agent", region: "Dar es Salaam", district: "Kinondoni", crops: ["Onion","Avocado","Vegetables"], capacity_tonnes: 80, current_stock_tonnes: 34, verified: true, rating: 4.6, reviews: 18, phone: "0782441123", email: "hassan@gmail.com", active_listings: 7 },
  { id: "SP-003", name: "Amina Cooperative", type: "cooperative", region: "Arusha", district: "Arusha CC", crops: ["Onion","Maize"], capacity_tonnes: 200, current_stock_tonnes: 45, verified: false, rating: 4.2, reviews: 9, phone: "0654321098", email: "amina@coop.tz", active_listings: 3 },
  { id: "SP-004", name: "Kilosa Traders", type: "aggregator", region: "Morogoro", district: "Kilosa", crops: ["Rice","Maize"], capacity_tonnes: 350, current_stock_tonnes: 98, verified: true, rating: 4.5, reviews: 31, phone: "0743219876", email: "kilosa@trade.tz", active_listings: 5 },
  { id: "SP-005", name: "Mbeya Rice Coop", type: "cooperative", region: "Mbeya", district: "Mbeya CC", crops: ["Rice"], capacity_tonnes: 600, current_stock_tonnes: 210, verified: true, rating: 4.7, reviews: 42, phone: "0698877665", email: "mbeya@ricecoop.tz", active_listings: 2 },
  { id: "SP-006", name: "Dodoma Grain Hub", type: "agribusiness", region: "Dodoma", district: "Dodoma MC", crops: ["Maize","Sorghum","Groundnuts"], capacity_tonnes: 1200, current_stock_tonnes: 340, verified: true, rating: 4.9, reviews: 67, phone: "0712345678", email: "dodoma@grainhub.tz", active_listings: 8 },
]
