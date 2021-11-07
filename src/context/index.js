import {createContext, useContext, useState} from "react";

const AuthContext = createContext(null)

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false)

    return (
        <AuthContext.Provider value={{isAuth, setIsAuth}}>
            {children}
        </AuthContext.Provider>
    )
}



