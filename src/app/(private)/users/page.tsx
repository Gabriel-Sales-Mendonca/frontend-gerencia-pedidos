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

            <div className='overflow-x-auto'>
                <ul className='min-w-[600px] mt-2 space-y-2'>

                    <li className='grid grid-cols-[1fr_1fr_150px_1fr_1fr_1fr] pl-10'>
                        <span>Cód.</span>
                        <span>Nome</span>
                        <span>Email</span>
                        <span>Tipo de usuário</span>
                    </li>

                    {users.map((user: IUser) => (
                        <li key={user.id} className='bg-white dark:bg-neutral-600 dark:hover:bg-neutral-700 hover:bg-neutral-100 border border-gray-400 rounded p-2 pl-10 grid grid-cols-[1fr_1fr_150px_1fr_1fr_1fr]'>
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
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

        </div>
    )
}