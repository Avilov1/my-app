import styles from "./styles/Warehouses.module.scss";
import {SelectIconSvg} from "../UI/assets/svg";
import {ButtonAdd} from "../UI";
import {TableHeader} from "../UI/TableHeader";
import {TableRow} from "../UI/TableRow";
import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export const WarehouseId = () => {
	const [warehouse, setWarehouse] = useState()
	const {id} = useParams()

	useEffect(() => {
		axios.get(`http://localhost:5000/warehouses/${id}`)
			.then(res => setWarehouse(res.data))
	}, [])

	return (
			<div>
				<header className={styles.headerContent}>
					<h1>{warehouse && warehouse.title}</h1>
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
							warehouse && warehouse.products.map(product =>
								<TableRow col1={product.productName}
								          col2={product.manufacturer}
								          col3={product.itemNumber}
								          col4={product.purchasingTechnology}
								          col5={product.shipmentMethod}/>)
						}
						</tbody>
					</table>
				</div>
			</div>
	)
}