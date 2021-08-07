import React, {FC, FormEvent, useState} from 'react';
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {signUp} from "./actions";
import Title from "../../components/Title";
import Input from "../../components/Input";
import {useForm} from "../../hooks/useForm";
import Button from "../../components/Button";
import {user as userConstraints} from "../../constants/constraints";
import classNames from "../SignIn/style.module.css";

const SignUp: FC = () => {
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
                <Button type="submit" fullWidth>Create account</Button>
            </form>
        </div>
    );
};

export default SignUp;