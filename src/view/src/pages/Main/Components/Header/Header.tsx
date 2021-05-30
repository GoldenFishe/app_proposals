import React, {FC} from 'react';
import {Link, useLocation} from "react-router-dom";
import {Layout, Typography} from "antd";

import Protected from "../../../../components/Protected";
import classNames from "./style.module.css";

interface IProps {
    visibleSignLinks: boolean;
    userId: number | undefined;
}

const Header: FC<IProps> = ({visibleSignLinks, userId}) => {
    const {pathname} = useLocation();
    if (pathname === '/sign-in') return null;
    return (
        <Layout.Header className={classNames.header}>
            <div className={classNames.titles}>
                <Typography.Title level={1}>Proposals</Typography.Title>
                <Typography.Title level={5}>Make your digital dream come true</Typography.Title>
            </div>
            <div className={classNames.links}>
                {visibleSignLinks && <Link to="/sign-in">Sign-In</Link>}
                {(visibleSignLinks && pathname !== '/sign-up') && <Link to="/sign-up">Sign-Up</Link>}
                <Link to="/proposals">Proposals</Link>
                <Protected><Link to="/proposals/create">Create Proposal</Link></Protected>
                <Protected><Link to={`/profile/${userId}`}>Profile</Link></Protected>
            </div>
        </Layout.Header>
    );
};

export default Header;