export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'


    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}


export function makeLorem(size = 100) {
    var words = ['toy', 'talk', 'machine', 'was', 'mini television', 'tuned', 'to', 'color', '.', 'All', 'big', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various toys', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}


export function makeName(size = 15) {
    var words = ['toy', 'talk', 'machine', 'Dol', 'mini television', 'hand', 'car', 'truck', 'All', 'big head', 'the story', 'and ', 'ball', 'robot']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}





export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}


export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

export function debounce(func, delay) {
    let timeoutId
    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...args)
        }, delay)
    }
}

