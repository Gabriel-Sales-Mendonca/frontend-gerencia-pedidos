'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react"
import { toast } from "react-toastify";

import api from "@/services/axios";
import { ILocationCreate } from "@/app/interfaces/location"


export default function NewLocation() {
    const router = useRouter();

    const [formData, setFormData] = useState<ILocationCreate>({
        name: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post('/locations', formData)

            toast.success("Localização criada.")

            router.push("/locations")

        } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Erro inesperado.");
            }
        }
    };

    return (
        <div className="container-form-pages">
            <h1 className="text-3xl font-bold mb-6 text-center">Criar Localização</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-neutral-100 mb-1">Nome</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 bg-neutral-100 dark:bg-neutral-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nome"
                    />
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