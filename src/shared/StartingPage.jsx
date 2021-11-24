import {useEffect} from "react";
import {Logo} from "../UI";
import {LoginModal, SingUpModal} from "./";
import {useAuthContext} from "../context/authContext";
import {useToggle} from "../services";
import styles from './styles/StartingPage.module.scss'
import {ScrollEllipseSvg} from "../UI/assets/svg";
import track1 from "../UI/assets/img/track1.png"

export const StartingPage = () => {
	const [isLoginVisible, toggleIsLoginVisible] = useToggle(false)
	const [isSingUpVisible, toggleIsSingUpVisible] = useToggle(false)
	const {setIsAuth} = useAuthContext()

	useEffect(() => {
		setIsAuth(false)
	}, [])

	const replaceAuthModal = () => {
		toggleIsSingUpVisible()
		toggleIsLoginVisible()
	}

	const nav = ['Home', 'Service', 'Clients', 'Contact']

	return (
		<>
			{
				isLoginVisible && <LoginModal
					isVisible={isLoginVisible}
					toggleIsVisible={toggleIsLoginVisible}
					replaceAuthModal={replaceAuthModal}/>
			}
			{
				isSingUpVisible && <SingUpModal
					isVisible={isSingUpVisible}
					toggleIsVisible={toggleIsSingUpVisible}
					replaceAuthModal={replaceAuthModal}/>
			}
			<div className={styles.wrapper}>
				<div className={styles.leftSide}>
					<div className={styles.container}>
						<div className={styles.headerLeft}>
							<Logo/>
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
							<ScrollEllipseSvg/>
							<span>Scroll down</span>
						</div>
					</div>

				</div>
				<div className={styles.rightSide}>
					<div className={styles.headerLeft}>
						<div className={styles.authorize}>
							<button className={styles.login} onClick={toggleIsLoginVisible}>
								Log in
							</button>
							<button className={styles.singUp} onClick={toggleIsSingUpVisible}>
								Sing up
							</button>
						</div>
					</div>
				</div>

				<img src={track1} alt={'track'} className={styles.track}/>

			</div>
		</>
	)
}