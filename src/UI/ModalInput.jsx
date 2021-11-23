import styles from "./styles/ModalInput.module.scss";
import classnames from "classnames";

export const ModalInput = ({
	                           type,
	                           label,
	                           placeholder,
	                           value,
	                           onChange,
	                           isError = false,
	                           messageError,
	                           disabled = false
                           }) => {
	const inputClass = classnames({[styles.error]: isError})

	return (
		<div className={styles.container}>
			<div>
				{
					isError
						?
						<label className={styles.messageError} htmlFor={type}>
							{messageError}
						</label>
						:
						<label htmlFor={type}>
							{label}
						</label>
				}
			</div>
			<div>
				<input
					disabled={disabled}
					className={inputClass}
					type={type} placeholder={placeholder}
					value={value}
					onChange={onChange}/>

			</div>
		</div>
	)
}