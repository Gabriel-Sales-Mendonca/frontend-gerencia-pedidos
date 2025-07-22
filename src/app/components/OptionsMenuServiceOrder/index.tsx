// components/OptionsMenu.tsx
'use client'

import { useState, useEffect, useRef } from 'react'

interface OptionsMenuServiceOrderProps {
  onFinishing: () => void,
  status?: boolean
  // Aqui você pode adicionar outras ações futuras, como onEdit, etc.
}

export function OptionsMenuServiceOrder({ onFinishing, status }: OptionsMenuServiceOrderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Fecha o menu se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
      >
        <span className="material-symbols-outlined">
          more_vert
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-32 bg-white text-black dark:text-black border border-gray-300 rounded shadow-lg z-10">
          {status ?

            <button
              onClick={(e) => {
                e.stopPropagation()
                onFinishing()
                setIsOpen(false)
              }}
              className="block w-full text-left px-2 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer flex items-center"
            >
              <span className='material-symbols-outlined mr-2'>
                cancel
              </span>
              Reabrir
            </button>

            :

            <button
              onClick={(e) => {
                e.stopPropagation()
                onFinishing()
                setIsOpen(false)
              }}
              className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-100 cursor-pointer flex items-center"
            >
              <span className='material-symbols-outlined mr-2'>
                check
              </span>
              Finalizar
            </button>
          }
        </div>
      )}
    </div>
  )
}
