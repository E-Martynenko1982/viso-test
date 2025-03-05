import { FC, useEffect, useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { StyledInput } from './SearchBarStyles'

interface SearchBarProps {
  onSearch: (value: string) => void
}

export const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    onSearch(debouncedSearchTerm)
  }, [debouncedSearchTerm, onSearch])

  return (
    <StyledInput
      variant="outlined"
      placeholder="Пошук рецептів..."
      value={searchTerm}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
      size="small"
    />
  )
}

