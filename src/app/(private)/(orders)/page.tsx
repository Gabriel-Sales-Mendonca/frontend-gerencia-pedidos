'use client'

import { useOrders } from "@/hooks/useOrders"

export default function Home() {
  const {
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
  } = useOrders()

  return (
    <div className="p-8 w-[90%] mx-auto">
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
                      <span>{detail.location?.name ?? '—'}
                        <button
                          onClick={() =>
                            updateLocation(detail.id, order.order_id, order.company_id)
                          }
                          className="ml-3 bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600 transition-colors cursor-pointer"
                        >
                          Receber
                        </button>
                      </span>
                      <span>
                          vazio
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
