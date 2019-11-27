import React, { Component } from 'react';
// import BottomTabs from './BottomTabs';
// import Register_Activity from './Register_Activity';
import { Text, ScrollView, Alert, Dimensions, ActivityIndicator, KeyboardAvoidingView, AsyncStorage, StatusBar, View, Image, Button, TextInput, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants'
var SCREEN_WIDTH = Dimensions.get('window').width;
import {
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation'
import axios from 'axios'
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import {connect} from 'react-redux'
import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown'
var SCREEN_HEIGHT = Dimensions.get('window').height;
const gender = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  }
];

 class Login_Activity extends Component {

  static navigationOptions =
    {
      title: 'Profile Activity',
    };
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      first_name: '',
      last_name: '',
      gender: '',
      dob: '',
      date: '',
      password: '',
      confirm_psw: '',
      msg: '',
      baseUrl: 'http://192.168.43.107:3000/api/signup',
      error: false
    }
    this.state = {
      isLoading: false,
    }
  }
  getMobileSession() {
    // if (this.state.password != this.state.confirm_psw) {
    //   this.setState({ msg: 'Wrong password confirmation' })
    //   this.setState({ password: '' })
      this.setState({ loader: true })
    // } else {
      //  console.log('hello') ;
      let requestOptions = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      let body = {
        email: this.state.email,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        gender: this.state.gender,
        dob: this.state.dob,
        password: this.state.password,
        loader:false
      };

    axios.post('http://192.168.43.25:3000/api/signin', body, requestOptions)
        .then(response => {
          // console.log(response.data);
//  console.log(this.props.user)
//              console.log(this.props.token)
this.setState({ loader: false })
          this.setState({ msg: response.data.msg })
          if (response.data.success == true) {
            // this.setState({ email: '' })
            // this.setState({ first_name: '' })
            // this.setState({ last_name: '' })
            // this.setState({ gender: '' })
            // this.setState({ dob: '' })
            // this.setState({ password: '' })
            // this.setState({ confirm_psw: '' })
            // this.setToken(response.data);
            // updateUser()
         
            this.props.updateToken(response.data.token)
            this.props.updateUser(response.data.user)
            console.log(this.props.user)
             console.log(this.props.token)
            this.props.navigation.navigate('App')
          }

        })
        .catch(err => {
          this.setState({ loader: false })
         alert(err.message)
        });
    // }
  }
//   setToken=async (info)=>{
//     await AsyncStorage.setItem('session_token', info.token);
//     await AsyncStorage.setItem('user', info.user);
  
// console.log(info.token)
//     console.log(info.user)
//   }
    //  await AsyncStorage.setItem('movie_store6', JSON.stringify(movieArray));
  componentDidMount() {
    this.props.updateUser(null)
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    if (month < 10) {
      month = "0" + month
    }
    if (date < 10) {
      date = "0" + date
    }
    this.setState({ date: date + '-' + month + '-' + year });

  }

  render() {
    return (
      <View style={styles.MainContainer}><StatusBar hidden={true} />
        <Image source={require('../assets/afro.jpg')}
          style={{ position: 'absolute', alignSelf: 'center', flex: 1, width: '100%', height: '100%', alignContent: 'center', justifyContent: 'center' }} />
        <LinearGradient
          colors={['#1a2a6c', '#b21f1f', '#fdbb2d']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            opacity: 0.6,
            bottom: 0,
            height: '100%',
          }}
        ></LinearGradient>
        <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 110 }}
          behavior="padding" enabled >
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Image source={require('../assets/Dating.png')} style={{ width: 80, height: 80 }} />

            <Text style={{ color: 'white', fontSize: 16, alignSelf: 'center', marginLeft: 0 }}>Kyler App</Text>
            <Text style={{ color: 'white', fontSize: 20, alignSelf: 'flex-start', marginLeft: 15 }}>Login</Text>

            <TextInput style={styles.input}
              //  underlineColorAndroid = "transparent"
              placeholder="Email"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={(event) => { this.refs.first_name.focus(); }}
              placeholderTextColor="gray"
              autoCapitalize="none"
              style={{ backgroundColor: 'white', margin: 5, fontSize: 16, padding: 5, width: SCREEN_WIDTH * 90 / 100, height: 50, borderRadius: 5 }}

              onChangeText={(text) => this.setState({ email: text })}
              value={this.state.email}

            />


            <TextInput style={styles.input}
              //  underlineColorAndroid = "transparent"
              placeholder="Password"
              ref="password"
              // onSubmitEditing={(event) => { this.refs.confirm_psw.focus(); }}
              // returnKeyType="next"
              secureTextEntry={true}
              placeholderTextColor="gray"
              autoCapitalize="none"
              style={{ backgroundColor: 'white', fontSize: 16, margin: 5, padding: 5, width: SCREEN_WIDTH * 90 / 100, height: 50, borderRadius: 5 }}
              onChangeText={(text) => this.setState({ password: text })}
              value={this.state.password}
            />
            {/* <TextInput style={styles.input}
              //  underlineColorAndroid = "transparent"
              placeholder="Confirm Password"
                ref="confirm_psw"
              returnKeyType="done"
               secureTextEntry={true}
              placeholderTextColor="gray"
              autoCapitalize="none"
              style={{ backgroundColor: 'white', fontSize: 16, margin: 5, padding: 5, width: SCREEN_WIDTH * 90 / 100, height: 50, borderRadius: 5 }}
              onChangeText={(text) => this.setState({ confirm_psw: text })}
                value={this.state.confirm_psw}
               /> */}
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.msg}</Text>
          </View>
        </KeyboardAvoidingView>
        <View style={{ position: 'absolute', bottom: 10 }}><TouchableHighlight
          style={{
            padding: 3, width: SCREEN_WIDTH * 90 / 100, height: 50, borderRadius: 5
          }}><Button

            onPress={() => this.getMobileSession('sign_up')}
            // onPress={() => this.props.navigation.navigate('BottomTabs')}
            title="Login"
            color="#4267B2"
          /></TouchableHighlight>
          {/* <Text style={{color:'white'}}>Terms and Conditions</Text>
      <Text style={{color:'white'}}>Policy</Text> */}
          <TouchableHighlight
            style={{
              padding: 3, width: SCREEN_WIDTH * 90 / 100, height: 50, borderRadius: 5
            }}><Button

              // onPress={() => this.getMobileSession('sign_up')}
              onPress={() => this.props.navigation.navigate('Register_Activity')}
              title="Register"
              color="green"
            /></TouchableHighlight>
        </View>
        {this.state.loader &&
          <View style={{ position: 'absolute', top: 0, left: 0, height: height, width: width, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 20, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: 150, height: 100, backgroundColor: 'white', borderRadius: 5, elevation: 4, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>


          </View>}
      </View>
    );
  }
}

// const App = createSwitchNavigator({
//   //
//   // BottomTabs: BottomTabs,
//   Login_Activity: Login_Activity,
//   // Register_Activity: Register_Activity,
//   // BottomTabs: BottomTabs
// });
const mapStateToProps=state=>({
token:state.token,
user:state.user

})
const mapDispatchToProps=dispatch=>({
  updateToken:token=>dispatch({type:'UPDATE_TOKEN',token:token}),
  updateUser:user=>dispatch({type:'UPDATE_USER',user:user})

})
export default connect(mapStateToProps,mapDispatchToProps)(Login_Activity)
const styles = StyleSheet.create({

  MainContainer: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    // padding: 11

  },

  button: {
    alignItems: 'center',
    backgroundColor: '#43A047',
    padding: 12,
    width: 280,
    marginTop: 12,
  },

  text: {

    color: '#fff'
  }

});