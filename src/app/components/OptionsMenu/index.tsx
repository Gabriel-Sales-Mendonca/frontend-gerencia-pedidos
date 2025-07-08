// components/OptionsMenu.tsx
'use client'

import { useState, useEffect, useRef } from 'react'

interface OptionsMenuProps {
  onDelete: () => void
  onEdit: () => void
  // Aqui você pode adicionar outras ações futuras, como onEdit, etc.
}

export function OptionsMenu({ onDelete, onEdit }: OptionsMenuProps) {
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
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
              setIsOpen(false)
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer flex items-center"
          >
            <span className='material-symbols-outlined mr-2'>
              delete
            </span>
            Excluir
          </button>

          {/* Futuras ações */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit()
              setIsOpen(false)
            }}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center"
          >
            <span className='material-symbols-outlined mr-2'>
              edit
            </span>
            Editar
          </button>
        </div>
      )}
    </div>
  )
}
