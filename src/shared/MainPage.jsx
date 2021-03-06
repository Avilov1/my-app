import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {WarehousesProvider} from "../context/warehousesContext";
import {useAuthContext} from "../context/authContext";
import {privateRoutes} from "../routes";
import {EditPanelWarehouses} from "../UI/editPanelWarehouses";
import {EditPanelProduct} from "../UI/editPanelProduct";
import styles from "./styles/MainPage.module.scss"
import {Logo, Navbar} from "../UI";
import {
	NotificationsSvg,
	ProfileSvg, SearchSvg,
	SettingsSvg,
} from "../UI/assets/svg";

export const MainPage = () => {
	const {setIsAuth} = useAuthContext()

	return (
		<WarehousesProvider>
			<div className={styles.wrapper}>
				<aside className={styles.leftSide}>
					<div className={styles.logo}>
						<Logo/>
					</div>
					<Navbar/>
				</aside>
				<div className={styles.rightSide}>
					<header className={styles.mainHeader}>
						<div className={styles.searchInput}>
							<SearchSvg/>
							<input placeholder={"Search"}/>
						</div>
						<ul>
							<li><span onClick={() => setIsAuth(false)}>Log out</span></li>
							<li><ProfileSvg/></li>
							<li><SettingsSvg/></li>
							<li><NotificationsSvg/></li>
						</ul>
					</header>
					<main>
						<Switch>
							{privateRoutes.content.map(route =>
								<Route
									path={route.path}
									component={route.component}
									exact={route.exact}
									key={route.path}
								/>
							)}
							<Redirect to={"/warehouses"}/>
						</Switch>
					</main>
				</div>
				<EditPanelWarehouses/>
				<EditPanelProduct isMove/>
			</div>
		</WarehousesProvider>
	)
}