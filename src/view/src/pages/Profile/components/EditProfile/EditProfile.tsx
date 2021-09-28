import React, {FC, useState} from 'react';
import {useDispatch} from "react-redux";

import {useForm} from "../../../../hooks/useForm";
import {updateProfile} from "../../actions";
import Form from "../../../../components/Form/Form";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import {IUser} from "../../../../types/IUser";
import classNames from "../../style.module.css";
import Avatar from "../../../../components/Avatar/Avatar";

interface IEditProfile {
    userProfile: IUser
}

const EditProfile: FC<IEditProfile> = ({userProfile}) => {
    const dispatch = useDispatch();
    const [login, setLogin] = useState(userProfile.login);
    const [username, setUsername] = useState(userProfile.username);
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
    const onSaveSettings = () => {
        dispatch(updateProfile(formData));
        reset();
    }
    return (
        <div className={classNames.container}>
            <Avatar src={userProfile.avatar} size="m" onEdit={handleInput("avatar")}/>
            <Form onSubmit={onSaveSettings}>
                <Input label="Login"
                       value={login}
                       onChange={handleInput("login")}/>
                <Input label="Username"
                       value={username}
                       onChange={handleInput("username")}/>
                <Input label="New password"
                       type="password"
                       value={password}
                       onChange={handleInput("password")}/>
                <Button type="submit">Save new settings</Button>
            </Form>
        </div>
    );
};

export default EditProfile;