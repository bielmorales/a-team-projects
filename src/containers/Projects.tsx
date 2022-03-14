import { useEffect, useState } from 'react';
import './Projects.css';
import { getProjects, ProjectType, updateProjects } from '../controllers/ProjectsController';
import ProjectsList from '../components/ProjectsList/ProjectsList';
import { SearchContext } from '../contexts/SearchContext';
import ProjectsHeader from '../components/ProjectsHeader/ProjectsHeader';
import { ProjectsContext } from '../contexts/ProjectsContext';

function Projects() {
  const [projects, setProjects] = useState([] as ProjectType[])
  const [isEditing, setIsEditing] = useState(false)
  const [searchFilter, setSearchFilter] = useState("")
  
  useEffect(() => {
    document.title = "A-team Projects"
    const fetchData = async () => {
    const projectsData = await getProjects()
      setProjects(projectsData)
    };
    fetchData();
  },[]);
  const toogleEditMode=()=>{
    let titleValidation = true
    if (isEditing){
      projects.forEach(p=>{
        if (!p.title){
          titleValidation = false
        }
      })
      if (titleValidation){
        updateProjects(projects)
        setIsEditing(!isEditing)
      }
      else{
        alert("Preencha o titulo do seu projeto")
      }
    }
    else{
      setIsEditing(!isEditing)
      setSearchFilter("")
    }
  }

  return (
    <div className="projects">
      <SearchContext.Provider value={{setSearchFilter, searchFilter}}>
        <ProjectsContext.Provider value={{setProjects, projects}}>
          <ProjectsHeader isEditing={isEditing} toogleEditMode={toogleEditMode}/>
          <ProjectsList isEditing={isEditing}/>
        </ProjectsContext.Provider>
      </SearchContext.Provider>
    </div>
  );
}

export default Projects;
