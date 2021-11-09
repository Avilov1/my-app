import styles from "./styles/Warehouses.module.scss";
import {SelectIconSvg} from "../UI/assets/svg";
import {ButtonAdd} from "../UI";
import {TableHeader} from "../UI/TableHeader";
import {TableRowWarehouses} from "../UI/TableRowWarehouses";
import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory, useLocation} from "react-router-dom";
import {useLocalStorage, useToggle} from "../services";
import {WarehouseAddModal} from "./WarehouseAddModal";
import {data} from "../mock/mock";

export const Warehouses = () => {
	const [isVisibleAddPopup, toggleIsVisibleAddPopup] = useToggle(false)
	const [warehouses, setWarehouses] = useLocalStorage(data.warehouses, "warehouses")
	//const history = useHistory()
	//const {pathname} = useLocation()
	//const [warehouses, setWarehouses] = useState()

	useEffect(() => {
		const storage = localStorage.getItem("warehouses")
		setWarehouses(JSON.parse(storage))
	}, [isVisibleAddPopup])

	/*
	useEffect(() => {
		axios.get("http://localhost:5000/warehouses")
			.then(res => setWarehouses(res.data))
	}, [])
	*/

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
							<TableRowWarehouses
								key={warehouse.id}
								//onClick={() => clickOnWarehouse(warehouse.id)}
								obj={warehouse}
							/>
						)
					}
					</tbody>
				</table>
			</div>
		</div>
	)
}