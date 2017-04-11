import React, { Component } from "react"
import {
    TextInput,
    View,
    DatePickerIOS,
    TouchableOpacity,
    Picker,
    StyleSheet,
    Image,
    Text

} from 'react-native';

import { TabNavigator,StackNavigator } from 'react-navigation';
import {Button} from 'react-native-elements';




//auto_code_simple_index_import_begin



//auto_code_simple_index_import_end


const ScreenMain = StackNavigator({
//auto_code_simple_index_screen_begin
    
//auto_code_simple_index_screen_begin
    LayoutMain: { screen: LayoutMain }
});


class LayoutMain extends React.Component {
  static navigationOptions = {
      title:"Welcome",
    header: {
       visible: false,
     }
  };
  render() {
    return <ScreenTab screenProps={{fatherNav:this.props.navigation}} ></ScreenTab>;
  }
} 





const ScreenTab = TabNavigator({
  PagesMainFrontIndex: {
    screen: PagesMainFrontIndex,
  },
  PagesMainUserIndex: {
    screen: PagesMainUserIndex,
  },
}, {
  tabBarOptions: {
    activeTintColor: '#e91e63',
    
  },
});




/**
 * main
 */
export  default class  extends Component{
    
  render() {
    return (
      <ScreenMain />
    );
  }
}


