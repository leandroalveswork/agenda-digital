export default function validateItem(item) {
    let retArr = [];
    if (item.title === '') {
        retArr.push('title')
    }
    if (item.dateTime < new Date()) {
        retArr.push('dateTime')
    }
    if (retArr.length > 0) {
        throw retArr;
    }
}
