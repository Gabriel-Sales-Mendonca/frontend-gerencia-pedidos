'use client'

import { createContext, useState } from 'react'

type UserContextType = {
  id: number
  setId: (id: number) => void

  name: string
  setName: (name: string) => void

  email: string
  setEmail: (email: string) => void

  roles: string[]
  setRoles: (roles: string[]) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export default function UserProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [roles, setRoles] = useState<string[]>([])

  return <UserContext.Provider value={{ id, setId, name, setName, email, setEmail, roles, setRoles }}>{children}</UserContext.Provider>
}