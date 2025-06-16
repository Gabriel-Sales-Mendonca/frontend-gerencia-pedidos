import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import api from '@/services/axios'
import { IServiceOrder } from '@/app/interfaces/serviceOrder'
import { IGroupedOrder } from '@/app/interfaces/order'
import { ILocation } from '@/app/interfaces/location'

export function useOrders() {
  const [groupedOrders, setGroupedOrders] = useState<IGroupedOrder[]>([])
  const [expandedOrders, setExpandedOrders] = useState<{ [key: string]: boolean }>({})
  const [orderDetails, setOrderDetails] = useState<{ [key: string]: IServiceOrder[] }>({})
  const [locations, setLocations] = useState<ILocation[]>([])
  const [editingDestinationId, setEditingDestinationId] = useState<number | null>(null)
  const [destinationUpdates, setDestinationUpdates] = useState<{ [key: number]: number }>({})
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)
  const [searchOrder, setSearchOrder] = useState('')

  const router = useRouter()

  useEffect(() => {
    const toastId = toast.loading("Buscando...")

    const fetchData = async () => {
      try {

        const resServiceOrders = await api.get('/service-orders/', {
          params: { page: currentPage, limit: 10 }
        })
        setGroupedOrders(resServiceOrders.data.data)
        setTotalPages(resServiceOrders.data.lastPage)

        const resLocations = await api.get('/locations/all')
        setLocations(resLocations.data)

        toast.update(toastId, {
          render: "Dados carregados",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        })

      } catch (err) {
        toast.update(toastId, {
          render: "Erro ao buscar dados",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        })
      }
    }

    fetchData()
  }, [currentPage])

  const getKey = (orderId: number, companyId: number) => `${orderId}-${companyId}`

  const toggleExpand = async (orderId: number, companyId: number) => {
    const key = getKey(orderId, companyId)
    if (expandedOrders[key]) {
      setExpandedOrders({})
    } else {
      if (!orderDetails[key]) {
        const toastId = toast.loading("Buscando...")

        try {
          const res = await api.get(`/service-orders/details-by-order/${orderId}?company_id=${companyId}`)
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
      setExpandedOrders({ [key]: true })
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

  const updateLocationDeliveryDate = async (orderId: number, companyId: number, serviceOrderId: number, newDate: string) => {
    await api.patch(`/service-orders/update-location-delivery-date/${serviceOrderId}`, {
      locationDeliveryDate: newDate
    })

    await refreshServiceOrder(orderId, companyId)
  }

  const handleDeleteClick = async (orderId: number, companyId: number) => {
    router.push(`/orders/${orderId}-${companyId}/delete`)
  }

  const handleChangeSearchOrder = (e: any) => {
    const { value } = e.target
    setSearchOrder(value)
  }

  const handleSubmitSearch = async (e: any) => {
    e.preventDefault()

    const toastId = toast.loading("Buscando...")

    try {

      const response = await api.get(`service-orders/by-order/${searchOrder}`)

      setGroupedOrders(response.data)

      if (response.data.length < 1) {
        toast.update(toastId, {
          render: 'Pedido não encontrado',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        })
      } else {
        toast.update(toastId, {
          render: 'Pedido buscado',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
        })
      }

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

  return {
    groupedOrders,
    expandedOrders,
    orderDetails,
    locations,
    editingDestinationId,
    destinationUpdates,
    currentPage,
    totalPages,
    searchOrder,
    setCurrentPage,
    getKey,
    toggleExpand,
    handleDestinationChange,
    setEditingDestinationId,
    setDestinationUpdates,
    updateDestination,
    updateLocation,
    updateLocationDeliveryDate,
    handleDeleteClick,
    handleChangeSearchOrder,
    handleSubmitSearch
  }
}