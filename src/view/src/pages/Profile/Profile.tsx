import React from 'react';
import {Button, Form, Input, UploadProps} from "antd";
import {useDispatch, useSelector} from "react-redux";

import {RootState} from "../../rootReducer";
import FileUploader from "../../components/FileUploader";
import {uploadAvatar} from "./actions";

const Profile = () => {
    const dispatch = useDispatch();
    // const {id} = useParams<{ id: string }>();
    const user = useSelector((state: RootState) => state.main.user);
    const onUpload: UploadProps["customRequest"] = (params) => {
        const formData = new FormData();
        formData.append('avatar', params.file);
        dispatch(uploadAvatar(formData));
    }
    const onFinish = () => {

    }
    return (
        <Form onFinish={onFinish}
              labelCol={{span: 8}}
              wrapperCol={{span: 9}}
              requiredMark={false}>
            <Form.Item label="Login"
                       name="login"
                       rules={[{required: true, message: 'Please input your username'}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="Password"
                       name="password"
                       rules={[{required: true, message: 'Please input your password'}]}>
                <Input.Password/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 9}}>
                <FileUploader action="/api/user/avatar"
                              onUpload={onUpload}/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 9}}>
                <Button type="primary" htmlType="submit">Save new settings</Button>
            </Form.Item>
            {user?.avatar && <img src={user.avatar}/>}
        </Form>
    );
};

export default Profile;