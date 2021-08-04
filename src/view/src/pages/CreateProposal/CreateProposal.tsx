import React, {FC, FormEvent, useState} from "react";
import {useDispatch} from "react-redux";

import {createProposal} from "../Proposal/actions";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {useForm} from "../../hooks/useForm";
import classNames from "./style.module.css";
import Uploader from "../../components/Uploader/Uploader";

const CreateProposal: FC = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [topic, setTopic] = useState("");
    const {formData, handleInput, reset} = useForm<"title" | "description" | "topic" | "attachments">({
        "title": {
            type: "text",
            setter: setTitle
        },
        "description": {
            type: "text",
            setter: setDescription
        },
        "topic": {
            type: "text",
            setter: setTopic
        },
        "attachments": {
            type: "file"
        }
    })
    const onCreateProposal = (e: FormEvent) => {
        e.preventDefault();
        dispatch(createProposal(formData));
        reset();
    };
    return (
        <form className={classNames.form}
              onSubmit={onCreateProposal}>
            <Input label="Title"
                   value={title}
                   onChange={handleInput("title")}/>
            <Input label="Description"
                   value={description}
                   onChange={handleInput("description")}/>
            <Input label="Topic"
                   value={topic}
                   onChange={handleInput("topic")}/>
            <Uploader label="Attachments"
                      multiple
                      onChange={handleInput("attachments")}/>
            <Button type="submit">
                Create proposal
            </Button>
        </form>
    );
};

export default CreateProposal;