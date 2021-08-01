import React, {FC, FormEvent, useState} from 'react';
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {signUp} from "./actions";
import Title from "../../components/Title";
import Input from "../../components/Input";
import {useForm} from "../../hooks/useForm";
import Button from "../../components/Button";
import classNames from "../SignIn/style.module.css";

const SignUp: FC = () => {
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
    const onSignUp = (e: FormEvent) => {
        e.preventDefault();
        const login = formData.get("login") as string;
        const password = formData.get("password") as string;
        dispatch(signUp(login, password));
        reset();
    }
    if (user !== null) return <Redirect to="/"/>;
    return (
        <div className={classNames.container}>
            <Title level={5}>Join Proposals</Title>
            <Title level={2}>Create your account</Title>
            <form onSubmit={onSignUp}
                  className={classNames.form}>
                <Input label="Login"
                       value={login}
                       onChange={handleInput("login")}/>
                <Input label="Password"
                       value={password}
                       onChange={handleInput("password")}/>
                <Button type="submit">Create account</Button>
            </form>
        </div>
    );
};

export default SignUp;