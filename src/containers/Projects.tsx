import { useEffect, useState } from 'react';
import './Projects.css';
import { getProjects, ProjectErrorType, ProjectType, updateProjects } from '../controllers/ProjectsController';
import ProjectsList from '../components/ProjectsList/ProjectsList';
import { SearchContext } from '../contexts/SearchContext';
import ProjectsHeader from '../components/ProjectsHeader/ProjectsHeader';
import { ProjectsContext } from '../contexts/ProjectsContext';
import Loading from '../common/Loading/Loading';

function Projects() {
  const [projects, setProjects] = useState([] as ProjectType[])
  const [isEditing, setIsEditing] = useState(false)
  const [searchFilter, setSearchFilter] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([] as ProjectErrorType[])
  
  useEffect(() => {
    document.title = "A-team Projects"
    const fetchData = async () => {
      setLoading(true)
      const projectsData = await getProjects()
      setProjects(projectsData)
      setLoading(false)
    };
    fetchData();
  },[]);
  const toogleEditMode= async ()=>{
    let validationErrors = [] as ProjectErrorType[]
    setLoading(true)
    if (isEditing){
      projects.forEach(p=>{
        if (!p.title){
          validationErrors.push({
            projectEid: p.eid,
            msg: "Please set a project title",
            field: "title"
          })
        }
      })
      if (!validationErrors.length){
        
        await updateProjects(projects)
        setIsEditing(!isEditing)
      }
      setErrors(validationErrors)
    }
    else{
      setIsEditing(!isEditing)
      setSearchFilter("")
    }
    setLoading(false)

  }

  return (
    <div className="projects">
      <SearchContext.Provider value={{setSearchFilter, searchFilter}}>
        {loading && <Loading/>}
        <ProjectsContext.Provider value={{setProjects, projects, errors, setErrors}}>
          <ProjectsHeader isEditing={isEditing} toogleEditMode={toogleEditMode}/>
          <ProjectsList isEditing={isEditing}/>
        </ProjectsContext.Provider>
      </SearchContext.Provider>
    </div>
  );
}

export default Projects;
