import React,{Component} from 'react';
import {API_CONSTANTS} from './../../constants';
import I18n from './../../app/locales/i18n';
import {
    SafeAreaView,
    View,
    TextInput,
    Text,
    Dimensions,
    Image,
    ActivityIndicator,
    Alert,
} from 'react-native';
import {Button} from 'react-native-elements';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
export default class forgotPassword extends Component{
    constructor(props){
        super(props);
        this.state ={
            is_under_process : false,
            user_id:'',
            user_reg_num:'',
            show_id_error:false,
            show_modal:false
        }
    }
    render(){
        return(
            <SafeAreaView>                
                <View
                    style={{
                        backgroundColor:'#3d5ea1',
                        height:Dimensions.get('screen').height,
                    }}
                >
                    <Image
                        source = {require('./logo.png')}
                        style={{
                            width:70,
                            height:70,                    
                            alignSelf:'center',
                            marginTop:Dimensions.get('screen').height/6,
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
                        >{I18n.t('enter_id')}</Text>
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
                                    color:'#f44336',                    
                                }}
                            >{I18n.t('invalid_user_id')}</Text>
                        }
                        { this.state.is_under_process &&
                            <ActivityIndicator
                                size="large"
                                color="#3d5ea1"
                                style={{
                                    margin:10,
                                }}
                            />
                        }
                        <Button
                            title={I18n.t('submit')}
                            onPress = {(e)=>this.handleSubmit()}
                            buttonStyle={{
                                marginTop:16,
                                backgroundColor:'#3d5ea1',
                            }}
                        />
                    </View>
                    <Modal
                        animationIn="bounceInUp"
                        animationInTiming={100}
                        isVisible={this.state.show_modal}
                        coverScreen={true}
                        style={{
                            backgroundColor:'#fff',                            
                            width:250,
                            height:300,
                            borderRadius:20,
                            alignSelf:'center',
                            flex:0,
                            marginTop:Dimensions.get('screen').height/4,
                        }}
                    >
                        <View
                            style={{
                                alignItems:'center',
                                padding:10,
                            }}
                        >
                            <Image
                                source={require('./../../components/images/correct.png')}
                                style={{
                                    height:100,
                                    width:100,
                                }}
                            />
                            <Text
                                style={{
                                    marginTop:10,
                                    marginBottom:10,
                                    color:'#636b6f',
                                    fontWeight:'500',
                                    fontSize:18,
                                    textAlign:'center'
                                }}
                            >
                                {I18n.t('pwd_reset_msg')}
                            </Text>
                            <Button
                                onPress={(e)=>{                                    
                                    this.props.navigation.navigate('Login');
                                }}
                                title="Close"
                                buttonStyle={{
                                    marginBottom:15,
                                    width:200,
                                }}
                            />
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        );
    }
    handleUserId(uid){
        this.setState({
            user_reg_num : uid,
            show_id_error:false,
        });
    }
    handleSubmit(){
        this.setState({
            is_under_process: true,
        });
        let data = {            
            'user_reg_num':this.state.user_reg_num,
        }
        axios.post(
            API_CONSTANTS.API_SEVER + API_CONSTANTS.FORGOT_PASSWORD,
            data,
            {
                headers:{
                    'Content-Type': 'application/json',
                }
            }
        )
        .then((response)=>{
            if(response.data === 0){
                Alert.alert(
                    I18n.t('alert_pwd_reset_error_title'),
                    I18n.t('alert_generic_error')
                );
            }else if(response.data === 1){
                this.setState({
                    show_id_error:true,
                    is_under_process:false,
                });
            }else{
                this.setState({
                    show_modal:true,
                    is_under_process:false,
                });
            }
            this.setState({
                is_under_process:false,
            });
        })
        .catch((error)=>{
            this.setState({
                is_under_process:false,
            });
            Alert.alert(
                I18n.t('alert_pwd_reset_error_title'),
                I18n.t('alert_generic_error')
            );
        });   
    }
    componentDidMount(){
        //let data = new FormData();       
    }
}