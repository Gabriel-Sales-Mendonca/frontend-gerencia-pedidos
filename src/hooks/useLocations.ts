'use client'

import { useContext, useState } from "react";

import { LocationContext } from "@/app/contexts/location-provider";
import { ILocation } from "@/app/interfaces/location";
import { usePaginatedData } from "./usePaginatedData";

export function useLocation() {

    const context = useContext(LocationContext)

    if (!context) {
        throw new Error("useLocation deve ser usado dentro de um <LocationProvider>")
    }

    const { setId, setName } = context

    const [currentPage, setCurrentPage] = useState(1);

    const { data: locations, isAdmin, totalPages  } = usePaginatedData<ILocation>({
        route: '/locations',
        currentPage: currentPage,
        limit: 5,
        datakey: 'locations'
    })

    const handleEdit = (location: ILocation) => {
        setId(location.id)
        setName(location.name)
    }

    return {
        context,
        locations,
        isAdmin,
        currentPage,
        totalPages,
        setCurrentPage,
        handleEdit
    }

}