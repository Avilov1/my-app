import {useWarehousesContext} from "../context/warehousesContext";
import styles from "./styles/ModalSelect.module.scss";

export const ModalSelect = ({type, label, setValue, value}) => {
	const {warehouses,currentWarehouse} = useWarehousesContext()

	return (
		<div className={styles.container}>
			<div>
						<label htmlFor={type}>
							{label}
						</label>
			</div>
			<div>
				<select
					onChange={(e) =>
						setValue(
							warehouses.find(warehouse => (warehouse._id == e.target.value))
						)
					}
				>
					<option disabled selected>Select a warehouse</option>
					{warehouses.filter(item => item._id !== currentWarehouse._id).map((warehouse) => (
						<option key={warehouse._id} value={warehouse._id}>
							{warehouse.title}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}


