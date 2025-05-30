export interface IPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface IButtonProps {
    icon: React.ReactNode;
    disabled?: boolean;
    onClick: () => void;
}