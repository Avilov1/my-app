import styles from "./styles/ModalCheckRow.module.scss"
import {CheckCircleSvg} from "./assets/svg";
import classnames from "classnames";

export const ModalCheckRow = ({children, isActive}) => {

	const leftSide = classnames(styles.leftSide, {[styles.active]: isActive})
	const container = classnames(styles.container, {[styles.active]: isActive})

	return (
		<div className={container}>
			<div className={leftSide}>
				{children}
			</div>
			{
				isActive &&
				<CheckCircleSvg width={24} height={24}/>
			}

		</div>
	)
}