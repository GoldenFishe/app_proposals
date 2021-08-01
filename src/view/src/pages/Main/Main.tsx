import React, {FC, useEffect} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import Header from "./Components/Header/Header";
import {getUser} from "./actions";
import {routes, defaultRoute} from "../../routes";
import classNames from "./style.module.css";

const Main: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.main.user);
    useEffect(() => {
        if (user !== null) {
            dispatch(getUser());
        }
    }, [user, dispatch]);
    return (
        <div className={classNames.container}>
            <BrowserRouter>
                <Header/>
                <Switch>
                    {Object.values(routes).map(route => <Route key={route.path}
                                                               path={route.path}
                                                               exact={route.exact}
                                                               component={route.component}/>)}
                    <Redirect to={defaultRoute}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default Main;