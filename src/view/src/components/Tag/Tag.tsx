import React, {FC} from "react";

import {ITag as TagInterface} from "../../types/IProposal";
import Paragraph from "../Paragraph";
import {classNamesCombiner} from "../../utils";
import classNames from "./style.module.css";

interface ITag {
    tag: TagInterface,
    active?: boolean
}

const Tag: FC<ITag> = ({tag, active=true}) => {
    const className = classNamesCombiner({
        [classNames.tag]: true,
        [classNames.active]: Boolean(active)
    });
    return (
        <div className={className}>
            <Paragraph size="m">{`#${tag.tag}`}</Paragraph>
        </div>
    );
};

export default Tag;