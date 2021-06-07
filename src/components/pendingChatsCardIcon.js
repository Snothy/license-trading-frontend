import React from 'react';

import Loading3QuartersOutlined from '@ant-design/icons/Loading3QuartersOutlined';     //awaiting staff (pending)
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'; //in progress (chatting with staff)
import CheckOutlined from '@ant-design/icons/CheckOutlined';       //resolved
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';  
import PlusCircleFilled from '@ant-design/icons/PlusCircleFilled';  

function getIcon (theme, iconType) {
  let Icon;

  if (theme === 'filled') {
    if (iconType === 'changeStatus') {
      Icon = PlusCircleFilled
    } 
  } else if (theme === 'outlined') {
    if (iconType === 1) {
      Icon = Loading3QuartersOutlined
    } else if (iconType === 2) {
      Icon = QuestionCircleOutlined
    } else if (iconType === 3) {
      Icon = CheckOutlined
    } else if (iconType === 'changeStatus') {
      Icon = PlusCircleOutlined
    }
  }

  return Icon;
}
  
class PedningChatsCardIcon extends React.Component {
  constructor(props){  
    super(props);  
    this.state = {
      selected: props.selected
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(){
    if (this.props.viewOnly) {
      console.log('This icon is view only: preventing update');
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
        {this.state.count}
      </span>
    );
  }
}

export default PedningChatsCardIcon;