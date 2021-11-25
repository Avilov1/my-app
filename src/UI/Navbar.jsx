import {AccountsSvg, CardsSvg, ChatSvg, ContactsSvg, HomeSvg, WarehousesSvg} from "./assets/svg";
import styles from "./styles/Navbar.module.scss"
import {NavLink} from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<ul>
				<NavLink to={"/home"} activeClassName={styles.active}>
					<li>
						<HomeSvg/>
						<span>Home</span>
					</li>
				</NavLink>

					<NavLink to={"/warehouses"} activeClassName={styles.active}>
						<li>
						<WarehousesSvg/>
						<span>Warehouses</span>
						</li>
					</NavLink>

					<NavLink to={"/account"} activeClassName={styles.active}>
						<li>
						<AccountsSvg/>
						<span>Account</span>
						</li>
					</NavLink>

					<NavLink to={"/cards"} activeClassName={styles.active}>
						<li>
						<CardsSvg/>
						<span>Cads</span>
						</li>
					</NavLink>

					<NavLink to={"/contacts"} activeClassName={styles.active}>
						<li>
						<ContactsSvg/>
						<span>Contacts</span>
						</li>
					</NavLink>

					<NavLink to={"/chat"} activeClassName={styles.active}>
						<li>
						<ChatSvg/>
						<span>Chat</span>
						</li>
					</NavLink>
			</ul>
		</nav>
	)
}