import React, {FC, FormEvent} from 'react';

import classNames from './style.module.css';

interface IForm {
    onSubmit: () => void;
}

const Form: FC<IForm> = ({onSubmit, children}) => {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit();
    }
    return (
        <form className={classNames.form} onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

export default Form;