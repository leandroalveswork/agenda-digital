import React from 'react'
import formatNumber from '../../../helpers/formatNumber';
import ItemHeader from './ItemHeader';
import ItemInfo from './ItemInfo';
import css from '../../css/eventitem.module.css';

export default function EventItem({ children, onHandleDetails, onHandleEdit, onHandleDelete, onHandleSaveChanges, onHandleChangeInput }) {
    const { dateTime } = children;

    const handleShowDetails = () => {
        onHandleDetails(children.id, true)
    }

    const handleHideDetails = () => {
        onHandleDetails(children.id, false)
    }

    const handleClickEdit = () => {
        onHandleEdit(children.id, true)
    }

    const handleClickDelete = () => {
        onHandleDelete(children.id)
    }

    return (
        <li className={css.eventItemLi}>
            <div className={css.startFlex}>
                {!children.expanded && <button onClick={handleShowDetails} className={css.showDetails}><i className="material-icons">keyboard_arrow_right</i></button>}
                {children.expanded && <button onClick={handleHideDetails} className={css.showDetails}><i className="material-icons">keyboard_arrow_down</i></button>}
                <div className={css.dateMini}>{formatNumber(dateTime.getDate())}/{formatNumber(dateTime.getMonth() + 1)} </div>
            </div>
            <div className={css.fillUp}></div>
            <div className={css.endFlex}>
                <button onClick={handleClickEdit} className={css.edit}><i className="material-icons">create</i></button>
                <button onClick={handleClickDelete} className={css.close}><i className="material-icons">close</i></button>
            </div>
            <div className={css.midFlex}>
                {!children.expanded && <ItemHeader>{children}</ItemHeader>}
                {children.expanded && <ItemInfo
                    onHandleChangeInput={onHandleChangeInput}
                    onHandleEdit={onHandleEdit}
                    onHandleSaveChanges={onHandleSaveChanges}>
                        {children}
                </ItemInfo>}
            </div>
        </li>
    )
}
