import { storageService } from "./async-storage.service";
import { loadFromStorage, makeId, saveToStorage } from "./util.service";


const TOY_KEY = 'toyDB'

const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
]


_createToys()

export const toyService = {
    query,
    getById,
    remove,
    save,
    getDefaultFilter,
    getEmptyToy,
    getInStockValue,
    getDefaultSort,
    getToyLabels,
    getToyLabelCounts
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
            //* Filter by inStock
            if (typeof filterBy.inStock === 'boolean') {
                toys = toys.filter(toy => toy.inStock === filterBy.inStock)
            }
            //* Filter by labels
            if (filterBy.labels?.length) {
                toys = toys.filter(toy =>
                    filterBy.labels.every(label => toy.labels.includes(label)))
            }
            //* Sort
            if (sortBy.type) {
                const dir = +sortBy.desc
                toysToShow.sort((a, b) => {
                    if (sortBy.type === 'name') {
                        return a.name.localeCompare(b.name) * dir
                    } else if (sortBy.type === 'price' || sortBy.type === 'createdAt') {
                        return (a[sortBy.type] - b[sortBy.type]) * dir
                    }
                })
            }
            return toys

        })
}

function getById(toyId) {
    return storageService.get(TOY_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(TOY_KEY, toy)
    } else {
        return storageService.post(TOY_KEY, toy)
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        minPrice: '',
        labels: [],
        pageIdx: 0
    }
}

function getDefaultSort() {
    return { type: '', desc: 1 }
}

function getEmptyToy() {
    return {
        name,
        price,
        labels: _getRandomLabels(),
        createdAt: Date.now(),
        inStock: true
    }
}


function getToyLabels() {
    return Promise.resolve(labels)
}

function getToyLabelCounts() {
    return storageService.query(TOY_DB).then(toys => {
        const labelCounts = {}
        toys.forEach(toy => {
            toy.labels.forEach(label => {
                if (!labelCounts[label]) labelCounts[label] = { total: 0, inStock: 0 }
                labelCounts[label].total++
                if (toy.inStock) labelCounts[label].inStock++
            })
        })
        return labelCounts
    })
}

function getInStockValue(inStock) {
    if (inStock === '') return ''
    if (inStock === 'true') return true
    if (inStock === 'false') return false
}



// Private functions
function _createToys() {
    let toys = loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = [
            {
                "name": "Hanayama Puzzle",
                "price": 70,
                "labels": ["Puzzle", "Box game"],
                "_id": "FHeoH",
                "createdAt": 1721307706470,
                "inStock": false
            },
            {
                "name": "Truck",
                "price": 90,
                "labels": ["On wheels", "Outdoor"],
                "_id": "r19SU",
                "createdAt": 1720676977009,
                "inStock": false
            },
            {
                "name": "Talking Doll",
                "price": 130,
                "labels": ["Doll", "Battery Powered", "Baby"],
                "_id": "t101",
                "createdAt": 1631031801011,
                "inStock": true
            },
            {
                "name": "Wooden Puzzle Set",
                "price": 55,
                "labels": ["Puzzle", "Baby"],
                "_id": "t102",
                "createdAt": 1631032801011,
                "inStock": true
            },
            {
                "name": "Remote Control Car",
                "price": 160,
                "labels": ["On wheels", "Battery Powered", "Outdoor"],
                "_id": "t103",
                "createdAt": 1631033801011,
                "inStock": true
            },
            {
                "name": "Colorful Building Blocks",
                "price": 60,
                "labels": ["Box game", "Baby"],
                "_id": "t104",
                "createdAt": 1631034801011,
                "inStock": true
            },
            {
                "name": "Artistic Paint Set",
                "price": 45,
                "labels": ["Art", "Box game"],
                "_id": "t105",
                "createdAt": 1631035801011,
                "inStock": false
            },
            {
                "name": "Dancing Robot",
                "price": 110,
                "labels": ["Battery Powered", "Outdoor"],
                "_id": "t106",
                "createdAt": 1631036801011,
                "inStock": true
            },
            {
                "name": "Miniature Train Set",
                "price": 150,
                "labels": ["On wheels", "Box game", "Battery Powered"],
                "_id": "t107",
                "createdAt": 1631037801011,
                "inStock": false
            },
            {
                "name": "Soft Plush Teddy Bear",
                "price": 40,
                "labels": ["Baby", "Doll"],
                "_id": "t108",
                "createdAt": 1631038801011,
                "inStock": true
            },
            {
                "name": "3D Jigsaw Puzzle",
                "price": 65,
                "labels": ["Puzzle", "Art"],
                "_id": "t109",
                "createdAt": 1631039801011,
                "inStock": false
            },

        ]
    }
    saveToStorage(TOY_KEY, toys)
}


function _createToy(name, price, createdAt, inStock) {
    const toy = getEmptyToy(name, price, createdAt, inStock)
    toy._id = makeId()
    return toy
}

function _getRandomLabels() {
    const labelsCopy = [...labels]
    const randomLabels = []
    for (let i = 0; i < 2; i++) {
        const idx = Math.floor(Math.random() * labelsCopy.length)
        randomLabels.push(labelsCopy.splice(idx, 1)[0])
    }
    return randomLabels
}