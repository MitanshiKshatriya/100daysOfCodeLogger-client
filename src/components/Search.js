import React from 'react'
import { MdSearch } from "react-icons/md"

const Search = ({handleSearchLog}) => {
    return (
        <div className="search container2">
        <MdSearch className="search-icons" size="1.3em"/>
            <input
            onChange={(e)=>{handleSearchLog(e.target.value)}}
             type="text" name="search"/>
        </div>
    )
}

export default Search
