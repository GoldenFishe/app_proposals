import React, {FC} from "react";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

import Protected from "../../../../components/Protected";
import Title from "../../../../components/Title";
import {routes} from "../../../../constants/routes";
import classNames from "./style.module.css";

const Header: FC = () => {
    const {pathname} = useLocation();
    const user = useSelector((state: RootState) => state.profile.userProfile);
    if (pathname === routes.signIn.path || pathname === routes.signUp.path) return null;
    const isUserAuthorized = user !== null;
    return (
        <header className={classNames.header}>
            <div className={classNames.titles}>
                <Link to={routes.proposals.path}>
                    <Title level={1}>Proposals</Title>
                </Link>
            </div>
            <div className={classNames.links}>
                {!isUserAuthorized && (
                    <Link to={routes.signIn.path}>Sign-In</Link>
                )}
                {!isUserAuthorized && (
                    <Link to={routes.signUp.path}>Sign-Up</Link>
                )}
                <Protected>
                    <Link to={routes.createProposal.path}>Create Proposal</Link>
                </Protected>
                <Protected>
                    <Link to={routes.profile.getLinkPath(user?.id || '')}>Profile</Link>
                </Protected>
            </div>
        </header>
    );
};

export default Header;