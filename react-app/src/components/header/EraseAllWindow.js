import React from 'react';
import css from '../css/window.module.css'

export default function EraseAllWindow({ onClickContinue, onClickClose }) {
    const handleClickClose = () => {
        onClickClose(false);
    }

    return (
        <div>
            <div className={css.overlay}>
                <div className={css.windowWarnContainer}>
                    <p>Tem certeza de que deseja apagar toda a agenda?</p>
                    <div className={css.wipeBtnsContainer}>
                        <button className={css.wipeBtnYes} onClick={onClickContinue}>Sim</button>
                        <button className={css.wipeBtnNo}onClick={handleClickClose}>Não</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
