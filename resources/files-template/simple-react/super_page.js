
import React, { Component } from 'react';
import {
    View
} from 'react-native';

export default class RootSuperPage extends Component {

  constructor(props) {
    super(props);
    //this.state = {};
  }

  render(){
    return(
      <View style={{flex:1}}>
      {this.state.rootAsyncShow===true?
      null
      :this.rootRender()
      }
      </View>
        
    )
  }

  /**
   * 设置延迟加载的页面进行展示
   * 
   * 
   * @memberOf RootSuperPage
   */
  rootAsyncShow(){
    this.setState({rootAsyncShow:false});
  }

  //此方法用于被子集覆盖  无实际逻辑操作
  rootRender(){
    return null;
  }

}
