'use client';

import { useState } from 'react'
import Link from 'next/link'

export default function Menu() {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        if (isVisible) setIsVisible(false);
        else if (isVisible == false) setIsVisible(true);
    }

    return  (
        <>
            <button onClick={handleClose} className='absolute text-white font-bold top-8 left-4 cursor-pointer'>
                {isVisible ? '╳' : '☰'}
            </button>
            {isVisible && (
                <div className="h-[100vh] w-[15%] bg-blue-800 flex-shrink-0">
                    <h2 className="text-white text-center font-bold text-lg border-b p-4">MENU</h2>
                    <nav>
                        <Link href={"/users"}>
                            <div className='links-menu'>Usuários</div>
                        </Link>
                    </nav>
                </div>            
            )}
        </>
    )
}