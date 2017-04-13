
import React, { Component } from 'react';

export default class RootSuperPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return(
        this.rootRender()
    )
  }
  //此方法用于被子集覆盖  无实际逻辑操作
  rootRender(){
    return null;
  }

}
