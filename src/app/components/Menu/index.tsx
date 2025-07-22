'use client';

import { useState } from 'react'
import Link from 'next/link'

import usePwaInstall from '@/hooks/usePwaInstall'

export default function Menu() {
    const [isVisible, setIsVisible] = useState(false);
    const { isInstallable, install } = usePwaInstall();

    const handleClose = () => {
        if (isVisible) setIsVisible(false);
        else if (isVisible == false) setIsVisible(true);
    }

    const handleLinkClick = () => {
        if (window.innerWidth < 768) {
            setIsVisible(false)
        }
    }

    return (
        <>
            <button onClick={handleClose} className='absolute text-white font-bold top-5 md:top-8 left-4 cursor-pointer'>
                {isVisible ?
                    <span className='material-symbols-outlined'>close</span>
                    :
                    <span className='material-symbols-outlined'>menu</span>
                }
            </button>
            {isVisible && (
                <div className="h-[100vh] w-full xl:w-[15%] sm:w-[40%] md:w-[25%] bg-blue-800 dark:bg-neutral-700 flex-shrink-0">
                    <h2 className="text-white text-center font-bold text-lg border-b p-3">MENU</h2>
                    <nav>
                        <Link href={"/"} onClick={handleLinkClick}>
                            <div className='links-menu'>Pedidos</div>
                        </Link>
                    </nav>
                    <nav>
                        <Link href={"/users"} onClick={handleLinkClick}>
                            <div className='links-menu'>Usuários</div>
                        </Link>
                    </nav>
                    <nav>
                        <Link href={"/locations"} onClick={handleLinkClick}>
                            <div className='links-menu'>Localizações</div>
                        </Link>
                    </nav>
                    <nav>
                        <Link href={"/users-locations"} onClick={handleLinkClick}>
                            <div className='links-menu'>Usuário x Localização</div>
                        </Link>
                    </nav>
                    <nav>
                        <Link href={"/companies"} onClick={handleLinkClick}>
                            <div className='links-menu'>Empresas</div>
                        </Link>
                    </nav>


                    {isInstallable && (
                        <div className='flex justify-center'>                            
                            <button onClick={install} className="mt-4 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer">
                                Instalar App
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}