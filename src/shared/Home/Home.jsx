import {Logo} from "../../ui/Logo/Logo";
import {LoginModal} from "../AuthModals/LoginModal";
import {SingUpModal} from "../AuthModals/SingUpModal";
import {useToggle} from "../../services/useToggle";

import styles from './Home.module.scss'

export const Home = () => {
    const [isLoginVisible, toggleIsLoginVisible] = useToggle(false)
    const [isSingUpVisible, toggleIsSingUpVisible] = useToggle(false)

    const replaceAuthModal = () => {
        toggleIsSingUpVisible()
        toggleIsLoginVisible()
    }

    const nav = ['Home', 'Service', 'Clients', 'Contact']

    return (
        <>
            {
                isLoginVisible && <LoginModal
                    isVisible={isLoginVisible} toggleIsVisible={toggleIsLoginVisible} replaceAuthModal={replaceAuthModal}/>
            }
            {
                isSingUpVisible &&  <SingUpModal
                    isVisible={isSingUpVisible} toggleIsVisible={toggleIsSingUpVisible} replaceAuthModal={replaceAuthModal} />
            }
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
                            <button className={styles.login} onClick={toggleIsLoginVisible}>Log in</button>
                            <button className={styles.singUp} onClick={toggleIsSingUpVisible}>Sing up</button>
                        </div>
                    </div>
                </div>
                <img src={'./img/track1.png'} alt={'track'} className={styles.track}/>
            </div>
        </>
    )
}