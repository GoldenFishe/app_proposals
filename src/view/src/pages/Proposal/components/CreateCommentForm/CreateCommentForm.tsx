import React, {FC} from "react";
import {Button, Form, Input, Upload} from "antd";

interface IProps {
    onCreate: ({comment, attachments}: { comment: string, attachments: { file: File, fileList: File[] } }) => void
}

const CreateCommentForm: FC<IProps> = ({onCreate}) => {
    return (
        <Form onFinish={onCreate}
              labelCol={{span: 8}}
              wrapperCol={{span: 9}}
              requiredMark={false}>
            <Form.Item label="Comment"
                       name="comment"
                       rules={[{required: true, message: 'Please enter comment'}]}>
                <Input.TextArea/>
            </Form.Item>
            <Form.Item label="Attachments"
                       name="attachments">
                <Upload listType="picture-card"
                        beforeUpload={() => false}
                        showUploadList={true}>
                    +
                </Upload>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 9}}>
                <Button type="primary" htmlType="submit">Leave comment</Button>
            </Form.Item>
        </Form>
    )
};

export default CreateCommentForm;