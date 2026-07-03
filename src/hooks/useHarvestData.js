'use client'
import { useState, useEffect, useCallback } from 'react'
import { api } from '@/lib/api'

export function useHarvestData(regionFilter, cropFilter) {
  const [state, setState] = useState({
    kpis: null, stageVolume: null, forecast: null,
    heatmap: null, trends: null, rfqMatches: null,
    lastUpdated: null, loading: true, error: null,
  })

  const fetchAll = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const [kpis, sv, forecast, heatmap, trends, rfq] = await Promise.all([
        api.kpis(),
        api.stageVolume(regionFilter, cropFilter),
        api.forecast(regionFilter, cropFilter),
        api.heatmap(),
        api.trends(cropFilter),
        api.rfqMatch(cropFilter),
      ])
      setState({
        kpis,
        stageVolume: sv.data,
        forecast: forecast.data,
        heatmap: heatmap.data,
        trends: trends.data,
        rfqMatches: rfq.data,
        lastUpdated: kpis.last_updated || null,
        loading: false,
        error: null,
      })
    } catch (err) {
      setState(prev => ({ ...prev, loading: false, error: err.message }))
    }
  }, [regionFilter, cropFilter])

  useEffect(() => { fetchAll() }, [fetchAll])

  return { ...state, refetch: fetchAll }
}

export function useStageVolume(region, crop, ward) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetch_ = useCallback(async () => {
    setLoading(true)
    try {
      const r = await api.stageVolume(region, crop, ward)
      setData(r.data)
    } catch (_) {}
    setLoading(false)
  }, [region, crop, ward])

  useEffect(() => { fetch_() }, [fetch_])

  return { data, loading, refetch: fetch_ }
}

export function useFarmers(region, crop, stage, limit = 100) {
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetch_ = useCallback(async () => {
    setLoading(true)
    try {
      const r = await api.farmers(region, crop, stage, limit)
      setData(r.data || [])
      setTotal(r.total || 0)
    } catch (_) {}
    setLoading(false)
  }, [region, crop, stage, limit])

  useEffect(() => { fetch_() }, [fetch_])

  return { data, total, loading, refetch: fetch_ }
}
