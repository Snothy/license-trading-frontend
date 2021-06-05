import React from 'react';

import Loading3QuartersOutlined from '@ant-design/icons/Loading3QuartersOutlined';     //awaiting staff (pending)
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined'; //in progress (chatting with staff)
import CheckOutlined from '@ant-design/icons/CheckOutlined';       //resolved
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';  
import PlusCircleFilled from '@ant-design/icons/PlusCircleFilled';  
import MinusCircleOutlined from '@ant-design/icons/MinusCircleOutlined';  
import MinusCircleFilled from '@ant-design/icons/MinusCircleFilled';  

import { status, json } from '../utilities/requestHandlers';


function getIcon (theme, iconType) {
  let Icon;

  if (theme === 'filled') {
    if (iconType === 'AcceptApplication') {
      Icon = PlusCircleFilled
    } else if (iconType === 'RejectApplication') {
        Icon = MinusCircleFilled
    } 
  } else if (theme === 'outlined') {
    if (iconType === 1) {
      Icon = Loading3QuartersOutlined
    } else if (iconType === 2) {
      Icon = CheckOutlined
    } else if (iconType === 3) {
      Icon = CloseCircleOutlined
    } else if (iconType === 'AcceptApplication') {
      Icon = PlusCircleOutlined
    } else if (iconType === 'RejectApplication') {
        Icon = MinusCircleOutlined
    }
  }

  return Icon;
}
  
class ApplicationCardIcon extends React.Component {
  constructor(props){  
    super(props);  
    this.state = {
      selected: props.selected
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(){
    if (this.props.viewOnly) {
      alert('No permission to perform this action.');
      return;
    }
    //reverse the selected state with every click
    this.setState({selected: !this.state.selected});
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.selected !== this.state.selected) {
      //run the handler passed in by the parent component
      this.props.handleToggle(this.state.selected);
    }
  }

  render(){
    const theme = this.state.selected ? 'filled' : 'outlined';
    const iconType = this.props.type;
    //console.log(iconType);
    const Icon = getIcon(theme, iconType);
    //console.log(Icon);

    //return a span that contains the desired icon
    //and a space then the counter
    //if the icon is clicked we will run onClick handler
    
    return (
      <span>
        <Icon
          onClick={this.onClick}
          style={{color:'steelblue'}} />
      </span>
    );
  }
}

export default ApplicationCardIcon;