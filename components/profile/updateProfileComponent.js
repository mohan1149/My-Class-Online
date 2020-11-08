import React,{Component} from 'react';
import {API_CONSTANTS} from './../../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {    
    ScrollView,    
    View,
    TextInput,
    ActivityIndicator,
    Text,
    Image,
    Alert,
} from 'react-native';
import {
    Avatar,  
    Button  
} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { List } from 'react-native-paper'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app';
import Modal from 'react-native-modal';
export default class updateProfileComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            user_data   : null,
            showModal   : false,
            showLoading : true,
            showSuccess : false,
            showError   : false,
            showUpdate  : false,
        }
    }
    _handlePress = () =>
        this.setState({
            expanded: !this.state.expanded
    });
    render(){
        return(
            <ScrollView>
                <View>
                    {this.state.user_data === null &&
                        <SkeletonPlaceholder>
                            <SkeletonPlaceholder.Item flexDirection="row" alignSelf="center" marginTop={20}>
                                <SkeletonPlaceholder.Item marginLeft={20} width={150} height={150} borderRadius={100} />                                    
                            </SkeletonPlaceholder.Item>                                                                
                        </SkeletonPlaceholder>
                    }
                    {this.state.user_data !== null &&
                        <View>
                            <View>
                                <Avatar
                                    containerStyle={{
                                        alignSelf:'center',
                                        marginTop:20,                                        
                                    }}                                    
                                    rounded
                                    size="xlarge"
                                    source={{uri:this.state.user_profile}}
                                    showAccessory
                                    onAccessoryPress={()=>this.launchImagePicker()}
                                    accessory={{
                                        name:'person',
                                        size:26,
                                        color:'#636b6f',
                                        backgroundColor:'#fff',
                                        borderRadius:40,                                                                              
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    margin:10,

                                }}
                            >
                                <List.Accordion                                                                      
                                    title={this.state.user_phone}                                    
                                    left={props => <List.Icon {...props} icon="phone" />}
                                >
                                    <TextInput
                                        placeholder="Phone" 
                                        autoFocus={true}    
                                        onChangeText={(phone)=>this.handlePhone(phone)}                                 
                                    />
                                </List.Accordion>
                                <List.Accordion                                                                      
                                    title={this.state.user_mail}                                    
                                    left={props => <List.Icon {...props} icon="email" />}
                                >
                                    <TextInput
                                        placeholder="Email"
                                        autoFocus={true}
                                        onChangeText={(mail)=>this.handleMail(mail)}    
                                    />
                                </List.Accordion>
                            </View>
                            <Button
                                onPress={()=>this.updateProfile()}
                                containerStyle={{
                                    margin:10,
                                }}
                                title='Update'
                            />
                            <Modal
                                isVisible={this.state.showModal}
                            >
                                <View>
                                    {this.state.showSuccess &&
                                        <View>
                                            <Image
                                                source={require('./../images/128/success.png')}
                                                style={{
                                                    width:60,
                                                    height:60,
                                                    alignSelf:'center'
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    zIndex:3,
                                                    color:'#fff',
                                                    textAlign:'center',
                                                    fontSize:20,
                                                    margin:10,
                                                }}
                                            >Done..</Text>

                                        </View>
                                    }
                                    {this.state.showLoading &&
                                        <View>
                                            <Text
                                                style={{
                                                    zIndex:3,
                                                    color:'#fff',
                                                    textAlign:'center',
                                                    fontSize:20,
                                                    margin:10,
                                                }}
                                            >Please wait while image is uploading..</Text>
                                            <ActivityIndicator
                                                size="large"
                                                color="#fff"
                                            />
                                        </View>
                                    }
                                    {this.state.showError &&
                                        <Text
                                            style={{
                                                zIndex:3,
                                                color:'#fff',
                                                textAlign:'center',
                                                fontSize:20,
                                                margin:10,
                                            }}
                                        >Failed upload..</Text>
                                    }
                                </View>
                            </Modal>
                            <Modal
                                isVisible={this.state.showUpdate}
                            >
                                <View>
                                    <Text
                                        style={{
                                            zIndex:3,
                                            color:'#fff',
                                            textAlign:'center',
                                            fontSize:20,
                                            margin:10,
                                        }}
                                    >Please wait profile is updating</Text>
                                    <ActivityIndicator
                                        size="large"
                                        color="#fff"
                                    />
                                </View>
                            </Modal>
                        </View>
                    }
                </View>
            </ScrollView>
        );
    }

    handlePhone(phone){
        this.setState({
            user_phone: phone !== '' ? phone : this.state.user_data.emp_phone,
        });
    }

    handleMail(mail){
        this.setState({
            user_mail: mail !== '' ? mail : this.state.user_data.emp_email,
        });
    }

    updateProfile(){
        this.setState({
            showUpdate:true,
        });
        let post_data = {
            uid   : this.state.user_data.teacher_foriegn_key,
            phone : this.state.user_phone,
            email : this.state.user_mail,
            photo : this.state.user_profile

        }        
        let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.UPDATE_USER_PROFILE;        
        axios.post(path,post_data)
        .then((response)=>{
            if(response.data != 0){
                AsyncStorage.setItem('sailor_captain_user', JSON.stringify(response.data));
                this.props.navigation.navigate('Profile');
            }else{
                this.setState({showUpdate:flase});
                Alert.alert(
                    "Unable to update profile.",
                    "Please check your internet connection or try again after sometime."
                );
            }
        })
        .catch((error)=>{
            this.setState({showUpdate:flase});
            Alert.alert(
                "Unable to update profile.",
                "Please check your internet connection or try again after sometime."
            );
        });
    }
    componentWillUnmount(){
        this._mounted = false;
    }
    componentDidMount(){       
        this._mounted = true;   
        AsyncStorage.getItem('sailor_captain_user').then((user)=>{            
            let user_data = JSON.parse(user);
            this.setState({
                user_data    : user_data,
                user_profile : user_data.emp_photo,
                user_name    : user_data.emp_username,
                user_phone   : user_data.emp_phone,
                user_mail    : user_data.emp_email,
            });                      
        });
    }

    launchImagePicker(){        
        const options = {
            title: 'Please choose image..',        
        };
        ImagePicker.showImagePicker(options, (response) => {             
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }else{
                this.setState({showModal:true});
                let timestamp = new Date().getTime();
                let ext = response.fileName.split('.').pop();                
                const reference = firebase.storage().ref('app_user_profiles/' + timestamp + '.' +ext);
                reference.putFile(response.path)
                .then((response)=>{                    
                    reference.getDownloadURL()
                    .then((result)=>{
                        this.setState({
                            showSuccess  : true,
                            showLoading  : false,
                            user_profile : result,
                        });
                        setTimeout(()=>{ this.setState({showModal:false}) }, 1000);
                    })
                    .catch((error)=>{
                        this.setState({
                            showLoading : false,
                            showError   : true,
                        });
                        setTimeout(()=>{ this.setState({showModal:false}) }, 2000);
                    });
                })
                .catch((error)=>{
                    this.setState({
                        showLoading : false,
                        showError   : true,
                    });
                    setTimeout(()=>{ this.setState({showModal:false}) }, 2000);
                });
            }
        })
    }
}