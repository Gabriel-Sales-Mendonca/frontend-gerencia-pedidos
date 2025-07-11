'use client';

import { useRouter, useParams } from 'next/navigation';

import api from '@/services/axios';

export default function DeleteCompanyModal() {
    const router = useRouter();
    const params = useParams()

    const handleConfirm = async () => {
        try {
            const id = params.id as string

            await api.delete(`/companies/${id}`)
            router.back();

        } catch (e) {
            console.log(e)
        }

    };

    return (
        <div className="fixed inset-0 bg-black/50 text-black flex items-center justify-center z-50">
            <div className="bg-white dark:bg-white p-6 rounded-lg max-w-sm w-full">
                <h2 className="text-lg font-bold mb-4">Confirmar exclusão</h2>
                <p>Tem certeza que deseja deletar a localização?</p>
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
