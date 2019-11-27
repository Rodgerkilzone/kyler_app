import React, {Component} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux'
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import axios from 'axios'
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import {    View,
  Text,Button,
  KeyboardAvoidingView, TouchableOpacity,
  Image,ScrollView,TouchableHighlight,
  Dimensions, Platform,
  StyleSheet} from 'react-native';
import {
  Ionicons,
  MaterialIcons
} from '@expo/vector-icons';
import BlurOverlay, { closeOverlay, openOverlay } from 'react-native-blur-overlay';
// import  Modal  from 'react-native-modal';
  var SCREEN_WIDTH=Dimensions.get('window').width;
var width = SCREEN_WIDTH;
import Modal from 'react-native-modal';
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
    {id:'10',uri:require('../assets/profile10.jpg')}
  ]
 class Profile_Activity extends Component {

  // static navigationOptions =
  //   {
  //     title: 'Profile Activity',
  //   };

  renderImage=()=>{
    console.log(this.state.url + '/api/user/' + this.props.user.profile_pic)
    return Users.map((item,i)=>{ 
      return (<TouchableOpacity key={item.id} onPress={() => {
        this.setState({ viewImage: item.uri })
        this.setState({ modalVisible_2: true })
        }}><View
          style={{ width: SCREEN_WIDTH * 33 / 100, height: SCREEN_WIDTH * 33 / 100, margin: 1/6 * SCREEN_WIDTH * 0.8 / 100}} 
                      >
                           <Image source={item.uri} 
                                 style={{height:'100%',width:'100%'}} />
                     </View></TouchableOpacity>)
     }).reverse()
}
constructor(props){
  super(props)
  this.state = { errorMessage: null, image: null, modalVisible: false, url: 'http://192.168.43.25:3000' , modalVisible_2: false, viewImage: null, imageUrI: null}
}
   componentDidMount() {
     this.getPermissionAsync();

   }
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
     var data = new FormData();
     console.log(result);
     data.append('profile_pic', {
       uri: result.uri,
       type: 'image/jpeg',
       name: 'image.jpg'
     })
     if (!result.cancelled) {
       if (result.type != 'image') {

         alert('Please select an image')
       } else {
         
         var url = 'http://192.168.43.25:3000/api/user/profile_picture';
         const token=this.props.token
         var Options = {
           headers: {
             'content-type': 'multipart/form-data',
             'Authorization': token
           }
         };
        //  var data={}
         axios.post(url, data, Options)
           .then(res => {
             if (res.data.success == true) {
              //  this.setState({ loader: false })

               this.props.updateUser(res.data.user)
              //  this.props.navigation.navigate('App')
               console.log(res.data.user);

             } else {
              //  this.setState({ loader: false })
               alert(res.data.msg)
             }
             // console.log(res.data);



           })
           .catch((err) => {
             this.setState({ loader: false })
             alert(err.message)
             console.log(err)
           });
        //  this.setState({ image: result.uri });
       }

     }
   }

    render() {
        return (
          <View>
            <Image source={{ uri: this.state.url + '/api/user/' + this.props.user.profile_pic }}
                             style={{position:'absolute',alignSelf:'center',flex:1,width:'100%',height:SCREEN_WIDTH,alignContent:'center',justifyContent:'center'}} blurRadius={5} />
          <ScrollView>
            <View style={{ flex: 1 }}>
         {/* <LinearGradient
          colors={['#c31432', '#240b36']}
          style={{ padding: 15, alignItems: 'center'}}> */}
         <View style={{width:'100%',height:SCREEN_WIDTH,alignContent:'center',justifyContent:'center'}}>

        <View style={{alignSelf:'center'}}>
         <View style={{marginBottom:5,alignSelf:'center',elevation:5,overflow:'hidden',borderColor:'white',borderStyle:'solid',borderWidth:2,width:SCREEN_WIDTH*30/100,height:SCREEN_WIDTH*30/100,backgroundColor:'white',borderRadius:SCREEN_WIDTH*15/100}}>
         <Image source={{uri:this.state.url+'/api/user/'+this.props.user.profile_pic}}
                             style={{position:'absolute',alignSelf:'center',flex:1,height:'100%',width:'100%'}} />
         </View>
         <View style={{zIndex:20}}>
         <Button
  onPress={()=>{
                        this._pickImage()
  }}
 
  title="Change Image"
  color="lightblue"
  // accessibilityLabel="Learn more about this purple button"
/></View>
          </View>
          {/* <Text style={{alignSelf:'center',fontWeight:'bold',color:'white',elevation:5,backgroundColor:'black'}}>Susan Moana </Text> */}
          <LinearGradient
         colors={[ 'transparent', 'rgba(0,0,0,0.8)']}
         style={{
           position: 'absolute',
           left: 0,
           right: 0,
           bottom: 0,
           height: 150,
         }}
       >
       <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between',position:'absolute',bottom:10}}>
       
       {/* <Text style={{color:'white'}}>Nairobi, Kenya</Text> */}
         <Text style={{color:'white',bottom:0,margin:5,fontSize:20}}>Mercy Emma, 23</Text>
                      <TouchableOpacity onPress={() => {
                        // this.setState({ viewImage: item.uri })

                        // openOverlay();
                        // this._pickImage()
                        this.setState({ modalVisible: true })
                         }}
                        ><View style={{ borderColor:"#fd1d1d",borderWidth:2,borderRadius:5,padding:5,width:80,justifyContent:"center",alignContent:"center",flexDirection:"row",marginRight:10}}><Text style={{color:"white",lineHeight:30,fontSize:20,fontWeight:"bold"}}>Buy</Text></View>
        </TouchableOpacity>
         </View></LinearGradient>

                  <Modal
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    animationIn="zoomIn"
                    animationOut="zoomOut"
                    animationInTiming={200}
                    animationOutTiming={200}
                    backgroundColor="transparent"
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
                    
                    <View   style={{ backgroundColor: "white", width: 0.90 * width, height: .80 * width, borderRadius: 10, overflow: "hidden", elevation: 4 }}
                     >
                     <LinearGradient
                      colors={[ '#4b6cb7','#182848',]}

                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 150,
                        width: '100%',

                        height: 80,

                        borderRadius: 40,

                        alignItems: 'center',
                      }}
                     start={{ x: 1, y: 1 }} end={{ x: 1, y: 0 }}
                    //  style={styles.card2}
                    style={{ width: "100%", height: "55%", flexDirection: "row", justifyContent: "center", alignContent: "center"}}
                    >
                        <View  style={{flex:1}}>
 <View style={{textAlign:"center", justifyContent: "center", alignContent: "center",flexDirection:"column",flex:1}}>
 <View><Text style={{color:"white",fontSize:28,textAlign:"center"}}>Gold Package</Text></View> 
                         <View><Text style={{color:"white",fontSize:14,textAlign:"center"}}>Get unlimited Likes </Text></View>
                        </View></View>
                      {/* < */}</LinearGradient>
                     <View style={{flex:1,alignContent:"center",justifyContent:"space-between",flexDirection:"row"}}>
                       <TouchableHighlight onPress={()=>{console.log("hello")}}
                    underlayColor="#e5e5e5" style={{width:"33%",alignContent:"center",justifyContent:"center",flexDirection:"row",padding:20,height:"100%"}}><View ><Text style={{textAlign:"center",fontSize:15,fontWeight:"bold"}}>1 Week {'\n'} Ksh 300/=</Text></View></TouchableHighlight>
                                           <TouchableHighlight onPress={()=>{console.log("hello")}}
                    underlayColor="#e5e5e5" style={{width:"33%",alignContent:"center",justifyContent:"center",backgroundColor:"#f8f8f8",flexDirection:"row",padding:20,height:"100%"}}><View><Text style={{textAlign:"center",fontSize:15,fontWeight:"bold"}}>1 Month {'\n'} Ksh 1000/=</Text></View></TouchableHighlight>
                                           <TouchableHighlight onPress={()=>{console.log("hello")}}
                    underlayColor="#e5e5e5" style={{width:"33%",alignContent:"center",justifyContent:"center",flexDirection:"row",padding:20,height:"100%"}}><View><Text style={{textAlign:"center",fontSize:15,fontWeight:"bold"}}>1 Year {'\n'} Ksh 10,000/=</Text></View></TouchableHighlight>


                       
                      </View>
                    </View>




                  </Modal>
          </View>
 
       
        <View style={{backgroundColor:'white'}}>
        <View style={{padding:10,flexDirection:'row',justifyContent:'space-between',backgroundColor:'white',paddingRight:0}}>
          
          <Text style={{fontWeight:'bold',color:'black',elevation:5,fontSize:20}}>About</Text>
          {/* <Text style={{color:'black',elevation:5,fontSize:20}}>Add +</Text> */}
          <TouchableOpacity style={{width:50,height:40,alignItems:'center'}} onPress={()=>{
                        this.props.navigation.navigate('Profile_Options')
          }}><Ionicons name="md-settings"  size={32}/></TouchableOpacity>
          </View>
                  <Text style={{ paddingLeft: 10, paddingRight: 10, color: 'gray', fontSize: 16}}>
 {this.props.user.about}
        </Text>
        <View style={{padding:10,flexDirection:'row',justifyContent:'space-between',backgroundColor:'white'}}>
          
          <Text style={{fontWeight:'bold',color:'black',elevation:5,fontSize:20}}>Interest/Hobbies</Text>
          {/* <Text style={{color:'black',elevation:5,fontSize:20}}>Add +</Text> */}
          </View>
                  <Text style={{ paddingLeft: 10, paddingRight: 10, color: 'gray', fontSize: 16}}>
 {this.props.user.interest}
        </Text>
         <View style={{padding:10,flexDirection:'row',justifyContent:'space-between',backgroundColor:'white'}}>
          
          <Text style={{fontWeight:'bold',color:'black',elevation:5,fontSize:20}}>Carrier/Occupation</Text>
          {/* <Text style={{color:'black',elevation:5,fontSize:20}}>Add +</Text> */}
          </View>
                  <Text style={{ paddingLeft: 10, paddingRight: 10, color: 'gray', fontSize: 16}}>
         {this.props.user.carrier}
        </Text>
                  <Text style={{ paddingLeft: 10, paddingRight: 10, color: 'gray', fontSize: 16}}>
    {this.props.user.institute}
        </Text>
        {/* <View style={{padding:10,flexDirection:'row',justifyContent:'space-between',backgroundColor:'white'}}> */}
          
          {/* <Text style={{fontWeight:'bold',color:'black',elevation:5,fontSize:20}}>Location</Text> */}
          {/* <Text style={{color:'black',elevation:5,fontSize:20}}>Add +</Text> */}
          {/* </View> */}
        {/* <Text style={{paddingLeft:10,paddingRight:10,color:'gray',fontSize:16}}> */}
       {/* {this.props.user.location} */}
        {/* </Text> */}
          <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white' }}>

                  <Text style={{ fontWeight: 'bold', color: 'black', elevation: 5, fontSize: 24 }}>Photos</Text>
                  <Text style={{ color: 'black', elevation: 5, fontSize: 20 }}>Add +</Text>
                </View>
                <ScrollView style={{ backgroundColor: 'white' }} horizontal={false}><View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>{this.renderImage()}</View></ScrollView>
                  <Modal
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    animationIn="zoomIn"
                    animationOut="zoomOut"
                    animationInTiming={200}
                    animationOutTiming={200}
                    // backgroundColor="transparent"
                    // animationOut="fadeOut"
                    backdropColor="rgba(255,255,255,1)"
                    onBackdropPress={() => this.setState({ modalVisible_2: false })}
                    onBackButtonPress={() => this.setState({ modalVisible_2: false })}
                    // style={{position: 'absolute',elevation:4,overflow:'hidden',backgroundColor:'white',width:200,top:60,right:3,borderRadius:5,margin:0,justifyContent:'flex-start',alignContent:'flex-start'}}
                    isVisible={this.state.modalVisible_2}
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

                    <View style={{ backgroundColor: "white", width: 0.90 * width, height: 1.20 * width, borderRadius: 10, overflow: "hidden", elevation: 4 }}>
                      {/* <View style={{ height: 40, backgroundColor: "white", width: 0.90 * width, paddingLeft: 10 }}><Text style={{ lineHeight: 40, fontSize: 15 }}>Mercy Emma</Text></View> */}
                      {this.state.viewImage &&
                      <Image source={this.state.viewImage} style={{ resizeMode: 'cover', width: null, height: null, flex: 1, }} />

                      }
                      {/* <Text>hello</Text> */}
                      {/* <View style={{ height: 50, backgroundColor: "white", width: 0.90 * width, flexDirection: "row", alignItems: "center" }}>
                        <TouchableHighlight onPress={() => { console.log("hello") }}
                          underlayColor="#e5e5e5" style={{ width: "25%", height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}><View ><Ionicons name="md-bookmark" size={24} style={{ fontSize: 28, color: 'black', lineHeight: 50 }} /></View></TouchableHighlight>
                        <TouchableHighlight onPress={() => { console.log("hello") }} underlayColor="#e5e5e5" style={{ width: "25%", height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}><View ><Ionicons name="md-chatboxes" size={24} style={{ fontSize: 28, color: '#696969', lineHeight: 50 }} /></View></TouchableHighlight>
                        <TouchableHighlight onPress={() => { console.log("hello") }} underlayColor="#e5e5e5" style={{ width: "25%", height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}><View ><Ionicons name="md-person" size={24} style={{ fontSize: 28, color: '#696969', lineHeight: 50 }} /></View></TouchableHighlight>
                        <TouchableHighlight onPress={() => { console.log("hello") }} underlayColor="#e5e5e5" style={{ width: "25%", height: 50, flexDirection: "row", alignItems: "center", justifyContent: "center" }}><View ><Ionicons name="md-heart" size={24} style={{ fontSize: 28, color: 'red', lineHeight: 50 }} /></View></TouchableHighlight>

                      </View> */}
                    </View>




                  </Modal>
        </View>
              
        {/* </LinearGradient> */}
        <View >
        
        </View>
            </View></ScrollView>
            
            
            </View>
        );
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
export default connect(mapStateToProps,mapDispatchToProps)(Profile_Activity)