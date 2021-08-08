import React, {FC, useEffect} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import Header from "./components/Header/Header";
import Container from "../../components/Container/Container";
import {getUserProfile} from '../Profile/actions';
import {getTags} from "./actions";
import {routes, defaultRoute} from "../../constants/routes";

const Main: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.profile.userProfile);
    useEffect(() => {
        if (user === null) {
            dispatch(getUserProfile());
        }
    }, [user, dispatch]);
    useEffect(() => {
        dispatch(getTags());
    }, [dispatch])
    return (
        <Container>
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
        </Container>
    );
};

export default Main;