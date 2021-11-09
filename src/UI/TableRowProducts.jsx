import {Checkbox} from "./Checkbox";
import styles from "./styles/TableRow.module.scss"
import {useHistory, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useLocalStorage, useToggle} from "../services";

export const TableRowProducts = ({obj}) => {
	const [isActive, toggleIsActive] = useToggle(false)
	const [currentWarehouse, setCurrentWarehouse] = useLocalStorage({}, "currentWarehouse")
	const [checkProduct, setCheckProduct] = useLocalStorage({}, "checkProduct")
	const history = useHistory()
	const {pathname} = useLocation()
	const {title, products} = currentWarehouse
	console.log('===>checkedWarehouse', checkProduct);

	useEffect(() => {
		isActive
			? setCheckProduct(obj)
			: setCheckProduct("")
	}, [isActive])

//id, productName, manufacturer, itemNumber, purchasingTechnology, shipmentMethod = che

	return (
		<tr className={styles.tr}>
			<td className={styles.td}>
				<div>
					<Checkbox toggleIsActive={toggleIsActive} isActive={isActive}/>
					<span>
					{
						obj.productName
						}
				</span>
				</div>
			</td>
			<td className={styles.td}>
				{
					obj.manufacturer
				}

			</td>
			<td className={styles.td}>
				{
					obj.itemNumber
				}
			</td>
			<td className={styles.td}>
				{
					obj.purchasingTechnology
				}
			</td>
			<td className={styles.td}>
				{
					obj.shipmentMethod
				}
			</td>
		</tr>
	)
}