import React, {FC, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect, Link} from "react-router-dom";
import {Button, Form, Input, Layout, Typography} from "antd";

import {signIn} from "./actions";
import {RootState} from "../../rootReducer";
import classNames from './style.module.css';

type SignInForm = {
    login: string;
    password: string;
}

const SignIn: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.main.user);
    const onFinish = useCallback(({login, password}: SignInForm) => dispatch(signIn(login, password)), [dispatch]);
    if (user !== null) return <Redirect to="/"/>;

    return (
        <Layout.Content className={classNames.container}>
            <Typography.Title level={2}>Proposals</Typography.Title>
            <Typography.Title level={4}>Sign In</Typography.Title>
            <Form onFinish={onFinish}
                  className={classNames.form}
                  layout="vertical"
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
                <Form.Item>
                    <Button type="primary" htmlType="submit" className={classNames.submitButton}>Sign In</Button>
                </Form.Item>
            </Form>
            <Typography.Paragraph>New to Proposals? <Link to="/sign-up">Create an account.</Link></Typography.Paragraph>
        </Layout.Content>
    )
};

export default SignIn;