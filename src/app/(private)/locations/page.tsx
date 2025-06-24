'use client'

import { useLocation } from '@/hooks/useLocations'
import { ILocation } from "@/app/interfaces/location"
import { Pagination } from "@/app/components/Pagination"
import { useNavigation } from '@/hooks/useNavigation';

export default function Location() {

    const {
        locations,
        isAdmin,
        currentPage,
        totalPages,
        setCurrentPage,
        handleEdit
    } = useLocation()

    const { handleCheckAdminAndNavigate } = useNavigation()

    return (
        <div className='container-principal-pages'>
            <h1 className='text-3xl font-bold mb-6 text-center'>Localizações</h1>

            <button className='btn-create' onClick={e => handleCheckAdminAndNavigate(e, '/locations/new', isAdmin)}>
                Nova localização
            </button>

            <div className='overflow-x-auto'>
                <ul className='min-w-[600px] mt-2 space-y-2'>

                    <li className='grid grid-cols-5 pl-10'>
                        <span>Cód.</span>
                        <span>Nome</span>
                    </li>

                    {locations.map((location: ILocation) => (
                        <li key={location.id} className='bg-white dark:bg-neutral-600 dark:hover:bg-neutral-700 hover:bg-neutral-200 border border-gray-400 rounded p-2 pl-10 grid grid-cols-5'>
                            <span>{location.id}</span>
                            <span>{location.name}</span>

                            <button
                                className='btn-edit'
                                onClick={async (e) => {
                                    await handleEdit(location)
                                    handleCheckAdminAndNavigate(e, 'locations/edit', isAdmin)
                                }}
                            >
                                <span className="material-symbols-outlined">
                                    edit_square
                                </span>
                            </button>

                            <button
                                className='btn-delete'
                                onClick={e => handleCheckAdminAndNavigate(e, `/locations/${location.id}/delete`, isAdmin)}
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