import React, {FC, MouseEvent} from "react";

type Icons = "like" | "dislike" | "comment" | "inbox" | "cross" | "user";

interface IIcon {
    icon: Icons;
    size?: number;
    className?: string;
    onClick?: (e: MouseEvent) => void;
}

const Icon: FC<IIcon> = ({icon, size = 15, className, onClick}) => {
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
        case "user":
            i = "👤";
            break;
        default:
            return null;
    }
    return <span className={className}
                 onClick={onClick}
                 style={{fontSize: `${size}px`}}>{i}</span>
};

export default Icon;