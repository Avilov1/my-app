import styles from "./styles/ModalSelect.module.scss";
import classnames from "classnames";
import {useWarehousesContext} from "../context/warehousesContext";

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
							warehouses.find(warehouse => (warehouse.id == e.target.value))
						)
					}
				>
					<option disabled selected>Select a warehouse</option>
					{warehouses.filter(item => item.id !== currentWarehouse.id).map((warehouse) => (
						<option key={warehouse.id} value={warehouse.id}>
							{warehouse.title}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}


