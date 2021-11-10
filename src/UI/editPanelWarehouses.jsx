import {useWarehousesContext} from "../context/warehousesContext";

import {MoveSvg, SelectSvg} from "./assets/svg";
import styles from "./styles/EditPanel.module.scss"

export const EditPanelWarehouses = ({isMove = false}) => {
	const {checkWarehouses, warehouses, setWarehouses, setCheckWarehouses, setIsEditWarehouse} = useWarehousesContext()

	const deleteWarehouses = () =>  {
		const filterWarehouses = warehouses.filter(item => !checkWarehouses.includes(item))
		const filterCheckWarehouses = checkWarehouses.filter(item => !warehouses.includes(item))
		setWarehouses(filterWarehouses)
		setCheckWarehouses(filterCheckWarehouses)
	}

	const countCheck = checkWarehouses ? checkWarehouses.length : 0

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
						<button className={styles.editBtn} onClick={() => setIsEditWarehouse(true)}>
							Edite
						</button>}

						<button className={styles.editBtn} onClick={deleteWarehouses}>
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