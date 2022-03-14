import { useContext} from 'react';
import './ProjectsHeader.css';
import logo from '../../midia/logo.svg';
import { SearchContext } from '../../contexts/SearchContext';
import SearchInput from '../../common/SearchInput';

interface ProjectsListItemProps {
  isEditing: boolean;
  toogleEditMode: Function;
}

function ProjectsHeader({isEditing, toogleEditMode}:ProjectsListItemProps) {
  const {setSearchFilter, searchFilter} = useContext(SearchContext)
  return (
    <div className='projects-header flex h c'>
      <img src={logo} className="a-team-logo" alt="logo" />
      <SearchInput setSearchFilter={setSearchFilter} isEditing={isEditing} searchFilter={searchFilter}/>
      <button className="projects-header-edit-button" onClick={()=>toogleEditMode()}> {isEditing ? "Save": "Edit"}</button>
    </div>
  );
}

export default ProjectsHeader;
