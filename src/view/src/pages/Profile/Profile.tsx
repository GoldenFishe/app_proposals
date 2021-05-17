import React, {FormEvent} from 'react';
import HttpClient from "../../httpClient";

const Profile = () => {
    const formData = new FormData();

    return (
        <div>
            <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                HttpClient.post('/api/user/avatar', formData);
            }}>
                <input type="file" name="avatar" onChange={event => {
                    console.log(event);
                    console.log(event.target.files);
                    formData.append('avatar', event.target.files![0])
                }}/>
                <button type="submit">Submit</button>
            </form>
            <img src="/api/user/avatar"/>
        </div>
    );
};

export default Profile;