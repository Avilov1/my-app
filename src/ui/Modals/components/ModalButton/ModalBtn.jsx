import styles from './ModalBtn.module.scss'

export const ModalButton = (props) => {
    const {text, onClick, type} = props

    return <button className={styles.btn} onClick={onClick} type={type}>{text}</button>

}