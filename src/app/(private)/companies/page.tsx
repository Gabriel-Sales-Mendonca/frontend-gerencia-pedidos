'use client'

import { useCompanies } from '@/hooks/useCompanies'
import { ICompany } from "@/app/interfaces/company"
import { Pagination } from "@/app/components/Pagination"
import { useNavigation } from '@/hooks/useNavigation';

export default function Location() {

    const {
        companies,
        isAdmin,
        currentPage,
        totalPages,
        setCurrentPage,
        handleEdit
    } = useCompanies()

    const { handleCheckAdminAndNavigate } = useNavigation()

    return (
        <div className='container-principal-pages'>
            <h1 className='text-3xl font-bold mb-6 text-center'>Empresas</h1>

            <button className='btn-create' onClick={e => handleCheckAdminAndNavigate(e, '/companies/new', isAdmin)}>
                Nova empresa
            </button>

            <div className='overflow-x-auto'>
                <div className=''>
                    <ul className='min-w-[600px] mt-2 space-y-2'>

                        <li className='grid grid-cols-5 pl-10'>
                            <span>Cód.</span>
                            <span>Nome</span>
                        </li>

                        {companies.map((company: ICompany) => (
                            <li key={company.id} className='bg-white dark:bg-neutral-600 dark:hover:bg-neutral-700 hover:bg-neutral-100 border border-gray-400 rounded p-2 pl-10 grid grid-cols-5'>
                                <span>{company.id}</span>
                                <span>{company.name}</span>

                                <button
                                    className='btn-edit'
                                    onClick={async (e) => {
                                        await handleEdit(company)
                                        handleCheckAdminAndNavigate(e, 'companies/edit', isAdmin)
                                    }}
                                >
                                    <span className="material-symbols-outlined">
                                        edit_square
                                    </span>
                                </button>

                                <button
                                    className='btn-delete'
                                    onClick={e => handleCheckAdminAndNavigate(e, `/companies/${company.id}/delete`, isAdmin)}
                                >
                                    <span className="material-symbols-outlined">
                                        delete
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

        </div>
    )
}