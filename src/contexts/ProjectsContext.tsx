import { createContext } from 'react'
import {
    ProjectErrorType,
    ProjectType,
} from '../controllers/ProjectsController'

export type ProjectsContextType = {
    projects: ProjectType[]
    setProjects: (p: ProjectType[]) => void
    errors: ProjectErrorType[]
    setErrors: (e: ProjectErrorType[]) => void
}

export const ProjectsContext = createContext<ProjectsContextType>({
    setProjects: () => undefined,
    projects: [],
    setErrors: () => undefined,
    errors: [],
})
