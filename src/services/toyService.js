import { storageService } from "./async-storage.service";
import { loadFromStorage, makeId, saveToStorage } from "./util.service";


const TOY_KEY = 'toyDB'
_createToys()

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

function getEmptyToy(name = '', price = '', createdAt = '', inStock = true) {
    return { name, price, createdAt, inStock }
}





// Private functions
function _createToys() {
    let toys = loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = [
            _createToy('Machine', 200, Date.now()),
            _createToy('Talking Toy', 250, Date.now()),
            _createToy('Robot Arm', 300, Date.now()),
            _createToy('Football', 50, Date.now()),
            _createToy('Chess', 150, Date.now())
        ]
    }
    saveToStorage(TOY_KEY, toys)
}


function _createToy(name, price, createdAt, inStock) {
    const toy = getEmptyToy(name, price, createdAt, inStock)
    toy.id = makeId()
    return toy
}