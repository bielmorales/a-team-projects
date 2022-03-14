import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import "./SearchInput.css"

interface SearchInputProps {
    setSearchFilter: Function;
    searchFilter: string;
    isEditing: boolean;
}

function SearchInput({setSearchFilter, searchFilter, isEditing}:SearchInputProps) {
    const cleanFilter = ()=>{
      setSearchFilter("")
    }
    const cursorStyle = { cursor:"pointer" }
  
    return (
        <form className="search-form">
            {/* <input value={textSearch} onChange={(e)=>setTextSearch(e.target.value)} placeholder="search"/> */}
            <TextField 
                color="warning"
                disabled={isEditing}
                InputProps={{
                    startAdornment: (
                        <InputAdornment onClick={cleanFilter} position="start" style={cursorStyle}>
                            <CloseIcon/>
                        </InputAdornment>
                    ),
                    // endAdornment: (
                    //     <InputAdornment onClick={search} position="end" style={cursorStyle}>
                    //         <SearchIcon/>
                    //     </InputAdornment>
                    // ),
                }}
                value={searchFilter} size="small" fullWidth onChange={(e)=>setSearchFilter(e.target.value)} label="Search for projects" variant="outlined" />
        </form>
    );
}

export default SearchInput;
