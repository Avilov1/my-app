import styles from './Home.module.scss'
import {Logo} from "../../components/Logo/Logo";

export const Home = () => {
    const nav = ['Home', 'Service', 'Clients', 'Contact']

    return (
        <div className={styles.wrapper}>
            <div className={styles.leftSide}>
                <div className={styles.header}>
                    <div className={styles.container}>
                        <Logo />
                        <div className={styles.navbar}>
                            <ul className={styles.navList}>
                                {nav.map(item => <li>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.header}>
                    right header
                </div>
            </div>
        </div>
    )
}