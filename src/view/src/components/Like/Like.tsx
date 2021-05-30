import React, {FC, MouseEvent} from 'react';
import {LikeFilled, LikeOutlined} from '@ant-design/icons';
import {Typography} from "antd";

import classNames from './style.module.css';

interface IProps {
    liked: boolean;
    quantity: number;
    like: (event: MouseEvent) => void;
}

const Like: FC<IProps> = ({liked,quantity, like}) => {
    return (
        <span onClick={like}>
            <Typography.Text style={{opacity: quantity > 0 ? 1 : 0}}
                             className={classNames.quantity}>
                {quantity || null}
            </Typography.Text>
            {liked ? <LikeFilled/> : <LikeOutlined/>}
      </span>
    );
};

export default Like;