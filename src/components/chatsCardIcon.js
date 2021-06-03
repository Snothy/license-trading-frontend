import React from 'react';

import Loading3QuartersOutlined from '@ant-design/icons/Loading3QuartersOutlined';     //awaiting staff (pending)
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'; //in progress (chatting with staff)
import CheckOutlined from '@ant-design/icons/CheckOutlined';       //resolved
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';  
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';  
import UserContext from '../contexts/user';

import { status, json } from '../utilities/requestHandlers';

function getIcon (theme, iconType) {
    let Icon;
  
    if (theme === 'filled') {
      if (iconType === 'statusResolved') {
        Icon = CheckCircleFilled
      } 
    } else if (theme === 'outlined') {
      if (iconType === 1) {
        Icon = Loading3QuartersOutlined
      } else if (iconType === 2) {
        Icon = QuestionCircleOutlined
      } else if (iconType === 3) {
        Icon = CheckOutlined
      } else if (iconType === 'statusResolved') {
        Icon = CheckCircleOutlined
      }
    }
  
    return Icon;
  }
  
class ChatsCardIcon extends React.Component {
  constructor(props){  
    super(props);
    this.state = {
        selected: props.selected,
        viewOnly: true
      };
      this.onClick = this.onClick.bind(this);
  }


  componentDidMount() {
    if (this.context.user.isAdmin || this.context.user.isStaff) { //not admin or staff => cant "resolve" the chat
        //console.log(this.context.user.isAdmin || this.context.user.isStaff);
        //console.log(this.state.viewOnly)
        this.setState( { viewOnly: false } )
        return
    }
  }
  

  componentDidUpdate(prevProps, prevState){
    if (prevState.selected !== this.state.selected) {
        //run the handler passed in by the parent component
        this.props.handleToggle(this.state.selected);
      }

  }

    static contextType = UserContext; //define user context for class


  onClick(){
    if (this.state.viewOnly) {
      console.log('This icon is view only: preventing update');
      return;
    }
    //reverse the selected state with every click
    this.setState({selected: !this.state.selected});
  }


  render(){
    const theme = this.state.selected ? 'filled' : 'outlined';
    const iconType = this.props.type;
    //console.log(iconType);
    const Icon = getIcon(theme, iconType);
    //console.log(Icon);
    //console.log('a');
    //console.log(Icon);
    //const Icon = MessageFilled//getIcon(iconType);

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

export default ChatsCardIcon;