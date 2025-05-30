'use client'

import { createContext, useState } from 'react'

type LocationContextType = {
  id: number
  setId: (id: number) => void

  name: string
  setName: (name: string) => void
}

export const LocationContext = createContext<LocationContextType | undefined>(undefined)

export default function LocationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [id, setId] = useState(0)
  const [name, setName] = useState('')

  return <LocationContext.Provider value={{ id, setId, name, setName }}>{children}</LocationContext.Provider>
}