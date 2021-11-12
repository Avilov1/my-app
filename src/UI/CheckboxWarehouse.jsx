import classnames from "classnames";
import styles from "./styles/Checkbox.module.scss"
import {CheckboxIconSvg} from "./assets/svg";
import {useWarehousesContext} from "../context/warehousesContext";
import {useEffect} from "react";

export const CheckboxWarehouse = ({isActive, setActive, id}) => {

	const {checkWarehouses} = useWarehousesContext()

	const classNames = classnames(styles.border, {[styles.active]: isActive})

	useEffect(() => {
		if (checkWarehouses.some(warehouse => warehouse.id === id)) {
			setActive(true)
		}
	}, [])

	return (
		<div onClick={(e) => e.stopPropagation()}>
			<div className={classNames} onClick={() => setActive(!isActive)}>
				<CheckboxIconSvg width={10} height={6} />
			</div>
		</div>
	)
}