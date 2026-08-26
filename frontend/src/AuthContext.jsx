import { createContext, useContext, useEffect, useState } from "react";
import { isTokenExpired } from "./lib/auth";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [ user , setUser ] = useState(null);
    const [ Isloading , setIsLoading] = useState(true);

    const isAuthenticated = false;

    useEffect( () => {
        async function checkUser() {
        if( !isTokenExpired()) {
            const response = await fetch('/api/me', {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = response.json();

            if (response.ok){
                console.log("Got the Response !!")
                setUser(data.user)
            }
    
        } else {
            setIsLoading(false); // No token No loading
        }
    }
    checkUser();
    })
    return(
        <AuthContext.Provider value={{ user , Isloading , isAuthenticated}}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);