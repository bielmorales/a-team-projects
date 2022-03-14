import initialProjects from '../models/projects.json';
import { uid } from 'uid';
const localStorageProjectsKey = "aTeamProjects"

export type ProjectType = {
    eid: string;
    type: string;
    title: string;
    jobRole: string;
    description: string;
    logoURL?: string;
    imageURL?: string;
}

function timeout(ms:number=200) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getProjects = async (): Promise<ProjectType[]> => {
    await timeout()
    const localStorageProjects = localStorage.getItem(localStorageProjectsKey)
    if (!localStorageProjects) return initialProjects
    try{
        return JSON.parse(localStorageProjects)
    }
    catch{
        return initialProjects
    }
}

export const updateProjects = async (projects: ProjectType[])=>{
    await timeout()
    return localStorage.setItem(localStorageProjectsKey, JSON.stringify(projects))
}

export const deleteProjectAction = (projectEid: string, projects: ProjectType[] )=>{
    let projectsCopy = [...projects]
    for( var i = 0; i < projectsCopy.length; i++){ 
                                   
        if ( projectsCopy[i].eid === projectEid) { 
            projectsCopy.splice(i, 1); 
            i--; 
        }
    }
    return projectsCopy
}

export const addNewProjectAction = (projects: ProjectType[])=>{
    let projectsCopy = [...projects]
    projectsCopy.unshift({
        eid:uid(24),
        type:"project",
        title:"",
        jobRole:"",
        description:"",
        logoURL:"",
        imageURL:""
    })
    return projectsCopy
}

