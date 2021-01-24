import React from 'react'
import formatInputDate from '../../helpers/formatInputDate';
import css from '../css/window.module.css';

export default function PostItemInfo({ children, onChangeInput, notifProp }) {

    const handleInputChange = (event) => {
        onChangeInput(event.target.id, event.target.value);
    }

    return (
        <div className={css.itemInfoContainer}>
            <div className={css.inputContainer}>
                <input onChange={handleInputChange} value={children.title} id="title"></input>
            </div>
            {notifProp[0].display && <div className={css.inputContainer}>
                <div className={css.notifItem}>{notifProp[0].message}</div>
            </div>}
            <div className={`${css.inputContainer} ${css.breakContainer}`}>
                <label>Apresentador </label>
                <input onChange={handleInputChange} value={children.palestranteName} id="palestranteName"></input>
            </div>
            <div className={`${css.inputContainer} ${css.breakContainer}`}>
                <label>Data e hora </label>
                <input className={css.dateInput} onChange={handleInputChange} value={formatInputDate(children.dateTime)} type="datetime-local" id="dateTime"></input>
            </div>
            {notifProp[1].display && <div className={css.inputContainer}>
                <div className={css.notifItem}>{notifProp[1].message}</div>
            </div>}
            <div className={css.inputContainer}>
                <label>Local </label>
                <input onChange={handleInputChange} value={children.local} id="local"></input>
            </div>
            <div className={css.inputContainer}>
                <label>Detalhes </label>
                <textarea rows="3" onChange={handleInputChange} value={children.details} id="details"></textarea>
            </div>
        </div>
    )
}
