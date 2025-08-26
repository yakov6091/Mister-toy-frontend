import { useEffect, useState } from "react";
import { toyService } from "../services/toyService";
import { Link, useNavigate, useParams } from "react-router-dom"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadtoy()
    }, [toyId])

    function loadtoy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details">
            <h1>Toy name: {toy.name}</h1>
            <h3>Toy price: {toy.price}</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, facilis?</p>
            <Link to={`/toy/edit/${toyId}`}>Edit</Link>
            <Link to={`/toy`}>Back</Link>
        </section>
    )

}