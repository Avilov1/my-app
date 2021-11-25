import styles from './styles/ModalContainer.module.scss'
import {CargoSuccessSvg, CloseFormSvg, MoveSuccessSvg} from "./assets/svg";

export const ModalContainer = (props) => {
	const {isVisible, toggleIsVisible, title, children, onSubmit, doneImg} = props
	const modalClass = [styles.modal]

	isVisible && modalClass.push(styles.active)

	return (
		<div className={modalClass.join(" ")} onClick={toggleIsVisible}>
			<div className={styles.modalWrapper}
			     onClick={(e) => e.stopPropagation()}>
				<div className={styles.modalHeader}>
					<div className={styles.closeIcon}>
						<CloseFormSvg onClick={toggleIsVisible}/>
					</div>
					<div>

					</div>
					{
						doneImg &&
						<div className={styles.doneImg}>
							{doneImg === "move" && <MoveSuccessSvg width={224} height={224}/>}

							{doneImg === "edit" || "add" && <CargoSuccessSvg width={224} height={224}/>}
						</div>

					}
					<span>{title}</span>
				</div>
				<div className={styles.modalContent}>
					<form onSubmit={onSubmit}>
						{children}
					</form>
				</div>
			</div>
		</div>
	)
}