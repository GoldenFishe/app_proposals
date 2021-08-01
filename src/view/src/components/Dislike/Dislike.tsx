import React, {FC, MouseEvent} from "react";

import Paragraph from "../Paragraph";
import Icon from "../Icon";
import classNames from "./style.module.css";

interface IDislike {
    disliked: boolean;
    quantity: number;
    dislike: (event: MouseEvent) => void;
}

const Dislike: FC<IDislike> = ({disliked, quantity, dislike}) => {
    return (
        <span onClick={dislike}>
            <Paragraph style={{opacity: quantity > 0 ? 1 : 0}}
                       className={classNames.quantity}>
                {quantity || null}
            </Paragraph>
            {disliked ? <Icon icon="dislike"/> : <Icon icon="dislike"/>}
        </span>
    );
};

export default Dislike;