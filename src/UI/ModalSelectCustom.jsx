import {useWarehousesContext} from "../context/warehousesContext";
import classnames from "classnames";
import {useToggle} from "../services";
import styles from "./styles/ModalSelectCustom.module.scss";
import {SelectIconSvg} from "./assets/svg";


export const ModalSelectCustom = ({setValue, value}) => {
	const {warehouses, currentWarehouse} = useWarehousesContext()

	const [isVisible, toggleIsVisible] = useToggle(false)

	const setItem = (item) => {
		setValue(item)
		toggleIsVisible()
	}

	const headerClass = classnames(styles.header, {[styles.active]: isVisible})

	return (
		<div className={styles.select}>
			<div className={headerClass} onClick={() => toggleIsVisible()}>
				{value
					? value.title
					:
					<span className={styles.selectTitle}>
						Select warehouse
					</span>
				}
				<SelectIconSvg/>
			</div>
			{
				isVisible &&
				<div className={styles.items}>
					{
						warehouses
							.filter(warehouse => warehouse._id !== currentWarehouse._id)
							.map(warehouse =>
								<div className={styles.item} onClick={() => setItem(warehouse)}>
										<span className={styles.selectTitle}>
												{warehouse.title}
										</span>
								</div>
							)
					}
				</div>
			}
		</div>
	)
}


