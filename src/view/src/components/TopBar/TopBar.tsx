import React, {FC} from 'react';
import {Link, useLocation} from 'react-router-dom';

const TopBar: FC = () => {
    const location = useLocation();
    if (/\/sign-(in|up)/.test(location.pathname)) return null;
    return (
        <div>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
        </div>
    );
};

export default TopBar;