import { ProjectErrorType, ProjectType } from "../../controllers/ProjectsController";
import './ProjectsListItem.css';
import { useState } from "react";

interface ProjectsListItemProps {
    project: ProjectType;
    deleteProject: Function;
    updateCurrentProject: Function;
    isEditing: Boolean;
    errors: ProjectErrorType[]
}

function ProjectsListItem({project, deleteProject, updateCurrentProject, isEditing, errors}:ProjectsListItemProps) {
    let defaultBackgroundImgURL = "https://cdn.a.team/static/media/placeholderBG.43070d28.svg"
    const backgroungImgStyle = {
        backgroundImage: `url(${project.imageURL || defaultBackgroundImgURL})`
    }
    const logoStyle = {
        backgroundImage: `url(${project.logoURL})`
    }

    const getProjectError = (field:string)=>{
        const fieldProjectError = errors.find(e=>e.field===field && e.projectEid===project.eid)
        return fieldProjectError
    }
    const [mutableProject, setMutableProject] = useState(project)

    const renderProjectLogoWrapperContent = ()=>{
        if (isEditing || project.logoURL){
            return <div className="project-item-logo-wrapper" style={logoStyle} >
                    {!project.logoURL && <div onClick={()=>alert("not implemented yet")} className="project-item-add-img-btn">+</div>}
                </div>

            }
    }
    const renderProjectImageContent =()=>{
        return <div style={backgroungImgStyle} className="project-item-background flex c al-c">
        {!project.imageURL && isEditing && <div onClick={()=>alert("not implemented yet")} className="project-item-add-img-btn">+</div>}
    </div>
    }
    
    const changeProjectValue = (e:React.FormEvent<HTMLInputElement>|React.FormEvent<HTMLTextAreaElement>)=>{
        const element = e.currentTarget as HTMLInputElement
        updateCurrentProject({...project, [element.id]:element.value})
    }

    const titleError = getProjectError("title")

    return (
        <div className="project-item">
            {renderProjectLogoWrapperContent()}
            {renderProjectImageContent()}
            <form className="project-item-form">
                <div className="project-item-title-wrapper">
                    <input placeholder="Add a project title" disabled={!isEditing} className="project-item-title-input" id="title" onChange={changeProjectValue} value={project.title}/>
                    {titleError && <div className="project-item-title-error">{titleError.msg}</div>}
                </div>
                <textarea
                    onChange={changeProjectValue}
                    className="project-item-description"
                    placeholder="Add a project description"
                    id="description"
                    value={project.description}
                    disabled={!isEditing}
                    />
                <div className="flex h project-item-job-box">
                    <img src="/img/jobIcon.svg" className="project-item-job-icon" alt="jobIcon" />
                    <input placeholder="Add your role" className="project-item-job-input" value={project.jobRole} id="jobRole" onChange={changeProjectValue} disabled={!isEditing}/>
                </div>
                <hr className="project-item-separator"/>
                {isEditing && <img onClick={()=>{deleteProject(project.eid)}} src={"/img/deleteIcon.svg"} className="project-item-delete" alt="deleteProjectIcon" />}
            </form>
    </div>
    );
}

export default ProjectsListItem;
