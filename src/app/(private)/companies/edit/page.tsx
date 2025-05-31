'use client'

import React, { useState, useEffect } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import api from "@/services/axios";
import { useCompanies } from "@/hooks/useCompanies"
import { ICompany } from "@/app/interfaces/company"


export default function EditCompany() {

    const { context } = useCompanies()
    const { id, name } = context

    const router = useRouter();

    const [formData, setFormData] = useState<ICompany>({
        id: 0,
        name: ''
    });

    useEffect(() => {
        setFormData({ id: id, name: name })
    }, [])

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
            await api.put(`/companies/${id}`, formData)

            router.push("/companies")

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Erro inesperado.");
            }
        }
    };

    return (
        <div className="m-6 w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Editar Empresa</h1>

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
                    Editar
                </button>
            </form>
        </div>
    )
}