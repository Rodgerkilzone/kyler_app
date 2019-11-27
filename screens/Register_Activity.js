import React, { Component } from 'react';
// import BottomTabs from './BottomTabs';
// import Login_Activity from './Login_Activity';
import { Text, ScrollView, Alert, Dimensions, KeyboardAvoidingView, StatusBar,View,Image,Button,TextInput, TouchableOpacity,TouchableHighlight, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
 var SCREEN_WIDTH=Dimensions.get('window').width;
 import {  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,} from 'react-navigation'
import axios from 'axios'
import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown'
var SCREEN_HEIGHT=Dimensions.get('window').height;
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

 class Register extends Component {
 
  static navigationOptions =
    {
      title: 'Profile Activity',
    };
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        first_name:'',
        last_name:'',
        gender:'',
        dob:'',
        date:'',
        password:'',
        confirm_psw:'',
        msg:'',
        baseUrl: 'http://192.168.43.107:3000/api/signup',
        error: false
      }
       this.state = {
        isLoading: false,
    }
    }
 getMobileSession() {
   console.log(this.state)
   if(this.state.password!=this.state.confirm_psw)
   {
        this.setState({msg:'Wrong password confirmation'})
           this.setState({password:''})
              this.setState({confirm_psw:''})
   }else{
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
        password: this.state.password
    };
console.log(body)
     axios.post('http://192.168.43.25:3000/api/signup',body, requestOptions)
        .then(response => {
            console.log(response.data.success) ;
           
              this.setState({msg:response.data.msg})
             if(response.data.success==true){
                this.setState({email:''})
              this.setState({first_name:''})
              this.setState({last_name:''})
              this.setState({gender:''})
              this.setState({dob:''})
              this.setState({password:''})
              this.setState({confirm_psw:''})
              Alert('Registration is successful')
            
            }

        })
        .catch(err => {
         console.log(err) 
        });
}}
componentDidMount(){
  var date = new Date().getDate();
    var month = new Date().getMonth() + 1; 
    var year = new Date().getFullYear(); 
if(month<10){
  month="0"+month
}
if(date<10){
  date="0"+date
}
    this.setState({date:date + '-' + month + '-' + year});
   
  }

  render() {
    return (
      <View style={styles.MainContainer}><StatusBar hidden={true}/>
  <Image source={require('../assets/afro.jpg')}
                             style={{position:'absolute',alignSelf:'center',flex:1,width:'100%',height:'100%',alignContent:'center',justifyContent:'center'}} />
            <LinearGradient
         colors={[ '#1a2a6c','#b21f1f', '#fdbb2d']}
         style={{
           position: 'absolute',
           left: 0,
           right: 0,
           opacity:0.6,
           bottom: 0,
           height: '100%',
         }}
       ></LinearGradient>
<KeyboardAvoidingView  style={{flex:1,alignItems:'center',justifyContent:'center',position:'absolute',bottom:110}}
      behavior="padding" enabled >
<View  style={{width:'100%',alignItems:'center'}}>
<Image  source={require('../assets/Dating.png')} style={{width:80,height:80}} />

 <Text style={{ color: 'white', fontSize: 16, alignSelf: 'center', marginLeft: 0 }}>Kyler App</Text>
<Text style={{color:'white',fontSize:20,alignSelf:'flex-start',marginLeft:15}}>Register</Text>

<TextInput style = {styles.input}
              //  underlineColorAndroid = "transparent"
               placeholder = "Email"
    keyboardType="email-address"
       returnKeyType="next"
       onSubmitEditing={(event) => { this.refs.first_name.focus(); }}
               placeholderTextColor = "gray"
               autoCapitalize = "none"
               style={{backgroundColor:'white',margin:5,fontSize:16,padding:5,width:SCREEN_WIDTH*90/100,height:50,borderRadius:5}}
               
              onChangeText={(text) => this.setState({ email: text })}
                value={this.state.email}
               
               />
            <View style={{display:'flex',flexDirection:'row'}}>
            <TextInput style = {styles.input}
              //  underlineColorAndroid = "transparent"
              ref="first_name"
               placeholder = "First name"
               returnKeyType="next"
 onSubmitEditing={(event) => { this.refs.last_name.focus(); }}
               placeholderTextColor = "gray"
               autoCapitalize = "none"
               style={{backgroundColor:'white',fontSize:16,margin:5,padding:5,width:'45%',height:50,borderRadius:5}}
               onChangeText={(text) => this.setState({ first_name: text })}
                value={this.state.first_name}
/>
            <TextInput style={styles.input}
              //  underlineColorAndroid = "transparent"
              ref="last_name"
              placeholder="Last name"
              returnKeyType="next"
              onSubmitEditing={(event) => { this.refs.password.focus(); }}
              placeholderTextColor="gray"
              autoCapitalize="none"
              style={{ backgroundColor: 'white', fontSize: 16, margin: 5, padding: 5, width:'45%', height: 50, borderRadius: 5 }}
              onChangeText={(text) => this.setState({ last_name: text })}
                value={this.state.last_name}
 /></View>
 <View style={{display:'flex',flexDirection:'row',alignSelf:'flex-start',marginLeft:5}}>
 <Dropdown
        // label='Gender'
        data={gender}
 
 style={styles.input}
              //  underlineColorAndroid = "transparent"
              ref="gender"
              placeholder="Gender"
              //  onSubmitEditing={(event) => { this.refs.password.focus(); }}
              placeholderTextColor="gray"
              returnKeyType="next"
              autoCapitalize="none"
              containerStyle={{ backgroundColor: 'white',paddingTop:0, padding: 5,width:SCREEN_WIDTH * 30 / 100, height: 50, borderRadius: 5,marginLeft:5,justifyContent:'flex-start',alignContent:'center',justifyContent:'center' }}
    overlayStyle={{margin:0,padding:0}}
                onChangeText={(text) => this.setState({ gender: text })}
                value={this.state.gender}
              />
            <DatePicker
        // style={{width: 200}}
         ref="dob"
        date={this.state.dob}
        //   onSubmitEditing={(event) => { this.refs.password.focus(); }}
        mode="date"
        placeholder="Date of Birth"
        format="DD-MM-YYYY"
        minDate="01-01-1950"
        maxDate={this.state.date}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        style={{margin:5,alignSelf:'center',flex:1,justifyContent:'flex-start'}}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36,
             backgroundColor: 'white', borderRadius: 5 , height: 50,margin:5
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({dob: date})}}
      /></View>
  
               <TextInput style={styles.input}
              //  underlineColorAndroid = "transparent"
              placeholder="Password"
              ref="password"
                 onSubmitEditing={(event) => { this.refs.confirm_psw.focus(); }}
              returnKeyType="next"
               secureTextEntry={true}
              placeholderTextColor="gray"
              autoCapitalize="none"
              style={{ backgroundColor: 'white', fontSize: 16, margin: 5, padding: 5, width: SCREEN_WIDTH * 90 / 100, height: 50, borderRadius: 5 }}
              onChangeText={(text) => this.setState({ password: text })}
                value={this.state.password}
               />
                 <TextInput style={styles.input}
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
               />
            <Text style={{color:'white',fontWeight:'bold'}}>{this.state.msg}</Text>
</View>
     </KeyboardAvoidingView>
     <View style={{position:'absolute',bottom:10}}><TouchableHighlight 
                style ={{
                 padding:3,width:SCREEN_WIDTH*90/100,height:50,borderRadius:5
                }}><Button
                 
              onPress={() => this.getMobileSession('sign_up')}
                // onPress={() => this.props.navigation.navigate('BottomTabs')}
        title="Register"
        color="#4267B2"
      /></TouchableHighlight>
      <TouchableHighlight 
                style ={{
                 padding:3,width:SCREEN_WIDTH*90/100,height:50,borderRadius:5
                }}><Button
                 
              // onPress={() => this.getMobileSession('sign_up')}
              onPress={() => this.props.navigation.navigate('Login_Activity')}
        title="Go back to Login"
        color="green"
      /></TouchableHighlight></View>
      </View>
    );
  }
}

  // const App = createSwitchNavigator({
  //   //
  //   Register: Register,
  //   // Login_Activity: Login_Activity,
  //   BottomTabs:BottomTabs
  // });
  
  export default Register;
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