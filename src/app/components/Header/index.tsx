import Link from 'next/link'

export default function Header() {
    const handleLogOut = () => {
        document.cookie = 'token=; Max-Age=0; path=/;'
        window.location.reload()
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