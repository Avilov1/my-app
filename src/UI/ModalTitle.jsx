import styles from "./styles/ModalTitle.module.scss"

export const ModalTitle = (props) => {
    const {title} = props

    return <h3 className={styles.title}>{title}</h3>

}