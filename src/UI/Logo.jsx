import styles from "./styles/Logo.module.scss";
import logo from "./assets/svg/logo.svg"

export const Logo = () => {
	return (
		<div className={styles.logo}>
			<img
				src={logo}
				alt={"logo"}
				width={143}/>

			<span>
				speedline
			</span>
		</div>
	)
}