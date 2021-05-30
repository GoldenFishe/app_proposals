import React, {FC, MouseEvent} from 'react';
import {DislikeFilled, DislikeOutlined} from '@ant-design/icons';
import {Typography} from "antd";

import classNames from './style.module.css';

interface IProps {
    disliked: boolean;
    quantity: number;
    dislike: (event: MouseEvent) => void;
}

const Dislike: FC<IProps> = ({disliked, quantity, dislike}) => {
    return (
        <span onClick={dislike}>
            <Typography.Text style={{opacity: quantity > 0 ? 1 : 0}}
                             className={classNames.quantity}>
                {quantity || null}
            </Typography.Text>
            {disliked ? <DislikeFilled/> : <DislikeOutlined/>}
      </span>
    );
};

export default Dislike;