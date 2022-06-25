import BaseOrdenador from "./baseOrdenador";

export default class OrdenadorPorString extends BaseOrdenador {

    ordenarCrescente = (a, b) => {
        return (a + '').localeCompare(b)
    }
    ordenarDecrescente = (a, b) => {
        return (b + '').localeCompare(a)
    }
    getLabelCss = () => {
        return 'by-string'
    }
}