'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';

import api from '@/services/axios';
import { useUser } from '@/hooks/useUser'
import { IUser } from "@/app/interfaces/user"

export default function User() {
    const [users, setUsers] = useState<IUser[]>([]);

    const { setId, setName, setEmail, setRoles } = useUser()

    useEffect(() => {
        const fetchUsers = async () => {
            try {

                const response = await api.get('/users');
                setUsers(response.data);

            } catch (error) {
                console.log("Erro na busca dos dados" + error)
            }
        }

        fetchUsers();
    }, []);

    const handleEdit = (user: IUser) => {
        setId(user.id)
        setName(user.name)
        setEmail(user.email)
        setRoles(user.roles)
    }

    return (
        <div className='m-6 w-[90%] mx-auto'>
            <h1 className='text-3xl font-bold mb-6 text-center'>Usuários</h1>

            <Link href={'/users/new'}>
                <button className='btn-create'>
                    Novo usuário
                </button>
            </Link>

            <ul className='mt-2 space-y-2'>

                <li className='grid grid-cols-5 pl-10'>
                    <span>Nome</span>
                    <span>Email</span>
                    <span>Tipo de usuário</span>
                </li>

                {users.map((user: IUser) => (
                    <li key={user.id} className='bg-white rounded p-2 pl-10 grid grid-cols-5 hover:bg-gray-100'>
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                        <span>{user.roles}</span>

                        <button onClick={() => handleEdit(user)}>
                            <Link href={`/users/edit`}>
                                <span className="material-symbols-outlined btn-edit">
                                    edit_square
                                </span>
                            </Link>
                        </button>

                        <Link href={`/users/${user.id}/delete`}>
                            <span className="material-symbols-outlined btn-delete">
                                delete
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}