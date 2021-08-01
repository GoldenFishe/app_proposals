import React, {FC, MouseEvent} from "react";

import Paragraph from "../Paragraph";
import Icon from "../Icon";
import classNames from "./style.module.css";

interface ILike {
    liked: boolean;
    quantity: number;
    like: (event: MouseEvent) => void;
}

const Like: FC<ILike> = ({liked, quantity, like}) => {
    return (
        <span onClick={like}>
            <Paragraph style={{opacity: quantity > 0 ? 1 : 0}}
                       className={classNames.quantity}>
                {quantity || null}
            </Paragraph>
            {liked ? <Icon icon="like"/> : <Icon icon="like"/>}
        </span>
    );
};

export default Like;