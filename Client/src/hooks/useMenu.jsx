import { useEffect, useState } from "react"

export const useMenu = () => {
    const [menu, setMenu] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/menu')
            .then(res => res.json())
            .then(data => setMenu(data))
    }, [])
    return [menu]
}