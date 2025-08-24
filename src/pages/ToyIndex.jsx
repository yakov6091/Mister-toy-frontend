import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'


export function ToyIndex() {






    return (
        <div>
            <h2>Toy Shop</h2>
            <main>
                <Link to="/toy/edit">Add Toy</Link>

            </main>
        </div>
    )
}