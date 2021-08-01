import React, {FC} from 'react';
import Paragraph from "../../../../components/Paragraph";
import classNames from "../../../../components/Dislike/style.module.css";
import Icon from "../../../../components/Icon";

interface IComment {
    quantity: number
}

const Comment: FC<IComment> = ({quantity}) => {
    return (
        <span>
            <Paragraph style={{opacity: quantity > 0 ? 1 : 0}}
                       className={classNames.quantity}>
                {quantity || null}
            </Paragraph>
            <Icon icon="comment"/>
        </span>
    );
};

export default Comment;