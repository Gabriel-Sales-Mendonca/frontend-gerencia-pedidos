'use client'

import { useState } from "react";

import { IUserLocationRequest } from "@/app/interfaces/userLocation";
import { usePaginatedData } from "./usePaginatedData";

export function useUsersLocations() {
    const [currentPage, setCurrentPage] = useState(1);

    const { data: usersLocations, isAdmin, totalPages } = usePaginatedData<IUserLocationRequest>({
        route: '/user-location',
        limit: 5,
        currentPage: currentPage,
        datakey: 'usersLocations'
    })

    return {
        usersLocations,
        isAdmin,
        currentPage,
        totalPages,
        setCurrentPage
    }

}