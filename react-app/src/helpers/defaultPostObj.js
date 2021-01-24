export default function defaultPostObj(objId) {
    const MS_PER_DAY = 1000 * 3600 * 24;
    const DATETIME_NOW = new Date();
    const MS_TO_NOW = DATETIME_NOW.getTime();

    const DATETIME = new Date(MS_TO_NOW + MS_PER_DAY)
    DATETIME.setMinutes(0)

    return {
        id: objId,
        title: "",
        palestranteName: "",
        dateTime: DATETIME,
        local: "",
        details: ""
    }
}