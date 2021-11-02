import styles from './ModalContainer.module.scss'

export const ModalContainer = (props) => {
    const {isVisible, toggleIsVisible, title, children, onSubmit} = props
    const modalClass = [styles.modal]

    isVisible && modalClass.push(styles.active)

    return (
            <div className={modalClass.join(" ")} onClick={toggleIsVisible}>
                <div className={styles.modalWrapper}
                     onClick={(e) => e.stopPropagation()}>
                    <div className={styles.modalHeader}>
                        <img src={"./img/closeFormIcon.svg"} onClick={toggleIsVisible} alt={"close"}/>
                        <span>{title}</span>
                    </div>
                    <div className={styles.modalContent}>
                        <form onSubmit={onSubmit} noValidate={true}>
                            {children}
                        </form>
                    </div>
                </div>
            </div>
    )
}