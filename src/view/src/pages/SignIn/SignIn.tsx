import React, {FC} from 'react';
import {Form, Input, Button, Checkbox} from 'antd';
import HttpClient from '../../httpClient';

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};
const SignIn: FC = () => {
    const onFinish = (values: any) => {
        const {login, password} = values;
        HttpClient.post('/api/user/sign-in', {login, password})
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form{...layout}
             name="basic"
             initialValues={{remember: true}}
             onFinish={onFinish}
             onFinishFailed={onFinishFailed}>
            <Form.Item label="Login"
                       name="login"
                       rules={[{required: true, message: 'Please input your login!'}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="Password"
                       name="password"
                       rules={[{required: true, message: 'Please input your password!'}]}>
                <Input.Password/>
            </Form.Item>
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SignIn;