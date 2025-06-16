'use client'

import { useState } from "react"
import Link from "next/link"

import { Pagination } from "@/app/components/Pagination"
import { useOrders } from "@/hooks/useOrders"
import { formatDate, toUTCDateFromLocalDateInput, convertToUTC } from '@/utils/formatDate'

export default function Home() {

  const {
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
  } = useOrders()

  const [editLocationDeliveryDate, setEditLocationDeliveryDate] = useState<number | null>(null)
  const [newDate, setNewDate] = useState('')

  return (
    <div className="p-8 w-[90%] mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Pedidos</h1>

      <Link href={'/orders/new'} className='btn-create-link'>Novo Pedido</Link>

      <form onSubmit={handleSubmitSearch}>
        <div className="mt-10 flex w-fit items-stretch">
          <input
            type="number"
            value={searchOrder}
            onChange={handleChangeSearchOrder}
            placeholder="Nº do pedido"
            className="h-10 px-3 text-black border border-gray-400 rounded-l-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            required
          />
          <button type="submit" className="h-10 w-10 bg-blue-500 rounded-r-md flex items-center justify-center cursor-pointer">
            <span className="material-symbols-outlined text-white">
              search
            </span>
          </button>
        </div>
      </form>

      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_30px] font-semibold text-gray-700 bg-gray-100 mt-6 p-4 rounded-t-lg border-b">
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
                className={`grid grid-cols-[1fr_1fr_1fr_1fr_30px] p-4 transition-all rounded-md shadow-sm cursor-pointer ${order.expired ? 'bg-red-300 hover:bg-red-400' : 'bg-white hover:bg-gray-100'}`}
              >
                <div>{order.order_id}</div>
                <div>{order.company_name}</div>
                <div>{order.delivery_date ?? '—'}</div>
                <div>{order.qtd_product}</div>
                <button
                  className="btn-delete text-center flex"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteClick(order.order_id, order.company_id)
                  }}
                >
                  <span className={`material-symbols-outlined ${order.expired ? 'text-black' : ''}`}>
                    delete
                  </span>
                </button>
              </div>

              {expandedOrders[key] && (
                <ul className="ml-4 mt-2 space-y-2 border-l border-gray-300 pl-4">

                  <li className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] font-medium text-gray-500">
                    <span>Produto</span>
                    <span>Destino</span>
                    <span>Localização</span>
                    <span>Recebido em</span>
                    <span>Entregar até</span>
                  </li>

                  {orderDetails[key]?.map((detail) => (
                    <div key={detail.id} className="mb-6 rounded border border-gray-300">
                      <li className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] items-center text-sm bg-white p-2 rounded-t gap-2">

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
                                  <option key={loc.id} value={loc.id} className="cursor-pointer">
                                    {loc.name}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={() => {
                                  setEditingDestinationId(null)
                                  setDestinationUpdates((prev) => {
                                    const updated = { ...prev }
                                    delete updated[detail.id]
                                    return updated
                                  })
                                }}
                                className="cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-red-600 rounded-full hover:bg-gray-200">
                                  close
                                </span>
                              </button>
                              <button
                                onClick={() =>
                                  updateDestination(detail.id, order.order_id, order.company_id)
                                }
                                className="text-blue-600 text-xs hover:underline cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-green-600 rounded-full hover:bg-gray-200">
                                  check
                                </span>
                              </button>
                            </div>
                          ) : (
                            <span
                              onClick={() => setEditingDestinationId(detail.id)}
                              className="text-blue-600 cursor-pointer hover:underline"
                            >
                              {detail.destinationLocation?.name ?? 'Nenhum'}
                            </span>
                          )}
                        </span>

                        <span>
                          {detail.location?.name ?? '—'}
                          <button
                            onClick={() =>
                              updateLocation(detail.id, order.order_id, order.company_id)
                            }
                            className="ml-3 bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600 transition-colors cursor-pointer"
                          >
                            Receber
                          </button>
                        </span>

                        <span>{formatDate(detail.location_start_date)}</span>

                        <span>
                          {editLocationDeliveryDate === detail.id ?
                            (
                              <div className="flex items-center">
                                <input
                                  type="date"
                                  onChange={(e) => { setNewDate(e.target.value) }}
                                />

                                <button
                                  onClick={() => { setEditLocationDeliveryDate(null) }}
                                  className="text-blue-600 text-xs hover:underline cursor-pointer"
                                >
                                  <span className="material-symbols-outlined text-red-600 rounded-full hover:bg-gray-200">
                                    close
                                  </span>
                                </button>

                                <button
                                  onClick={() => {
                                    if (newDate != null) {
                                      const utcDate = toUTCDateFromLocalDateInput(newDate).toISOString()
                                      console.log('Enviando para API:', utcDate)

                                      updateLocationDeliveryDate(
                                        detail.order_id,
                                        order.company_id,
                                        detail.id,
                                        utcDate // <-- Enviar string ISO
                                      )
                                    }

                                    setEditLocationDeliveryDate(null)
                                  }}
                                  className="text-blue-600 text-xs hover:underline cursor-pointer"
                                >
                                  <span className="material-symbols-outlined text-green-600 rounded-full hover:bg-gray-200">
                                    check
                                  </span>
                                </button>

                              </div>
                            ) : (
                              <div className="flex items-center">
                                <span>
                                  {formatDate(detail.location_delivery_date)}
                                </span>

                                <button
                                  onClick={() => { setEditLocationDeliveryDate(detail.id) }}
                                  className="ml-3 text-center flex"
                                >
                                  <span className="material-symbols-outlined btn-edit">
                                    edit_square
                                  </span>
                                </button>
                              </div>
                            )
                          }
                        </span>

                      </li>
                    </div>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

    </div>
  )
}
