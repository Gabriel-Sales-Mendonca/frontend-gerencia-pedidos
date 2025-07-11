'use client'

import { useState } from "react"
import Link from "next/link"

import { Pagination } from "@/app/components/Pagination"
import { OptionsMenu } from "@/app/components/OptionsMenu"
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
    handleEditClick,
    handleChangeSearchOrder,
    handleSubmitSearch
  } = useOrders()

  const [editLocationDeliveryDate, setEditLocationDeliveryDate] = useState<number | null>(null)
  const [newDate, setNewDate] = useState('')
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  return (
    <div className="container-principal-pages">
      <h1 className="text-3xl font-bold mb-6 text-center">Pedidos</h1>

      <Link href={'/orders/new'} className='btn-create-link'>Novo Pedido</Link>

      <form onSubmit={handleSubmitSearch}>
        <div className="mt-10 flex w-fit items-stretch">
          <input
            type="number"
            value={searchOrder}
            onChange={handleChangeSearchOrder}
            placeholder="Nº do pedido"
            className="text-neutral-900 dark:text-neutral-100 h-10 px-3 text-neutral-900 border border-gray-400 rounded-l-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            required
          />
          <button type="submit" className="h-10 w-10 bg-blue-500 hover:bg-blue-600 rounded-r-md flex items-center justify-center cursor-pointer">
            <span className="material-symbols-outlined text-neutral-100">
              search
            </span>
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_30px] font-semibold bg-slate-200 dark:bg-neutral-700 mt-6 p-4 rounded-t-lg border border-gray-400">
            <div>Pedido</div>
            <div>Empresa</div>
            <div>Data de Entrega</div>
            <div>Qtd. Produtos</div>
          </div>


          <ul className="divide-y divide-neutral-50 dark:divide-neutral-800">
            {groupedOrders.map((order) => {
              const key = getKey(order.order_id, order.company_id)

              return (
                <li key={key}>

                  <div

                    onClick={() => toggleExpand(order.order_id, order.company_id)}
                    className={`grid grid-cols-[1fr_1fr_1fr_1fr_30px] my-0.25 p-4 transition-all rounded-md shadow-sm border border-gray-400 cursor-pointer ${order.expired ? 'bg-red-300 dark:bg-red-400 hover:bg-red-500 dark:text-neutral-900' : 'bg-white hover:bg-neutral-200 dark:bg-neutral-600 dark:hover:bg-neutral-700'}`}
                  >
                    <div className="font-bold">{order.order_id}</div>
                    <div>{order.company_name}</div>
                    <div>{order.delivery_date ?? '—'}</div>
                    <div>{order.qtd_product}</div>

                    <OptionsMenu
                      onDelete={() => handleDeleteClick(order.order_id, order.company_id)}
                      onEdit={() => handleEditClick(order.order_id, order.company_id, order.delivery_date ? order.delivery_date : '-', )}
                    />
                  </div>

                  {expandedOrders[key] && (
                    <ul className="text-neutral-900 dark:text-neutral-100 ml-4 mt-2 space-y-2 border-l border-gray-300 pl-4">

                      <li className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] font-medium text-gray-700 dark:text-neutral-100">
                        <span>Produto</span>
                        <span>Destino</span>
                        <span>Localização</span>
                        <span>Recebido em</span>
                        <span>Entregar até</span>
                      </li>

                      {orderDetails[key]?.map((detail) => (
                        <div key={detail.id} className="mb-6 rounded border border-gray-300">
                          <li className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] items-center text-sm bg-white dark:bg-gray-600 p-2 rounded-t gap-2">

                            <span>{detail.product_id}</span>

                            <span>
                              {editingDestinationId === detail.id ? (
                                <div className="flex items-center gap-2">
                                  <select
                                    value={destinationUpdates[detail.id] || detail.destination_id || ''}
                                    onChange={(e) =>
                                      handleDestinationChange(detail.id, parseInt(e.target.value))
                                    }
                                    className="bg-white dark:bg-gray-800 text-neutral-900 dark:text-gray-100 border border-gray-300 rounded p-1 text-sm cursor-pointer"
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
                                  className="text-blue-600 dark:text-neutral-100 cursor-pointer hover:underline"
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
                                className="ml-3 bg-blue-500 text-neutral-100 text-xs px-2 py-1 rounded hover:bg-blue-600 transition-colors cursor-pointer"
                              >
                                Receber
                              </button>
                            </span>

                            <span>{formatDate(detail.location_start_date)}</span>

                            <span>
                              {editLocationDeliveryDate === detail.id ?
                                (
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="date"
                                      onChange={(e) => { setNewDate(e.target.value) }}
                                      className="bg-neutral-300 dark:bg-neutral-900 text-black dark:text-white"
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
                                        edit_calendar
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
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

    </div>
  )
}
