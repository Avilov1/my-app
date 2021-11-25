import styles from "./styles/ModalRadio.module.scss"

export const ModalRadio = ({label, checked}) => {
	return (
		<div className={styles.body}>
			<label className={checked ? styles.checked : ''}>{label}</label>

			<div className={styles.stroke}>
				{
					checked && <div className={styles.fill}/>
				}
			</div>
		</div>
	)
}