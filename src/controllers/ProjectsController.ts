import initialProjects from '../models/projects.json'
import { uid } from 'uid'
import fakeAsyncTimeout from '../helpers/fakeAsyncTimeout'
const localStorageProjectsKey = 'aTeamProjects'

export type ProjectType = {
    eid: string
    type: string
    title: string
    jobRole: string
    description: string
    logoURL?: string
    imageURL?: string
}

export type ProjectErrorType = {
    projectEid: string
    field: string
    msg: string
}

export const getProjectsAction = async (): Promise<ProjectType[]> => {
    await fakeAsyncTimeout()
    const localStorageProjects = localStorage.getItem(localStorageProjectsKey)
    if (!localStorageProjects) return initialProjects
    try {
        return JSON.parse(localStorageProjects)
    } catch {
        return initialProjects
    }
}

export const updateProjectsAction = async (projects: ProjectType[]) => {
    await fakeAsyncTimeout()
    return localStorage.setItem(
        localStorageProjectsKey,
        JSON.stringify(projects)
    )
}

export const deleteProjectAction = (
    projectEid: string,
    projects: ProjectType[]
) => {
    const projectsCopy = [...projects]
    for (let i = 0; i < projectsCopy.length; i++) {
        if (projectsCopy[i].eid === projectEid) {
            projectsCopy.splice(i, 1)
            i--
        }
    }
    return projectsCopy
}

export const addNewProjectAction = (projects: ProjectType[]) => {
    const projectsCopy = [...projects]
    projectsCopy.unshift({
        eid: uid(24),
        type: 'project',
        title: '',
        jobRole: '',
        description: '',
        logoURL: '',
        imageURL: '',
    })
    return projectsCopy
}

export const validateProjectsAction = (projects: ProjectType[]) => {
    const validationErrors: ProjectErrorType[] = []
    projects.forEach((p) => {
        if (!p.title) {
            validationErrors.push({
                projectEid: p.eid,
                msg: 'Please set a project title',
                field: 'title',
            })
        }
    })
    return validationErrors
}

export const updateCurrentProjectAction = (
    project: ProjectType,
    projects: ProjectType[]
) => {
    return projects.map((currentProject) => {
        if (currentProject.eid === project.eid) {
            return project
        } else {
            return currentProject
        }
    })
}
