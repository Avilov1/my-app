import React from "react";
import './App.css';
import {useAuthContext} from "./context";
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./routes";

function App() {
    const {isAuth} = useAuthContext()
    console.log(isAuth)

    return (
        <div>
            {
                isAuth ?
                <Switch>
                    {privateRoutes.map(route =>
                        <Route path={route.path} component={route.component} exact={route.exact} key={route.path}/>
                    )}
                    <Redirect to={"/"} />
                </Switch>
                :
                <Switch>
                    {publicRoutes.map(route =>
                        <Route path={route.path} component={route.component} exact={route.exact} key={route.path}/>
                    )}
                    <Redirect to={"/login"} />
                </Switch>
            }
        </div>
    )
}

export default App;
