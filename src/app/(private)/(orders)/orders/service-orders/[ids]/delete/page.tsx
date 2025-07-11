'use client';

import { useRouter, useParams } from 'next/navigation';

import api from '@/services/axios';
import { useOrders } from '@/hooks/useOrders';

export default function DeleteCompanyModal() {
    const router = useRouter();
    const params = useParams()

    const {
        context
    } = useOrders()

    const { products, setProducts } = context

    const handleConfirm = async () => {
        try {
            const ids = params.ids as string
            const serviceOrderId = ids.split('-')[0]
            const productIndex = Number(ids.split('-')[1])

            await api.delete(`/service-orders/delete/${serviceOrderId}`)

            const newProducts = products.filter((_, index) => index !== productIndex)
            setProducts(newProducts)

            router.back();

        } catch (e) {
            console.log(e)
        }

    };

    return (
        <div className="fixed inset-0 bg-black/50 text-black flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full">
                <h2 className="text-lg font-bold mb-4">Confirmar exclusão</h2>
                <p>Tem certeza que deseja deletar esse produto do pedido?</p>
                <div className="flex justify-center gap-2 mt-4">

                    <button onClick={() => router.back()} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded cursor-pointer">
                        Cancelar
                    </button>

                    <button onClick={handleConfirm} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer">
                        Confirmar
                    </button>

                </div>
            </div>
        </div>
    );
}
