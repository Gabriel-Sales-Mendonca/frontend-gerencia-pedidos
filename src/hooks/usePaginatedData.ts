import { useEffect, useState } from "react";

import api from "@/services/axios";
import Cookies from 'js-cookie';
import { IPaginatedData } from "@/app/interfaces/paginatedData";
import { JwtPayload } from "@/app/types/jwtPayload";
import { jwtDecode } from "jwt-decode";

export function usePaginatedData<T>({ route, currentPage, limit = 10, datakey }: IPaginatedData) {

    const [ data, setData ] = useState<T[]>([]);
    const [ isAdmin, setIsAdmin ] = useState(false);
    const [ totalPages, setTotalPages ] = useState(0);

    useEffect(() => {
        const fetchLocations = async () => {
            try {

                const response = await api.get(route, {
                    params: { page: currentPage, limit: limit }
                })

                setData(response.data[datakey])
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
        data,
        isAdmin,
        totalPages
    }

}