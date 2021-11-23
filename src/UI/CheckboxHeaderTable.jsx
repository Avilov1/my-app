import classnames from "classnames";
import styles from "./styles/Checkbox.module.scss"
import {CheckboxIconSvg} from "./assets/svg";
import {useWarehousesContext} from "../context/warehousesContext";
import {useEffect, useState} from "react";

export const CheckboxHeaderTable = ({parentComponent = ""}) => {
	const {
		checkProducts,
		setCheckProducts,
		checkWarehouses,
		setCheckWarehouses,
		currentWarehouse,
		warehouses
	} = useWarehousesContext()

	const [isActive, setIsActive] = useState(false)

	const classNames = classnames(styles.border, {[styles.active]: isActive})

	useEffect(() => {
		if (parentComponent === "warehouses") {
			if (!checkWarehouses.length <= 0 && JSON.stringify(checkWarehouses) === JSON.stringify(warehouses)) {
				setIsActive(true)
			} else {
				setIsActive(false)
			}
		}

		if (parentComponent === "products") {
			if (!checkProducts.length <= 0 && JSON.stringify(checkProducts) === JSON.stringify(currentWarehouse.products)) {
				setIsActive(true)
			} else {
				setIsActive(false)
			}
		}
	}, [checkWarehouses, checkProducts])

	const handleIsCheckWarehouses = () => {
		if (!checkWarehouses.length <= 0 && JSON.stringify(checkWarehouses) === JSON.stringify(warehouses)) {
			setCheckWarehouses([])
			setIsActive(false)
		} else {
			setCheckWarehouses([...warehouses])
			setIsActive(true)
		}
	}

	const handleIsCheckProducts = () => {
		if (!checkProducts.length <= 0 && JSON.stringify(checkProducts) === JSON.stringify(currentWarehouse.products)) {
			setCheckProducts([])
			setIsActive(false)
		} else {
			setCheckProducts([...currentWarehouse.products])
			setIsActive(true)
		}
	}

	return (
		<div onClick={(e) => e.stopPropagation()}>
			<div className={classNames}
			     onClick={() => {
				     if (parentComponent === "warehouses") return handleIsCheckWarehouses()
				     if (parentComponent === "products") return handleIsCheckProducts()
			     }}>
				<CheckboxIconSvg width={10} height={6}/>
			</div>
		</div>
	)
}