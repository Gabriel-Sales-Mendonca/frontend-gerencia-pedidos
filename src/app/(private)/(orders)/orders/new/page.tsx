'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'

import api from '@/services/axios'
import { IOrderCreate } from '@/app/interfaces/order'
import { toUTCDateFromLocalDateInput } from '@/utils/formatDate'
import { ICompany } from '@/app/interfaces/company'

export default function CreateOrderPage() {
    const router = useRouter()
    const [isPHOn, setIsPHOn] = useState(true)
    const [ companies, setCompanies ] = useState<ICompany[]>([])

    const [formData, setFormData] = useState<IOrderCreate>({
        order_id: 0,
        company_id: 0,
        delivery_date: '',
        products: [{ id: '', name: null }]
    })

    useEffect(() => {
        const fetchData = async () => {
            try {

                const responseCompany = await api.get('/companies')
                setCompanies(responseCompany.data.companies)

            } catch(error) {
                toast.error("Erro ao buscar dados")
                console.log("Erro na busca dos dados" + error)
            }
        }
        
        fetchData()
    }, [])

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleProductChange = (index: number, value: string) => {

        value = value.trim()

        if (isPHOn) {
            if (!value.includes('PH-')) {
                value = 'PH-' + value
            }
        }

        const formDataProducts = [...formData.products]
        formDataProducts[index] = { id: value, name: null }

        setFormData(prev => ({
            ...prev,
            products: formDataProducts
        }))
    }

    const addProductField = () => {
        setFormData(prev => ({
            ...prev,
            products: [...prev.products, { id: '', name: null }]
        }))
    }

    const removeProductField = (index: number) => {
        setFormData(prev => ({
            ...prev,
            products: prev.products.filter((_, i) => i !== index)
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const order = {
                id: Number(formData.order_id),
                company_id: Number(formData.company_id),
                delivery_date: toUTCDateFromLocalDateInput(formData.delivery_date),
                products: formData.products.filter(p => p.id.trim() !== '')
            }

            await api.post('/orders', order)

            toast.success("Pedido criado.")

            router.push('/')
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Erro inesperado.");
            }
        }
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-neutral-600 text-neutral-900 dark:text-neutral-100 rounded-2xl shadow-md space-y-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Criar Pedido</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Número do Pedido</label>
                    <input
                        type="number"
                        name="order_id"
                        value={formData.order_id <= 0 ? '' : formData.order_id}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Empresa</label>
                        <select
                            id="company_id"
                            name="company_id"
                            value={formData.company_id}
                            onChange={handleChange}
                            required
                            className="px-3 py-2 bg-neutral-100 dark:bg-neutral-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:bg-neutral-800 cursor-pointer"
                        >
                            <option value="">Selecione</option>
                            {companies.map((company) => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                </div>

                <div>
                    <label className="block font-medium mb-1">Data de Entrega</label>
                    <input
                        type="date"
                        name="delivery_date"
                        value={formData.delivery_date}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 bg-neutral-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className='h-8 mb-1 flex'>
                    <span className='mr-3 flex items-center'>Preencher PH</span>
                    <button type='button' onClick={() => setIsPHOn(!isPHOn)}>
                        <span
                            className={`material-symbols-outlined cursor-pointer ${isPHOn ? 'text-blue-500 dark:text-neutral-100' : 'text-gray-400'
                                }`}
                            style={{ fontSize: '32px', lineHeight: 1 }}
                        >
                            {isPHOn ? 'toggle_on' : 'toggle_off'}
                        </span>
                    </button>
                </div>

                <div>
                    <label className="block font-medium mb-1">Produtos</label>
                    {formData.products.map((product, index) => (
                        <div key={index} className="flex space-x-2 mb-2">
                            <input
                                type="text"
                                value={product.id}
                                onChange={(e) => handleProductChange(index, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                placeholder={`Código do Produto ${index + 1}`}
                            />
                            {formData.products.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeProductField(index)}
                                    className="btn-delete"
                                >
                                    <span className="material-symbols-outlined">
                                        delete
                                    </span>
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addProductField}
                        className="text-blue-600 dark:text-neutral-100 hover:underline text-sm cursor-pointer"
                    >
                        <span className="material-symbols-outlined">
                            add_circle
                        </span>
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                >
                    Criar
                </button>
            </form>
        </div>
    )
}
