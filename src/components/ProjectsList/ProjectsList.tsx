import { useContext } from 'react'
import { ProjectsContext } from '../../contexts/ProjectsContext'
import { SearchContext } from '../../contexts/SearchContext'
import {
    addNewProjectAction,
    deleteProjectAction,
    ProjectType,
    updateCurrentProjectAction,
} from '../../controllers/ProjectsController'
import ProjectsListItem from '../ProjectsListItem/ProjectsListItem'
import './ProjectsList.css'

interface ProjectsListProps {
    isEditing: Boolean
}

function ProjectsList({ isEditing }: ProjectsListProps) {
    const { projects, setProjects, errors } = useContext(ProjectsContext)
    const deleteProject = async (projectEid: string) => {
        const updatedProjects = deleteProjectAction(projectEid, projects)
        setProjects(updatedProjects)
    }
    const { searchFilter } = useContext(SearchContext)
    const updateCurrentProject = (project: ProjectType) => {
        const updatedProjects = updateCurrentProjectAction(project, projects)
        setProjects(updatedProjects)
    }
    const addNewProject = () => {
        const updatedProjects = addNewProjectAction(projects)
        setProjects(updatedProjects)
    }
    const filteredProjects = projects.filter((p) =>
        p.title.toLowerCase().includes(searchFilter.toLowerCase())
    )
    return (
        <>
            <div className="title-add-project-wrapper">
                <h2 className="projects-title">Projects</h2>
                {isEditing && (
                    <button
                        onClick={addNewProject}
                        className="add-project-button"
                    >
                        Add project
                    </button>
                )}
            </div>
            <div className="projects-list">
                {filteredProjects.map((project) => {
                    return (
                        <ProjectsListItem
                            errors={errors}
                            updateCurrentProject={updateCurrentProject}
                            isEditing={isEditing}
                            project={project}
                            key={project.eid}
                            deleteProject={deleteProject}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default ProjectsList
