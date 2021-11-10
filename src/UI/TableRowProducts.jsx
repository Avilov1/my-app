import {CheckboxWarehouse} from "./CheckboxWarehouse";
import styles from "./styles/TableRow.module.scss"
import {useHistory, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {useWarehousesContext} from "../context/warehousesContext";
import {CheckboxProduct} from "./CheckboxProduct";

export const TableRowProducts = ({obj}) => {
	const [isActive, setIsActive] = useState(false)
	const {checkProducts, setCheckProducts, currentWarehouse} = useWarehousesContext()

	useEffect(() => {
		!checkProducts && checkProducts(true)
	}, [])

	useEffect(() => {
		const removeCheckProduct = () => {
			const filterArr = checkProducts && checkProducts.filter(prod => prod.id !== obj.id)
			return filterArr
		}
		isActive
			? checkIsDuplicate(obj.id) ? setCheckProducts([...checkProducts]) : setCheckProducts([...checkProducts, obj])
			: setCheckProducts(removeCheckProduct())
	}, [isActive])

	const checkIsDuplicate = (id) => {
		const result = checkProducts.some(item => item.id === id)
		return result
	}

	return (
		<tr className={styles.tr}>
			<td className={styles.td}>
				<div>
					<CheckboxProduct setActive={setIsActive} isActive={isActive} id={obj.id}/>
					<span>
					{obj.productName}
				</span>
				</div>
			</td>
			<td className={styles.td}>
				{obj.manufacturer}
			</td>
			<td className={styles.td}>
				{obj.itemNumber}
			</td>
			<td className={styles.td}>
				{obj.purchasingTechnology}
			</td>
			<td className={styles.td}>
				{obj.shipmentMethod}
			</td>
		</tr>
	)
}