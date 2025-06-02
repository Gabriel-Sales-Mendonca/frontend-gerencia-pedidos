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
        <div className='m-6 w-[90%] mx-auto'>
            <h1 className='text-3xl font-bold mb-6 text-center'>Empresas</h1>

            <button className='btn-create' onClick={e => handleCheckAdminAndNavigate(e, '/companies/new', isAdmin)}>
                Nova empresa
            </button>

            <ul className='mt-2 space-y-2'>

                <li className='grid grid-cols-5 pl-10'>
                    <span>Cód.</span>
                    <span>Nome</span>
                </li>

                {companies.map((company: ICompany) => (
                    <li key={company.id} className='bg-white rounded p-2 pl-10 grid grid-cols-5 hover:bg-gray-100'>
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

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

        </div>
    )
}