import { useEffect, useState } from "react";
import { toyService } from "../services/toyService";
import { Link, useNavigate, useParams } from "react-router-dom"
import { Chat } from "../cmps/Chat";
import { PopUp } from "../cmps/PopUp";


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
    const formattedDate = new Date(toy.createdAt).toLocaleString('he')


    return (
        <section className="toy-details">
            <h1>Toy name: {toy.name}</h1>
            <h3>Toy price: {toy.price}</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, facilis?</p>

            <h1>Created At: <span>{formattedDate}</span></h1>

            <h1 className={toy.inStock ? 'green' : 'red'}>
                {toy.inStock ? 'In stock' : 'Not in stock'}
            </h1>

            <button className="button">
                <Link to={`/toy/edit/${toyId}`}>Edit</Link>
            </button>

            <button className='back-btn'>
                <Link to="/toy">Back</Link>
            </button>

            <section>
                <PopUp
                    header={<h3>Chat About {toy.name}</h3>}
                    footer={<h4>&copy; 2025-9999 Toys INC</h4>}
                    onClose={() => setIsChatOpen(false)}
                    isOpen={isChatOpen}
                >
                    <Chat />
                </PopUp>
            </section>
            {!isChatOpen && <button onClick={() => setIsChatOpen(true)} className='open-chat'>Chat</button>}
        </section>
    )

}