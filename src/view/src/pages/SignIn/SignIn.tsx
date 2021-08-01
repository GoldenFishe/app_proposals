import React, {FC, FormEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, Link} from "react-router-dom";

import {signIn} from "./actions";
import Title from "../../components/Title";
import Paragraph from "../../components/Paragraph";
import {useForm} from "../../hooks/useForm";
import Input from "../../components/Input";
import Button from "../../components/Button";
import classNames from "./style.module.css";
import {routes} from "../../routes";

const SignIn: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.main.user);
    const [login, setLogin] = useState("login");
    const [password, setPassword] = useState("password");
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
                       onChange={handleInput("login")}/>
                <Input label="Password"
                       value={password}
                       onChange={handleInput("password")}/>
                <Button type="submit">Sign In</Button>
            </form>
            <Paragraph>New to Proposals? <Link to={routes.signUp.path}>Create an account.</Link></Paragraph>
        </div>
    )
};

export default SignIn;