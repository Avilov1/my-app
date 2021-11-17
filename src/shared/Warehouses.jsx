import styles from "./styles/Warehouses.module.scss";
import {SelectIconSvg} from "../UI/assets/svg";
import {ButtonAdd} from "../UI";
import {TableHeader} from "../UI/TableHeader";
import {TableRowWarehouses} from "../UI/TableRowWarehouses";
import {useEffect} from "react";
import {useToggle} from "../services";
import {WarehouseAddModal} from "./WarehouseAddModal";
import {useWarehousesContext} from "../context/warehousesContext";
import {WarehouseEditModal} from "./WarehouseEditModal";
import {$authHost} from "../services/http";

export const Warehouses = () => {
	const [isVisibleAddPopup, toggleIsVisibleAddPopup] = useToggle(false)
	const {warehouses, setWarehouses, isEditWarehouse, setCheckWarehouses} = useWarehousesContext()

	useEffect(() => {
		async function getAll() {
			const {data} = await $authHost('api/warehouse')
			setWarehouses(data)
		}

		(!warehouses || warehouses.length < 1) && getAll()

		return () => {
			setCheckWarehouses([])
		};

	}, [])

	return (
		<div>
			{
				isVisibleAddPopup &&
				<WarehouseAddModal
					isVisible={isVisibleAddPopup}
					toggleIsVisible={toggleIsVisibleAddPopup}/>
			}
			{isEditWarehouse && <WarehouseEditModal/>}

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
								key={warehouse._id}
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