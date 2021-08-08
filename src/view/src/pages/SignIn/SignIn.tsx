import React, {FC, FormEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, Link} from "react-router-dom";

import {signIn} from "./actions";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import {useForm} from "../../hooks/useForm";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {user as userConstraints} from "../../constants/constraints";
import {routes} from "../../constants/routes";
import classNames from "./style.module.css";

const SignIn: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.profile.userProfile);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const {handleInput, formData, reset} = useForm<"login" | "password">({
        login: {
            type: "text",
            setter: setLogin
        },
        password: {
            type: "password",
            setter: setPassword
        }
    });
    const onSignIn = (e: FormEvent) => {
        e.preventDefault();
        const login = formData.get("login") as string;
        const password = formData.get("password") as string;
        dispatch(signIn(login, password));
        reset();
    }
    if (user !== null) return <Redirect to="/"/>;
    return (
        <div className={classNames.container}>
            <Title level={2}>Proposals</Title>
            <Title level={4}>Sign In</Title>
            <form onSubmit={onSignIn}
                  className={classNames.form}>
                <Input label="Login"
                       value={login}
                       required
                       minLength={userConstraints.login.minLength}
                       maxLength={userConstraints.login.maxLength}
                       onChange={handleInput("login")}/>
                <Input label="Password"
                       type="password"
                       value={password}
                       required
                       minLength={userConstraints.password.minLength}
                       maxLength={userConstraints.password.maxLength}
                       onChange={handleInput("password")}/>
                <Button type="submit" fullWidth>Sign In</Button>
            </form>
            <Paragraph size="m">New to Proposals? <Link to={routes.signUp.path}>Create an account.</Link></Paragraph>
        </div>
    )
};

export default SignIn;