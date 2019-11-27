// import React from 'react';
// import { Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, } from 'react-navigation';
import React, { Component } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import BlurOverlay, { closeOverlay, openOverlay } from 'react-native-blur-overlay';
import {
    View,
    Text,Button,
    KeyboardAvoidingView,
    Image,ScrollView,
    Dimensions, Platform,StatusBar,TouchableWithoutFeedback,
  StyleSheet, TouchableHighlight
} from "react-native";
import Account_Detail from './Account_Detail'
const { width } = Dimensions.get('window');
import Profile_Options from './Profile_Options'
import Register_Activity from './Register_Activity';
import Profile_settings from './Profile_settings'
import Login_Activity from './Login_Activity';
// import BottomTabs from './BottomTabs';
import { Permissions } from 'expo-permissions';
import { captureScreen  } from 'react-native-view-shot'
import Constants from 'expo-constants'
const { height } = Dimensions.get('window');
import {
  // createAppContainer,
  // createBottomTabNavigator,
  createDrawerNavigator,
  // createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation'
import Main from './main';
import Modal from 'react-native-modal';
import Profile_Activity from './Profile_Activity';
import Match_Activity from './Match_Activity';
import { createMaterialTopTabNavigator } from 'react-navigation'
import {
    Ionicons,
    MaterialIcons } from '@expo/vector-icons';
class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
            </View>
        );
    }
}
var SCREEN_WIDTH=Dimensions.get('window').width;
 
var SCREEN_HEIGHT=Dimensions.get('window').height
  const Users=[
  {id:'1',uri:require('../assets/profile.jpg')},
  {id:'2',uri:require('../assets/profile2.jpg')},
  {id:'3',uri:require('../assets/profile3.jpg')},
  {id:'4',uri:require('../assets/profile4.jpg')},
  {id:'5',uri:require('../assets/profile5.jpg')},
  {id:'6',uri:require('../assets/profile6.jpg')},
  {id:'7',uri:require('../assets/profile7.jpg')},
  {id:'8',uri:require('../assets/profile8.jpg')},
  {id:'9',uri:require('../assets/profile9.jpg')},
  {id:'10',uri:require('../assets/profile10.jpg')},
    { id: '11', uri: require('../assets/profile.jpg') },
    { id: '12', uri: require('../assets/profile2.jpg') },
    { id: '13', uri: require('../assets/profile3.jpg') },
    { id: '14', uri: require('../assets/profile4.jpg') },
    { id: '15', uri: require('../assets/profile5.jpg') },
    { id: '16', uri: require('../assets/profile6.jpg') },
    { id: '17', uri: require('../assets/profile7.jpg') },
    { id: '18', uri: require('../assets/profile8.jpg') },
    { id: '19', uri: require('../assets/profile9.jpg') },
    { id: '20', uri: require('../assets/profile10.jpg') }
]

class SettingsScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = { modalVisible: false, viewImage: "", imageUrI:""}
  }
  renderBlurChilds() {
        return (
          <View style={styles.image}>
              <Text >bjbvjhv</Text>
 
              <Text>bvhgchvhjv</Text>
          </View>
        );
    }
    renderImage=()=>{
        return Users.map((item,i)=>{ 
          return (<View key={item.id}
               style={{ width:SCREEN_WIDTH*33/100,height:SCREEN_WIDTH*33/100,marginBottom:2 }} 
          ><TouchableHighlight onPress={() => {
            this.setState({ viewImage: item.uri })
                         
              openOverlay();
              
                  this.setState({ modalVisible:true})
                  // this.capture();
                             }}
              delayLongPress={50} 
              onPressOut={()=>{
                // this.setState({ modalVisible: false })
                
              }}
                             >

              
                               <Image source={item.uri} 
                                     style={{height:'100%',width:'100%'}} />
                       </TouchableHighlight></View>)
         }).reverse()
    }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async capture(e) {
    // console.log('e', takeSnapshotAsync)
    captureScreen({
      format: "jpg",
      quality: 0.8
    }).then(
      
      uri => {console.log("Image saved to", uri),this.setState({imageUrI:uri}) },
      error => console.error("Oops, snapshot failed", error)
    );
    // try {
    //   let result = await takeSnapshotAsync(this.refs.camera, {
    //     format: 'png',
    //     result: 'file',
    //   });

    //   this.setState({ imageUrI: result })
    //   // this.upload(result)

    //   console.log( result)
    // } catch (err) {
    //   console.log('err', err)
    // }


  }
    render() {
        return (

          <View style={{ flex: 1}}>
            {/* <StatusBar backgroundColor="#891030" barStyle="light-content"
            /> */}
           {/* <StatusBar hidden={false}  barStyle="dark-content" /> */}
            {/* <StatusBar hidden={false}  /> */}
            <View style={{ width: "100%", height: 50,padding:0,paddingLeft:20,elevation:4,alignItems:'center',flexDirection:'row',backgroundColor:"#f8f8f8"}}><Text style={{fontSize:18,lineHeight:50}}>Explore</Text></View>
            <Modal
              style={{ flex: 1,justifyContent: 'center',alignItems: 'center' }}
            animationIn="zoomIn"
            animationOut="zoomOut"
            animationInTiming={200}
            animationOutTiming={200}
            // backgroundColor="transparent"
            // animationOut="fadeOut"
            backdropColor="rgba(255,255,255,1)"
          onBackdropPress={() => this.setState({ modalVisible: false })}
          onBackButtonPress={() => this.setState({ modalVisible: false })}
          // style={{position: 'absolute',elevation:4,overflow:'hidden',backgroundColor:'white',width:200,top:60,right:3,borderRadius:5,margin:0,justifyContent:'flex-start',alignContent:'flex-start'}}
          isVisible={this.state.modalVisible}
              // style={{ position: 'absolute', bottom: 0 }}
              // style={{top:0.00*width }}
  //            customBackdrop={
  //   <TouchableWithoutFeedback onPress={()=>{this.setState({modalVisible:false})}}>
  //     <View style={{ flex: 1,backgroundColor:"white" }} >   
  //         <Image source={{uri:this.state.imageUrI}}
  //                            style={{position:'absolute',opacity:1,alignSelf:'flex-start', resizeMode: 'contain',flex:1,top:-0.5*StatusBar.currentHeight,left:0,width:width,height:height,alignContent:'center',justifyContent:'center'}} blurRadius={10} />
            
  //            </View>
  //   </TouchableWithoutFeedback>
  // }
              >

            
              {/* <Image source={require('../assets/profile.jpg')}
                style={{ position: 'absolute', alignSelf: 'center', flex: 1, width: '100%', height: SCREEN_WIDTH, alignContent: 'center', justifyContent: 'center' }} blurRadius={5} /> */}
          
              <View style={{backgroundColor: "transparent",width:0.90*width,height:1.20*width,borderRadius:10,overflow:"hidden",elevation:4 }}>
                <View style={{height:40,backgroundColor:"white",width:0.90*width,paddingLeft:10}}><Text style={{lineHeight:40,fontSize:15}}>Mercy Emma</Text></View>
                <Image source={this.state.viewImage} style={{ resizeMode: 'cover', width: null, height: null, flex: 1,}} />
              {/* <Text>hello</Text> */}
              <View style={{height:50,backgroundColor:"white",width:0.90*width,flexDirection:"row",alignItems:"center"}}>
<TouchableHighlight onPress={()=>{console.log("hello")}}
                    underlayColor="#e5e5e5" style={{width:"25%",height:50,flexDirection:"row",alignItems:"center",justifyContent:"center"}}><View ><Ionicons name="md-bookmark" size={24} style={{ fontSize: 28, color: 'black' ,lineHeight:50}} /></View></TouchableHighlight>
<TouchableHighlight  onPress={()=>{console.log("hello")}} underlayColor="#e5e5e5" style={{width:"25%",height:50,flexDirection:"row",alignItems:"center",justifyContent:"center"}}><View ><Ionicons name="md-chatboxes" size={24} style={{ fontSize: 28, color: '#696969' ,lineHeight:50}} /></View></TouchableHighlight>
<TouchableHighlight  onPress={()=>{console.log("hello")}} underlayColor="#e5e5e5" style={{width:"25%",height:50,flexDirection:"row",alignItems:"center",justifyContent:"center"}}><View ><Ionicons name="md-person" size={24} style={{ fontSize: 28, color: '#696969' ,lineHeight:50}} /></View></TouchableHighlight>
                  <TouchableHighlight onPress={() => { console.log("hello") }} underlayColor="#e5e5e5" style={{ width: "25%", height:50,flexDirection:"row",alignItems:"center",justifyContent:"center"}}><View ><Ionicons name="md-heart" size={24} style={{ fontSize: 28, color: 'red' ,lineHeight:50}} /></View></TouchableHighlight>

              </View>
              </View>




              </Modal>
              <ScrollView style={{ flex: 1, }}>
              <View style={{flex:1,display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',paddingTop:5}}>
              {this.renderImage()}
                <BlurOverlay
                  radius={14}
                  downsampling={2}
                  brightness={-200}
                  onPress={() => {
                    closeOverlay();
                  }}
                  customStyles={{ alignItems: 'center', justifyContent: 'center' }}
                  blurStyle="dark"
                  children={this.renderBlurChilds()}
                />
              </View>
          </ScrollView>
          
            </View>
        );
    }
}
import { GiftedChat } from 'react-native-gifted-chat';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class SettingsScreen1 extends React.Component {
  
   state = {
    messages: []
  };

componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
   render() {
        return (
            // <View><KeyboardAvoidingView>
            <View style={{flex: 1}}>
            <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
            
          />{Platform.OS === 'android' ? <KeyboardSpacer /> : null }
      </View>  
        //   </KeyboardAvoidingView></View>
          
           
            // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            //     <Text>Settings!</Text>
            // </View>
        );
    }
}
    const Tabs = createBottomTabNavigator(
        {
            Main: {
                // passProps: {...route.passProp },
                screen: Main,
                navigationOptions: {
                    tabBarLabel: 'Find',
        
                    tabBarIcon: (props, focused ) => (
                        <Ionicons name="md-search" size={24} 
                            // color={focused  ? 'gray' : 'red'}
                         />
                    )
                }
            },
            // SettingsScreen: {
            //     screen: SettingsScreen,
            //     navigationOptions: {
            //         tabBarLabel: 'Explore',
            //         tabBarIcon: () => (
            //             <Ionicons name="md-search" size={24} />
            //         )
            //     }
            // },
            Match_Activity: {
                screen: Match_Activity,
                navigationOptions: {
                    tabBarLabel: 'Chats',
                    tabBarIcon: () => (
                        <Ionicons name="md-people" size={24} />
                    )
                }
            },
            Profile_Activity: {
                screen: Profile_Activity,
                navigationOptions: {
                    tabBarLabel: 'Profile',
                    tabBarIcon: () => (
                        <Ionicons name="md-person" size={24} />
                    )
                }
            }
        },
        
        {
          defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              const { routeName } = navigation.state;
              if (routeName === 'Home') {
                return (
                  <Image
                    source={ require('./assets/profile.jpg') }
                    style={{ width: 20, height: 20, }} />
                );
              } else {
                return (
                  <Image
                    source={ require('./assets/profile2.jpg') }
                    style={{ width: 20, height: 20 }} />
                );
              }
            },
          }),
          tabBarOptions: {
            activeTintColor: '#DC143C',
            inactiveTintColor: '#263238',
          },
        }
      );

//  import Login_Activity from './Login_Activity';
class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };
}
  // import Register_Activity from './Register_Activity';
// const AppStack = createStackNavigator({ MainApp: MainApp });
const gtx = createStackNavigator({ Tabs: Tabs, Profile_Options: Profile_Options, Account_Detail: Account_Detail },
  {
   
    headerMode: 'none',
    
  });
const MainApp=createSwitchNavigator(
  {
    // AuthLoading: AuthLoadingScreen,
    App: gtx,
    Login_Activity:Login_Activity,
    Register_Activity: Register_Activity,
    Profile_settings:Profile_settings
  },
  {
    initialRouteName: 'App',
  }
)
export default createAppContainer(MainApp);
//       const App = createSwitchNavigator({
//   //
//   MainApp: MainApp,
//   Login_Activity: Login_Activity,
//   // BottomTabs: BottomTabs
// });

      // export default createAppContainer(App);
// export default MainApp;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});