import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '@/services/axios'
import axios from 'axios'

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

export function useOrders() {
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
        const toastId = toast.loading("Buscando...")

        try {
          const res = await api.get(`/service-orders/by-order/${orderId}?company_id=${companyId}`)
          setOrderDetails((prev) => ({ ...prev, [key]: res.data }))

          toast.update(toastId, {
            isLoading: false,
            autoClose: 1,
          })
        } catch (error) {
          toast.update(toastId, {
            render: 'Erro ao buscar os dados',
            type: 'error',
            isLoading: false,
            autoClose: 3000,
            closeOnClick: true,
          })
        }
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

    const toastId = toast.loading("Atualizando destino...")

    try {
      await api.patch(`/service-orders/update-destination/${serviceOrderId}?location_id=${newLocationId}`)
      await refreshServiceOrder(orderId, companyId)
      setEditingDestinationId(null)

      toast.update(toastId, {
        render: 'Destino atualizado!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      })
    } catch (error) {

      if (error instanceof axios.AxiosError && error.response) {
        toast.update(toastId, {
          render: error.response.data.message,
          type: 'error',
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        })
      }
    }

  }

  const updateLocation = async (
    serviceOrderId: number,
    orderId: number,
    companyId: number
  ) => {
    const toastId = toast.loading("Atualizando localização")

    try {
      await api.patch(`/service-orders/update-location/${serviceOrderId}`)

      toast.update(toastId, {
        render: 'Localização atualizada!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      })
    } catch (error) {

      if (error instanceof axios.AxiosError && error.response) {
        toast.update(toastId, {
          render: error.response.data.message,
          type: 'error',
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        })
      }
    }

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

  return {
    groupedOrders,
    expandedOrders,
    orderDetails,
    locations,
    editingDestinationId,
    destinationUpdates,
    getKey,
    toggleExpand,
    handleDestinationChange,
    setEditingDestinationId,
    setDestinationUpdates,
    updateDestination,
    updateLocation
  }
}