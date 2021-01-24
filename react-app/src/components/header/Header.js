import React from 'react'
import SearchBar from './SearchBar'
import css from '../css/header.module.css'

export default function Header({filterVal, onFilterChange}) {
    return (
        <div>
            <header className={css.under}>
                <h2>_</h2>
            </header>
            <header>
                <div></div>
                <h2>Agenda</h2>
                <SearchBar filterVal={filterVal} onFilterChange={onFilterChange}/>
            </header>
        </div>
    )
}
