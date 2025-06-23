'use client'

import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import api from "@/services/axios";

export default function UpdatePassword() {
    const router = useRouter()

    const params = useParams()
    const id = params.id

    const [password, setPassword] = useState('')
    
    const handleChange = (e: any) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await api.patch(`/users/update-password/${id}`, {
                newPassword: password,
                oldPassword: ''
            })

            router.push("/users")

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
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-neutral-100 mb-1">Nova senha</label>
                    <input
                        type="password"
                        id="new-password"
                        name="new-password"
                        value={password}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 bg-neutral-100 dark:bg-neutral-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nova senha"
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