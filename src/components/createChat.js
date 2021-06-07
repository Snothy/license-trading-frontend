import React from 'react';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';

class CreateChat extends React.Component {

    static contextType = UserContext; //define user context for class
    
    componentDidMount() {
        fetch('https://opera-ski-3000.codio-box.uk/api/chats/', {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + this.context.user.token 
            }        
        })
        .then(status)
        .then(json)
        .then(data => {
            alert("Chat created")
            console.log(data);
        })
        .catch(error => {
            alert("Creating chat failed");
            console.log(error);
        });  
    };
    
    

    



    render() {
        return (
        <>
        </>
        );
    };
};

export default CreateChat;
