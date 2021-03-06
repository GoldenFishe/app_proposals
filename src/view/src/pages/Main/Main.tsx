import React, {FC} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {useSelector} from "react-redux";

import TopBar from "../../components/TopBar/TopBar";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import {Proposals} from '../Proposals';
import CreateProposal from '../CreateProposal/CreateProposal';
import Proposal from '../Proposal/Proposal';
import {RootState} from "../../rootReducer";
import classNames from './style.module.css';

const Main: FC = () => {
    const user = useSelector((state: RootState) => state.main.user);
    return (
        <div className={classNames.container}>
            <BrowserRouter>
                <TopBar/>
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
        </div>
    );
};

export default Main;