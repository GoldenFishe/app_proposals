import React, {FC} from 'react';

import HttpClient from "../../httpClient";

const SignUp: FC = () => {
    return (
        <form>
            <label>Login</label>
            <input type="text"/>
            <label>Password</label>
            <input type="password"/>
            <label>Password Confirmation</label>
            <input type="password"/>
            <button type="submit">Sign In</button>
        </form>
    );
};

export default SignUp;