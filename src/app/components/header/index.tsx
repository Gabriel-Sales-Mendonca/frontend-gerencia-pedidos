import Link from 'next/link'

export default function Header() {
    return (
        <div className='flex items-center justify-center h-16 fixed top-0 left-0 w-full bg-orange-500 border-b border-white shadow-lg'>
            <Link href={"/"}>
                <div className='flex'>
                    <h1 className='text-center text-white font-bold text-lg ml-6 mr-6'>PRÓ - HOSPITALAR</h1>
                </div>
            </Link>
        </div>
    )
}