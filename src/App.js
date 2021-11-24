import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {useAuthContext} from "./context/authContext";
import {privateRoutes, publicRoutes} from "./routes";
import './App.css';

function App() {
	const {isAuth} = useAuthContext()

	return (
		<div>
			{
				isAuth ?
					<Switch>
						{privateRoutes.main.map(route =>
							<Route
								path={route.path}
								component={route.component}
								exact={route.exact}
								key={route.path}
							/>
						)}
						<Redirect to={"/"}/>
					</Switch>
					:
					<Switch>
						{publicRoutes.map(route =>
							<Route path={route.path} component={route.component} exact={route.exact} key={route.path}/>
						)}
						<Redirect to={"/login"}/>
					</Switch>
			}
		</div>
	)
}

export default App;
