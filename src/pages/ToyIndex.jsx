import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { ToyFilter } from "../cmps/ToyFilter"
import { ToyList } from '../cmps/ToyList'

import { toyService } from '../services/toy.service'

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