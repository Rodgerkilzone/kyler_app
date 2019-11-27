import React, {Component} from 'react';

import { View, Text,StatusBar } from 'react-native';
import Chat_Activity from './Chat_Activity';
export default class Details_Activity extends Component {

  static navigationOptions =
  {
     title: 'Details Activity',
  };

  render() {

    return (

      <View style={{ flex: 1,paddingTop:StatusBar.currentHeight}}>
        {/* <StatusBar backgroundColor={'red'}
                               barStyle="light-content"/> */}
<Chat_Activity/>

</View>

    );
  }
}