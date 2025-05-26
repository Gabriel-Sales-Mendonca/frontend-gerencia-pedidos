'use client'

import { useEffect, useState } from 'react';
import api from '@/services/axios';

interface User {
    id: number;
    name: string;
    email: string;
}

export default function User() {

    const [users, setUsers] = useState([]);

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


    return (
        <div className='m-6 w-[90%] mx-auto'>
            <h1 className='text-3xl font-bold mb-6 text-center'>Localizações</h1>

            <button className='btn-create'>Nova localização</button>

            <ul className='mt-2 space-y-2'>

                <li className='grid grid-cols-4'>
                    <span>Código</span>
                    <span>Nome</span>
                </li>

                {users.map((user: User) => (
                    <li key={user.id} className='bg-white rounded p-2 grid grid-cols-4'>
                        <span>{user.id}</span>
                        <span>{user.name}</span>
                        <span className="material-symbols-outlined btn-edit">
                            edit_square
                        </span>
                        <span className="material-symbols-outlined btn-delete">
                            delete
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}