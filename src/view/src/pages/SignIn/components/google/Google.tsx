import React from 'react';

import classNames from "../../style.module.css";

const Google = () => {
    //@ts-ignore
    window.onSignIn = function (googleUser) {
        const profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }
    return (
        <div className="g-signin2" data-onsuccess="onSignIn"/>
    );
};

export default Google;