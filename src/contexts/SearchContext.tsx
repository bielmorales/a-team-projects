import { createContext } from 'react'

export type SearchContextType = {
    searchFilter: string
    setSearchFilter: (c: string) => void
}

export const SearchContext = createContext<SearchContextType>({
    setSearchFilter: () => undefined,
    searchFilter: '',
})
