import {useHistory, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {CheckboxWarehouse} from "./CheckboxWarehouse";
import {useWarehousesContext} from "../context/warehousesContext";
import styles from "./styles/TableRow.module.scss"

export const TableRowWarehouses = ({obj}) => {
	const [isActive, setActive] = useState(false)
	const history = useHistory()
	const {pathname} = useLocation()
	const {title, length, width, height, products, id} = obj
	const {checkWarehouses, setCheckWarehouses, setCurrentWarehouse} = useWarehousesContext()

	useEffect(() => {
		if (checkWarehouses.some(prod => prod.id === obj.id)) {
			setActive(true)
		} else {
			setActive(false)
		}
	}, [checkWarehouses])

	useEffect(() => {
		const removeCheckWarehouse = () => {
			const filterArr = checkWarehouses && checkWarehouses.filter(warehouse => warehouse.id !== obj.id)
			return filterArr
		}
		isActive
			? checkIsDuplicate(obj.id) ? setCheckWarehouses([...checkWarehouses]) : setCheckWarehouses([...checkWarehouses, obj])
			: setCheckWarehouses(removeCheckWarehouse())
	}, [isActive])

	const checkIsDuplicate = (id) => {
		const result = checkWarehouses.some(item => item.id === id)
		return result
	}

	const clickOnWarehouse = () => {
		setCurrentWarehouse(obj)
		history.push(`${pathname}/${id}`)
	}

	return (
		<tr className={styles.tr} onClick={clickOnWarehouse}>
			<td className={styles.td}>
				<div>
					<CheckboxWarehouse setActive={setActive} isActive={isActive} id={obj.id}/>
					<span>
					{title}
				</span>
				</div>
			</td>
			<td className={styles.td}>
				{products.length ? products.length : 0}
			</td>
			<td className={styles.td}>
				{length}
			</td>
			<td className={styles.td}>
				{width}
			</td>
			<td className={styles.td}>
				{height}
			</td>
		</tr>
	)
}