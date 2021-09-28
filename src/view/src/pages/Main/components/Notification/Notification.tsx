import React, {FC, MutableRefObject, useCallback, useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";

import {INotification} from "../../../../types/INotification";
import {classNamesCombiner} from "../../../../utils";
import {removeNotification} from "../../actions";
import classNames from './style.module.css';

const TIMEOUT = 5000;

const Notification: FC<INotification> = ({id, type, text}) => {
    const className = classNamesCombiner({
        [classNames.notification]: true,
        [classNames.error]: type === 'error',
        [classNames.message]: type === 'message',
    })
    const ref = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useDispatch();
    const onRemove = useCallback(() => {
        dispatch(removeNotification(id));
    }, [dispatch, id]);
    useEffect(() => {
        setTimeout(() => {
            ref.current.classList.add(classNames.disappear);
            ref.current.addEventListener('animationend', onRemove, {once: true});
        }, TIMEOUT);
    }, [dispatch, onRemove])
    return (
        <div className={className} ref={ref}>
            {text}
        </div>
    );
};

export default Notification;