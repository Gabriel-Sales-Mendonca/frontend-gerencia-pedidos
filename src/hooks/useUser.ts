'use client'

import { useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

import { UserContext } from "@/app/contexts/user-provider";
import { IUser } from "@/app/interfaces/user";
import api from "@/services/axios";
import { JwtPayload } from "@/app/types/jwtPayload";

export function useUser() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [isAdmin, setIsAdmin] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [ totalPages, setTotalPages ] = useState(0)

   const context = useContext(UserContext)

    if (!context) {
        throw new Error("useUser deve ser usado dentro de um <UserProvider>")
    }

    const { setId, setName, setEmail, setRoles } = context

    useEffect(() => {
        const fetchUsers = async () => {
            try {

                const response = await api.get('/users', {
                    params: { page: currentPage, limit: 5 }
                })

                setUsers(response.data.users)
                setTotalPages(response.data.lastPage)

                const me = await api.get('auth/me')

                if (me.data.roles.includes('ADMIN')) {
                    setIsAdmin(true)
                }

            } catch (error) {
                console.log("Erro na busca dos dados" + error)
            }
        }

        fetchUsers();
    }, [currentPage]);

    const handleEdit = (user: IUser) => {
        setId(user.id)
        setName(user.name)
        setEmail(user.email)
        setRoles(user.roles)
    }

    return {
        context,
        users,
        isAdmin,
        currentPage,
        totalPages,
        handleEdit,
        setCurrentPage
    }

}