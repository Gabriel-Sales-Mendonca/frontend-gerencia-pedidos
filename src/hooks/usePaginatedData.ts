import { useEffect, useState } from "react";

import api from "@/services/axios";
import { IPaginatedData } from "@/app/interfaces/paginatedData";

export function usePaginatedData<T>({ route, currentPage, limit = 5, datakey }: IPaginatedData) {

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

                const me = await api.get('auth/me')

                if (me.data.roles.includes('ADMIN')) {
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