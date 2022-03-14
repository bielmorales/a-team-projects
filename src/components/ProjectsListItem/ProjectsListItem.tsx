import { Box, Button, TextField } from "@mui/material";
import { ProjectType } from "../../controllers/ProjectsController";
import './ProjectsListItem.css';
import jobIcon from '../../midia/jobIcon.svg';
import deleteIcon from '../../midia/deleteIcon.svg';
import { useState } from "react";


interface ProjectsListItemProps {
    project: ProjectType;
    deleteProject: Function;
    updateCurrentProject: Function;
    isEditing: Boolean;
}
function ProjectsListItem({project, deleteProject, updateCurrentProject, isEditing}:ProjectsListItemProps) {
    let defaultBackgroundImgURL = "https://cdn.a.team/static/media/placeholderBG.43070d28.svg"
    const backgroungImgStyle = {
        backgroundImage: `url(${project.imageURL || defaultBackgroundImgURL})`
    }
    const logoStyle = {
        backgroundImage: `url(${project.logoURL})`
    }
    const [mutableProject, setMutableProject] = useState(project)

    const renderProjectLogoWrapperContent = ()=>{
        if (isEditing || project.logoURL){
            return <div className="project-item-logo-wrapper" style={logoStyle} >
                    {!project.logoURL && <div onClick={()=>alert("not implemented yet")} className="project-item-add-logo-btn">+</div>}
                </div>

            }
    }
    
    const changeProjectValue = (e:React.FormEvent<HTMLInputElement>|React.FormEvent<HTMLTextAreaElement>)=>{
        const element = e.currentTarget as HTMLInputElement
        updateCurrentProject({...project, [element.id]:element.value})
    }
    

    return (
        <div className="project-item">
            {renderProjectLogoWrapperContent()}
            <div style={backgroungImgStyle} className="project-item-background"/>
            <form className="project-item-form">
                <input placeholder="Add a project title" disabled={!isEditing} className="project-item-title-input" id="title" onChange={changeProjectValue} value={project.title}/>
                <textarea
                    onChange={changeProjectValue}
                    className="project-item-description"
                    placeholder="Add a project description"
                    id="description"
                    value={project.description}
                    disabled={!isEditing}
                    />
                <div className="flex h project-item-job-box">
                    <img src={jobIcon} className="project-item-job-icon" alt="jobIcon" />
                    <input placeholder="Add your role" className="project-item-job-input" value={project.jobRole} id="jobRole" onChange={changeProjectValue} disabled={!isEditing}/>
                </div>
                <hr className="project-item-separator"/>
                <img onClick={()=>{deleteProject(project.eid)}} src={deleteIcon} className="project-item-delete" alt="deleteProjectIcon" />
            </form>
    </div>
    );
}

export default ProjectsListItem;
