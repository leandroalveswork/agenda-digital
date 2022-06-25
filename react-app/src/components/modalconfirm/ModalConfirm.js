import React from 'react'
import { Modal } from 'react-bootstrap'
import './ModalConfirm.css'

export default function ModalConfirm({ titulo, mensagemConfirmar, callbackConfirm, showState, setShowState }) {
    return (
        <Modal show={showState} onHide={() => { setShowState(false) }}>
            <Modal.Header closeButton>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{mensagemConfirmar}</Modal.Body>
            <Modal.Footer>
                <button className='bg-ag-success-important p-2 text-white min-width-btn-common borderless-btn' onClick={() => {
                    callbackConfirm()
                    setShowState(false)
                }}>
                    Sim
                </button>
                <button className='bg-ag-error-important p-2 text-white min-width-btn-common borderless-btn' onClick={() => { setShowState(false)}}>
                    Não
                </button>
            </Modal.Footer>
        </Modal>
    )
}