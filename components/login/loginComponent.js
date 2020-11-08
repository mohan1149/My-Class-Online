import React,{Component} from 'react';
import {API_CONSTANTS} from './../../constants';
import I18n from './../../app/locales/i18n';
import { 
    ScrollView,
    View,
    Image,
    Dimensions,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    StatusBar,
    BackHandler,
} from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
const messaging_service = firebase.messaging();
export default class loginComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id: '',
            user_pwd: '',
            is_under_process:false,
            device_fcm_token:'',
            show_id_error:false,
            show_pwd_error:false,            
        }
    }
    render(){
        return(
            <ScrollView
                style={{
                    backgroundColor:'#3d5ea1',                    
                }}
            >
                <StatusBar
                   backgroundColor="#3d5ea1" 
                   barStyle="light-content"
                />
                <Image
                    source = {require('./logo.png')}
                    style={{
                        width:70,
                        height:70,                    
                        alignSelf:'center',
                        marginTop:Dimensions.get('screen').height/5,                        
                    }}
                />
                <View
                    style={{
                        padding:20,
                        backgroundColor:'#fff',
                        margin:20,
                        borderRadius:6,
                    }}
                >
                    <Text
                        style={{
                            textAlign:'center',
                            fontSize:18,
                        }}
                    >{I18n.t('login_text')}</Text>
                    <View>
                        <TextInput
                            onChangeText = {(uid)=> this.handleUserId(uid)}
                            placeholder={I18n.t('user_id')}
                            style={{
                                backgroundColor:'lightgrey',
                                borderRadius:6,
                                marginTop:16,
                                paddingLeft:5,
                                fontSize:16,
                                height:50,
                            }}
                        />
                        {this.state.show_id_error &&
                            <Text
                                style={{
                                    marginTop:5,
                                    marginLeft:5,
                                    color:'#f44336'
                                }}
                            >{I18n.t('invalid_user_id')}</Text>
                        }
                        <TextInput
                            onChange = {(pwd)=> this.handleUserPwd(pwd)}
                            secureTextEntry
                            placeholder={I18n.t('password')}
                            style={{
                                backgroundColor:'lightgrey',
                                borderRadius:6,
                                marginTop:16,
                                paddingLeft:5,
                                fontSize:16,
                                height:50,
                            }}
                        />
                        { this.state.is_under_process &&
                            <ActivityIndicator
                                style={{
                                    margin:15,
                                }}
                                size='large'
                                color="#3d5ea1"
                            />
                        }
                        { this.state.show_pwd_error &&
                            <Text
                                style={{
                                    marginTop:5,
                                    marginLeft:5,
                                    color:'#f44336'
                                }}
                            >{I18n.t('invalid_pwd')}</Text>
                        }                          
                        <Button
                            title={I18n.t('login')}
                            onPress = {(e)=>this.handleLogin()}
                            buttonStyle={{
                                marginTop:16,
                                backgroundColor:'#3d5ea1',
                            }}
                        />
                        <TouchableOpacity
                            onPress={(e)=>this.props.navigation.navigate('forgotPassword')}
                            style={{
                                margin:15,                                    
                            }}
                        >
                            <Text
                                style={{
                                    textDecorationLine:'underline'
                                }}
                            >{I18n.t('forgot_password')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>                
            </ScrollView>
        );
    }
    backAction = () => {
        Alert.alert("Hold on!", "Are you sure to exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };
    componentDidMount(){   
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );   
        messaging_service.getToken()
        .then(token=>{
            this.setState({
                device_fcm_token: token,
            });
        });
    }
    componentWillUnmount() {
        this.backHandler.remove();
    
    }
    handleUserId(uid){
        this.setState({
            user_id       : uid,
            show_id_error : false,
        });
    }

    handleUserPwd(pwd){        
        this.setState({
            user_pwd       : pwd.nativeEvent.text,
            show_pwd_error : false,
        });
    }

    handleLogin(){
        this.setState({
            is_under_process:true,
        });
        let user_data = {
            'user_id'    : this.state.user_id,
            'password'   : this.state.user_pwd,
            'device_fcm' : this.state.device_fcm_token,
        }
        axios.post(
            API_CONSTANTS.API_SEVER + API_CONSTANTS.USER_LOGIN,
            user_data,
            {
                headers:{
                    'Content-Type': 'application/json',
                }
            }
        )
        .then(response=>{            
            if(response.data === 1){
                this.setState({
                    is_under_process:false,
                    show_id_error:true,
                });                
            }else if(response.data === 2){
                this.setState({
                    is_under_process:false,
                    show_pwd_error:true,
                });
            }else if(response.data === 0){
                this.setState({
                    is_under_process:false,                    
                });
                Alert.alert(
                    I18n.t('alert_login_error_title'),
                    I18n.t('alert_generic_error')
                );;
            }else{
                this.setState({
                    is_under_process:false,                    
                });                
                let user_data = JSON.stringify(response.data);
                AsyncStorage.setItem('sailor_captain_user', user_data);             
                this.props.navigation.navigate('Home');               
            }            
        })
        .catch(error=>{
            this.setState({
                is_under_process:false,                    
            });            
            Alert.alert(
                I18n.t('alert_pwd_reset_error_title'),
                I18n.t('alert_generic_error')
            );
        });
    }
}