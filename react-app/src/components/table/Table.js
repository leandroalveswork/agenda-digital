import React, { useEffect } from 'react'
import { useState } from "react";
import './Table.css'

export default function Table({ fieldList, ordenadoresList, resultList, comparableResultList, resultsShownCount }) {
    const [page, setPage] = useState(1)
    const [orderByColumnIndex, setOrderByColumnIndex] = useState(0)
    const [orderByIsAscending, setOrderByIsAscending] = useState(true)
    
    const updateOrderBy = (index) => {
        if (index !== orderByColumnIndex) {
            setOrderByColumnIndex(index)
            setOrderByIsAscending(true)
            return
        }
        setOrderByIsAscending(!orderByIsAscending)
    }

    const calcPagesTotal = () => {
        return Math.max(Math.ceil(resultList.length / resultsShownCount), 1)
    }
    const calcResultsShown = () => {
        let resultsSkippedCount = ((page - 1) * resultsShownCount)
        let resultsNextPageSkipsCount = (page * resultsShownCount)
        let fieldSortName = fieldList[orderByColumnIndex]
        let ordenadorField = ordenadoresList[orderByColumnIndex]
        let resultsShownRetorno = []
        let comparableResultsShown = comparableResultList
            .sort((a, b) => orderByIsAscending ? ordenadorField.ordenarCrescente(a[fieldSortName], b[fieldSortName]) : ordenadorField.ordenarDecrescente(a[fieldSortName], b[fieldSortName]))
            .filter((x, index) => index + 1 > resultsSkippedCount && index + 1 <= resultsNextPageSkipsCount)
        comparableResultsShown.forEach(element => {
            let resultShown = resultList.find(x => x.id === element.id)
            if (resultShown != undefined) {
                resultsShownRetorno.push(resultShown)
            }
        })
        return resultsShownRetorno
    }

    let pagesTotal = calcPagesTotal()
    useEffect(() => {
        pagesTotal = calcPagesTotal()
    }, [resultList])
    let resultsShown = calcResultsShown()
    useEffect(() => {
        resultsShown = calcResultsShown()
    }, [orderByColumnIndex, orderByIsAscending, resultList])

    return (
        <div className='w-100 mb-3'>
            <div className='overflow-x-scroll'>
                <table className='overflow-x-hidden w-100'>
                    <thead>
                        <tr>
                            {fieldList.map((x, index) => (
                                <th key={x} className={'border-2 th-button min-width-sort-' + ordenadoresList[index].getLabelCss()}>
                                    <button className='p-1 w-100 h-100 d-flex align-items-end justify-content-center fw-bold borderless-btn' onClick={() => updateOrderBy(index)}>{x}
                                        {index === orderByColumnIndex && <i className="material-icons">{orderByIsAscending ? `arrow_drop_up` : `arrow_drop_down`}</i>}
                                    </button>
                                </th>
                            ))}
                            <th className='text-center'>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultsShown.map(x => (
                            <tr key={x.id} className="bg-white border-2 border-start-0 border-end-0 border-top-0">
                                {fieldList.map(y => (
                                    <td key={x.id + `` + y} className="p-1">{x[y]}</td>
                                ))}
                                <td className="p-1 d-flex align-items-end justify-content-around">
                                    <button className='p-1 d-flex align-items-end justify-content-center fw-bold borderless-btn' onClick={() => x.clickEditCallback()}>
                                        <i className="material-icons">edit</i>
                                    </button>
                                    <button className='p-1 d-flex align-items-end justify-content-center fw-bold borderless-btn' onClick={() => x.clickRemoveCallback()}>
                                        <i className="material-icons">delete</i>
                                    </button>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='d-flex flex-column align-items-end '>
                <table className='mt-3'>
                    <tr>
                        <th className={page === 1 ? 'invisible' : 'border-2 th-button'}>
                            <button className='p-1 w-100 h-100 d-flex align-items-end justify-content-center fw-bold borderless-btn' disabled={page === 1} onClick={() => setPage(page - 1)}>
                                <i className='material-icons'>chevron_left</i>
                            </button>
                        </th>
                        <th className='p-1'>Página {page} de {pagesTotal}</th>
                        <th className={page === pagesTotal ? 'invisible' : 'border-2 th-button'}>
                            <button className='p-1 w-100 h-100 d-flex align-items-end justify-content-center fw-bold borderless-btn' disabled={page === pagesTotal} onClick={() => setPage(page + 1)}>
                                <i className='material-icons'>chevron_right</i>
                            </button>
                        </th>
                    </tr>
                </table>
            </div>
        </div>
    )
}