'use client'

import { useContext, useState } from "react";

import { UserContext } from "@/app/contexts/user-provider";
import { IUser } from "@/app/interfaces/user";
import { usePaginatedData } from "./usePaginatedData";

export function useUser() {

    const [currentPage, setCurrentPage] = useState(1);

    const context = useContext(UserContext)

    if (!context) {
        throw new Error("useUser deve ser usado dentro de um <UserProvider>")
    }

    const { setId, setName, setEmail, setRoles } = context

    const { data: users, isAdmin, totalPages } = usePaginatedData<IUser>({
        route: '/users',
        currentPage: currentPage,
        limit: 5,
        datakey: 'users'
    })

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