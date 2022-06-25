const LOCAL_TIMEZONE_OFFSET_MILLISECONDS = (new Date().getTimezoneOffset()) * 60 * 1000
const increaseTimezoneOffset = (data) => {
    return new Date(data.getTime() + LOCAL_TIMEZONE_OFFSET_MILLISECONDS)
}

export { LOCAL_TIMEZONE_OFFSET_MILLISECONDS, increaseTimezoneOffset }