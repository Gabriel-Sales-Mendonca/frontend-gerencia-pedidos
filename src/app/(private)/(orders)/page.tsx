'use client'

import { useEffect, useState } from 'react'
import api from '@/services/axios'

interface ServiceOrder {
  id: number
  location_id: number
  order_id: number
  product_id: string
  location: { name: string }
}

interface GroupedOrder {
  order_id: number
  company_id: number
  company_name: string
  delivery_date: string | null
  qtd_product: number
}

export default function Home() {
  const [groupedOrders, setGroupedOrders] = useState<GroupedOrder[]>([])
  const [expandedOrders, setExpandedOrders] = useState<{ [key: string]: boolean }>({})
  const [orderDetails, setOrderDetails] = useState<{ [key: string]: ServiceOrder[] }>({})

  useEffect(() => {
    const fetchGroupedOrders = async () => {
      const response = await api.get('/service-orders/')
      setGroupedOrders(response.data)
    }
    fetchGroupedOrders()
  }, [])

  const getKey = (orderId: number, companyId: number) => `${orderId}-${companyId}`

  const toggleExpand = async (orderId: number, companyId: number) => {
    const key = getKey(orderId, companyId)
    if (expandedOrders[key]) {
      setExpandedOrders((prev) => ({ ...prev, [key]: false }))
    } else {
      if (!orderDetails[key]) {
        const res = await api.get(`/service-orders/by-order/${orderId}?company_id=${companyId}`)
        setOrderDetails((prev) => ({ ...prev, [key]: res.data }))
      }
      setExpandedOrders((prev) => ({ ...prev, [key]: true }))
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Pedidos</h1>

      <div className="grid grid-cols-4 font-semibold text-gray-700 bg-gray-100 p-4 rounded-t-lg border-b">
        <div>Pedido</div>
        <div>Empresa</div>
        <div>Data de Entrega</div>
        <div>Qtd. Produtos</div>
      </div>

      <ul className="divide-y divide-gray-200">
        {groupedOrders.map((order) => {
          const key = getKey(order.order_id, order.company_id)

          return (
            <li key={key}>
              <div
                onClick={() => toggleExpand(order.order_id, order.company_id)}
                className="grid grid-cols-4 p-4 bg-white hover:bg-gray-50 transition-all rounded-md shadow-sm cursor-pointer"
              >
                <div>{order.order_id}</div>
                <div>{order.company_name}</div>
                <div>{order.delivery_date ?? '—'}</div>
                <div>{order.qtd_product}</div>
              </div>

              {expandedOrders[key] && (
                <ul className="ml-4 mt-2 space-y-2 border-l border-gray-300 pl-4">
                  <li className="grid grid-cols-6 font-medium text-gray-500">
                    <span>Produto</span>
                    <span>Localização</span>
                    <span>Início</span>
                    <span>Fim</span>
                    <span></span>
                  </li>
                  {orderDetails[key]?.map((detail) => (
                    <li
                      key={detail.id}
                      className="grid grid-cols-6 text-sm bg-gray-50 p-2 rounded-md"
                    >
                      <span>{detail.product_id}</span>
                      <span>{detail.location.name}</span>
                      <span>--/--/--</span>
                      <span>--/--/--</span>
                      <button className='w-[50%] px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out cursor-pointer'>Atualizar</button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
