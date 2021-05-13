import React, {FC, useCallback} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Input, Select} from "antd";

import {createProposal} from "../Proposal/actions";
import {RootState} from "../../rootReducer";

const CreateProposal: FC = () => {
    const dispatch = useDispatch();
    const proposal = useSelector((state: RootState) => state.proposal.data);
    const onFinish = useCallback(({title, description, topicId}) => {
        dispatch(createProposal({title, description, topicId}));
    }, [dispatch]);
    //if (proposal !== null) return <Redirect to={`/proposals/${proposal.id}`}/>;
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
            <Form.Item>
                <Button type="primary" htmlType="submit">Create Proposal</Button>
            </Form.Item>
        </Form>
    );
};

export default CreateProposal;