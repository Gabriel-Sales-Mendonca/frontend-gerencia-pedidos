'use client'

import { useUser } from '@/hooks/useUser'
import { IUser } from "@/app/interfaces/user"
import { Pagination } from "@/app/components/Pagination"
import { useNavigation } from '@/hooks/useNavigation';

export default function User() {

    const {
        users,
        isAdmin,
        currentPage,
        totalPages,
        handleEdit,
        setCurrentPage
    } = useUser()

    const { handleCheckAdminAndNavigate } = useNavigation()

    return (
        <div className='m-6 w-[90%] mx-auto'>
            <h1 className='text-3xl font-bold mb-6 text-center'>Usuários</h1>

            <button className='btn-create' onClick={e => handleCheckAdminAndNavigate(e, '/users/new', isAdmin)}>
                Novo usuário
            </button>

            <ul className='mt-2 space-y-2'>

                <li className='grid grid-cols-6 pl-10'>
                    <span>Cód.</span>
                    <span>Nome</span>
                    <span>Email</span>
                    <span>Tipo de usuário</span>
                </li>

                {users.map((user: IUser) => (
                    <li key={user.id} className='bg-white rounded p-2 pl-10 grid grid-cols-6 hover:bg-gray-100'>
                        <span>{user.id}</span>
                        <span>{user.name}</span>
                        <span>{user.email}</span>
                        <span>{user.roles}</span>

                        <button 
                            className='btn-edit'
                            onClick={async (e) => {
                                await handleEdit(user)
                                handleCheckAdminAndNavigate(e, 'users/edit', isAdmin)
                            }}
                        >
                            <span className="material-symbols-outlined">
                                edit_square
                            </span>
                        </button>

                        <button className='btn-delete' onClick={e => handleCheckAdminAndNavigate(e, `/users/${user.id}/delete`, isAdmin)}>
                            <span className="material-symbols-outlined">
                                delete
                            </span>
                        </button>
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