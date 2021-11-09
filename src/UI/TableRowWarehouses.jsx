import {Checkbox} from "./Checkbox";
import styles from "./styles/TableRow.module.scss"
import {useHistory, useLocation, useParams, useRouteMatch} from "react-router-dom";
import {useEffect} from "react";
import {useLocalStorage, useToggle} from "../services";

export const TableRowWarehouses = ({obj}) => {
	const [isActive, toggleIsActive] = useToggle(false)
	const [checkWarehouse, setCheckWarehouse] = useLocalStorage({}, "checkWarehouse")
	const [currentWarehouse, setCurrentWarehouse] = useLocalStorage({}, "currentWarehouse")
	const history = useHistory()
	const {pathname} = useLocation()
	const {title, length, width, height, products, id} = obj

	useEffect(() => {
		isActive
			? setCheckWarehouse(obj)
			: setCheckWarehouse("")
	}, [isActive])

	const clickOnWarehouse = async () => {
		await setCurrentWarehouse(obj)
		await history.push(`${pathname}/${id}`)
	}

	return (
		<tr className={styles.tr} onClick={clickOnWarehouse}>
			<td className={styles.td}>
				<div>
					<Checkbox toggleIsActive={toggleIsActive} isActive={isActive}/>
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