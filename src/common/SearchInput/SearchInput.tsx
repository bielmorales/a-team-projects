import { InputAdornment, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import "./SearchInput.css"

interface SearchInputProps {
    setSearchFilter: Function;
    searchFilter: string;
    isEditing: boolean;
}

function SearchInput({setSearchFilter, searchFilter, isEditing}:SearchInputProps) {
    // This is just a example of how i would be using material ui to build the ui
    // I don't think that in this project you should use it, specially because the card ui that doesnt follow the material pattern
    const cleanFilter = ()=>{
      setSearchFilter("")
    }
    const cursorStyle = { cursor:"pointer" }
  
    return (
        <TextField 
            color="warning"
            disabled={isEditing}
            InputProps={{
                startAdornment: (
                    <InputAdornment onClick={cleanFilter} position="start" style={cursorStyle}>
                        <CloseIcon/>
                    </InputAdornment>
                )
            }}
            value={searchFilter} size="small" fullWidth onChange={(e)=>setSearchFilter(e.target.value)} label="Search for projects" variant="outlined" />
    );
}

export default SearchInput;
