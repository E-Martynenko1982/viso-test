import { FC } from 'react';
import { createPagesArray } from '../../utils';
import { PaginationContainer, PaginationButton } from './PaginationStyles';

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

  const pages = createPagesArray(totalPages);

  return (
    <PaginationContainer>
      <PaginationButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        ←
      </PaginationButton>
      {pages.map((p, idx) =>
        p === '...' ? (
          <span key={idx}>...</span>
        ) : (
          <PaginationButton key={p} onClick={() => onPageChange(p as number)} disabled={currentPage === p}>
            {p}
          </PaginationButton>
        )
      )}
      <PaginationButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        →
      </PaginationButton>
    </PaginationContainer>
  );
};
