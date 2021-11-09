import {MoveSvg, SelectSvg} from "./assets/svg";
import styles from "./styles/EditPanel.module.scss"

export const EditPanel = ({count, onClickDelete, onCLickEdit, onClickMove, isEdit = true, isMove = true}) => {
	return (
		<div className={styles.container}>
			<div className={styles.leftSide}>
				<SelectSvg/>
				<span>
					Selected: {count}
				</span>
			</div>
			<div className={styles.rightSide}>
				{isEdit &&
				<button className={styles.editBtn}>
					Edite
				</button>}

				<button className={styles.editBtn}>
					Delete
				</button>
				{
					isMove &&
					<button className={styles.moveBtn}>
						Move
						<MoveSvg width={17} height={11}/>
					</button>
				}

			</div>
		</div>
	)
}