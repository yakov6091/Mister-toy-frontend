import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toyService'

import { loadToyLabels, saveToy } from '../store/actions/toy.actions'


export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(null)

    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        // When there's no toyID, we are in "add" mode.
        // So, we reset the state to a new empty toy.
        if (!toyId) {
            setToyToEdit(toyService.getEmptyToy())
            return
        }
        // When there is a toyID, we are in "edit" mode.
        // So, we load the existing toy from the service.
        loadToy()

    }, [toyId]) //dependency array

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        const { name, value, type, checked } = target
        let fieldValue = value
        if (type === 'checkbox') {
            fieldValue = checked
        } else if (type === 'number') {
            fieldValue = +value
        } else if (type === 'select-multiple') {
            fieldValue = [...target.selectedOptions].map(option => option.value)
        }


        setToyToEdit(prevToy => ({
            ...prevToy,
            [name]: fieldValue
        }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then((savedToy) => {
                // showSuccessMsg(`Toy ${savedToy._id} saved successfully`)
                navigate('/toy')
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMsg('Cannot save toy')
            })
    }

    if (!toyToEdit) return <div>Loading...</div>
    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'}</h2>

            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="Enter new toy name..."
                    value={toyToEdit.name}
                    onChange={handleChange}
                />

                <label htmlFor="price">Price:</label>
                <input type="number"
                    id="price"
                    name="price"
                    placeholder="Enter price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                />

                <div>
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </section>
    )
}