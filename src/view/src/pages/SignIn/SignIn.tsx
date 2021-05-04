import React, {FC, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {Button, Form, Input} from "antd";

import {signIn} from "./actions";
import {RootState} from "../../rootReducer";

type SignInForm = {
    login: string;
    password: string;
}

const SignIn: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.main.user);
    const onFinish = useCallback(({login, password}: SignInForm) => dispatch(signIn(login, password)), [dispatch]);
    if (user) return <Redirect to="/"/>;

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
                <Button type="primary" htmlType="submit">Sign In</Button>
            </Form.Item>
        </Form>
    )
};

export default SignIn;