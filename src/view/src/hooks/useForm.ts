import {useRef} from "react";

type Params<Field extends string> = Record<Field, { type: "text" | "file" | "password", setter?: (value: string) => void }>

export function useForm<Field extends string>(params: Params<Field>) {
    const formData = useRef(new FormData());
    const handleInput = (field: Field) => (value: string | FileList) => {
        const stringValue = value as string;
        const fileListValue = value as FileList;
        const param = params[field];
        if (param.type === "file") {
            setAttachmentsToFormData(fileListValue, field, formData.current);
        } else {
            setDataToFormData(field, stringValue, formData.current);
            setDataToFormData("tagsIds", JSON.stringify([0, 1]), formData.current);
            if (param.setter) {
                param.setter(stringValue);
            }
        }
    }
    const reset = () => {
        formData.current = new FormData();
        for (let field in params) {
            const param = params[field];
            if (param.setter) {
                param.setter("");
            }
        }
    }
    return {formData: formData.current, handleInput, reset};
}

function setDataToFormData(title: string, value: string, formData: FormData) {
    formData.has(title) ? formData.set(title, value) : formData.append(title, value);
}

function setAttachmentsToFormData(fileList: FileList, field: string, formData: FormData) {
    for (let i = 0; i < fileList.length; i++) {
        const file = fileList.item(i) as File;
        formData.append(field, file);
    }
}