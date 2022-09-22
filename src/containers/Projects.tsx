import { useEffect, useState } from 'react'
import './Projects.css'
import {
    getProjectsAction,
    ProjectErrorType,
    ProjectType,
    updateProjectsAction,
    validateProjectsAction,
} from '../controllers/ProjectsController'
import ProjectsList from '../components/ProjectsList/ProjectsList'
import { SearchContext } from '../contexts/SearchContext'
import ProjectsHeader from '../components/ProjectsHeader/ProjectsHeader'
import { ProjectsContext } from '../contexts/ProjectsContext'
import Loading from '../common/Loading/Loading'

function Projects() {
    const [projects, setProjects] = useState<ProjectType[]>([])
    const [isEditing, setIsEditing] = useState(false)
    const [searchFilter, setSearchFilter] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<ProjectErrorType[]>([])

    useEffect(() => {
        document.title = 'A-team Projects'
        const fetchData = async () => {
            setLoading(true)
            const projectsData = await getProjectsAction()
            setProjects(projectsData)
            setLoading(false)
        }
        fetchData()
    }, [])
    const toogleEditMode = async () => {
        setLoading(true)
        const validationErrors = validateProjectsAction(projects)
        if (isEditing) {
            if (!validationErrors.length) {
                await updateProjectsAction(projects)
                setIsEditing(!isEditing)
            }
            setErrors(validationErrors)
        } else {
            setIsEditing(!isEditing)
            setSearchFilter('')
        }
        setLoading(false)
    }
    console.log("hey")

    return (
        <SearchContext.Provider value={{ setSearchFilter, searchFilter }}>
            <ProjectsContext.Provider
                value={{ setProjects, projects, errors, setErrors }}
            >
                <div className="projects">
                    {loading && <Loading />}
                    <ProjectsHeader
                        isEditing={isEditing}
                        toogleEditMode={toogleEditMode}
                    />
                    <ProjectsList isEditing={isEditing} />
                </div>
            </ProjectsContext.Provider>
        </SearchContext.Provider>
    )
}

export default Projects
