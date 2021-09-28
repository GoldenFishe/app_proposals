import React, {FC, useCallback} from "react";
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {routes} from "../../../../constants/routes";
import {signOut} from "../../actions";
import Protected from "../../../../components/Protected";
import Title from "../../../../components/Title";
import Paragraph from "../../../../components/Paragraph";
import classNames from "./style.module.css";

const Header: FC = () => {
    const {pathname} = useLocation();
    const user = useSelector((state: RootState) => state.profile.userProfile);
    const dispatch = useDispatch();
    const onSignOut = useCallback(() => dispatch(signOut()), [dispatch])
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
                    <Link to={routes.signIn.path}
                          className={classNames.link}>
                        Sign-In
                    </Link>
                )}
                {!isUserAuthorized && (
                    <Link to={routes.signUp.path}
                          className={classNames.link}>
                        Sign-Up
                    </Link>
                )}
                <Protected>
                    <Link to={routes.createProposal.path}
                          className={classNames.link}>
                        Create Proposal
                    </Link>
                </Protected>
                <Protected>
                    <Link to={routes.profile.getLinkPath(user?.id || '')}
                          className={classNames.link}>
                        Profile
                    </Link>
                </Protected>
                <Protected>
                    <Paragraph size="m"
                               onClick={onSignOut}
                               className={classNames.link}>
                        Sign Out
                    </Paragraph>
                </Protected>
            </div>
        </header>
    );
};

export default Header;