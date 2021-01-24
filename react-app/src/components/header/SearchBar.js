import React from 'react'
import css from '../css/header.module.css'

export default function SearchBar({filterVal, onFilterChange}) {
    
    const handleInputChange = (event) => {
        onFilterChange(event.target.value);
    }

    return (
        <div className={css.searchInput}>
            <input type="text" value={filterVal} onChange={handleInputChange} />
            <i className="material-icons">search</i>
        </div>
    )
}
