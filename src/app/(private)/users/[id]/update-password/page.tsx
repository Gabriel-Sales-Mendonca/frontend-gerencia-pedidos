'use client'

import { useRouter } from "next/navigation";

import api from "@/services/axios";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

export default function UpdatePassword() {
    const router = useRouter()

    const [formData, setFormData] = useState({})
    
    const handleChange = (valor: string) => {
        console.log(valor)
        setFormData
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            console.log("ok")

            //router.push("/users")

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

            <h1 className="text-3xl font-bold mb-6 text-center">Mudar Senha</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="old-password" className="block text-sm font-medium text-gray-700 mb-1">Senha antiga</label>
                    <input
                        type="password"
                        id="old-password"
                        name="old-password"
                        onChange={(e) => handleChange(e.target.value)}
                        required
                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">Senha nova</label>
                    <input
                        type="password"
                        id="new-password"
                        name="new-password"
                        required
                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                >
                    Mudar
                </button>
            </form>

        </div>
    )
}