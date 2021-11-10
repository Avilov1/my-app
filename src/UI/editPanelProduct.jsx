import {useWarehousesContext} from "../context/warehousesContext";

import {MoveSvg, SelectSvg} from "./assets/svg";
import styles from "./styles/EditPanel.module.scss"

export const EditPanelProduct = ({isMove = false}) => {
	const {
		warehouses, setWarehouses, checkWarehouses, setCheckWarehouses, setIsEditWarehouse,
		checkProducts, setCheckProducts, setIsEditProduct, currentWarehouse, setCurrentWarehouse
	} = useWarehousesContext()

	const deleteProducts = () =>  {
		const productCurrentWarehouse = currentWarehouse.products
		const filterProducts = productCurrentWarehouse.filter(item => !checkProducts.includes(item))
		const filterCheckProducts = checkProducts.filter(item => !productCurrentWarehouse.includes(item))

		setCurrentWarehouse({...currentWarehouse, products: [...filterProducts]})
		setCheckProducts(filterCheckProducts)
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
						<button className={styles.editBtn} onClick={() => setIsEditProduct(true)}>
							Edite
						</button>}

						<button className={styles.editBtn} onClick={deleteProducts}>
							Delete
						</button>
						{
							isMove &&
							<button className={styles.moveBtn}>
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