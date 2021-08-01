import React, {FC} from "react";

type Icons = "like" | "dislike";

interface IIcon {
    icon: Icons
}

const Icon: FC<IIcon> = ({icon}) => {
    switch (icon) {
        case "like":
            return <>👍</>;
        case "dislike":
            return <>👎</>;
        default:
            return null;
    }
};

export default Icon;