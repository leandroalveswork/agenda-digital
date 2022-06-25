function toDisplayedDate_LocalTimezone(data) {
    if (data == null || data == undefined) {
        return ``
    }
    return `${(data.getDate() + ``).padStart(2, `0`)}/${(data.getMonth() + 1 + ``).padStart(2, `0`)}/${data.getFullYear()}`
}

function toDateValue_LocalTimezone(data) {
    if (data == null || data == undefined) {
        return ``
    }
    let newData = new Date(data)
    if (newData == null || newData == undefined) {
        return ``
    }
    return `${newData.getFullYear()}-${(newData.getMonth() + 1 + ``).padStart(2, `0`)}-${(newData.getDate() + ``).padStart(2, `0`)}`
}

function toDateHourValue_LocalTimezone(hora) {
    if (hora == null || hora == undefined) {
        return ''
    }
    let newHora = new Date(hora)
    if (newHora == null || newHora == undefined) {
        return ``
    }
    return `${toDateValue_LocalTimezone(newHora)}T${(newHora.getHours() + '').padStart(2, '0')}:${(newHora.getMinutes() + '').padStart(2, '0')}:00`
}

function toDateValue_UtcTimezone(data) {
    if (data == null || data == undefined) {
        return ``
    }
    let newData = new Date(data)
    if (newData == null || newData == undefined) {
        return ``
    }
    return `${newData.getUTCFullYear()}-${(newData.getUTCMonth() + 1 + ``).padStart(2, `0`)}-${(newData.getUTCDate() + ``).padStart(2, `0`)}`
}

function toDateHourValue_UtcTimezone(hora) {
    if (hora == null || hora == undefined) {
        return ''
    }
    let newHora = new Date(hora)
    if (newHora == null || newHora == undefined) {
        return ``
    }
    return `${toDateValue_UtcTimezone(newHora)}T${(newHora.getUTCHours() + '').padStart(2, '0')}:${(newHora.getUTCMinutes() + '').padStart(2, '0')}:00`
}

function valorInformado(valor) {
    return (valor + '').trim() != ''
}

function itemsInPortuguese(items) {
    if (items.length === 0) {
        return ''
    }
    if (items.length === 1) {
        return items[0]
    }
    if (items.length === 2) {
        return `${items[0]} e ${items[1]}`
    }
    return items
        .filter((_x, index, arr) => index !== arr.length - 1 && index !== arr.length - 2)
        .reduceRight((prev, cur) => `${cur}, ${prev}`, `${items[items.length - 2]} e ${items[items.length - 1]}`)
}

export { 
    toDisplayedDate_LocalTimezone,
    toDateValue_LocalTimezone,
    toDateHourValue_LocalTimezone,
    toDateValue_UtcTimezone,
    toDateHourValue_UtcTimezone,
    valorInformado,
    itemsInPortuguese
}