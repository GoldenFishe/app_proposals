import React, {FC, useCallback} from 'react';
import {useDispatch} from "react-redux";
import {Button, Form, Input, Select, Upload} from "antd";

import {createProposal} from "../Proposal/actions";

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
        <Form layout="vertical"
              onFinish={onFinish}
              requiredMark={false}>
            <Form.Item label="Title"
                       name="title"
                       rules={[{required: true, message: 'Please enter title'}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="Description"
                       name="description"
                       rules={[{required: true, message: 'Please enter description'}]}>
                <Input.TextArea/>
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
                <Button type="primary" htmlType="submit">Create Proposal</Button>
            </Form.Item>
        </Form>
    );
};

export default CreateProposal;