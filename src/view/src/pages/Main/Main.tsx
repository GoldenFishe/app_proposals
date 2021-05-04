import React, {FC, useEffect} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Layout} from "antd";

import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import {Proposals} from '../Proposals';
import CreateProposal from '../CreateProposal/CreateProposal';
import Proposal from '../Proposal/Proposal';
import {RootState} from "../../rootReducer";
import {getUser} from "./actions";

const Main: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.main.user);
    useEffect(() => {
        if (!user) dispatch(getUser());
    }, [user])
    return (
        <Layout >
            <BrowserRouter>
                <Switch>
                    <Route path="/sign-in">
                        <SignIn/>
                    </Route>
                    <Route path="/sign-up">
                        <SignUp/>
                    </Route>
                    <Route path="/proposals" exact>
                        <Proposals/>
                    </Route>
                    <Route path="/proposals/create">
                        <CreateProposal/>
                    </Route>
                    <Route path="/proposals/:id">
                        <Proposal/>
                    </Route>
                    <Redirect to="/proposals"/>
                </Switch>
            </BrowserRouter>
        </Layout>
    );
};

export default Main;