import React from 'react'
import EventItem from './eventItem/EventItem';
import css from '../css/schedule.module.css';

export default function Schedule(props) {
    const {children,
        onClickNew,
        onHandleDetails,
        onClickWipeAll,
        onHandleEdit,
        onHandleDelete,
        onHandleSaveChanges,
        onHandleChangeInput } = props

    const handleClickNew = () => {
        onClickNew(true)
    }

    const handleClickWipe = () => {
        onClickWipeAll(true)
    }

    return (
        <section>
            <ul>
                {children.map(item => {
                    return (
                        <EventItem
                            key={item.id}
                            onHandleDetails={onHandleDetails}
                            onHandleEdit={onHandleEdit}
                            onHandleDelete={onHandleDelete}
                            onHandleSaveChanges={onHandleSaveChanges}
                            onHandleChangeInput={onHandleChangeInput}>
                                {item}
                        </EventItem>
                    );
                })}
                <div className={css.btnContainer}>
                    <button onClick={handleClickNew} className={css.newAddWindow}><div><i className="material-icons">add</i> MARCAR NOVO EVENTO</div></button>
                    <button onClick={handleClickWipe} className={css.wipeWarnBtn}><div><i className="material-icons">delete</i> LIMPAR TUDO</div></button>
                </div>
            </ul>
        </section>
    )
}
