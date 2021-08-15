import React, {FC, useState} from "react";
import {useDispatch} from "react-redux";

import {createProposal} from "../Proposal/actions";
import {useForm} from "../../hooks/useForm";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Uploader from "../../components/Uploader/Uploader";
import Form from "../../components/Form/Form";
import Textarea from "../../components/Textarea/Textarea";
import {proposal} from "../../constants/constraints";
import classNames from "./style.module.css";
import TagInput from "../../components/TagInput/TagInput";

const CreateProposal: FC = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const {formData, handleInput, reset} = useForm<"title" | "description" | "attachments[]">({
        "title": {
            type: "text",
            setter: setTitle
        },
        "description": {
            type: "text",
            setter: setDescription
        },
        "attachments[]": {
            type: "file"
        }
    })
    const onCreateProposal = () => {
        formData.set('tags', JSON.stringify(tags));
        dispatch(createProposal(formData));
        reset();
    };
    return (
        <div className={classNames.container}>
            <Form onSubmit={onCreateProposal}>
                <Input label="Title"
                       value={title}
                       required
                       minLength={proposal.title.minLength}
                       maxLength={proposal.title.maxLength}
                       onChange={handleInput("title")}/>
                <TagInput label="Tags"
                          value={tags}
                          onChange={setTags}/>
                {/*<Input label="Topic"*/}
                {/*       value={topic}*/}
                {/*       required*/}
                {/*       onChange={handleInput("topic")}/>*/}
                <Textarea label="Description"
                          value={description}
                          required
                          minLength={proposal.description.minLength}
                          maxLength={proposal.description.maxLength}
                          onChange={handleInput("description")}/>
                <Uploader label="Attachments"
                          multiple
                          onChange={handleInput("attachments[]")}/>
                <Button type="submit">
                    Create proposal
                </Button>
            </Form>
        </div>
    );
};

export default CreateProposal;