import React from 'react';

import { IPaginationProps, IButtonProps } from '@/app/interfaces/pagination'

export function Pagination({ currentPage, totalPages, onPageChange }: IPaginationProps) {
    const visiblePages = getVisiblePages(currentPage, totalPages);

    function getVisiblePages(current: number, total: number): (number | string)[] {
        const pages: (number | string)[] = [];

        if (total <= 7) {
            for (let i = 1; i <= total; i++) pages.push(i);
        } else {
            pages.push(1);

            if (current > 4) pages.push('...');

            const start = Math.max(2, current - 1);
            const end = Math.min(total - 1, current + 1);

            for (let i = start; i <= end; i++) pages.push(i);

            if (current < total - 3) pages.push('...');

            pages.push(total);
        }

        return pages;
    }

    function handlePageChange(page: number) {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
            {/* Botões de Navegação */}
            <PaginationButton 
                icon={<span className="material-symbols-outlined">first_page</span>} 
                disabled={currentPage === 1} 
                onClick={() => handlePageChange(1)} 
            />
            <PaginationButton 
                icon={<span className="material-symbols-outlined">chevron_left</span>} 
                disabled={currentPage === 1} 
                onClick={() => handlePageChange(currentPage - 1)} 
            />

            {/* Páginas visíveis */}
            {visiblePages.map((page, index) =>
                typeof page === 'number' ? (
                    <button
                        key={index}
                        onClick={() => handlePageChange(page)}
                        aria-current={page === currentPage}
                        className={`min-w-[36px] px-2 py-1 rounded text-sm transition cursor-pointer ${page === currentPage
                            ? 'bg-blue-600 text-white font-semibold shadow'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            } hidden sm:inline`}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index} className="text-gray-400 px-2 hidden sm:inline">…</span>
                )
            )}

            {/* Botões de Navegação */}
            <PaginationButton 
                icon={<span className="material-symbols-outlined">chevron_right</span>} 
                disabled={currentPage === totalPages} 
                onClick={() => handlePageChange(currentPage + 1)} 
            />
            <PaginationButton 
                icon={<span className="material-symbols-outlined">last_page</span>} 
                disabled={currentPage === totalPages} 
                onClick={() => handlePageChange(totalPages)} 
            />
        </div>
    );
}

function PaginationButton({ icon, disabled, onClick }: IButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="rounded bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50 cursor-pointer flex"
        >
            {icon}
        </button>
    );
}
