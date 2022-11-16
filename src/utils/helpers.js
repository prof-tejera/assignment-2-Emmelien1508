export function getTime(time) {
    const minutes =  Math.floor((time / 60000) % 60)
    const seconds = Math.floor((time / 1000) % 60)
    const miliseconds = ((time / 10) % 100)
    return { minutes, seconds, miliseconds }
}

export function capitalize(str) {
    const lower = str.toLowerCase()
    return str.charAt(0).toUpperCase() + lower.slice(1)
}