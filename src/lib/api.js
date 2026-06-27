import axios from 'axios'

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'
const client = axios.create({ baseURL: BASE })

export const getKPIs = () => client.get('/api/harvest/kpis').then(r => r.data)
export const getForecast = (region, crop) => client.get('/api/harvest/forecast', { params: { region, crop } }).then(r => r.data)
export const getFarmers = (region, crop) => client.get('/api/harvest/farmers', { params: { region, crop } }).then(r => r.data)
export const getTrends = () => client.get('/api/harvest/trends').then(r => r.data)
export const getHeatmap = () => client.get('/api/harvest/heatmap').then(r => r.data)
export const getRFQMatches = () => client.get('/api/rfq/match').then(r => r.data)
export const getAggPoints = (region) => client.get('/api/harvest/aggregation-points', { params: { region } }).then(r => r.data)

// To switch from dummy to live: in each page/component replace dummy import with the matching function above
