import React from 'react'
import { Modal } from 'react-bootstrap'
import './ModalAlert.css'

export default function ModalAlert({ titulo, mensagemAlert, showState, setShowState, hideCallback }) {
    return (
        <Modal show={showState} onHide={() => {
            setShowState(false)
            hideCallback()
        }}>
            <Modal.Header closeButton>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{mensagemAlert}</Modal.Body>
            <Modal.Footer>
                <button className='bg-nav-important borderless-btn p-2 text-white min-width-btn-common' onClick={() => {
                    setShowState(false)
                    hideCallback()
                }}>
                    Ok
                </button>
            </Modal.Footer>
        </Modal>
    )
}
