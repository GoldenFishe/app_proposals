import React, {FC, useCallback} from 'react';
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Input, Layout, Typography} from "antd";

import {RootState} from "../../rootReducer";
import {signUp} from "./actions";
import classNames from "../SignIn/style.module.css";

type SignUnForm = {
    login: string;
    password: string;
}

const SignUp: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.main.user);
    const onFinish = useCallback(({login, password}: SignUnForm) => dispatch(signUp(login, password)), [dispatch]);
    if (user !== null) return <Redirect to="/"/>;

    return (
        <Layout.Content className={classNames.container}>
            <Typography.Title level={5}>Join Proposals</Typography.Title>
            <Typography.Title level={2}>Create your account</Typography.Title>
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
                    <Button type="primary"
                            htmlType="submit"
                            className={classNames.submitButton}>Create account</Button>
                </Form.Item>
            </Form>
        </Layout.Content>
    );
};

export default SignUp;