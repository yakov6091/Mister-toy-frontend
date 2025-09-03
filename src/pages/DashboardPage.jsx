import { useEffect, useState } from "react"
import { Dashboard } from "../cmps/Dashboard"
import { toyService } from "../services/toyService"

export function DashboardPage() {
    const [labelCounts, setLabelCounts] = useState(null)

    useEffect(() => {
        loadLabels()
    }, [])

    function loadLabels() {
        toyService.getToyLabelCounts()
            .then(labelCounts => {
                console.log('labelCounts:', labelCounts)
                setLabelCounts(labelCounts)
            })
    }

    if (!labelCounts) return <div>Loading...</div>

    return (
        <section>
            <Dashboard labelCounts={labelCounts} />

        </section>
    )
}