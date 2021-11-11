import styles from './styles/ModalBtn.module.scss'

export const ModalButton = ({text, onClick, type}) => {

	return (
		<button
			className={styles.btn}
			onClick={onClick}
			type={type}>
			{text}
		</button>
	)
}