import {useEffect} from "react";
import {useWarehousesContext} from "../context/warehousesContext";
import {useToggle} from "../services";
import {ButtonAdd} from "../UI";
import {TableHeader} from "../UI/TableHeader";
import {ProductAddModal} from "./ProductAddModal";
import {TableRowProducts} from "../UI/TableRowProducts";
import {ProductMoveModal} from "./ProductMoveModal";
import {ProductEditModal} from "./ProductEditModal";
import styles from "./styles/Warehouses.module.scss";
import {SelectIconSvg} from "../UI/assets/svg";

export const WarehouseId = () => {

	const {
		currentWarehouse,
		setCurrentWarehouse,
		isMoveProducts,
		toggleIsMoveProducts,
		isEditProduct,
		toggleIsEditProduct,
		setCheckProducts,
	} = useWarehousesContext()

	const [isVisibleAddProductPopup, toggleIsVisibleAddProductPopup] = useToggle(false)

	useEffect(() => {


		return () => {
			setCheckProducts([])
			setCurrentWarehouse(null)
		};
	}, [])

	return (
		<div>
			{
				isVisibleAddProductPopup &&

				<ProductAddModal
					isVisible={isVisibleAddProductPopup}
					toggleIsVisible={toggleIsVisibleAddProductPopup}/>
			}
			{
				isMoveProducts &&

				<ProductMoveModal
					isVisible={isMoveProducts}
					toggleIsVisible={toggleIsMoveProducts}/>
			}
			{
				isEditProduct &&

				<ProductEditModal
					isVisible={isEditProduct}
					toggleIsVisible={toggleIsEditProduct}/>
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