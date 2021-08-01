import React, {FC} from "react";

type Icons = "like" | "dislike" | "comment";

interface IIcon {
    icon: Icons
}

const Icon: FC<IIcon> = ({icon}) => {
    switch (icon) {
        case "like":
            return <>👍</>;
        case "dislike":
            return <>👎</>;
        case "comment":
            return <>💬</>
        default:
            return null;
    }
};

export default Icon;