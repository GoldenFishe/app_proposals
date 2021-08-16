import React, {FC, FormEvent, useState} from "react";

import {useForm} from "../../../../hooks/useForm";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import TextareaWithFormatting from "../../../../components/TextareaWithFormatting/TextareaWithFormatting";

interface ICreateCommentForm {
    onCreate: (formData: FormData) => void;
}

const CreateCommentForm: FC<ICreateCommentForm> = ({onCreate}) => {
    const [comment, setComment] = useState("");
    const {formData, handleInput, reset} = useForm<"commentText" | "attachments[]">({
        commentText: {
            type: "text",
            setter: setComment
        },
        "attachments[]": {
            type: "file"
        }
    });
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(e);
        // onCreate(formData);
        // reset();
    }
    return (
        <form onSubmit={handleSubmit}>
            <TextareaWithFormatting label="Comment"
                                    value={comment}
                                    onChange={handleInput("commentText")}/>
            {/*<Button type="submit">Leave comment</Button>*/}
        </form>
    )
};

export default CreateCommentForm;