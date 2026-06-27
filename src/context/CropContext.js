'use client'

import { createContext, useContext, useState } from 'react'

const CropContext = createContext(null)

export function CropProvider({ children }) {
  const [activeCrop, setActiveCrop] = useState(null)
  return (
    <CropContext.Provider value={{ activeCrop, setActiveCrop }}>
      {children}
    </CropContext.Provider>
  )
}

export function useCrop() {
  return useContext(CropContext)
}
