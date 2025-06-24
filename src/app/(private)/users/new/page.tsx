'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react"
import { toast } from "react-toastify";

import api from "@/services/axios";
import { IUserCreate } from "@/app/interfaces/user"


export default function NewUser() {
    const router = useRouter();

    const [formData, setFormData] = useState<IUserCreate>({
        name: '',
        email: '',
        password: '',
        roles: [],
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
            const response = await api.post('/users', formData)

            toast.success("Usuário criado.")

            router.push("/users")

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message[0]);
            } else {
                toast.error("Erro inesperado.");
            }
        }
    };

    return (
        <div className="container-form-pages">
            <h1 className="text-3xl font-bold mb-6 text-center">Criar usuário</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Nome</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nome"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="seu@email.com"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">Senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Digite sua senha"
                    />
                </div>
                <div>
                    <label htmlFor="roles" className="block text-sm font-medium mb-1">Tipo de usuário</label>
                    <select
                        name="roles"
                        id="roles"
                        value={formData.roles[0] || ''}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, roles: [e.target.value] }))
                        }
                        className="w-full px-3 py-2 bg-neutral-100 dark:bg-neutral-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:bg-neutral-800"
                    >
                        <option value="">Selecione</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="USER">USER</option>
                    </select>
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