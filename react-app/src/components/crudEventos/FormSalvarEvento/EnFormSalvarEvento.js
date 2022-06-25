export default class EnFormSalvarEvento {

    constructor(code) {
        this.code = code
    }
    static get Hidden() {
        return new EnFormSalvarEvento(1)
    }
    static get New() {
        return new EnFormSalvarEvento(2)
    }
    static get Edit() {
        return new EnFormSalvarEvento(3)
    }
}