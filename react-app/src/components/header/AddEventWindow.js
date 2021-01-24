import React, { useEffect, useState } from 'react'
import validateItem from '../../helpers/validateItem'
import PostItemInfo from './PostItemInfo'
import css from '../css/window.module.css'


export default function AddEventWindow({ onClickClose, children, onChangeInput, onPostEvent }) {
    const [notif, setNotif] = useState(
        [
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
    )

    const [notifCallback, setNotifCallback] = useState(0);

    const [watchNum, setWatchNum] = useState(-1);

    useEffect(() => {
        if (watchNum > -1) {
            let notifMapCopy = notif.map((item) => {
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
    
    const handlePostClick = () => {
        try {
            validateItem(children)
            onPostEvent()
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

    const handleClickClose = () => {
        onClickClose(false)
    }

    return (
        <div className={css.postOverlay}>
            <div className={css.windowContainer}>
                <div className={css.topWindow}>
                    <h3>{children.title || "Novo"}</h3>
                    <button onClick={handleClickClose}><i className="material-icons">close</i></button>
                </div>
                <div className={css.bodyWindow}>
                    <PostItemInfo onChangeInput={onChangeInput} notifProp={notif}>{children}</PostItemInfo>
                    <button className={css.newAddWindow} onClick={handlePostClick}><i className="material-icons">add</i> MARCAR EVENTO</button>
                </div>
            </div>
        </div>
    )
}
