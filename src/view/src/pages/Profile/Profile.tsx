import React, {FC, FormEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {updateSettings} from "./actions";
import {useForm} from "../../hooks/useForm";
import Input from "../../components/Input";
import Button from "../../components/Button";

const Profile: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.main.user);
    const [login, setLogin] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {formData, handleInput, reset} = useForm<"login" | "username" | "password" | "avatar">({
        "login": {
            type: "text",
            setter: setLogin
        },
        "username": {
            type: "text",
            setter: setUsername
        },
        "password": {
            type: "password",
            setter: setPassword
        },
        "avatar": {
            type: "file"
        }
    });
    const onSaveSettings = (e: FormEvent) => {
        e.preventDefault();
        dispatch(updateSettings(formData));
        reset();
    }
    return (
        <form onSubmit={onSaveSettings}>
            <Input label="Login"
                   value={login}
                   onChange={handleInput("login")}/>
            <Input label="Username"
                   value={username}
                   onChange={handleInput("username")}/>
            <Input label="Password"
                   type="password"
                   value={password}
                   onChange={handleInput("password")}/>
            <Input label="Avatar"
                   type="file"
                   value={""}
                   onChange={handleInput("avatar")}/>
            <Button type="submit">Save new settings</Button>
            {user?.avatar && <img src={user.avatar} alt="User avatar"/>}
        </form>
    );
};

export default Profile;