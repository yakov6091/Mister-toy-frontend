import './assets/style/main.css'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { About } from './pages/About'
import { Dashboard } from './pages/Dashboard'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'
import { ToyIndex } from './pages/ToyIndex'

import { store } from './store/store'

const obj = {
    className: "main-layout app"
}

export function App() {
    return (
        <Provider store={store}>
            <Router>
                <section {...obj}>
                    <AppHeader />

                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/"></Route>
                            <Route element={<About />} path="/about"></Route>
                            <Route element={<Dashboard />} path='/dashboard'></Route>
                            <Route element={<ToyIndex />} path="/toy"></Route>
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId?"></Route>
                            <Route element={<ToyDetails />} path="/toy/:toyId"></Route>
                        </Routes>
                    </main>
                    <AppFooter />
                </section>

            </Router>
        </Provider>
    )
}







