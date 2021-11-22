import {useWarehousesContext} from "../context/warehousesContext";
import {warehouseApi} from "../services/http/warehouseApi";
import styles from "./styles/EditPanel.module.scss"
import {MoveSvg, SelectSvg} from "./assets/svg";

export const EditPanelWarehouses = ({isMove = false}) => {
	const {checkWarehouses, warehouses, setWarehouses, setCheckWarehouses, setIsEditWarehouse} = useWarehousesContext()

	const deleteWarehouses = async () => {
		const removeWarehouses = warehouses.filter(item => checkWarehouses.includes(item))

		try {
			for (const warehouse of removeWarehouses) {
				await warehouseApi.remove(warehouse._id)
			}
			const {data} = await warehouseApi.getAll()
			setWarehouses(data)
			setCheckWarehouses([])

		} catch (e) {
			alert(e)
		}
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
						{
							(countCheck === 1) &&
							<button
								className={styles.editBtn}
								onClick={() => setIsEditWarehouse(true)}>
								Edite
							</button>
						}
						<button
							className={styles.editBtn}
							onClick={deleteWarehouses}>
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