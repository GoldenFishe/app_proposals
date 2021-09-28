import React, {FC, useEffect} from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import Container from "../../components/Container/Container";
import Notifications from "./components/Notifications/Notifications";
import Header from "./components/Header/Header";
import {getUserProfile} from '../Profile/actions';
import {addNotification, getTags} from "./actions";
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
            <Notifications/>
            <button onClick={() => dispatch(addNotification({type: 'message', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit'}))}>Add notification</button>
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