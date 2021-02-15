import React, {FC} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Proposals from '../Proposals/Proposals';
import CreateProposal from '../CreateProposal/CreateProposal';
import Proposal from '../Proposal/Proposal';

const Main: FC = () => {
    return (
        <BrowserRouter>
            <Switch>
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
    );
};

export default Main;