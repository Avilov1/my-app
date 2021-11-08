import styles from "./styles/Warehouses.module.scss";
import {SelectIconSvg} from "../UI/assets/svg";
import {ButtonAdd} from "../UI";
import {TableHeader} from "../UI/TableHeader";
import {TableRow} from "../UI/TableRow";
import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory, useLocation} from "react-router-dom";
import {useToggle} from "../services";
import {WarehouseAddModal} from "./WarehouseAddModal";

export const Warehouses = () => {
	const [isVisibleAddPopup, toggleIsVisibleAddPopup] = useToggle(false)
	const [warehouses, setWarehouses] = useState([])
	const history = useHistory()
	const {pathname} = useLocation()

	useEffect(() => {
		axios.get("http://localhost:5000/warehouses")
			.then(res => setWarehouses(res.data))
	}, [])

	const clickOnWarehouse = (id) => {
		history.push(`${pathname}/${id}`)
	}

	return (
		<div>
			{
				isVisibleAddPopup &&
				<WarehouseAddModal
					isVisible={isVisibleAddPopup}
					toggleIsVisible={toggleIsVisibleAddPopup}/>}

			<header className={styles.headerContent}>
				<h1>Warehouses</h1>
				<div className={styles.rightSideHeader}>
					<select>
						<option>Filter by</option>
					</select>
					<SelectIconSvg/>
					<ButtonAdd text={"Add a warehouse"} onClick={() => toggleIsVisibleAddPopup()}/>
				</div>
			</header>

			<div className={styles.tableContainer}>
				<table>
					<TableHeader col1={"All stores"}
					             col2={"Number of products"}
					             col3={"Length, m"}
					             col4={"Width, m"}
					             col5={"Height, m"}/>
					<tbody>
					{
						warehouses && warehouses.map(warehouse =>
							<TableRow
								key={warehouse.id}
								id={warehouse.id}
								onClick={() => clickOnWarehouse(warehouse.id)}
								col1={warehouse.title}
								col2={warehouse.products.length}
								col3={warehouse.length}
								col4={warehouse.width}
								col5={warehouse.height}
							/>
						)
					}
					</tbody>
				</table>
			</div>
		</div>
	)
}