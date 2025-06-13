'use client'

import { useContext, useState } from "react";

import { LocationContext } from "@/app/contexts/location-provider";
import { ILocation } from "@/app/interfaces/location";
import { usePaginatedData } from "./usePaginatedData";
import { ICompany } from "@/app/interfaces/company";

export function useCompanies() {

    const context = useContext(LocationContext)

    if (!context) {
        throw new Error("useCompanies deve ser usado dentro de um <CompanyProvider>")
    }

    const { setId, setName } = context

    const [currentPage, setCurrentPage] = useState(1);

    const { data: companies, isAdmin, totalPages } = usePaginatedData<ICompany>({
        route: '/companies',
        currentPage: currentPage,
        limit: 5,
        datakey: 'companies'
    })

    const handleEdit = (location: ILocation) => {
        setId(location.id)
        setName(location.name)
    }

    return {
        context,
        companies,
        isAdmin,
        currentPage,
        totalPages,
        setCurrentPage,
        handleEdit
    }

}