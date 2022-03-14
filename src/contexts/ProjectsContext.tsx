import { createContext } from "react";
import { ProjectType } from "../controllers/ProjectsController";

export type ProjectsContextType = {
    projects: ProjectType[];
    setProjects:(p: ProjectType[]) => void
  }

export const ProjectsContext = createContext<ProjectsContextType>({
    setProjects: ()=>{},
    projects: [] as ProjectType[]
  });