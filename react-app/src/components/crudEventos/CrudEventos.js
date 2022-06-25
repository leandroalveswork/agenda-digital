import React, { useEffect, useState } from 'react'
import { itemsInPortuguese, toDateHourValue_LocalTimezone, toDateValue_UtcTimezone, toDisplayedDate_LocalTimezone, valorInformado } from '../../helpers/format'
import Table from '../table/Table'
import { eventosFake } from './dadosfake/eventosFake'
import './CrudEventos.css'
import { increaseTimezoneOffset } from '../../helpers/timezone'
import OrdenadorPorString from '../../helpers/ordenador/ordenadorPorString'
import OrdenadorPorData from '../../helpers/ordenador/ordenadorPorData'
import ModalConfirm from '../modalconfirm/ModalConfirm'
import { message } from '../../helpers/message'
import EnFormSalvarEvento from './FormSalvarEvento/EnFormSalvarEvento'
import ModalAlert from '../modalalert/ModalAlert'

export default function CrudEventos() {
    const [exibirFiltros, setExibirFiltros] = useState(true)
    const [filtroEvento, setFiltroEvento] = useState('')
    const [filtroApresentador, setFiltroApresentador] = useState('')
    const [filtroData, setFiltroData] = useState(null)
    const [listaEventos, setListaEventos] = useState(eventosFake)
    const [idEventoARemover, setIdEventoARemover] = useState(0)
    const [modalConfirmEstaAberto, setModalConfirmEstaAberto] = useState(false)
    const [codeEnFormSalvarEvento, setCodeEnFormSalvarEvento] = useState(EnFormSalvarEvento.Hidden.code)
    const payloadEventoInicial = {
        id: 0,
        nome: ``,
        nomeApresentador: ``,
        hora: null,
        resumoLocal: ``,
        detalhes: ``
    }
    const [payloadEvento, setPayloadEvento] = useState({ ...payloadEventoInicial })
    const [modalAlertEstaAberto, setModalAlertEstaAberto] = useState(false)
    const [mensagemModalAlert, setMensagemModalAlert] = useState('')
    const [deveRedirecionarIndex, setDeveRedirecionarIndex] = useState(false)

    const calcListaFiltrada = () => {
        return listaEventos
            .filter(x => (!valorInformado(filtroEvento) || x.nome.trim().toUpperCase().indexOf(filtroEvento.trim().toUpperCase()) != -1)
                && (!valorInformado(filtroApresentador) || x.nomeApresentador.trim().toUpperCase().indexOf(filtroApresentador.trim().toUpperCase()) != -1)
                && (filtroData == null || filtroData == undefined || filtroData == '' || toDisplayedDate_LocalTimezone(x.hora) == toDisplayedDate_LocalTimezone(increaseTimezoneOffset(filtroData))))
    }

    let listaFiltrada = calcListaFiltrada()
    useEffect(() => {
        listaFiltrada = calcListaFiltrada()
    }, [filtroEvento, filtroApresentador, filtroData, listaEventos])

    const removerEvento = () => {
        let listaEventosComEventoRemovido = listaEventos.filter(x => x.id !== idEventoARemover)
        setListaEventos(listaEventosComEventoRemovido)
        setMensagemModalAlert(message.events.successRemoved)
        setDeveRedirecionarIndex(true)
        setModalAlertEstaAberto(true)
    }

    const salvarEvento = () => {
        let nomeCamposNaoPreenchidos = []
        if (!valorInformado(payloadEvento.nome)) {
            nomeCamposNaoPreenchidos.push('Evento')
        }
        if (payloadEvento.hora == null || payloadEvento.hora == undefined || payloadEvento.hora == '') {
            nomeCamposNaoPreenchidos.push('Data e Hora')
        }
        if (nomeCamposNaoPreenchidos.length > 0) {
            setMensagemModalAlert(`É necessário informar: ${itemsInPortuguese(nomeCamposNaoPreenchidos)}.`)
            setDeveRedirecionarIndex(false)
            setModalAlertEstaAberto(true)
            return
        }
        if (codeEnFormSalvarEvento === EnFormSalvarEvento.New.code) {
            let proximoId = listaEventos.reduce((prev, cur) => Math.max(prev, cur.id), 1) + 1
            let payloadEventoPush = { ...payloadEvento }
            payloadEventoPush.id = proximoId
            payloadEventoPush.hora = new Date(payloadEvento.hora)
            let listaEventosComEventoInserido = listaEventos.concat([ { ...payloadEventoPush } ])
            console.log(payloadEventoPush)
            setListaEventos(listaEventosComEventoInserido)
            setMensagemModalAlert(message.events.successCreated)
            setDeveRedirecionarIndex(true)
            setModalAlertEstaAberto(true)
            return
        }
        let payloadEventoEdit = { ...payloadEvento }
        payloadEventoEdit.hora = new Date(payloadEvento.hora)
        let listaEventosComEventoAlterado = listaEventos
            .filter(x => x.id !== payloadEventoEdit.id)
            .concat([ { ...payloadEventoEdit } ])
        setListaEventos(listaEventosComEventoAlterado)
        setMensagemModalAlert(message.events.successEdited)
        setDeveRedirecionarIndex(true)
        setModalAlertEstaAberto(true)
    }   

    return (
        <main className="d-flex flex-column align-items-end p-3">
            {codeEnFormSalvarEvento == EnFormSalvarEvento.Hidden.code && <div className='w-100 mb-3 p-1 bg-nav row g-0'>
                <h5 className='fw-bold p-1 d-flex justify-content-between'>
                    <span>Filtros</span>
                    <button onClick={() => setExibirFiltros(!exibirFiltros)} className='borderless-btn' >
                        <i className="material-icons">{exibirFiltros ? 'expand_more' : 'chevron_left'}</i>
                    </button>
                </h5>
                {exibirFiltros && <div class='col-12 col-sm-6 col-md-4 d-flex flex-column p-1'>
                    <label>Evento</label>
                    <input
                        value={filtroEvento}
                        onChange={e => setFiltroEvento(e.target.value)} />
                </div>}
                {exibirFiltros && <div class='col-12 col-sm-6 col-md-4 d-flex flex-column p-1'>
                    <label>Apresentador</label>
                    <input
                        value={filtroApresentador}
                        onChange={e => setFiltroApresentador(e.target.value)} />
                </div>}
                {exibirFiltros && <div class='col-6 col-sm-4 col-md-3 d-flex flex-column p-1'>
                    <label>Data</label>
                    <input type="date"
                        value={toDateValue_UtcTimezone(filtroData)}
                        onChange={e => setFiltroData(e.target.valueAsDate)} />
                </div>}
            </div>}
            {codeEnFormSalvarEvento == EnFormSalvarEvento.Hidden.code && <Table
                fieldList={[ "Evento", "Apresentador", "Data" ]}
                ordenadoresList={[new OrdenadorPorString(), new OrdenadorPorString(), new OrdenadorPorData()]}
                comparableResultList={listaFiltrada.map(x => {
                    return {
                        id: x.id,
                        Evento: x.nome.trim(),
                        Apresentador: x.nomeApresentador.trim(),
                        Data: x.hora
                    }
                })}
                resultList={listaFiltrada.map(x => {
                    return {
                        id: x.id,
                        Evento: x.nome.trim(),
                        Apresentador: x.nomeApresentador.trim(),
                        Data: toDisplayedDate_LocalTimezone(new Date(x.hora)),
                        clickEditCallback: () => {
                            setCodeEnFormSalvarEvento(EnFormSalvarEvento.Edit.code)
                            setPayloadEvento({ ...x })
                        },
                        clickRemoveCallback: () => {
                            setIdEventoARemover(x.id)
                            setModalConfirmEstaAberto(true)
                        }
                    }
                })}
                resultsShownCount={5} />}
            {codeEnFormSalvarEvento == EnFormSalvarEvento.Hidden.code && <div>
                <button className='text-white d-flex align-items-end p-2 borderless-btn bg-ag-success-important' onClick={() => {
                    setCodeEnFormSalvarEvento(EnFormSalvarEvento.New.code)
                    setPayloadEvento({ ...payloadEventoInicial })
                }}>
                    <i className="material-icons pe-2">add</i> Novo Evento
                </button>
            </div>}
            {(codeEnFormSalvarEvento == EnFormSalvarEvento.New.code || codeEnFormSalvarEvento == EnFormSalvarEvento.Edit.code) && <div className='d-flex flex-column align-items-end w-100'>
                <div className='w-100 mb-3 p-1 bg-nav row g-0'>
                    <h5 className='fw-bold p-1'>{codeEnFormSalvarEvento == EnFormSalvarEvento.New.code ? 'Novo Evento' : 'Alterar Evento'}</h5>
                    <div class='col-12 col-sm-6 col-md-4 d-flex flex-column p-1'>
                        <label>Evento</label>
                        <input
                            value={payloadEvento.nome}
                            onChange={e => {
                                let changedPayload = { ...payloadEvento }
                                changedPayload.nome = e.target.value
                                setPayloadEvento(changedPayload)
                            }} />
                    </div>
                    <div class='col-12 col-sm-6 col-md-4 d-flex flex-column p-1'>
                        <label>Apresentador</label>
                        <input
                            value={payloadEvento.nomeApresentador}
                            onChange={e => {
                                let changedPayload = { ...payloadEvento }
                                changedPayload.nomeApresentador = e.target.value
                                setPayloadEvento(changedPayload)
                            }} />
                    </div>
                    <div class='col-12 col-sm-6 col-md-4 d-flex flex-column p-1'>
                        <label>Data e Hora</label>
                        <input type="datetime-local"
                            value={toDateHourValue_LocalTimezone(payloadEvento.hora)}
                            onChange={e => {
                                let changedPayload = { ...payloadEvento }
                                changedPayload.hora = e.target.value
                                setPayloadEvento(changedPayload)
                            }} />
                    </div>
                    <div class='col-12 col-sm-6 col-md-4 d-flex flex-column p-1'>
                        <label>Resumo Local</label>
                        <input
                            value={payloadEvento.resumoLocal}
                            onChange={e => {
                                let changedPayload = { ...payloadEvento }
                                changedPayload.resumoLocal = e.target.value
                                setPayloadEvento(changedPayload)
                            }} />
                    </div>
                    <div class='col-12 d-flex flex-column p-1'>
                        <label>Detalhes</label>
                        <textarea
                            rows={3}
                            value={payloadEvento.detalhes}
                            onChange={e => {
                                let changedPayload = { ...payloadEvento }
                                changedPayload.detalhes = e.target.value
                                setPayloadEvento(changedPayload)
                            }}></textarea>
                    </div>
                </div>
                <div className='d-flex'>
                    <button className='bg-ag-success-important text-white d-flex align-items-end p-2 borderless-btn' onClick={() => { salvarEvento() }}>
                        <i className="material-icons pe-2">check</i> Salvar
                    </button>
                    <button className='bg-ag-error-important text-white d-flex align-items-end p-2 ms-3 borderless-btn' onClick={() => {
                        setCodeEnFormSalvarEvento(EnFormSalvarEvento.Hidden.code)
                    }}>
                        <i className="material-icons pe-2">close</i> Cancelar
                    </button>
                </div>
            </div>}
            <ModalConfirm
                titulo={ message.warning }
                mensagemConfirmar={ message.events.removeConfirm }
                callbackConfirm={removerEvento}
                showState={modalConfirmEstaAberto}
                setShowState={setModalConfirmEstaAberto} />
            <ModalAlert
                titulo={ message.warning }
                mensagemAlert={ mensagemModalAlert }
                showState={modalAlertEstaAberto}
                setShowState={setModalAlertEstaAberto}
                hideCallback={() => {
                    if (deveRedirecionarIndex) {
                        setDeveRedirecionarIndex(false)
                        setCodeEnFormSalvarEvento(EnFormSalvarEvento.Hidden.code)
                    }
                }} />
        </main>
    )
}