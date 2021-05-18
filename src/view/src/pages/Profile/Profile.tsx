import React, {FormEvent} from 'react';
import {useParams} from "react-router-dom";

import HttpClient from "../../httpClient";

const Profile = () => {
    const formData = new FormData();
    const {id} = useParams<{ id: string }>();
    return (
        <div>
            <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                HttpClient.post('/api/user/avatar', formData, true);
            }}>
                <input type="file" name="avatar" onChange={event => {
                    console.log(event);
                    console.log(event.target.files);
                    formData.append('avatar', event.target.files![0])
                }}/>
                <button type="submit">Submit</button>
            </form>
            <img src={`/resources/avatar/${id}`}/>
        </div>
    );
};

export default Profile;