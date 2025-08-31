import React from "react";
import {
    ArcElement,
    CategoryScale,
    Chart,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2'

Chart.register(
    ArcElement,
    CategoryScale,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
);
export function Dashboard() {

    // Data for the donut chart  (e.g., Inventory by label)
    const donutData = {
        labels: ['Label A', 'Label B', 'Label C'],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    }
    // Data for the line chart (e.g., Random numbers and dates)
    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Random Data',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }]
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <div style={{ width: "400px", height: "400px" }}>
                <h2>Inventory by Label</h2>
                <Doughnut data={donutData} />
            </div>

            <div style={{ width: "400px", height: "400px" }}></div>
            <h2>Sales over Time</h2>
            <Line data={lineData} />
        </div>

    )
}