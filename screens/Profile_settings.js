import React, { Component } from 'react';
// import BottomTabs from './BottomTabs';
// import Login_Activity from './Login_Activity';
import { Text, ScrollView,Platform, Alert, ActivityIndicator,Dimensions,Picker, KeyboardAvoidingView, StatusBar,View,Image,Button,TextInput, TouchableOpacity,TouchableHighlight, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import {connect} from 'react-redux'
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
 var width=Dimensions.get('window').width;
  var height=Dimensions.get('window').height;
 import {  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,} from 'react-navigation'
import axios from 'axios'

class Profile_settings extends Component{
    // state = {
    //     image: null,
    // };

    // render() {
    //     let { image } = this.state;}
constructor(props){
    super(props)
  this.state = {errorMessage:null, image:null, location: null, 
    about: null, 
    carrier: null
    ,loader:false
    , institute: null
    , interest: null, min_age: null, max_age: null, age_type:null,gender:null}
}

    componentDidMount() {
        this.getPermissionAsync();
      if (Platform.OS === 'android' && !Constants.isDevice) {
        this.setState({
          errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        });
      } else {
        // setInterval(() => {
        //   if(!this.props.location){
        //      
        //   }else{
        //      clearInterval()
        //   }
        //   // 
        // }, 5000);
      this._getLocationAsync();
      }
      // if(this.props.user.gender=="female"){
      //   this.setState({gender:require('../assets/female_image.jpg')})
        
      // }else{
      //    this.setState({gender:require('../assets/male_image.jpg')})
      // }
    }
  _getLocationAsync = async () => {
         if(this.props.user.gender=="female"){
        this.setState({gender:require('../assets/female_image.jpg')})
        
      }else{
         this.setState({gender:require('../assets/male_image.jpg')})
      }
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      // this.setState({
           this.setState({
        errorMessage: 'Permission to access location was denied',
      });
      alert('Permission to access location was denied')
      // });
    }

    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: false });
    console.log(location+"hello")
    this.setState({ location:JSON.stringify(location) });
    if(location  || location!=null){
      this.props.updateLocation(location)
    }else{
       this.setState({ location:JSON.stringify( this.props.location) });
    }
  };
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
        });

        console.log(result);

        if (!result.cancelled) {
            if(result.type!='image'){
           
                alert('Please select an image')
            }else{
                  this.setState({ image: result.uri });
            }
          
        }
    }

    render(){
  

        return(
            <View style={styles.container}>
                <View style={styles.header}><Text style={{fontSize:20,lineHeight:50}}>Profile</Text>
                <TouchableOpacity onPress={()=>{
                  // if(this.state.location){
                const token =this.props.token
                    // const email = this.props.user.email
                // console.log(this.props.user)
                this.setState({loader:true})
               
                var data = new FormData();
                
                    // if (this.state.age == 4) {
                    //   this.setState({ min_age: 35 })
                    //   this.setState({ max_age: 40 })
                    // } else if (this.state.age == 3) {
                    //   this.setState({ min_age: 30 })
                    //   this.setState({ max_age: 35 })
                    // } else if (this.state.age == 2) {
                    //   this.setState({ min_age: 25 })
                    //   this.setState({ max_age: 30 })
                    // } else {
                    //   this.setState({ min_age: 18 })
                    //   this.setState({ max_age: 25 })

                    // }  
                // data.append('email', this.props.user.email);
                data.append('about', this.state.about);
                data.append('carrier', this.state.carrier);
                data.append('institute', this.state.institute);
                // data.append('profile_pic', {uri:this.state.image, name:'profile_pic'});
                data.append('profile_pic', {
                  uri: this.state.image,
                  type: 'image/jpeg',
                  name: 'image.jpg'
                })
                data.append('interest', this.state.interest);
                data.append('age', this.state.age_type);
                
                    // data.append('min_age', this.state.min_age);
                    // data.append('max_age', this.state.max_age);
                    console.log(this.props.location)
                    data.append('location', JSON.stringify(this.props.location) );
                // let formData = new FormData() // instantiate it
                // // suppose you have your file ready
                // formData.append('file', this.state.image)
                // // add some data you collected from the input fields
                // formData.append('about', 'hello')
                    if (this.state.about.trim() == "" || this.state.institute.trim() == "" || this.state.interest.trim() == "" || this.state.carrier.trim() == "" ){
                      alert('Please fill in all the blank fields')
                    }else{
                         if(this.state.image!=null){
            var url='http://192.168.43.25:3000/api/user/initial_update';
                var Options = {
                  headers: {
                    'content-type': 'multipart/form-data' ,
                    'Authorization': token
                  }
                };
                 axios.post(url,data, Options)
                  .then(res => {
                      if(res.data.success==true){
                           this.setState({loader:false})
                           this.props.updateUser(res.data.data)
                                this.props.navigation.navigate('App')
                             console.log(res.data);

                      }else{
                           this.setState({loader:false})
                        alert(res.data.msg)
                      }
                    // console.log(res.data);



                  })
                  .catch((err) => {
                       this.setState({loader:false})
                       alert(err.message)
                     console.log(err) });
                  }else{
                        var url='http://192.168.43.25:3000/api/user/initial_update_2';
                var Options = {
                  headers: {
                              'Content-Type': 'application/json',
                    'Authorization': token
                  }
                };
                axios.post(url,this.state, Options)
                  .then(res => {
                      if(res.data.success==true){
                           this.setState({loader:false})
                           this.props.updateUser(res.data.data)
                                this.props.navigation.navigate('App')
                             console.log(res.data);

                      }else{
                           this.setState({loader:false})
                        alert(res.data.msg)
                      }
                    // console.log(res.data);



                  })
                  .catch((err) => {
                       this.setState({loader:false})
                       alert(err.message)
                     console.log(err) });
                    }
                  }
               
                
                  // }else{

                  //   // alert('Please enable Location')
                  //     this._getLocationAsync()
                    

                  // }
                }}>
                <View style={{width:50}}><Text style={{color:'blue',fontWeight:'bold',lineHeight:50,fontSize:16}}>Save</Text></View>
            </TouchableOpacity>
                    </View>
                <ScrollView>

                 <View  style={{width:'100%',alignItems:'center',marginTop:5}}>
              
                    
                        <View style={{ borderRadius: 75, overflow: 'hidden', margin: 5, width: 150, height: 150,elevation:3,borderWidth:3,borderColor:'white'}}>
                            <View style={{ marginBottom: 5, alignSelf: 'center', overflow: 'hidden', borderColor: 'white', borderStyle: 'solid', width:'100%', height:'100%', backgroundColor: 'white', borderRadius:75}}>
                               {this.state.image 
                               
                                    ?<Image source={{ uri: this.state.image }} style={{ width: 150, height: 150 }} />
                                    :<Image source={this.state.gender}
                                    style={{ position: 'absolute', alignSelf: 'center', flex: 1, height: '100%', width: '100%' }} />
                                    }
                            </View>
                        
                      </View>
                    
{/* <Image  source={require('../assets/Dating.png')} style={{width:80,height:80}} /> */}
                    <Button
                        title="Pick Profile Image"
                        onPress={this._pickImage}
                    />
 <Text style={{ color: 'white', fontSize: 16, alignSelf: 'center', marginLeft: 0 }}>Kyler App</Text>
                <Text style={{ color: 'gray', padding: 5 }}>Fill in the following details to proceed to the app</Text>
                
 </View>
                
                <View style={{flex:1}}>
                   {/* <View  style={{padding:10,width:'100%'}}> */}
                    <View  style={{padding:10,width:'100%'}}><Text style={{color:'#808080'}}>About</Text>
            {/* <Text style={{fontSize:16,fontWeight:'bold'}}>{input.label}</Text> */}
            <TextInput style={styles.input}
              //  underlineColorAndroid = "transparent"
              ref="about"
            //   placeholder="about"
              returnKeyType="next"
            //   onSubmitEditing={(event) => { this.refs.password.focus(); }}
              placeholderTextColor="gray"
              autoCapitalize="none"
              style={{ backgroundColor: 'white', fontSize: 16, margin: 5, padding: 5, width:'100%', height: 50, borderRadius: 5,borderBottomWidth:1,borderColor:'#e5e5e5' }}
              onChangeText={(text) => {this.setState({ about: text })
              console.log(this.state)
              }
              }
                value={this.state.about}
 /></View>
       {/* <View  style={{padding:10,width:'100%'}}> */}
        <View  style={{padding:10,width:'100%'}}><Text style={{color:'#808080'}}>Occupation / Course</Text>
   <TextInput style={styles.input}
              //  underlineColorAndroid = "transparent"
              ref="carrier"
            //   placeholder="Occupation / Course"
              returnKeyType="next"
            //   onSubmitEditing={(event) => { this.refs.password.focus(); }}
              placeholderTextColor="gray"
              autoCapitalize="none"
              style={{ backgroundColor: 'white', fontSize: 16, margin: 5, padding: 5, width:'100%', height: 50, borderRadius: 5,borderBottomWidth:1,borderColor:'#e5e5e5' }}
              onChangeText={(text) => {this.setState({ carrier: text })}
              }
                value={this.state.carrier}
 />
        </View>

        {/* <View  style={{padding:10,width:'100%'}}> */}
         <View  style={{padding:10,width:'100%'}}><Text style={{color:'#808080'}}>Insitution / Company</Text>
   <TextInput style={styles.input}
              //  underlineColorAndroid = "transparent"
              ref="institute"
            //   placeholder="Insitution / Company"
              returnKeyType="next"
            //   onSubmitEditing={(event) => { this.refs.password.focus(); }}
              placeholderTextColor="gray"
              autoCapitalize="none"
              style={{ backgroundColor: 'white', fontSize: 16, margin: 5, padding: 5, width:'100%', height: 50, borderRadius: 5,borderBottomWidth:1,borderColor:'#e5e5e5' }}
              onChangeText={(text) => {this.setState({ institute: text })}
              }
                value={this.state.institute}
 />
        </View>

        
        {/* <View  style={{padding:10,width:'100%'}}> */}
         <View  style={{padding:10,width:'100%'}}><Text style={{color:'#808080'}}>Interest / Hobbies</Text>
   <TextInput style={styles.input}
              //  underlineColorAndroid = "transparent"
              ref="interest"
            //   placeholder="Interest / Hobbies "
              returnKeyType="next"
            //   onSubmitEditing={(event) => { this.refs.password.focus(); }}
              placeholderTextColor="gray"
              autoCapitalize="none"
              style={{ backgroundColor: 'white', fontSize: 16, margin: 5, padding: 5, width:'100%', height: 50, borderRadius: 5,borderBottomWidth:1,borderColor:'#e5e5e5' }}
              onChangeText={(text) => {this.setState({ interest: text })
              console.log(this.state)
              }
              }
                value={this.state.interest}
 />
        </View>
 {/* <View  style={{padding:10,width:'100%'}}> */}
  {/* <View  style={{padding:10,width:'100%'}}><Text>Minimum Age</Text>
   <TextInput style={styles.input}
              //  underlineColorAndroid = "transparent"
              ref="min_age"
            //   placeholder="Minimum Age"
              returnKeyType="next"
            //   onSubmitEditing={(event) => { this.refs.password.focus(); }}
              placeholderTextColor="gray"
               keyboardType="phone-pad"
               maxLength={2}
               defaultValue="19"
              autoCapitalize="none"
              style={{ backgroundColor: 'white', fontSize: 16, margin: 5, padding: 5, width:'100%', height: 50, borderRadius: 5,borderBottomWidth:1,borderColor:'#e5e5e5' }}
              onChangeText={(text) => {this.setState({ min_age: text })}
              }
                value={this.state.min_age}
 />
        </View> */}
         <View  style={{padding:10,width:'100%',marginBottom:50}}><Text style={{color:'#808080'}}>Age Preference</Text>
   {/* <TextInput style={styles.input}
              //  underlineColorAndroid = "transparent"
              ref="max_age"
            //   placeholder="Maximum Age"
              returnKeyType="next"
               maxLength={2}
               defaultValue="35"
            //   onSubmitEditing={(event) => { this.refs.password.focus(); }}
              placeholderTextColor="gray"
              keyboardType="phone-pad"
              autoCapitalize="none"
              style={{ backgroundColor: 'white', fontSize: 16, margin: 5, padding: 5, width:'100%', height: 50, borderRadius: 5,borderBottomWidth:1,borderColor:'#e5e5e5' }}
              onChangeText={(text) => {this.setState({ max_age: text })}
              }
                value={this.state.max_age}
 /> */}
                  <Picker
                    selectedValue={this.state.age_type}
                    style={{ backgroundColor: '#f8f8f8' }}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({ age_type: itemValue })
                    }}>
                    <Picker.Item label="18 - 25" value="type_1" />
                    <Picker.Item label="25 - 30" value="type_2" />
                    <Picker.Item label="30 - 35" value="type_3" />
                    <Picker.Item label="35 - 40" value="type_4" />
                  </Picker>
        </View>
                {/* {inputView} */}
               
                </View></ScrollView>
                {this.state.loader &&
                   <View style={{position:'absolute',top:0,left:0,height:height,width:width,backgroundColor:'rgba(0,0,0,0.6)',zIndex:20,justifyContent:'center',alignItems:'center'}}>
                     <View style={{width:150,height:100,backgroundColor:'white',borderRadius:5,elevation:4,justifyContent:'center',alignItems:'center'}}>
<ActivityIndicator size="large" color="#0000ff" />
                     </View>
                      

                 </View>}
            </View>
        )
    }
}
const mapStateToProps=state=>({
token:state.token,
user:state.user,
location:state.location

})
const mapDispatchToProps=dispatch=>({
  updateToken:token=>dispatch({type:'UPDATE_TOKEN',token:token}),
  updateUser:user=>dispatch({type:'UPDATE_USER',user:user}),
    updateLocation:location=>dispatch({type:'UPDATE_LOCATION',location:location})

})
export default connect(mapStateToProps,mapDispatchToProps)(Profile_settings)

const styles = StyleSheet.create({

container:{
    flex:1,
    // justifyContent:'center',
    // alignItems:'center'
},
header:{
    height:50,
    paddingLeft:20,
    backgroundColor:'#e5e5e5',
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between'

}
})