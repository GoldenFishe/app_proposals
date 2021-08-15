import React, {FC} from "react";

import {ITag as TagInterface} from "../../types/IProposal";
import Paragraph from "../Paragraph";
import classNames from "./style.module.css";

interface ITag {
    tag: TagInterface
}

const Tag: FC<ITag> = ({tag}) => {
    return (
        <div className={classNames.tag}>
            <Paragraph size="s">{`#${tag.tag}`}</Paragraph>
        </div>
    );
};

export default Tag;