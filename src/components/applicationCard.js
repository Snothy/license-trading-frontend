import React from 'react';
import { Card } from 'antd';
//import { Link } from "react-router-dom";

const { Meta } = Card;

class ApplicationCard extends React.Component {

  constructor(props) {
    super(props);
  }

  //implement the status as an image?
  render() {
    //console.log(this.props);
    //console.log(this.props);
    const imgList = this.props.images.map(image => {
        return (
            <p>{image.imageURL}</p>
        );
    })
    return (
        <Card
            style={{ width: 450 }}
            hoverable={true}>
            <Meta title={this.props.application.company_name} />
            <p>Address: {this.props.application.address}</p>
            <p>Contact: {this.props.application.telephone_number}</p>
            <p>Status: {this.props.application.status}</p>
            <p>Images: {imgList}</p>
        </Card>
    )

  }
}

export default ApplicationCard; 