import { useEffect, useState } from "react"

export const useMenu = () => {
    const [menu, setMenu] = useState([])
    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => setMenu(data))
    }, [])
    return [menu]
}