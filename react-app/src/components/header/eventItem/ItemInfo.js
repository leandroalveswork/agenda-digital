import React, { useEffect, useState } from 'react'
import formatInputDate from '../../../helpers/formatInputDate'
import validateItem from '../../../helpers/validateItem';
import css from '../../css/eventitem.module.css';

export default function ItemInfo({ children, onHandleChangeInput, onHandleEdit, onHandleSaveChanges }) {
    const { editMode, changes } = children

    const startNotif = [
        {
            name: 'title',
            display: false,
            message: 'Campo obrigatório',
            hasTimeout: false,
        },
        {
            name: 'dateTime',
            display: false,
            message: 'Data e hora não podem estar no passado',
            hasTimeout: false,
        }
    ]

    const [notif, setNotif] = useState(Object.assign([], startNotif))

    const [notifCallback, setNotifCallback] = useState(0)

    const [watchNum, setWatchNum] = useState(-1);

    useEffect(() => {
        if (watchNum > -1) {
            let notifMapCopy = notif.map((item, ind) => {
                if (item.display && !item.hasTimeout) {
                    return {
                        name: item.name,
                        display: true,
                        message: item.message,
                        hasTimeout: true
                    }
                } else {
                    return item
                }
            })
            setNotif(notifMapCopy)
            setNotifCallback(setTimeout(() => {
                setNotif(notifMapCopy.map((timeoutItem) => {
                    if (timeoutItem.hasTimeout) {
                        return {
                            name: timeoutItem.name,
                            display: false,
                            message: timeoutItem.message,
                            hasTimeout: false,
                        }
                    } else {
                        return timeoutItem
                    }
                }))
            }, 5000))
        }
        return () => {
            clearTimeout(notifCallback)
        }
    }, [watchNum])

    const handleInputChange = (event) => {
        onHandleChangeInput(children.id, event.target.id, event.target.value);
    }

    const handleClickCancel = () => {
        clearTimeout(notifCallback)
        setNotif(Object.assign([], startNotif))
        onHandleEdit(children.id, false)
    }

    const handleClickSave = () => {
        try {
            validateItem(changes)
            onHandleSaveChanges(children.id)
        } catch(err) {
            let notifCopy = Object.assign([], notif)
            err.forEach(item => {
                if (item === 'title') {
                    notifCopy[0].display = true
                    notifCopy[0].hasTimeout = false
                }
                if (item === 'dateTime') {
                    notifCopy[1].display = true
                    notifCopy[1].hasTimeout = false
                }
            })
            clearTimeout(notifCallback)
            if (notifCopy[0].display && notifCopy[0].hasTimeout) {
                notifCopy[0].display = false
                notifCopy[0].hasTimeout = false
            }
            if (notifCopy[1].display && notifCopy[1].hasTimeout) {
                notifCopy[1].display = false
                notifCopy[1].hasTimeout = false
            }
            setNotif(notifCopy);
            setWatchNum((watchNum + 1) % 100);
        }
    }

    return (
        <div className={css.itemInfoContainer}>
            <div className={css.inputContainer}>
                <input className={css.titleInput} onChange={handleInputChange} value={editMode ? changes.title : children.title} disabled={!editMode} id="title"></input>
            </div>
            {notif[0].display && <div className={css.inputContainer}>
                <div className={css.notifItem}>{notif[0].message}</div>
            </div>}
            <div className={`${css.inputContainer} ${css.breakContainer}`}>
                <label>Apresentador </label>
                <input onChange={handleInputChange} value={editMode ? changes.palestranteName : children.palestranteName} disabled={!editMode} id="palestranteName"></input>
            </div>
            <div className={`${css.inputContainer} ${css.breakContainer}`}>
                <label>Data e hora </label>
                <input className={css.dateInput} onChange={handleInputChange} value={editMode ? formatInputDate(changes.dateTime) : formatInputDate(children.dateTime)} type="datetime-local" disabled={!editMode} id="dateTime"></input>
            </div>
            {notif[1].display && <div className={css.inputContainer}>
                <div className={css.notifItem}>{notif[1].message}</div>
            </div>}
            <div className={css.inputContainer}>
                <label>Local </label>
                <input onChange={handleInputChange} value={editMode ? changes.local : children.local} disabled={!editMode} id="local"></input>
            </div>
            <div className={css.inputContainer}>
                <label>Detalhes </label>
                <textarea rows="3" onChange={handleInputChange} value={editMode ? changes.details : children.details} disabled={!editMode} id="details"></textarea>
            </div>
            {editMode && <div className={css.editBtnsContainer}>
                <button className={css.saveBtn} onClick={handleClickSave}><i className="material-icons">check</i>Salvar</button>
                <button className={css.cancelBtn} onClick={handleClickCancel}><i className="material-icons">clear</i>Cancelar</button>
            </div>}
        </div>
    )
}
