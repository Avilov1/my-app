import {AccountsSvg, CardsSvg, ChatSvg, ContactsSvg, HomeSvg, WarehousesSvg} from "./assets/svg";
import styles from "./styles/Navbar.module.scss"
import {NavLink} from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<ul>
				<li>
					<NavLink to={"/home"}><HomeSvg/>
						<span>Home</span>
					</NavLink>
				</li>
				<li>
					<NavLink to={"/warehouses"}>
						<WarehousesSvg/>
						<span>Warehouses</span>
					</NavLink>
				</li>
				<li>
					<NavLink to={"/account"}>
						<AccountsSvg/>
						<span>Account</span>
					</NavLink>
				</li>
				<li>
					<NavLink to={"/cards"}>
						<CardsSvg/>
						<span>Cads</span>
					</NavLink>
				</li>
				<li>
					<NavLink to={"/contacts"}>
					<ContactsSvg/>
					<span>Contacts</span>
				</NavLink>
				</li>
				<li>
					<NavLink to={"/chat"}>
						<ChatSvg/>
						<span>Chat</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}