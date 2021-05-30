import React, {FC, useCallback} from 'react';
import {useDispatch} from "react-redux";
import {Button, Form, Input, Layout, Select, Upload} from "antd";

import {createProposal} from "../Proposal/actions";
import classNames from './style.module.css';

const CreateProposal: FC = () => {
    const dispatch = useDispatch();
    const onFinish = useCallback(values => {
        const {title, description, topicId, attachments} = values;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('topicId', topicId);
        attachments.fileList.map((file: any) => formData.append('attachments[]', file.originFileObj));
        dispatch(createProposal(formData));
    }, [dispatch]);
    return (
        <Layout.Content className={classNames.container}>
            <Form layout="vertical"
                  onFinish={onFinish}
                  className={classNames.form}
                  requiredMark={false}>
                <Form.Item label="Title"
                           name="title"
                           rules={[{required: true, message: 'Please enter title'}]}>
                    <Input placeholder="Short description"/>
                </Form.Item>
                <Form.Item label="Description"
                           name="description"
                           rules={[{required: true, message: 'Please enter description'}]}>
                    <Input.TextArea rows={3}
                                    autoSize
                                    placeholder="Tell details about your idea"/>
                </Form.Item>
                <Form.Item label="Topic"
                           name="topicId"
                           rules={[{required: true, message: 'Please select topic'}]}>
                    <Select>
                        <Select.Option value="1">Frontend</Select.Option>
                        <Select.Option value="2">Backend</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Attachments"
                           name="attachments">
                    <Upload listType="picture-card"
                            beforeUpload={() => false}
                            showUploadList={true}>
                        +
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Create proposal</Button>
                </Form.Item>
            </Form>
        </Layout.Content>
    );
};

export default CreateProposal;