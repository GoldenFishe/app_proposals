import React, {FC, useCallback} from 'react';
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Input} from "antd";

import {RootState} from "../../rootReducer";
import {signUp} from "./actions";

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
                <Button type="primary" htmlType="submit">Sign Un</Button>
            </Form.Item>
        </Form>
    );
};

export default SignUp;