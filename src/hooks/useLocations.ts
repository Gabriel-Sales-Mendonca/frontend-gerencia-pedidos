'use client'

import { useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

import { LocationContext } from "@/app/contexts/location-provider";
import api from "@/services/axios";
import { JwtPayload } from "@/app/types/jwtPayload";
import { ILocation } from "@/app/interfaces/location";

export function useLocation() {

    const context = useContext(LocationContext)

    if (!context) {
        throw new Error("useLocation deve ser usado dentro de um <LocationProvider>")
    }

    const { setId, setName } = context

    const [locations, setLocations] = useState<ILocation[]>([]);
    const [isAdmin, setIsAdmin] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        const fetchLocations = async () => {
            try {

                const response = await api.get('/locations', {
                    params: { page: currentPage, limit: 5 }
                })

                setLocations(response.data.locations)
                setTotalPages(response.data.lastPage)

                const token = Cookies.get('token')
                const decode = token ? jwtDecode<JwtPayload>(token) : null

                if (decode?.roles.includes('ADMIN')) {
                    setIsAdmin(true)
                }

            } catch (error) {
                console.log("Erro na busca dos dados" + error)
            }
        }

        fetchLocations();
    }, [currentPage]);

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