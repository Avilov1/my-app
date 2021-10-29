import styles from "./ModalInput.module.scss";

export const ModalInput = (props) => {
    const {type, label, placeholder, value, setValue} = props

    return (
        <div className={styles.container}>
            <div>
                <label htmlFor={type}>{label}</label>
            </div>
            <div>
                <input type={type} id={type} placeholder={placeholder}
                       value={value} onChange={setValue}/>
            </div>
        </div>
    )
}