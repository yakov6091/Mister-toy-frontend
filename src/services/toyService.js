import { storageService } from "./async-storage.service";

const TOY_KEY = 'toyDB'

export const toyService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter
}





function query(filterBy = {}) {
    return storageService.query(TOY_KEY)
        .then(toys => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }
            if (filterBy.minPrice) {
                toys = toys.filter(toy => toy.price >= filterBy.minPrice)
            }

            return toys

        })
}

function get(toyId) {
    return storageService.get(TOY_KEY, toyId).then()
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy.id) {
        return storageService.put(TOY_KEY, toy)
    } else {
        return storageService.post(TOY_KEY, toy)
    }
}





function getDefaultFilter() {
    return { txt: '', minPrice: '' }
}