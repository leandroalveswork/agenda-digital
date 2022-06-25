import BaseOrdenador from "./baseOrdenador"

export default class OrdenadorPorNumero extends BaseOrdenador {

    ordenarCrescente = (a, b) => {
        return a - b
    }
    ordenarDecrescente = (a, b) => {
        return b - a
    }
    getLabelCss = () => {
        return 'by-number'
    }
}