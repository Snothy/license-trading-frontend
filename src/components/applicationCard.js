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
    //let imgList;
    //sconsole.log(imgList.length);
    //console.log(this.props.images);
    const imgList = this.props.images.map(image => {
        const imgUrl = "https://opera-ski-3000.codio-box.uk".concat(image.imageURL);
        //console.log(imgUrl);
        return (
            <img src={imgUrl}/>
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