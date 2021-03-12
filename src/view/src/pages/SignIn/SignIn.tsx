import React, {FC, FormEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

import {signIn} from "./actions";
import {RootState} from "../../rootReducer";

const SignIn: FC = () => {
    const dispatch = useDispatch();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector((state: RootState) => state.main.user);
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (login && password) dispatch(signIn(login, password))
    }
    if (user) return <Redirect to="/"/>
    return (
        <form onSubmit={handleSubmit}>
            <label>Login</label>
            <input type="text"
                   value={login}
                   required
                   onChange={e => setLogin(e.target.value)}/>
            <label>Password</label>
            <input type="password"
                   value={password}
                   required
                   onChange={e => setPassword(e.target.value)}/>
            <button type="submit">Sign In</button>
        </form>
    )
};

export default SignIn;