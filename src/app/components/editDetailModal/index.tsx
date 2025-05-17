import { useState } from "react"

interface EditDetailModalProps {
  detail: any
  onClose: () => void
  onSave: (data: { endDate: string; note: string }) => void
}

export function EditDetailModal({ detail, onClose, onSave }: EditDetailModalProps) {
  const [endDate, setEndDate] = useState(detail.location_delivery_date?.split('T')[0] || '')
  const [note, setNote] = useState(detail.observacao || '')

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Produto {detail.product_id}</h2>

        <label className="block mb-2 text-sm">Data de Fim</label>
        <input
          type="date"
          className="w-full border p-2 rounded mb-4"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <label className="block mb-2 text-sm">Observação</label>
        <textarea
          className="w-full border p-2 rounded mb-4"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave({ endDate, note })}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}
