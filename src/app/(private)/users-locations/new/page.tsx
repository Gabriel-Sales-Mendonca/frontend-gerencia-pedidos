'use client'

import React, { useState } from "react"
import { useRouter } from "next/navigation"

import { IUserLocation } from "@/app/interfaces/userLocation"
import api from "@/services/axios"
import axios from "axios"
import { toast } from "react-toastify"

export default function newUsersLocations() {
    const router = useRouter()

    const [formData, setFormData] = useState<IUserLocation>({
        userId: '',
        locationId: ''
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await api.post('/user-location', { 
                userId: Number(formData.userId), 
                locationId: Number(formData.locationId) 
            })

            router.push('/users-locations')
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Erro inesperado.");
            }
        }
    }

    return (
        <div className="m-6 w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Criar relação</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-between items-start w-full max-w-md mx-auto">

                    <div className="flex flex-col w-[48%]">
                        <label htmlFor="userId" className="mb-1 text-sm font-medium text-gray-700">ID do Usuário</label>
                        <input
                            id="userId"
                            type="number"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            className="px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            placeholder="ID usuário" />
                    </div>

                    <div className="flex flex-col w-[48%]">
                        <label htmlFor="locationId" className="mb-1 text-sm font-medium text-gray-700">ID da localização</label>
                        <input
                            id="locationId"
                            type="number"
                            name="locationId"
                            value={formData.locationId}
                            onChange={handleChange}
                            className="px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            placeholder="ID localização" />
                    </div>
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