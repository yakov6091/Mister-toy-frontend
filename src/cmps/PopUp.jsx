import { useEffect, useState } from 'react'

export function PopUp({ header, footer, children, isOpen = false, onClose = () => { } }) {
    const [isOpenPopUp, setIsChatOpen] = useState(isOpen)

    useEffect(() => {
        setIsOpenPopUp(isOpen)
    }, [isOpen])

    function onClosePopUp() {
        setIsChatOpen(false)
        onClose()
    }

    if (!isOpenPopUp) return null

    return (
        <div onClick={onClosePopUp} className="popup-backdrop">
            <div onClick={ev => ev.stopPropagation()} className="popup-container">
                {header && <header className="popup-header">{header}</header>}
                <main className="popup-main">
                    {children}
                </main>
                {footer && <footer className="popup-footer">{footer}</footer>}
            </div>
        </div>
    )
}