import React from 'react';
import { useParams } from 'react-router-dom';

function Application(props) {
    let { id } = useParams();
    return (
        <>
        <h1>Application {id} </h1>
        <p>app data</p>
        </>
    );
}

export default Application;