import React, {FC, MouseEvent} from 'react';
import {DislikeFilled, DislikeOutlined} from '@ant-design/icons';

interface IProps {
    disliked: boolean;
    quantity: number;
    dislike: (event: MouseEvent) => void;
}

const Dislike: FC<IProps> = ({disliked, quantity, dislike}) => {
    return (
        <span onClick={dislike}>
            {quantity || null}
            {disliked ? <DislikeFilled/> : <DislikeOutlined/>}
      </span>
    );
};

export default Dislike;