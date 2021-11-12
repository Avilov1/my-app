import {createContext, useContext} from "react";
import {useLocalStorage} from "../services";

const AuthContext = createContext(null)

export const useAuthContext = () => {
	return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
	const [isAuth, setIsAuth] = useLocalStorage(false, "auth")

	return (
		<AuthContext.Provider value={{isAuth, setIsAuth}}>
			{children}
		</AuthContext.Provider>
	)
}





