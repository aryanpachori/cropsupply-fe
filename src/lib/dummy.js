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
  { farmer_id: "MZ-10744", crop: "Rice", region: "Mwanza", district: "Ukerewe", land_ha: 1.5, planting_date: "2026-03-30", last_activity_step: 15, total_steps: 19, npk_n: 58, npk_p: 52, npk_k: 46, moisture: 58, soil_score: 77, predicted_tonnes: 5.0, days_to_harvest: 31, harvest_from: "2026-07-18", harvest_to: "2026-07-28", confidence: "high" }
]

export const TRENDS = [
  { crop: "Maize", this_season_tonnes: 2600, last_season_tonnes: 2130, pct_change: 22.1, price_signal: "down", price_signal_text: "Large supply incoming (+22%) — expect price softening" },
  { crop: "Rice", this_season_tonnes: 1500, last_season_tonnes: 1390, pct_change: 7.9, price_signal: "stable", price_signal_text: "Supply stable — price likely flat this month" },
  { crop: "Onion", this_season_tonnes: 520, last_season_tonnes: 754, pct_change: -31.0, price_signal: "up", price_signal_text: "Supply down 31% — price likely to spike in 2-3 weeks" },
  { crop: "Groundnuts", this_season_tonnes: 310, last_season_tonnes: 378, pct_change: -18.0, price_signal: "up", price_signal_text: "Low supply registered — price pressure upward" },
  { crop: "Avocado", this_season_tonnes: 380, last_season_tonnes: 252, pct_change: 50.8, price_signal: "down", price_signal_text: "Bumper season predicted (+51%) — lock price now" }
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
  { region: "Ruvuma", readiness_pct: 5 }
]

export const RFQS = [
  { rfq_id: "RFQ-001", crop: "Maize", region: "Arusha", qty_kg: 400, currency: "USD", grade: "A", needed_by: "2026-07-08", match_status: "matched", match_text: "3 farmers within 50km have 400kg+ Maize ready in 12 days — connect now" },
  { rfq_id: "RFQ-002", crop: "Rice", region: "Dar es Salaam", qty_kg: 2300000, currency: "EUR", grade: "Mixed", needed_by: "2026-07-05", match_status: "partial", match_text: "Morogoro + Mbeya combined: 1,500T ready Jul 8-18 — 800T gap remaining" },
  { rfq_id: "RFQ-003", crop: "Sweet Pepper", region: "Dar es Salaam", qty_kg: 4000, currency: "TZS", grade: "Hass Export", needed_by: "2026-07-18", match_status: "no_match", match_text: "No sweet pepper harvest in matched regions — consider Kilimanjaro" }
]

export const AGGREGATION_POINTS = [
  { id: "AP-001", name: "Mwanza Village Store", type: "village_warehouse", region: "Mwanza", capacity_tons: 500, current_stock_tons: 120 },
  { id: "AP-002", name: "Dodoma Grain Store", type: "grain_storage", region: "Dodoma", capacity_tons: 2000, current_stock_tons: 340 },
  { id: "AP-003", name: "Arusha Cold Storage", type: "cold_storage", region: "Arusha", capacity_tons: 800, current_stock_tons: 90 },
  { id: "AP-004", name: "DSM Port Warehouse", type: "port_warehouse", region: "Dar es Salaam", capacity_tons: 5000, current_stock_tons: 1200 },
  { id: "AP-005", name: "Morogoro Collection Ctr", type: "collection_center", region: "Morogoro", capacity_tons: 1000, current_stock_tons: 210 },
  { id: "AP-006", name: "Mbeya Fulfillment Ctr", type: "fulfillment_center", region: "Mbeya", capacity_tons: 1500, current_stock_tons: 380 }
]
