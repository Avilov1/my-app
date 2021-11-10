import {createContext, useContext, useState} from "react";
import {useLocalStorage} from "../services";

const WarehousesContext = createContext(null)

export const useWarehousesContext = () => {
	return useContext(WarehousesContext)
}

export const WarehousesProvider = ({children}) => {
	const [warehouses, setWarehouses] = useLocalStorage(false, "warehouses")
	const [checkWarehouses, setCheckWarehouses] = useLocalStorage([], "checkWarehouses")
	const [currentWarehouse, setCurrentWarehouse] = useLocalStorage({}, "currentWarehouse")
	const [isEditWarehouse, setIsEditWarehouse] = useState(false)

	const [checkProducts, setCheckProducts] = useLocalStorage([], "checkProducts")
	const [currentProduct, setCurrentProduct] = useLocalStorage({}, "currentProduct")
	const [isEditProduct, setIsEditProduct] = useState(false)

	return (
		<WarehousesContext.Provider
			value={{
				warehouses, setWarehouses,
				checkWarehouses, setCheckWarehouses,
				currentWarehouse, setCurrentWarehouse,
				isEditWarehouse, setIsEditWarehouse,

				checkProducts, setCheckProducts,
				currentProduct, setCurrentProduct,
				isEditProduct, setIsEditProduct
			}}>
			{children}
		</WarehousesContext.Provider>
	)
}