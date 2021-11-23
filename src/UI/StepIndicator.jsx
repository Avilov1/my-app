import styles from "./styles/StepIndicator.module.scss"
import classnames from "classnames";

export const StepIndicator = ({step}) => {
	let step1 = step === 1
	let step2 = step === 2
	let step3 = step === 3

	const classStep1 = classnames(styles.circle, {[styles.active] : step1})
	const classStep2 = classnames(styles.circle, {[styles.active] : step2})
	const classStep3 = classnames(styles.circle, {[styles.active] : step3})

	return (
		<div className={styles.wrapper}>


			<div className={styles.lineContain}>
				<div className={styles.line}/>
			</div>


			<div className={classStep1}>
				1
			</div>

			<div className={styles.lineContain}>
				<div className={styles.line}/>
			</div>

			<div className={classStep2}>
				2
			</div>

			<div className={styles.lineContain}>
				<div className={styles.line}/>
			</div>

			<div className={classStep3}>
				3
			</div>

			<div className={styles.lineContain}>
				<div className={styles.line}/>
			</div>

		</div>
	)
}