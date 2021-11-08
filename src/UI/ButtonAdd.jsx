import {PlusSvg} from "./assets/svg";
import styles from "./styles/ButtonAdd.module.scss"

export const ButtonAdd = ({text, onClick}) => {
	return (
		<button
			className={styles.buttonAdd}
			onClick={onClick}>
			{text}
			<PlusSvg width={8} height={8}/>
		</button>
	)
}