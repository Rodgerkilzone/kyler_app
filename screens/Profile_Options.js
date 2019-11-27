import React, { Component } from 'react';

import { View, Text, StatusBar, StyleSheet, TouchableHighlight } from 'react-native';
import axios from 'axios'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import Chat_Activity from './Chat_Activity';
 class Profile_Options extends Component {

    static navigationOptions =
        {
            title: 'Details Activity',
        };

    render() {

        return (

            <View style={{ flex: 1}}>
                {/* <StatusBar backgroundColor={'red'}
                               barStyle="light-content"/> */}
                {/* <Chat_Activity />
                 */}
                <View style={styles.header}>
                <TouchableOpacity style={{width:40}}
                onPress={()=>{
                            this.props.navigation.navigate('Tabs')
                            
                }}
                    ><Ionicons name="md-arrow-round-back" size={32} style={{lineHeight:50}}/></TouchableOpacity>
              
                <Text style={{ fontSize: 20, lineHeight: 50 }}>Settings</Text></View>
                <TouchableHighlight onPress={()=>{ 
                    console.log('hello')   }} 

             underlayColor="#e5e5e5"  style={{ width: '100%',padding:10,borderBottomWidth:0.5,borderColor:'#e5e5e5'}}>
                    {/* <View > */}
                     <Text style={{lineHeight:50,fontSize:16}}>Change Profile Picture</Text>
                 {/* </View> */}
                 </TouchableHighlight>

                <TouchableHighlight onPress={() => {
                    // console.log('hello')
                    this.props.navigation.navigate('Account_Detail')
                }}

                    underlayColor="#e5e5e5" style={{ width: '100%', padding: 10, borderBottomWidth: 0.5, borderColor: '#e5e5e5' }}>
                    {/* <View > */}
                    <Text style={{ lineHeight: 50, fontSize: 16 }}>Account Details</Text>
                    {/* </View> */}
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {
                    console.log('hello')
                }}

                    underlayColor="#e5e5e5" style={{ width: '100%', padding: 10, borderBottomWidth: 0.5, borderColor: '#e5e5e5' }}>
                    {/* <View > */}
                    <Text style={{ lineHeight: 50, fontSize: 16 }}>Change Password</Text>
                    {/* </View> */}
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {
                    const token=this.props.token
                    var url = 'http://192.168.43.25:3000/api/signout';
                    var Options = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        }
                    };
                    axios.get(url, Options)
                        .then(res => {
                            this.props.updateToken(null)
                            this.props.navigation.navigate('Login_Activity')
                            // this.props.updateUser(null)
                            // this.props.updateLocation(null)
                            // if (res.data.success == true) {
                            //     this.setState({ loader: false })
                            //     this.props.updateUser(res.data.data)
                            //     this.props.navigation.navigate('App')
                            //     console.log(res.data);

                            // } else {
                            //     this.setState({ loader: false })
                            //     alert(res.data.msg)
                            // }
                            // console.log(res.data);



                        })
                        .catch((err) => {
                            // this.setState({ loader: false })
                            alert(err.message)
                            console.log(err)
                        });
                }}

                    underlayColor="#e5e5e5" style={{ width: '100%', padding: 10, borderBottomWidth: 0.5, borderColor: '#e5e5e5' }}>
                    {/* <View > */}
                    <Text style={{ lineHeight: 50, fontSize: 16 }}>Log out</Text>
                    {/* </View> */}
                </TouchableHighlight>
            </View>

        );
    }
}
const mapStateToProps = state => ({
    token: state.token,
    user: state.user,
    location: state.location

})
const mapDispatchToProps = dispatch => ({
    updateToken: token => dispatch({ type: 'UPDATE_TOKEN', token: token }),
    updateUser: user => dispatch({ type: 'UPDATE_USER', user: user }),
    updateLocation: location => dispatch({ type: 'UPDATE_LOCATION', location: location })

})
export default connect(mapStateToProps, mapDispatchToProps)(Profile_Options)
const styles = StyleSheet.create({

    container: {
        flex: 1,
        // justifyContent:'center',
        // alignItems:'center'
    },
    header: {
        height: 50,
        paddingLeft: 20,
        backgroundColor: '#e5e5e5',
        width: '100%',
        flexDirection: 'row',
        // justifyContent: 'space-between'

    }
})