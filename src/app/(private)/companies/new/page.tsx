'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react"
import { toast } from "react-toastify";

import api from "@/services/axios";
import { ICompanyCreate } from "@/app/interfaces/company"


export default function NewCompany() {
    const router = useRouter();

    const [formData, setFormData] = useState<ICompanyCreate>({
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
            const response = await api.post('/companies', formData)

            router.push("/companies")

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message[0]);
            } else {
                toast.error("Erro inesperado.");
            }
        }
    };

    return (
        <div className="m-6 w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Criar empresa</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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