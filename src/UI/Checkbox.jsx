import classnames from "classnames";
import styles from "./styles/Checkbox.module.scss"
import {CheckboxIconSvg} from "./assets/svg";

export const Checkbox = ({isActive, toggleIsActive}) => {
	const classNames = classnames(styles.border, {[styles.active]: isActive})

	return (
		<div onClick={(e) => e.stopPropagation()}>
			<div className={classNames} onClick={toggleIsActive}>
				<CheckboxIconSvg width={10} height={6} />
			</div>
		</div>

	)
}