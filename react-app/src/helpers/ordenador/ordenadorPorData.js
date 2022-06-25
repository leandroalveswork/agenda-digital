import BaseOrdenador from "./baseOrdenador";

export default class OrdenadorPorData extends BaseOrdenador {

    ordenarCrescente = (a, b) => {
        return a.getTime() - b.getTime()
    }
    ordenarDecrescente = (a, b) => {
        return b.getTime() - a.getTime()
    }
    getLabelCss = () => {
        return 'by-date'
    }
}