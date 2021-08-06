import React, {FC} from "react";

type Icons = "like" | "dislike" | "comment" | "inbox" | "cross";

interface IIcon {
    icon: Icons;
    size?: number;
}

const Icon: FC<IIcon> = ({icon, size = 15}) => {
    let i = null;
    switch (icon) {
        case "like":
            i = "👍";
            break;
        case "dislike":
            i = "👎";
            break;
        case "comment":
            i = "💬";
            break;
        case "inbox":
            i = "📥";
            break;
        case "cross":
            i = "❌";
            break;
        default:
            return null;
    }
    return <span style={{fontSize: `${size}px`}}>{i}</span>
};

export default Icon;