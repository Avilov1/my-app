import {useEffect} from "react";
import classnames from "classnames";
import styles from "./styles/Checkbox.module.scss"
import {CheckboxIconSvg} from "./assets/svg";
import {useWarehousesContext} from "../context/warehousesContext";


export const CheckboxWarehouse = ({isActive, setActive, _id}) => {

	const {checkWarehouses} = useWarehousesContext()

	const classNames = classnames(styles.border, {[styles.active]: isActive})

	useEffect(() => {
		if (checkWarehouses.some(warehouse => warehouse._id === _id)) {
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