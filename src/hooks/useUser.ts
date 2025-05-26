'use client'

import { useContext } from "react";

import { UserContext } from "@/app/contexts/user-provider";

export function useUser() {

    const context = useContext(UserContext)

    if (!context) {
        throw new Error("useUser deve ser usado dentro de um <UserProvider>")
    }

    return context

}