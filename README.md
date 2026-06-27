# CropSupply Harvest Intelligence

Frontend prototype for the CropSupply harvest prediction and supply intelligence platform.

## What this is
A Next.js 14 frontend showing harvest intelligence data from MazaoHub's 150K+ farmer network.
Currently running on dummy data that mirrors the real DB schema exactly.

## Live demo
https://cropsupply-fe.vercel.app/

## To switch from dummy to live data
1. Start the FastAPI microservice: `uvicorn app.main:app --port 8001`
2. Set env var: `NEXT_PUBLIC_API_URL=http://localhost:8001`
3. In src/components/AggregatorView.jsx — uncomment the API hooks, comment out dummy imports
4. Done. Zero component changes needed.

## What Rajab needs to expose from Laravel
Endpoint: GET /api/harvest-data
Returns per farmer: farmer_id, crop, region, district, land_ha, planting_date, current_activity_step (1-19), npk_n, npk_p, npk_k, moisture

Endpoint: GET /api/rfqs
Returns: rfq_id, crop, region, qty_kg, price_per_unit, currency, grade, needed_by, status

## Key decisions made
- NPK detail removed from buyer view — soil testing stays as stage name only
- Location = district + region (will go to ward + village level later)
- Stages 1-9 = contract farming window, stages 10-19 = procurement window
- WhatsApp/SMS simulator uses Claude API directly in browser

## Stack
Next.js 14 · Tailwind CSS · Recharts · Axios · Claude API (for AI features)

## People
Geophrey (CEO) · Urassa (CTO) · Rajab (Backend) · Raya (Frontend) · Aryan (AI/Backend)
