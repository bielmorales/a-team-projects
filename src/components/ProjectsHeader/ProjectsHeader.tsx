import { useContext } from 'react'
import './ProjectsHeader.css'
import { SearchContext } from '../../contexts/SearchContext'
import SearchInput from '../../common/SearchInput/SearchInput'

interface ProjectsListItemProps {
    isEditing: boolean
    toogleEditMode: Function
}

function ProjectsHeader({ isEditing, toogleEditMode }: ProjectsListItemProps) {
    const { setSearchFilter, searchFilter } = useContext(SearchContext)
    return (
        <div className="projects-header">
            <img src="/img/logo.svg" className="a-team-logo" alt="logo" />
            <SearchInput
                setSearchFilter={setSearchFilter}
                isEditing={isEditing}
                searchFilter={searchFilter}
            />
            <button
                className="projects-header-edit-button"
                onClick={() => toogleEditMode()}
            >
                {' '}
                {isEditing ? 'Save' : 'Edit'}
            </button>
        </div>
    )
}

export default ProjectsHeader
