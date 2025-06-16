import Link from 'next/link'
import { useRouter } from 'next/navigation'

import api from '@/services/axios'

export default function Header() {
    const router = useRouter()

    const handleLogOut = async () => {
        try {
            await api.post('/auth/logout') // certifique-se do caminho correto
            router.push('/login') // redireciona para login após logout
        } catch (error) {
            console.error('Erro ao deslogar', error)
            alert('Erro ao deslogar, tente novamente.')
        }
    }

    return (
        <div className='flex items-center justify-center h-16 fixed top-0 left-0 w-full bg-blue-800 border-b border-white shadow-lg'>
            <Link href={"/"}>
                <div className='flex'>
                    <h1 className='text-center text-white font-bold text-lg ml-6 mr-6'>PRÓ - HOSPITALAR</h1>
                </div>
            </Link>
            <button onClick={handleLogOut} className='fixed top-4 right-30 w-30 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out cursor-pointer'>Deslogar</button>
        </div>
    )
}