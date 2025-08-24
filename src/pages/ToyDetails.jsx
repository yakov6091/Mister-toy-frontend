import { useEffect, useState } from "react";
import { toyService } from "../services/toyService";
import { Link, useParams } from "react-router-dom"


export function ToyDetails() {
    const [toy, setToy] = useState(null)

    useEffect(() => {
        loadtoy()
    }, [])

    function loadtoy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Coudn\'t load toy:', err)
            })
    }

    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details">
            <h1>Toy name: {toy.name}</h1>
            <h3>Toy price: {toy.price}</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, facilis?</p>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
            <Link to={`/toy`}>Back</Link>
        </section>
    )

}