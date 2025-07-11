'use client'

import { createContext, useState } from 'react'

type OrderContextType = {
  orderId: number
  setOrderId: (id: number) => void

  companyId: number
  setCompanyId: (id: number) => void

  deliveryDate: string
  setDeliveryDate: (deliveryDate: string) => void

  products: string[]
  setProducts: (products: string[]) => void

  serviceOrderMap: Map<string, number>
  setServiceOrderMap: (map: Map<string, number>) => void
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined)

export default function OrderProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [orderId, setOrderId] = useState(0)
  const [companyId, setCompanyId] = useState(0)
  const [deliveryDate, setDeliveryDate] = useState('-')
  const [products, setProducts] = useState([''])
  const [serviceOrderMap, setServiceOrderMap] = useState<Map<string, number>>(new Map())

  return <OrderContext.Provider value={
    {
      orderId, setOrderId,
      companyId, setCompanyId,
      deliveryDate, setDeliveryDate,
      products, setProducts,
      serviceOrderMap, setServiceOrderMap
    }
  }>{children}</OrderContext.Provider>
}