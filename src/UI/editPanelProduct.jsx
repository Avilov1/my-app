import {useWarehousesContext} from "../context/warehousesContext";
import {warehouseApi} from "../services/http/warehouseApi";
import styles from "./styles/EditPanel.module.scss"
import {MoveSvg, SelectSvg} from "./assets/svg";

export const EditPanelProduct = ({isMove = false}) => {
	const {
		setWarehouses,
		checkProducts,
		setCheckProducts,
		toggleIsEditProduct,
		currentWarehouse,
		setCurrentWarehouse,
		toggleIsMoveProducts
	} = useWarehousesContext()

	const deleteProducts = async () => {
		try {
			const productCurrentWarehouse = currentWarehouse.products
			const filterProducts = productCurrentWarehouse.filter(item => !checkProducts.includes(item))
			const updatedWarehouse = await warehouseApi.update({...currentWarehouse, products: [...filterProducts]})
			const newState = await warehouseApi.getAll()
			setCurrentWarehouse(updatedWarehouse.data)
			setCheckProducts([])
			setWarehouses(newState.data)

		} catch (e) {
			alert(e)
		}
	}

	const countCheck = checkProducts ? checkProducts.length : 0

	return (
		<>
			{
				countCheck > 0 &&
				<div className={styles.container}>
					<div className={styles.leftSide}>
						<SelectSvg/>
						<span>
					Selected: {countCheck}
				</span>
					</div>
					<div className={styles.rightSide}>
						{(countCheck === 1) &&
						<button className={styles.editBtn} onClick={toggleIsEditProduct}>
							Edite
						</button>}

						<button className={styles.editBtn} onClick={deleteProducts}>
							Delete
						</button>
						{
							isMove &&
							<button className={styles.moveBtn} onClick={toggleIsMoveProducts}>
								Move
								<MoveSvg width={17} height={11}/>
							</button>
						}
					</div>
				</div>
			}
		</>
	)
}