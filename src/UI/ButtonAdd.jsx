import styles from "./styles/ButtonAdd.module.scss"
import {PlusSvg} from "./assets/svg";

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