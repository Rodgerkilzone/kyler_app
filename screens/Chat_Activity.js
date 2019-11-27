import React from 'react';
import ImageLoad from 'react-native-image-placeholder';
import { Modal, Alert, Text, Platform, View, StatusBar, Image, Dimensions, TouchableOpacity, TouchableHighlight, ScrollView, KeyboardAvoidingView } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
// import { ScrollView } from 'react-native-gesture-handler';
var SCREEN_WIDTH=Dimensions.get('window').width;
 
var SCREEN_HEIGHT=Dimensions.get('window').height;
import {createStackNavigator} from 'react-navigation';
import { GiftedChat } from 'react-native-gifted-chat';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class Screen2 extends React.Component {
  state = {
    messages: []
  };

componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello There',
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
            <KeyboardAvoidingView style={{flex:1}} keyboardVerticalOffset={500}>
            <View style={{flex: 1}}>
            <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
            
          />{Platform.OS === 'android' ? <KeyboardSpacer /> : null }
      </View>  
          </KeyboardAvoidingView>
          
           
            // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            //     <Text>Settings!</Text>
            // </View>
        );
    }
}

const Users=[
  { id: '1', uri: require('../assets/profile5.jpg'), name: "Kezia Janet", carrier: "Air Hostes", Institution: "JKIA", age: 24 },
  { id: '2', uri: require('../assets/profile2.jpg'), name: "Rose Mary", carrier: "Secretary", Institution: "Safaricom", age: 19 },
  { id: '3', uri: require('../assets/profile3.jpg'), name: "Hanna Ruth", carrier: "Chef", Institution: "Hilton Hotel", age: 25 },
  { id: '4', uri: require('../assets/profile4.jpg'), name: "Winnie Keith", carrier: "Doctor", Institution: "Kenyatta Hospital", age: 23 },
  { id: '5', uri: require('../assets/profile.jpg'), name: "Carol Janet", carrier: "Teacher", Institution: "USIU", age: 24 },
  { id: '10', uri: require('../assets/profile10.jpg'), name: "Faith Rita", carrier: "Air Hostes", Institution: "Wilson Aiport", age: 22 },
  { id: '6', uri: require('../assets/profile6.jpg'), name: "Caro Janet", carrier: "Nurse", Institution: "Pandia", age: 21 },
  { id: '7', uri: require('../assets/profile7.jpg'), name: "Elen Lee", carrier: "Designer", Institution: "USIU", age: 23 },
  { id: '8', uri: require('../assets/profile8.jpg'), name: "Kate Debra", carrier: "Accountant", Institution: "KCB bank", age: 26 },
  { id: '9', uri: require('../assets/profile9.jpg'), name: "Mercy Emma", carrier: "Student", Institution: "USIU", age: 24 },

]

class HomeScreen2 extends React.Component {
  renderChats=()=>{
    return Users.map((item,i)=>{ 
return(


  <View key={item.id} style={{
    width: SCREEN_WIDTH, height: 80, flexDirection: 'row'}}>
<TouchableHighlight underlayColor="#e5e5e5" onPress={() => { this.setModalVisible(true) }}   style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 1, flexDirection: 'row', height: 60}}>
        <View style={{ width: 80, height: '100%', marginLeft: 5, height: 80, alignItems: "center", flexDirection: 'row',justifyContent:"center"}}>
 <ImageLoad source={item.uri} resizeMethod='resize' 
        resizeMode='cover'      borderRadius={30}                    style={{position:'absolute',alignSelf:'center',flex:1,height:60,width:60,overflow:'hidden'}} />
</View>
    
<View style={{paddingLeft:5,marginLeft:10,flex:1,height:80,flexDirection:'column',alignItems:'flex-start',justifyContent:"center", borderBottomColor: '#e5e5e5',borderBottomWidth: 0.5}}>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.name}</Text>
  <Text style={{fontSize:12,color:'gray'}}>Hello There, I am ..</Text>
  </View>
        <View style={{
          height: '100%', paddingRight: 10, borderBottomColor: '#e5e5e5',
          borderBottomWidth: 0.5,height:80}}>
  
  <Text style={{fontSize:11,color:'gray',paddingTop:5}}>9:00 am</Text>
  
  </View></View>
  </TouchableHighlight>
</View>
      )
     }).reverse()
}
 state = {
      modalVisible: false,
    };
  
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }
  render() {
    const {navigate} = this.props.navigation;
   
  
    return (
      <ScrollView>
      <View style={{ flex: 1,paddingTop:15,paddingBottom:20 }}>
      <Modal
            animationIn="zoomIn"
            animationInTiming={10}
            animationOutTiming={10}
            animationOut="fadeOut"
          transparent={false}
          visible={this.state.modalVisible}
          // style={{height:'50%'}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            this.setState({ modalVisible:false})
          }}>
          <View style={{flex:1}}>
            <View style={{ width: "100%", height: 50, padding: 0, paddingLeft: 20, elevation: 4, alignItems: 'center', flexDirection: 'row', backgroundColor: "#f8f8f8" }}><Text style={{ fontSize: 18, lineHeight: 50 }}>Derrick</Text></View>
            <Screen2/></View>
          {/* <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View> */}
        </Modal>

{this.renderChats()}
      </View></ScrollView>
    );
  }
}
const MainNavigator = createStackNavigator({
  HomeScreen2: {screen: HomeScreen2},
  Screen2: {screen: Screen2}
},
{
  headerMode: 'none',
});

const HomeScreen = createAppContainer(MainNavigator);
class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1,}}>
      <Text style={{fontWeight:"bold",color:"gray",padding:10,fontSize:18}}>Matches</Text>
      <View>
        <View style={{height:100,width:100,elevation:4,backgroundColor:'#e5e5e5',margin:5,borderRadius:5}}></View>
      </View>
        <Text style={{ fontWeight: "bold", color: "gray", padding: 10, fontSize: 18 }}>Request</Text>
        <View>
          <View style={{ height: 100, width: 100, elevation: 4, backgroundColor: '#e5e5e5', margin: 5, borderRadius: 5 }}></View>
        </View>
        <Text style={{ fontWeight: "bold", color: "gray", padding: 10, fontSize: 18 }}>Likes</Text>
        <View>
          <View style={{ height: 100, width: 100, elevation: 4, backgroundColor: '#e5e5e5', margin: 5, borderRadius: 5 }}></View>
        </View>
      </View>
    );
  }
}

const TabNavigator = createMaterialTopTabNavigator({
  // Home: HomeScreen,
  HomeScreen: {
    screen: HomeScreen,
 
    navigationOptions: {
      
      tabBarLabel: 'Chats',
        header: null,
        tabBarOptions: {
          labelStyle: {
            // fontSize: 12,
            color:'black'
          },
          // tabStyle: {
          //   width: 100,
          // },
          style: {
            backgroundColor: 'white',
          },  
                indicatorStyle: { backgroundColor: "black" },
        }
     
         
    }
},
SettingsScreen: {
  screen: SettingsScreen,

  navigationOptions: {
    tabBarLabel: 'Requests',
      header: null,
      tabBarOptions: {
        labelStyle: {
          // fontSize: 12,
          color:'black'
        },
        // tabStyle: {
        //   width: 100,
        // },
        style: {
          backgroundColor: 'white',
        },  
              indicatorStyle: { backgroundColor: "black" },
      }
  }
}
});

export default createAppContainer(TabNavigator);