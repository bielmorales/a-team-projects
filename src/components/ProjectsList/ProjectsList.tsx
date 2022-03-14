import { useContext, useEffect, useState } from "react";
import { ProjectsContext } from "../../contexts/ProjectsContext";
import { SearchContext } from "../../contexts/SearchContext";
import { addNewProjectAction, deleteProjectAction, ProjectType } from "../../controllers/ProjectsController";
import ProjectsListItem from "../ProjectsListItem/ProjectsListItem";
import "./ProjectsList.css"

interface ProjectsListProps {
    isEditing: Boolean;
}

function ProjectsList({ isEditing }:ProjectsListProps) {
    const { projects, setProjects } = useContext(ProjectsContext)
    const deleteProject = async (projectEid:string)=>{
        const updatedProjects = deleteProjectAction(projectEid, projects)
        setProjects(updatedProjects)
    }
    const { searchFilter } = useContext(SearchContext)
    // usar useEffect pra garantir que os projetos só vão atualizar quando o searchFilter atualizar
    const updateCurrentProject = async (project: ProjectType)=>{
        const updatedProjects = projects.map(currentProject=>{
            if (currentProject.eid === project.eid){
                return project
            }
            else {
                return currentProject
            }

        }) 
        setProjects(updatedProjects)

    }

    const addNewProject = ()=>{
        const updatedProjects = addNewProjectAction(projects)
        setProjects(updatedProjects)
    }

    const renderAddNewProject =()=>{
        if (isEditing){
            return <button onClick={addNewProject}className="add-project-button">Add project</button>
        }
    }
    const filteredProjects = projects.filter(p=>p.title.toLowerCase().includes(searchFilter.toLowerCase()))
    return (
        <>
            <div className="title-add-project-wrapper flex sa">
                <h2 >Projects</h2>
                {renderAddNewProject()}
            </div>
            <div className="projects-list flex">

                {filteredProjects.map(project=>{
                    return <ProjectsListItem updateCurrentProject={updateCurrentProject} isEditing={isEditing} project={project} key={project.eid} deleteProject={deleteProject}/>
                })}
        </div>
        </>
    )
}

export default ProjectsList;
