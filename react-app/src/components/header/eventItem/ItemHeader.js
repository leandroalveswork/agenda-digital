import React from 'react'
import css from '../../css/eventitem.module.css';

export default function ItemHeader({ children }) {
    return (
        <div className={css.personContainer}>
            <h4>{children.title}</h4>
            <div className={css.person}>
                <i className="material-icons">person</i>
                <p>{children.palestranteName}</p>
            </div>
        </div>
    )
}
