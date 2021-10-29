import styles from './ModalBtn.module.scss'

export const ModalButton = (props) => {
    const {text, onClick} = props

    return <button className={styles.btn} onClick={onClick} >{text}</button>

}