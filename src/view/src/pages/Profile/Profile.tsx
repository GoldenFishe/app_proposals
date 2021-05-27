import React from 'react';
import {Button, Form, Input, Upload} from "antd";
import {useDispatch, useSelector} from "react-redux";

import {RootState} from "../../rootReducer";
import {updateSettings} from "./actions";
import {Settings} from "./types";

const Profile = () => {
    const dispatch = useDispatch();
    // const {id} = useParams<{ id: string }>();
    const user = useSelector((state: RootState) => state.main.user);
    const onFinish = (values: Settings) => {
        const formData = new FormData();
        if (values.login) formData.append('login', values.login);
        if (values.username) formData.append('username', values.username);
        if (values.password) formData.append('password', values.password);
        if (values.avatar) formData.append('avatar', values.avatar?.file as Blob);
        dispatch(updateSettings(formData));
    }
    return (
        <Form onFinish={onFinish}
              labelCol={{span: 8}}
              wrapperCol={{span: 9}}>
            <Form.Item label="Login"
                       name="login">
                <Input/>
            </Form.Item>
            <Form.Item label="Username"
                       name="username">
                <Input/>
            </Form.Item>
            <Form.Item label="Password"
                       name="password">
                <Input.Password/>
            </Form.Item>
            <Form.Item label="Avatar"
                       name="avatar">
                <Upload listType="picture-card"
                        beforeUpload={() => false}
                        showUploadList={false}>
                    +
                </Upload>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 9}}>
                <Button type="primary" htmlType="submit">Save new settings</Button>
            </Form.Item>
            {user?.avatar && <img src={user.avatar}/>}
        </Form>
    );
};

export default Profile;