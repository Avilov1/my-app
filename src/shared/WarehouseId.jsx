import styles from "./styles/Warehouses.module.scss";
import {SelectIconSvg} from "../UI/assets/svg";
import {ButtonAdd} from "../UI";
import {TableHeader} from "../UI/TableHeader";
import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useLocalStorage} from "../services";
import {TableRowProducts} from "../UI/TableRowProducts";

export const WarehouseId = () => {
	const [warehouses, setWarehouses] = useLocalStorage({}, "warehouses")
	const [product, setProduct] = useLocalStorage({}, "checkProduct")
	const [currentWarehouse, setCurrentWarehouse] = useLocalStorage({}, "currentWarehouse")
	//const {id} = useParams()

	/*
	useEffect(() => {
		axios.get(`http://localhost:5000/warehouses/${id}`)
			.then(res => setCurrentWarehouse(res.data))
	}, [])
	*/

	return (
		<div>
			<header className={styles.headerContent}>
				<h1>{currentWarehouse.title}</h1>
				<div className={styles.rightSideHeader}>
					<select>
						<option>Filter by</option>
					</select>
					<SelectIconSvg/>
					<ButtonAdd text={"Add a warehouse"}/>
				</div>
			</header>
			<div className={styles.tableContainer}>
				<table>
					<TableHeader col1={"All stores"}
					             col2={"Manufacturer"}
					             col3={"Item number"}
					             col4={"Purchasing technology"}
					             col5={"Shipment method"}/>
					<tbody>
					{
						currentWarehouse.products.map(product =>
							<TableRowProducts key={product.id} obj={product}/>)
					}
					</tbody>
				</table>
			</div>
		</div>
	)
}