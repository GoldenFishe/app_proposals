import React, {FC, useEffect} from 'react';
import {BrowserRouter, Route, Switch, Redirect, Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Layout, Typography} from "antd";

import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import Proposals from '../Proposals/Proposals';
import CreateProposal from '../CreateProposal/CreateProposal';
import Proposal from '../Proposal/Proposal';
import {RootState} from "../../rootReducer";
import {getUser} from "./actions";

import classNames from './style.module.css';

const Main: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.main.user);
    useEffect(() => {
        if (!user) dispatch(getUser());
    }, [user, dispatch]);
    return (
        <Layout>
            <BrowserRouter>
                <Layout.Header className={classNames.header}>
                    <div className={classNames.titles}>
                        <Typography.Title level={1}>Proposals</Typography.Title>
                        <Typography.Title level={5}>Make your digital dream come true</Typography.Title>
                    </div>
                    <Link to="/proposals/create">Create Proposal</Link>
                </Layout.Header>
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