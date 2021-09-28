import {AxiosError} from "axios";
import {addNotification} from "../pages/Main/actions";
import {store} from "../store";

export function formatDateTime(dateTime: string) {
    const dateTimeFormat: Record<string, "numeric"> = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    };
    return new Intl.DateTimeFormat(undefined, dateTimeFormat).format(new Date(dateTime));
}

type Combiner = {
    [className: string]: boolean
}

export function classNamesCombiner(combiner: Combiner) {
    return Object.entries(combiner).reduce((combinedClassName, combine) => {
        const [className, active] = combine;
        if (active) combinedClassName += ` ${className}`;
        return combinedClassName;
    }, '');
}

export function handleNetworkError(err: AxiosError) {
    store.dispatch(addNotification({type: 'error', text: err.message}))
}