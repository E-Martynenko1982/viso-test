import { FC } from 'react'
import { createPagesArray } from '../../utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null

  const pages = createPagesArray(totalPages)

  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        ←
      </button>
      {pages.map((p, idx) =>
        p === '...' ? (
          <span key={idx}>...</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            disabled={currentPage === p}
          >
            {p}
          </button>
        )
      )}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        →
      </button>
    </div>
  )
}
