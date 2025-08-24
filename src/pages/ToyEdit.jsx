import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toyService'



export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyID } = useParams()

    useEffect(() => {
        if (toyID) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyID)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                // navigate('/toy')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break


            default:
                break
        }
        setToyToEdit(prevToyEdit => ({ ...prevToyEdit, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        toyService.save(toyToEdit)
            .then(() => {
                navigate('/toy')
            })
            .catch((err) => {
                console.log('Error saving toy:', err)
            })
    }

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'}</h2>

            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    placeholder="Enter new toy name..."
                    value={toyToEdit.name}
                    onChange={handleChange}
                />

                <label htmlFor="price">Price:</label>
                <input type="number"
                    id="price"
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