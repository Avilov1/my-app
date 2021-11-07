import {AccountsSvg, CardsSvg, ChatSvg, ContactsSvg, HomeSvg, WarehousesSvg} from "./assets/svg";
import styles from "./styles/Navbar.module.scss"
import {NavLink} from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li><NavLink to={"/home"}><HomeSvg />Home</NavLink></li>
                <li><NavLink to={"/warehouses"}><WarehousesSvg />Warehouses</NavLink></li>
                <li><NavLink to={"/account"}><AccountsSvg />Account</NavLink></li>
                <li><NavLink to={"/cards"}><CardsSvg />Cads</NavLink></li>
                <li><Navbar to={"/contacts"}><ContactsSvg />Contacts</Navbar></li>
                <li><Navbar to={"/chat"}><ChatSvg />Chat</Navbar></li>
            </ul>
        </nav>
    )
}