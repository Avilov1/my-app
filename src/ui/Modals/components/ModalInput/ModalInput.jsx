import styles from "./ModalInput.module.scss";
import classnames from "classnames";

export const ModalInput = ({type, label, placeholder, value, onChange, isError = false, messageError}) => {
    const inputClass = classnames({[styles.error]: isError})

    return (
        <div className={styles.container}>
            <div>
                {
                    messageError
                        ? <label className={styles.messageError} htmlFor={type}>{messageError}</label>
                        : <label htmlFor={type}>{label}</label>
                }
            </div>
            <div>
                <input className={inputClass} type={type} placeholder={placeholder} value={value} onChange={onChange}/>
            </div>
        </div>
    )
}