import { FC, useEffect, useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'

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
    <div>
      <input
        type="text"
        placeholder="Пошук рецептів..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
    </div>
  )
}
