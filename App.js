import React,{Component} from 'react';
import { StyleSheet, Text, View, PanResponder, Animated,Image,ImageBackground } from 'react-native';
// import Main from './screens/main';
// import HomeScreenTabNavigator from './screens/tabNav';
import Login_Activity from './screens/Login_Activity'
import { PersistGate } from 'redux-persist/integration/react';
// import Register_Activity from './screens/Register_Activity'
import MainApp from   './screens/BottomTabs';       
import {Provider} from 'react-redux'
import { store, persistor } from './redux/store'
import Profile_settings from './screens/Profile_settings';  
import Profile_Options from './screens/Profile_Options';       
export default class App extends React.Component{
  render() {
  return (

<Provider store={store} >
<PersistGate loading={null} persistor={persistor}>
        <MainApp/>
   </PersistGate>
   </Provider> 
   

  
    
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
