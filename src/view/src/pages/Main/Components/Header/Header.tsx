import React, {FC} from "react";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

import Protected from "../../../../components/Protected";
import Title from "../../../../components/Title";
import classNames from "./style.module.css";
import {routes} from "../../../../routes";

const Header: FC = () => {
    const {pathname} = useLocation();
    const user = useSelector((state: RootState) => state.main.user);
    if (pathname === "/sign-in") return null;
    return (
        <header className={classNames.header}>
            <div className={classNames.titles}>
                <Title level={1}>Proposals</Title>
                <Title level={5}>Make your digital dream come true</Title>
            </div>
            <div className={classNames.links}>
                {user === null && <Link to={routes.signIn.path}>Sign-In</Link>}
                {(user === null && pathname !== routes.signUp.path) && <Link to={routes.signUp.path}>Sign-Up</Link>}
                <Link to={routes.proposals.path}>Proposals</Link>
                <Protected><Link to={routes.createProposal.path}>Create Proposal</Link></Protected>
                <Protected><Link to={routes.profile.getLinkPath(user!.id)}>Profile</Link></Protected>
            </div>
        </header>
    );
};

export default Header;