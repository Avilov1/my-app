import styles from "./styles/MainPage.module.scss"
import {Logo, Navbar} from "../UI";
import {
    NotificationsSvg,
    ProfileSvg, SearchSvg,
    SettingsSvg,
} from "../UI/assets/svg";
import {useAuthContext} from "../context";

export const MainPage = () => {
    const {setIsAuth} = useAuthContext()

    return (
        <div className={styles.wrapper}>
            <aside className={styles.leftSide}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <Navbar />
            </aside>
            <div className={styles.rightSide}>
                <header className={styles.mainHeader}>
                    <div className={styles.searchInput}>
                        <SearchSvg />
                        <input placeholder={"Search"}/>
                    </div>
                    <ul>
                        <li><span onClick={() => setIsAuth(false)}>Log out</span></li>
                        <li><ProfileSvg /></li>
                        <li><SettingsSvg /></li>
                        <li><NotificationsSvg /></li>
                    </ul>
                </header>
                <main>

                </main>
            </div>
        </div>
    )
}