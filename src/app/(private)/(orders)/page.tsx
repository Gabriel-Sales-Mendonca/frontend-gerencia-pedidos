'use client'

import { useEffect, useState } from 'react'
import api from '@/services/axios'

interface ServiceOrder {
  id: number
  location_id: number
  destination_id: number | null
  order_id: number
  product_id: string
  location: { name: string }
  destinationLocation?: { name: string } | null
}

interface GroupedOrder {
  order_id: number
  company_id: number
  company_name: string
  delivery_date: string | null
  qtd_product: number
}

interface Location {
  id: number
  name: string
}

export default function Home() {
  const [groupedOrders, setGroupedOrders] = useState<GroupedOrder[]>([])
  const [expandedOrders, setExpandedOrders] = useState<{ [key: string]: boolean }>({})
  const [orderDetails, setOrderDetails] = useState<{ [key: string]: ServiceOrder[] }>({})
  const [locations, setLocations] = useState<Location[]>([])
  const [editingDestinationId, setEditingDestinationId] = useState<number | null>(null)
  const [destinationUpdates, setDestinationUpdates] = useState<{ [key: number]: number }>({})

  useEffect(() => {
    const fetchGroupedOrders = async () => {
      const response = await api.get('/service-orders/')
      setGroupedOrders(response.data)
    }

    const fetchLocations = async () => {
      const res = await api.get('/locations')
      setLocations(res.data)
    }

    fetchGroupedOrders()
    fetchLocations()
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

  const handleDestinationChange = (serviceOrderId: number, newLocationId: number) => {
    setDestinationUpdates((prev) => ({ ...prev, [serviceOrderId]: newLocationId }))
  }

  const updateDestination = async (
    serviceOrderId: number,
    orderId: number,
    companyId: number
  ) => {
    const newLocationId = destinationUpdates[serviceOrderId]
    if (!newLocationId) return

    await api.patch(`/service-orders/update-destination/${serviceOrderId}?location_id=${newLocationId}`)
    await refreshServiceOrder(orderId, companyId)
    setEditingDestinationId(null)
  }

  const updateLocation = async (
    serviceOrderId: number,
    orderId: number,
    companyId: number
  ) => {
    await api.patch(`/service-orders/update-location/${serviceOrderId}`)
    await refreshServiceOrder(orderId, companyId)
  }

  const refreshServiceOrder = async (orderId: number, companyId: number) => {
    const res = await api.get(`/service-orders/by-order/${orderId}?company_id=${companyId}`)
    const key = getKey(orderId, companyId)
    setOrderDetails((prev) => ({
      ...prev,
      [key]: res.data
    }))
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
                  <li className="grid grid-cols-4 font-medium text-gray-500">
                    <span>Produto</span>
                    <span>Destino</span>
                    <span>Localização</span>
                    <span>Ações</span>
                  </li>
                  {orderDetails[key]?.map((detail) => (
                    <li
                      key={detail.id}
                      className="grid grid-cols-4 items-center text-sm bg-gray-50 p-2 rounded-md gap-2"
                    >
                      <span>{detail.product_id}</span>
                      <span>
                        {editingDestinationId === detail.id ? (
                          <div className="flex items-center gap-2">
                            <select
                              value={destinationUpdates[detail.id] || detail.destination_id || ''}
                              onChange={(e) =>
                                handleDestinationChange(detail.id, parseInt(e.target.value))
                              }
                              className="border border-gray-300 rounded p-1 text-sm cursor-pointer"
                            >
                              <option value="">Selecione</option>
                              {locations.map((loc) => (
                                <option key={loc.id} value={loc.id} className='cursor-pointer'>
                                  {loc.name}
                                </option>
                              ))}
                            </select>
                            <button onClick={() => {
                              setEditingDestinationId(null)
                                  setDestinationUpdates(prev => {
                                    const updated = { ...prev };
                                    delete updated[detail.id]; // <- Limpa o valor salvo
                                    return updated;
                                  });
                            }}
                              className='cursor-pointer'
                            >
                              <span className="material-symbols-outlined text-red-600 rounded-full hover:bg-gray-200">close</span>
                            </button>
                            <button
                              onClick={() =>
                                updateDestination(detail.id, order.order_id, order.company_id)
                              }
                              className="text-blue-600 text-xs hover:underline cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-green-600 rounded-full hover:bg-gray-200">check</span>
                            </button>
                          </div>
                        ) : (
                          <span
                            onClick={() => setEditingDestinationId(detail.id)}
                            className="text-blue-600 cursor-pointer hover:underline"
                          >
                            {detail.destinationLocation?.name ?? 'sem destino'}
                          </span>
                        )}
                      </span>
                      <span>{detail.location?.name ?? '—'}</span>
                      <span>
                        <button
                          onClick={() =>
                            updateLocation(detail.id, order.order_id, order.company_id)
                          }
                          className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600 transition-colors cursor-pointer"
                        >
                          Receber
                        </button>
                      </span>
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
