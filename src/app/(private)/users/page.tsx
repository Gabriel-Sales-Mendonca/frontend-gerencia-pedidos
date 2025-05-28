'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify';

import api from '@/services/axios';
import { useUser } from '@/hooks/useUser'
import { IUser } from "@/app/interfaces/user"
import { Pagination } from "@/app/components/Pagination"

type JwtPayload = {
    sub: string;
    roles: string[];
};

export default function User() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [isAdmin, setIsAdmin] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [ totalPages, setTotalPages ] = useState(0)

    const { setId, setName, setEmail, setRoles } = useUser()

    useEffect(() => {
        const fetchUsers = async () => {
            try {

                const response = await api.get('/users', {
                    params: { page: currentPage, limit: 5 }
                })

                setUsers(response.data.users)
                setTotalPages(response.data.lastPage)

                const token = Cookies.get('token')
                const decode = token ? jwtDecode<JwtPayload>(token) : null

                if (decode?.roles.includes('ADMIN')) {
                    setIsAdmin(true)
                }

            } catch (error) {
                console.log("Erro na busca dos dados" + error)
            }
        }

        fetchUsers();
    }, [currentPage]);

    const handleEdit = (user: IUser) => {
        setId(user.id)
        setName(user.name)
        setEmail(user.email)
        setRoles(user.roles)
    }

    const handleCreateUserBtn = () => {
        if (!isAdmin) {
            toast.info("Você não é ADMIN")
        }
    }

    return (
        <div className='m-6 w-[90%] mx-auto'>
            <h1 className='text-3xl font-bold mb-6 text-center'>Usuários</h1>

            <Link href={isAdmin ? '/users/new' : '#'}>
                <button
                    onClick={handleCreateUserBtn}
                    className='btn-create'
                >
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
                            <Link
                                href={isAdmin ? `/users/edit` : '#'}
                                onClick={handleCreateUserBtn}
                            >
                                <span className="material-symbols-outlined btn-edit">
                                    edit_square
                                </span>
                            </Link>
                        </button>

                        <Link
                            href={isAdmin ? `/users/${user.id}/delete` : '#'}
                            onClick={handleCreateUserBtn}
                        >
                            <span className="material-symbols-outlined btn-delete">
                                delete
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>

            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

        </div>
    )
}