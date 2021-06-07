import React from 'react';
import { Card } from 'antd';
import { Link } from "react-router-dom";
import RolesCardIcon from './rolesCardIcon';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';

const { Meta } = Card;

class RolesCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        selected: false
      };
    this.handleRemove = this.handleRemove.bind(this);
  }

  static contextType = UserContext;


  handleRemove() {
    fetch(`https://opera-ski-3000.codio-box.uk/api/roles/${this.props.ID}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.context.user.token 
        } 
    })
    .then(status)
    .then(json)
    .then(data => {
        //console.log(data);
        alert("Role removed");
        
    })

    .catch(err => {
        console.log("Error updating status", err);
        alert("Unsuccessful");
        return
    });
    this.props.isNotRendered(this.props.ID);
    }



  //implement the status as an image?
  render() {
    //console.log(this.props);
    return (
        
            <Card
                style={{ width: 450 }}
                hoverable={true}
                actions={[
                    <Link to={{ pathname: `/roles/${this.props.ID}/update`, state:{
                        role: {name: this.props.name, description: this.props.description}
                        } }}>
                    <RolesCardIcon type={'UpdateRole'}
                     id={this.props.ID}/>
                     </Link>,
                    <RolesCardIcon type="RemoveRole"
                        handleToggle={this.handleRemove} id={this.props.ID} selected={this.state.selected}/>
                  ]}
                  >
                <Link to = {`roles/${this.props.ID}`} >
                    <Meta title={this.props.name} />
                    <p>Description: {this.props.description}</p>
                </Link>
            </Card>
    );
  }
}

export default RolesCard; 