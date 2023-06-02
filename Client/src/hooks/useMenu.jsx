import { useQuery } from "@tanstack/react-query"
export const useMenu = () => {
    const {data : menu =[], refetch , isLoading : loading} = useQuery({
        queryKey : ['menu'], 
        queryFn : async () => { 
            const result = await fetch('http://localhost:5000/menu')
            const data = await result.json()
            return data; 
        }, 
    })
    return [menu , refetch , loading]
}