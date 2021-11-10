import styles from "./styles/Warehouses.module.scss";
import {SelectIconSvg} from "../UI/assets/svg";
import {ButtonAdd} from "../UI";
import {TableHeader} from "../UI/TableHeader";
import {useLocalStorage, useToggle} from "../services";
import {TableRowProducts} from "../UI/TableRowProducts";
import {useWarehousesContext} from "../context/warehousesContext";
import {ProductAddModal} from "./ProductAddModal";

export const WarehouseId = () => {
	const [isVisibleAddProductPopup, toggleIsVisibleAddProductPopup] = useToggle(false)
	const {currentWarehouse, setCurrentWarehouse} = useWarehousesContext()

	return (
		<div>
			{
				isVisibleAddProductPopup &&
				<ProductAddModal
					isVisible={isVisibleAddProductPopup}
					toggleIsVisible={toggleIsVisibleAddProductPopup}/>
			}

			<header className={styles.headerContent}>
				<h1>{currentWarehouse.title}</h1>
				<div className={styles.rightSideHeader}>
					<select>
						<option>Filter by</option>
					</select>
					<SelectIconSvg/>
					<ButtonAdd text={"Add a product"} onClick={toggleIsVisibleAddProductPopup}/>
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