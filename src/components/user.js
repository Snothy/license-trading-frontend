import React from 'react';
import { useParams } from 'react-router-dom';

function User(props) {
    let { id } = useParams();
    return (
        <>
        <h1>User {id} </h1>
        <p>user data</p>
        </>
    );
}

export default User;