import React, {FC, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import ViewProfile from "./components/ViewProfile/ViewProfile";
import EditProfile from "./components/EditProfile/EditProfile";
import {getViewProfile, resetViewProfile} from "./actions";
import classNames from "./style.module.css";

const Profile: FC = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const {userProfile, viewProfile} = useSelector((state: RootState) => state.profile);
    const isUserProfile = Number(id) === userProfile?.id;
    useEffect(() => {
        if (!isUserProfile) {
            dispatch(getViewProfile(Number(id)));
        }
        return () => {
            dispatch(resetViewProfile())
        }
    }, [dispatch, id, isUserProfile])
    return (
        <div className={classNames.container}>
            {(isUserProfile && userProfile !== null) && <EditProfile userProfile={userProfile}/>}
            {(!isUserProfile && viewProfile !== null) && <ViewProfile viewProfile={viewProfile}/>}
        </div>
    );
};

export default Profile;