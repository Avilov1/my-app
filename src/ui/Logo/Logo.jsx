import styles from "./Logo.module.scss";

export const Logo = () => {
    return (
        <div className={styles.logo}>
            <img src={'./img/logo.svg'} alt={'logo'}/>
            <span>speedline</span>
        </div>
    )
}