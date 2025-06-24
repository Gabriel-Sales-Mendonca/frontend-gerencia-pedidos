'use client'

import React, { useState, useEffect } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import api from "@/services/axios";
import { useUser } from "@/hooks/useUser"
import { IUser } from "@/app/interfaces/user"
import Link from "next/link";


export default function EditUser() {

    const { context } = useUser()
    const { id, name, email, roles } = context

    const router = useRouter();

    const [formData, setFormData] = useState<IUser>({
        id: 0,
        name: '',
        email: '',
        roles: [],
    });

    useEffect(() => {
        setFormData({ id: id, name: name, email: email, roles: roles })
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
            await api.patch(`/users/${id}`, formData)

            toast.success("Usuário atualizado.")

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
        <div className="container-form-pages">
            <h1 className="text-3xl font-bold mb-6 text-center">Editar usuário</h1>

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
                <div>
                    <label htmlFor="roles" className="block text-sm font-medium text-gray-700 dark:text-neutral-100 mb-1">Tipo de usuário</label>
                    <select
                        name="roles"
                        id="roles"
                        value={formData.roles[0] || ''}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, roles: [e.target.value] }))
                        }
                        className="w-full px-3 py-2 bg-neutral-100 dark:bg-neutral-600 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    Editar
                </button>
            </form>

            <div className="my-10">
                <Link href={`/users/${formData.id}/update-password`}>
                    <button className='btn-create'>
                        Mudar Senha
                    </button>
                </Link>
            </div>

        </div>
    )
}