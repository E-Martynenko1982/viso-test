import { FC } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  // Приклад логіки відображення:
  // Якщо сторінок > 10, то показуємо перші 7, "..." і останню
  const pages: (number | string)[] = [];
  if (totalPages <= 10) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // 1...7
    for (let i = 1; i <= 7; i++) {
      pages.push(i);
    }
    pages.push('...');
    pages.push(totalPages);
  }

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ←
      </button>

      {pages.map((p, idx) => {
        if (p === '...') {
          return <span key={idx}>...</span>;
        }
        return (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            disabled={currentPage === p}
          >
            {p}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        →
      </button>
    </div>
  );
};
