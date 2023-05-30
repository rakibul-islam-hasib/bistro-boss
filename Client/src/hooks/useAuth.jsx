import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"

export const useAuth = () => { 
    const auth = useContext(AuthContext); 
    return auth; 
}