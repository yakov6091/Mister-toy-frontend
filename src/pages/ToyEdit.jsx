import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toyService'

import { loadToyLabels, saveToy } from '../store/actions/toy.actions'
import { useSelector } from 'react-redux'


export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(null)
    const labels = useSelector(storeState => storeState.toyModule.toyLabels)

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
        loadToyLabels()

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
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={toyToEdit.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={toyToEdit.price || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="labels">Labels:</label>
                    <select
                        id="labels"
                        name="labels"
                        multiple
                        value={toyToEdit.labels}
                        onChange={handleChange}
                    >
                        {labels.map(label => (
                            <option key={label} value={label}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>

                {toyToEdit._id && (
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                name="inStock"
                                checked={toyToEdit.inStock}
                                onChange={handleChange}
                            />
                            In Stock
                        </label>
                    </div>
                )}

                <div>
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </section>
    )
}