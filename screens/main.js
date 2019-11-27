import React, {Component} from 'react';
import { Text, View, StyleSheet, Image, PanResponder, Animated, Dimensions,AsyncStorage,TouchableOpacity} from 'react-native';
import { BlurView } from 'expo-blur';
import axios from 'axios'
 import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {connect} from 'react-redux'
import Modal from 'react-native-modal';
// import Login_Activity from './Login_Activity';
  var SCREEN_WIDTH=Dimensions.get('window').width;
import {
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation'
  var SCREEN_HEIGHT=Dimensions.get('window').height
    const Users=[
     { id: '1', uri: require('../assets/profile5.jpg'), name: "Kezia Janet", carrier: "Air Hostes", Institution: "JKIA", age: 24},
      { id: '2', uri: require('../assets/profile2.jpg'), name: "Rose Mary", carrier: "Secretary", Institution: "Safaricom", age: 19},
      { id: '3', uri: require('../assets/profile3.jpg'), name: "Hanna Ruth", carrier: "Chef", Institution: "Hilton Hotel", age: 25},
      { id: '4', uri: require('../assets/profile4.jpg'), name: "Winnie Keith", carrier: "Doctor", Institution: "Kenyatta Hospital", age: 23},
      {id:'5',uri:require('../assets/profile.jpg'),name:"Carol Janet",carrier:"Teacher",Institution:"USIU",age:24},
      { id: '10', uri: require('../assets/profile10.jpg'), name: "Faith Rita", carrier: "Air Hostes", Institution: "Wilson Aiport", age: 22},
      { id: '6', uri: require('../assets/profile6.jpg'), name: "Caro Janet", carrier: "Nurse", Institution: "Pandia", age: 21},
      { id: '7', uri: require('../assets/profile7.jpg'), name: "Elen Lee", carrier: "Designer", Institution: "USIU", age: 23},
      { id: '8', uri: require('../assets/profile8.jpg'), name: "Kate Debra", carrier: "Accountant", Institution: "KCB bank", age: 26},
      { id: '9', uri: require('../assets/profile9.jpg'), name: "Mercy Emma", carrier: "Student", Institution: "USIU", age: 24},
     
  ]

 class Main extends Component {
//   componentWillMount(){
//   this.checkSignIn()
//   console.log('hello')
// }
  

componentDidMount()
{
  this.checkSignIn()
  
    // setInterval(() => {
      // if(this.props.user==null){
this.checkSignIn()

console.log('user updated')
      // }
        
    // }, 5000);
  // this.getDates()
  // console.log('hello')
}

checkSignIn =  () => {
  // this.props.updateUser(tn)
    var user =this.props.user;
  var token =this.props.token;
  // console.log(user)
  //  var user = await AsyncStorage.getItem('user');
  const Options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }
  };
  // await AsyncStorage.setItem('session_token', "");
  // console.log(this.props.user+"hello")
  if (token){
  axios.get('http://192.168.43.25:3000/api/user/detail',Options)
    .then(response => {
      // 
      // console.log(response.data);
      // this.setState({ msg: response.data.msg })
      if (response.data.success == true) {
        // this.setState({ email: '' })
        // this.setState({ first_name: '' })
        // this.setState({ last_name: '' })
        // this.setState({ gender: '' })
        // this.setState({ dob: '' })
        // this.setState({ password: '' })
        // this.setState({ confirm_psw: '' })
        // this.setToken(response.data)\
      //  this.props.updateLocation(null)
      //  
        if (this.props.user.location){
          // console.log(response.data.user[0]);
          // console.log(response.data.user)
          if (response.data.user[0] != this.props.user) {
               this.props.updateUser(response.data.user);
          }
            //
        }else{
          
          this.props.navigation.navigate('Profile_settings')
        
        }
//              try{
// console.log(this.props.location)
//           }catch(err){
//   this.props.navigation.navigate('Profile_settings')
//           }
              //  console.log(response.data.user);
        // console.log(response.data);
        // var user=response.data.user[0] 
        //  this.props.updateUser(user)
        // 
      } else {
       
      }

    })
    .catch( (err) => {
      console.log(JSON.stringify(err.message))
      if (err.response.data=="Unauthorized"){
         console.log('unauthorized')
        // await AsyncStorage.setItem('session_token',"");
        this.props.updateToken(null)
        //  this.props.updateUser(null)
        clearInterval(this.interval);
        this.props.navigation.navigate('Login_Activity')
      }else{
        console.log('hello')
       alert(err.message)
      }
      // 
    });
  }else{
    clearInterval(this.interval);
  this.props.navigation.navigate('Login_Activity')
    }
  }
  //  setUser = async (user)=>{
  //    this.props.updateUser(user)
  //   //  await AsyncStorage.setItem('user', user)
  //  }

renderUser=()=>{
  return this.state.user.map((item,i)=>{
    if(i==this.state.currentIndex){
return( <Animated.View key={item._id}
      style={[styles.card,this.rotateAndTranslate]
                      }   {...this._panResponder.panHandlers} 
                >
  <Image source={{ uri: "http://192.168.43.25:3000/api/user/" + item.profile_pic }}
                           style={{position:'absolute',alignSelf:'center',flex:1,height:'100%',width:'100%'}} />
  <View style={[styles.card4, { opacity: this.state.opacity }]}><Text style={{ fontWeight: 'bold' }}>{item.age}</Text></View>
                  <View style={[styles.card5,{opacity:this.state.opacity}]}>
                       {/* <BlurView tint="light" intensity={50}> */}
    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.first_name} {item.last_name}</Text>
    <Text style={{ color: 'gray' }}>{item.carrier}, {item.Institution}</Text>
    <Text style={{ color: 'gray' }}>Nairobi, Kenya</Text>
                    
                    {/* </BlurView> */}
                    </View><Animated.View style={{opacity: this.state.fadeAnim,flex:1,alignContent:"center",justifyContent:"center",flexDirection:"row"}}><Ionicons style={{elevation:3,opacity:0.6}} name="md-heart" size={200} color="white" /></Animated.View>
                    </Animated.View>)
    }else if(i<this.state.currentIndex){

    }else{
      return( <View key={item._id}
        style={[styles.card]
                        }   
                  >
        <Image source={{uri:"http://192.168.43.25:3000/api/user/"+item.profile_pic}}
                             style={{position:'absolute',alignSelf:'center',flex:1,height:'100%',width:'100%'}} />
        <View style={[styles.card4, { opacity: this.state.opacity }]}><Text style={{ fontWeight: 'bold' }}>{item.age}</Text></View>
                    <View style={[styles.card5,{opacity:this.state.opacity}]}>
                         {/* <BlurView tint="light" intensity={50}> */}  
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.first_name} {item.last_name}</Text>
          <Text style={{ color: 'gray' }}>{item.carrier}, {item.Institution}</Text>
          <Text style={{ color: 'gray' }}>Nairobi, Kenya</Text>
                      
                      {/* </BlurView> */}
                      </View></View>)
    }
    
  }).reverse()
}
    constructor(props){
    super(props)
    const position = new Animated.ValueXY();
  
   this.state={
        pan:new Animated.ValueXY(),
        pan2:new Animated.ValueXY(),
        currentIndex:0,user:[],
     opacity: 0.8, layout_y: 0, layout_x:0,
        fadeAnim: new Animated.Value(0
          
          )
    }
      // this.opacity2= new Animated.Value(0);
  
  this.rotate=this.state.pan.x.interpolate({
    inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
    outputRange:['-10deg','0deg','10deg'],
    extrapolate:'clamp'
  })
  this.rotateAndTranslate={
    transform:[{
      rotate:this.rotate
    },
    ...this.state.pan.getTranslateTransform()]
  }
  }
    componentWillMount(){
    this._panResponder = PanResponder.create({
        onMoveShouldSetPanResponder:()=>true,
        onMoveShouldSetPanResponderCapture:()=>true,
       onStartShouldSetPanResponder: () => true,
       onPanResponderGrant:(evt,gestureState)=>{
           this.state.pan.setOffset({
            x:this.state.pan.x._value,y:this.state.pan.y._value
           });
           this.state.pan.setValue({x:0,y:0});
       },
       onPanResponderMove: (e, gestureState)=> {
        //  this.setState({opacity:0})
        Animated.event([null,{dx:this.state.pan.x,dy:this.state.pan.y},])(e, gestureState)
        // Animated.timing(this._animatedValue, {
        //   toValue: 100,
        //   duration: 500
        // }).start()

        //  console.log(e.nativeEvent.locationY+","+ this.state.layout_y);

      },
       onPanResponderRelease:(evt,gestureState)=>{
         if (gestureState.dy > 120 && gestureState.dx < 100 && gestureState.dx >-100){
           console.log('set y');
         }
        // this._onButtonPress();
      //   this.state.pan.flattenOffset();
      //   Animated.timing(
      //     this.state.pan,
      //     {
      //         toValue: { x: 0, y:0},
      //         duration: 200,
      //     }
      // ).start(() => {
         
      // });
      if(gestureState.dx>120){
        // Animated.spring(this.state.pan,{
        //   toValue:{x:SCREEN_WIDTH+100,y:gestureState.dy},
        //   duration:100
        // }).start(()=>{
        //     this.setState({currentIndex:this.state.currentIndex+1},
        //     // ()=>{
        //       this.state.pan.setValue({x:0,y:0})
        //     // }
        //     )
        //   })
        //   }
        // })
           Animated.timing(this.state.pan, {
            toValue:{x:SCREEN_WIDTH+100,y:gestureState.dy},
          duration: 200
        }).start(()=>{
          this.setState({currentIndex:this.state.currentIndex+1},
          // ()=>{
            this.state.pan.setValue({x:0,y:0})
            
          // }
          )
          if (this.state.currentIndex>8){
             this.setState({ currentIndex:0 })
          }
         
        })
        
      }else if(gestureState.dx<-120){
        // Animated.spring(this.state.pan,{
        //   toValue:{x:-SCREEN_WIDTH+-100,y:gestureState.dy}
        // }).start(()=>{
        //     this.setState({currentIndex:this.state.currentIndex+1},
        //     ()=>{
        //       this.state.pan.setValue({x:0,y:0})
        //     })
        //   })
        Animated.timing(this.state.pan, {
          toValue:{x:-SCREEN_WIDTH+-100,y:gestureState.dy},
        duration: 200
      }).start(()=>{
        this.setState({currentIndex:this.state.currentIndex+1},
        // ()=>{
          this.state.pan.setValue({x:0,y:0})
        // }
        )
      })
        if (this.state.currentIndex>8){
             this.setState({ currentIndex:0 })
          }
      }else{

        Animated.spring(this.state.pan,{
          toValue:{x:0,y:0},
          friction:4
        }).start()
      }
        // this.state.pan.setValue({x:0,y:0});
       }
    //    onPanResponderMove: (event, gesture) => {
    //       position.setValue({ x: gesture.dx, y: gesture.dy });
    //       console.log(gesture);
    //    }
    });
    this._panResponder2 = PanResponder.create({
      onMoveShouldSetPanResponder:()=>true,
      onMoveShouldSetPanResponderCapture:()=>true,
     onStartShouldSetPanResponder: () => true,
     onPanResponderGrant:(evt,gestureState)=>{
         this.state.pan2.setOffset({
          x:this.state.pan2.x._value,y:this.state.pan2.y._value
         });
         this.state.pan2.setValue({x:0,y:0});
     },
     onPanResponderMove: (e, gestureState)=> { 
       
      if( this.state.pan.x>(Dimensions.get('window').width)*20/100+20){
          this.state.pan.setValue({x:(Dimensions.get('window').width)*20/100+20})
        }
      (gestureState.dx > '-'+((Dimensions.get('window').width)*20/100+35) && gestureState.dx < ((Dimensions.get('window').width)*20/100+35) ) ? Animated.event([null,{dx:this.state.pan2.x,dy:this.state.pan2.y},])(e, gestureState):null
      // Animated.timing(this._animatedValue, {
      //   toValue: 100,
      //   duration: 500
      // }).start()
      if(gestureState.dx>0){
      Animated.event([null,{dx:this.state.pan.x},])(e, gestureState)}else{
        // this.setState({currentIndex:0});
      }
       if(gestureState.dx<0){
      Animated.event([null,{dx:this.state.pan.x},])(e, gestureState)}else{
        // this.setState({currentIndex:0});
      }
      // this.setState({opacity:1});
      if(gestureState.dx != 0){
            Animated.timing(this.state.fadeAnim, {
          toValue: 80,
          duration: 100
        }).start()}else{
          Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 0
          }).start()
        }
        
    },
     onPanResponderRelease:(evt,gestureState)=>{
      // this.state.pan2.flattenOffset();
      Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration:10
      }).start()
      if(gestureState.dx<='-'+((Dimensions.get('window').width)*20/100+40)){
        // this.setState({currentIndex:1})
        console.log('left')
        // this.setState({currentIndex:0})
      }
      // if(gestureState.dx>=((Dimensions.get('window').width)*20/100+30)){
      //   // console.log('right')
      //   if (this.state.currentIndex > 9) {
      //     this.setState({ currentIndex: 0 })
      //   }
      // }
      Animated.timing(
        this.state.pan2,
        {
            toValue: { x: 0, y:0},
            duration: 80,
        }
    ).start(() => {
        // animation finished
    });
    if(gestureState.dx>=((Dimensions.get('window').width)*20/100+20)){
  //   Animated.timing(
  //     this.state.pan,
  //     {
  //         toValue: { x: -SCREEN_WIDTH*1.2, y:0},
  //         duration: 280,
  //     }
  // ).start(() => {
  //     // animation finished
  // });
  Animated.timing(this.state.pan,{
    toValue:{x:-SCREEN_WIDTH+-100,y:0},
    duration: 200,
  }).start(()=>{
      this.setState({currentIndex:this.state.currentIndex+1},
      ()=>{
        this.state.pan.setValue({x:0,y:0})
      })
    })
     if (this.state.currentIndex > 8) {
          this.setState({ currentIndex: 0 })
        }
}else if(gestureState.dx<='-'+((Dimensions.get('window').width)*20/100+20)){

    Animated.timing(this.state.pan,{
    toValue:{x:SCREEN_WIDTH+100,y:0},
    duration: 200,
  }).start(()=>{
      this.setState({currentIndex:this.state.currentIndex+1},
      ()=>{
        this.state.pan.setValue({x:0,y:0})
      })
    })
  if (this.state.currentIndex > 8) {
          this.setState({ currentIndex: 0 })
        }
}else{
    Animated.spring(this.state.pan,{
          toValue:{x:0,y:0},
          friction:4
        }).start()
  }
      // this.state.pan2.setValue({x:0,y:0});
     }
  //    onPanResponderMove: (event, gesture) => {
  //       position.setValue({ x: gesture.dx, y: gesture.dy });
  //       console.log(gesture);
  //    }
  });
}
    // this.state = { panResponder, position };
    _onButtonPress = () => {
    // console.log('hello')
        if(this.state.opacity==0.8){
//           Animated.timing(
//             this.state.opacity,
//             {
//                 toValue:0,
//                 duration: 80,
//             }
//         ).start(() => {
//             // animation finished
//         });
this.setState({opacity:0});
}else{
this.setState({opacity:0.8});
// Animated.timing(
//   this.state.opacity,
//   {
//       toValue:'0.8',
//       duration: 80,
//   }
// ).start(() => {
//   // animation finished
// });
} 
    }
  render() {
    // let handles = ...this._panResponder.panHandlers;
    return (
        <View style={styles.container}>
                
                      {/* <Text>Open up App.js to start working on your app! 1234 djfndf</Text>
                      <Text>Open up App.js to start working on your app! 1234 sdd</Text> */}
                   
                  
                   <View style={styles.card1}>{this.renderUser()}</View> 
        <View style={styles.card2} onLayout={event => {
          // const layout = event.nativeEvent.layout;
          // console.log('height:', layout.height);
          // console.log('width:', layout.width);
          // this.setState({ layout_x: layout.x})
          // this.setState({ layout_y: layout.y })
          // console.log('x:', layout.x);
          // console.log('y:', layout.y);
        }}>
                       <LinearGradient
         colors={['#ff6a00','#ee0979']}
        
         style={{
           position: 'absolute',
           left: 0,
           right: 0,
           bottom: 0,
           height: 150,
           width:'100%',
        
        height: 80,
       
        borderRadius:40,
       
        alignItems:'center',
         }}
           start={{x: 0, y: 0}} end={{x: 1, y: 0}}
        //  style={styles.card2}
       >
       
                   <Animated.View   style={[styles.card3,{transform:[
                        {translateX:this.state.pan2.x},
                        // {translateY:this.state.pan.y}
                       ]}]
                   }   {...this._panResponder2.panHandlers} 
                       ></Animated.View>
                   
                   </LinearGradient>
                   </View>
                 </View>
    );
  }
}
// const App = createSwitchNavigator({
//   //
//   Main: Main,
//   // Login_Activity: Login_Activity,
//   // BottomTabs: BottomTabs
// });
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
export default connect(mapStateToProps,mapDispatchToProps)(Main)
// export default Main;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e5e5',
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      card:{
        position:'absolute',
        width:'100%',
        height: '100%',
        // backgroundColor:'red',
        borderRadius:20,
        overflow:'hidden',
        flex:1,
        elevation:2
      },
      card1:{
        // position:'absolute',
        width:'90%',
        height: '70%',
        // backgroundColor:'red',
        borderRadius:20,
        // overflow:'hidden',
        // elevation:4

      },
      card2:{
        width:'80%',
        height: 80,
        backgroundColor:'#e5e5e5',
        borderRadius:40,
        marginTop: 30,
        alignItems:'center',
      
        
      },
      card3:{
        width:80,
        height:80,
        backgroundColor:'white',
        borderRadius:40,
        elevation:4
        
      },
      card4:{
        minWidth:50,
        paddingHorizontal:4,
        height:20,
        backgroundColor:'white',
        borderRadius:10,
        elevation:5,
        alignItems:'center',
        margin:10,
        alignSelf:'flex-end'
      },
      card5:{
        minWidth:50,
        width:'95%',
        paddingHorizontal:4,
        paddingLeft: 30,
        // marginHorizontal: 10,
        // height:70,
        // opacity:this.state.opacity,
        paddingBottom:3,
        backgroundColor:'white',
        borderRadius:35,
        elevation:5,
        // alignItems:'center',
        margin:5,
        // alignSelf:'flex-end'
        position:'absolute',
        bottom:5
      }
})
