import styles from './ModalContainer.module.scss'

export const ModalContainer = (props) => {
    const {isVisible, setIsVisible, title, children} = props
    const modalClass = [styles.modal]

    isVisible && modalClass.push(styles.active)

    const closeModal = () => setIsVisible(false)

    return (
            <div className={modalClass.join(' ')} onClick={closeModal}>
                <div className={styles.modalWrapper}
                     onClick={(e) => e.stopPropagation()}>
                    <div className={styles.modalHeader}>
                        <img src={"./img/closeFormIcon.svg"} onClick={closeModal} alt={"close"}/>
                        <span>{title}</span>
                    </div>
                    <div className={styles.modalContent}>
                        {children}
                    </div>
                </div>
            </div>
    )
}