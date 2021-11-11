import classnames from "classnames";
import styles from "./styles/Checkbox.module.scss"
import {CheckboxIconSvg} from "./assets/svg";
import {useWarehousesContext} from "../context/warehousesContext";
import {useEffect, useState} from "react";

export const CheckboxProduct = ({isActive, setActive, id}) => {
	console.log("render box")

	const {checkProducts, setCheckbox} = useWarehousesContext()

	const classNames = classnames(styles.border, {[styles.active]: isActive})

	useEffect(() => {
		if (checkProducts.some(prod => prod.id === id)) {
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