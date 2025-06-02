'use client'

import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

import api from "@/services/axios";
import { JwtPayload } from "@/app/types/jwtPayload";
import { IUserLocationRequest } from "@/app/interfaces/userLocation";

export function useUsersLocations() {
    const [usersLocations, setUsersLocations] = useState<IUserLocationRequest[]>([]);
    const [isAdmin, setIsAdmin] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        const fetchLocations = async () => {
            try {

                const response = await api.get('/user-location', {
                    params: { page: currentPage, limit: 5 }
                })

                setUsersLocations(response.data.usersLocations)
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

    return {
        usersLocations,
        isAdmin,
        currentPage,
        totalPages,
        setCurrentPage
    }

}