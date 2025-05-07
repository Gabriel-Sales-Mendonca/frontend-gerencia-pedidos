'use client'

import { useEffect, useState } from 'react';
import api from '../../../services/axios';

interface User {
    id: number;
    name: string;
    email: string;
}

export default function user() {

    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {

                const response = await api.get('/users');

                setUsers(response.data);

            } catch(error) {
                console.log("Erro na busca dos dados" + error)
            }
        }

        fetchUsers();
    }, []);


    return(
        <div>
            <h1>Lista de usuários:</h1>
            <ul>
                {users.map((user: User) => (
                    <li key={user.id}>
                        {user.id} - {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    )
}