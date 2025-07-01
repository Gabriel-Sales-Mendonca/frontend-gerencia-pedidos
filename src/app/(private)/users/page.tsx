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
        <div className='container-principal-pages'>
            <h1 className='text-3xl font-bold mb-6 text-center'>Usuários</h1>

            <div className='flex mb-6'>
                <button
                    className='btn-create'
                    onClick={e => handleCheckAdminAndNavigate(e, '/users/new', isAdmin)}
                >
                    <span className="material-symbols-outlined align-middle mr-2">person_add</span>
                    Novo Usuário
                </button>
            </div>

            <div className='overflow-x-auto bg-white dark:bg-neutral-600 shadow-lg rounded-lg'>
                <table className='min-w-full divide-y divide-neutral-200 dark:divide-neutral-700'>
                    <thead className='bg-neutral-50 dark:bg-neutral-700'>
                        <tr>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider'>
                                Cód.
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider'>
                                Nome
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider'>
                                Email
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider'>
                                Tipo de Usuário
                            </th>
                            <th scope='col' className='px-6 py-3 text-center text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider'>
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white dark:bg-neutral-600 divide-y divide-neutral-200 dark:divide-neutral-700'>
                        {users.map((user: IUser) => (
                            <tr key={user.id} className='hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200'>
                                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 dark:text-neutral-200'>
                                    {user.id}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-200'>
                                    {user.name}
                                </td>
                                <td className='px-6 py-4 whitespace-normal text-sm text-neutral-900 dark:text-neutral-200'>
                                    {user.email}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-neutral-900 dark:text-neutral-200'>
                                    {user.roles}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
                                    <div className='flex items-center justify-center space-x-2'>
                                        <button
                                            className='btn-edit'
                                            onClick={async (e) => {
                                                await handleEdit(user)
                                                handleCheckAdminAndNavigate(e, 'users/edit', isAdmin)
                                            }}
                                            title="Editar Usuário"
                                        >
                                            <span className="material-symbols-outlined text-lg mr-6 cursor-pointer">
                                                edit_square
                                            </span>
                                        </button>
                                        <button
                                            className='btn-delete'
                                            onClick={e => handleCheckAdminAndNavigate(e, `/users/${user.id}/delete`, isAdmin)}
                                            title="Excluir Usuário"
                                        >
                                            <span className="material-symbols-outlined text-lg cursor-pointer">
                                                delete
                                            </span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && (
                    <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
                        Nenhum usuário encontrado.
                    </div>
                )}
            </div>

            <div className='mt-6'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    )
}