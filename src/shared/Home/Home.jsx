import styles from './Home.module.scss'
import {Logo} from "../../ui/Logo/Logo";

export const Home = () => {
    const nav = ['Home', 'Service', 'Clients', 'Contact']

    return (
        <div className={styles.wrapper}>
            <div className={styles.leftSide}>
                <div className={styles.container}>
                    <div className={styles.headerLeft}>
                        <Logo />
                        <div className={styles.navbar}>
                            <ul>
                                {nav.map(item => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                    <div className={styles.slogan}>
                        We will deliver your cargo exactly on time
                    </div>
                    <div className={styles.valueCompany}>
                        For us, goods are our most valuable assets. <br/>
                        So that with certainty we can provide the <br/>
                        best service for your goods
                    </div>
                    <button className={styles.startedBtn}>
                        Get Started
                    </button>
                    <div className={styles.scrollDown}>
                        <img src={"./img/scrollEclipse.svg"} alt={'scrollImage'}/>
                        <span>Scroll down</span>
                    </div>
                </div>
            </div>
            <div className={styles.rightSide}>
                <div className={styles.headerLeft}>
                    <div className={styles.authorize}>
                        <button className={styles.login}>Log in</button>
                        <button className={styles.singUp}>Sing up</button>
                    </div>
                </div>
            </div>
            <img src={'./img/track1.png'} alt={'track'} className={styles.track}/>
        </div>
    )
}