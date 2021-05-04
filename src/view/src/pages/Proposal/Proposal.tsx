import React, {FC, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import {Typography, Layout, List} from "antd";

import {useFetch} from "../../hooks";
import {IProposal} from "../../interfaces/IProposal";
import {IComment} from "../../interfaces/IComment";

const Proposal: FC = () => {
    const {id} = useParams<{ id: string }>();
    const proposal = useFetch<IProposal>(`/api/proposals/${id}`);
    const renderItem = useCallback((comment: IComment) => (
        <List.Item>{comment.comment}</List.Item>
    ), []);
    return (
        <Layout>
            <Typography.Title level={3}>{proposal?.title}</Typography.Title>
            <Typography.Paragraph>{proposal?.description}</Typography.Paragraph>
            <List dataSource={proposal?.comments}
                  renderItem={renderItem}
                  key="id"/>
        </Layout>
    )
};

export default Proposal;