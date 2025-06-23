'use client'

import { useUsersLocations } from '@/hooks/useUsersLocations'
import { IUserLocationRequest } from "@/app/interfaces/userLocation"
import { Pagination } from "@/app/components/Pagination"
import { useNavigation } from '@/hooks/useNavigation';

export default function UsersLocations() {

    const {
        usersLocations,
        isAdmin,
        currentPage,
        totalPages,
        setCurrentPage
    } = useUsersLocations()

    const { handleCheckAdminAndNavigate } = useNavigation()

    return (
        <div className='m-6 w-[90%] mx-auto'>
            <h1 className='text-3xl font-bold mb-6 text-center'>Usuários x Localizações</h1>

            <button className='btn-create' onClick={e => handleCheckAdminAndNavigate(e, '/users-locations/new', isAdmin)}>
                Novo relacionamento
            </button>

            <div className='overflow-x-auto'>
                <ul className='min-w-[600px] mt-2 space-y-2'>

                    <li className='grid grid-cols-6 pl-10'>
                        <span>Cód. Usuário</span>
                        <span>Nome Usuário</span>
                        <span>Cód. Localização</span>
                        <span>Nome Localização</span>
                    </li>

                    {usersLocations.map((userLocation: IUserLocationRequest) => (
                        <li key={`${userLocation.user.id}-${userLocation.location.id}`} className='bg-white dark:bg-neutral-600 dark:hover:bg-neutral-700 border border-gray-400 rounded p-2 pl-10 grid grid-cols-6 hover:bg-gray-100'>
                            <span>{userLocation.user.id}</span>
                            <span>{userLocation.user.name}</span>
                            <span>{userLocation.location.id}</span>
                            <span>{userLocation.location.name}</span>

                            <button
                                className='btn-delete'
                                onClick={e => handleCheckAdminAndNavigate(e, `/users-locations/${userLocation.user.id}-${userLocation.location.id}/delete`, isAdmin)}
                            >
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