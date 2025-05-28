import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
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
        <motion.div
            className="flex flex-wrap justify-center items-center gap-2 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Botões de Navegação */}
            <PaginationButton icon={<ChevronsLeft size={18} />} disabled={currentPage === 1} onClick={() => handlePageChange(1)} />
            <PaginationButton icon={<ChevronLeft size={18} />} disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />

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
            <PaginationButton icon={<ChevronRight size={18} />} disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
            <PaginationButton icon={<ChevronsRight size={18} />} disabled={currentPage === totalPages} onClick={() => handlePageChange(totalPages)} />
        </motion.div>
    );
}

interface ButtonProps {
    icon: React.ReactNode;
    disabled?: boolean;
    onClick: () => void;
}

function PaginationButton({ icon, disabled, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="p-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50 cursor-pointer"
        >
            {icon}
        </button>
    );
}
