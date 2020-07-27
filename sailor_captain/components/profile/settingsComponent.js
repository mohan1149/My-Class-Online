import React, { Component } from 'react';
import I18n from './../../app/locales/i18n';
import AsyncStorage from '@react-native-community/async-storage';
import {
    ScrollView,
    TouchableOpacity,
    Text,
    Image,
    View,
    Dimensions,
} from 'react-native';
import {
    Avatar,
    ListItem,
} from 'react-native-elements';
import { Header, Left, Right, Body, Button } from 'native-base';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();
export default class settingsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_data: '',
            user_profile: 'https://www.w3schools.com/w3images/avatar3.png',
            user_name: 'Captain',
            showLogout: false,
            showModal: false,
        }
    }
    logout() {
        this.setState({
            showLogout: false,
        });
        this.props.navigation.navigate('Login');
    }
    render() {
        let locale = I18n.locale;
        return (
            <>
                <ScrollView>
                    <View>
                        {this.state.user_data !== '' &&
                            <View>
                                <View
                                    style={{
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        marginTop: 10,
                                        //backgroundColor:'#ccc'
                                    }}
                                >
                                    <Text
                                        style={{
                                            margin: 10,
                                            fontSize: 18,
                                            color: '#636b6f'
                                        }}
                                    >{I18n.t('settings_general')}</Text>
                                    <ListItem
                                        title={I18n.t('posts')}
                                        subtitle={I18n.t('posts_added_by')}
                                        leftAvatar={
                                            <Avatar
                                                source={require('./../images/128/talk.png')}
                                                size="small"
                                            />
                                        }
                                        rightElement={
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('myPosts')}
                                            >
                                                <Image
                                                    source={require('./../../components/images/128/forward.png')}
                                                    style={{
                                                        width: 24,
                                                        height: 24,
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        }
                                        bottomDivider
                                    />
                                    <ListItem
                                        title={I18n.t('notifications')}
                                        subtitle={I18n.t('notifications_added_by')}
                                        leftAvatar={
                                            <Avatar
                                                source={require('./../images/128/bell.png')}
                                                size="small"
                                            />
                                        }
                                        rightElement={
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('myNotifications')}
                                            >
                                                <Image
                                                    source={require('./../../components/images/128/forward.png')}
                                                    style={{
                                                        width: 24,
                                                        height: 24,
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        }
                                        bottomDivider
                                    />
                                    <Text
                                        style={{
                                            margin: 10,
                                            fontSize: 18,
                                            color: '#636b6f'
                                        }}
                                    >{I18n.t('settings_account')}</Text>
                                    <ListItem
                                        title={I18n.t('update_profile')}
                                        subtitle={I18n.t('profile_picture')+','+I18n.t('email')+','+I18n.t('phone')}
                                        leftAvatar={
                                            <Avatar
                                                source={require('./../images/128/person-edit.png')}
                                                size="small"
                                            />
                                        }
                                        rightElement={
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('updateProfile')}
                                            >
                                                <Image
                                                    source={require('./../../components/images/128/forward.png')}
                                                    style={{
                                                        width: 24,
                                                        height: 24,
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        }
                                        bottomDivider
                                    />
                                    <ListItem
                                        title={I18n.t('change_password')}
                                        leftAvatar={
                                            <Avatar
                                                source={require('./../images/128/lock.png')}
                                                size="small"
                                            />
                                        }
                                        rightElement={
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('myPosts')}
                                            >
                                                <Image
                                                    source={require('./../../components/images/128/forward.png')}
                                                    style={{
                                                        width: 24,
                                                        height: 24,
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        }
                                        bottomDivider
                                    />
                                    <Text
                                        style={{
                                            margin: 10,
                                            fontSize: 18,
                                            color: '#636b6f'
                                        }}
                                    >{I18n.t('settings_app')}</Text>
                                    <ListItem
                                        title={I18n.t('app_language')}
                                        subtitle="English, हिन्दी, العربية, తెలుగు.."
                                        leftAvatar={
                                            <Avatar
                                                source={require('./../images/128/globe.png')}
                                                size="small"
                                            />
                                        }
                                        rightElement={
                                            <TouchableOpacity
                                                onPress={() => this.setState({showModal:true})}
                                            >
                                                <Image
                                                    source={require('./../../components/images/128/forward.png')}
                                                    style={{
                                                        width: 24,
                                                        height: 24,
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        }
                                        bottomDivider
                                    />
                                    <ListItem
                                        title={I18n.t('privacy_policy')}
                                        subtitle={I18n.t('terms_conditions')}
                                        leftAvatar={
                                            <Avatar
                                                source={require('./../images/128/medal.png')}
                                                size="small"
                                            />
                                        }
                                        rightElement={
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('myPosts')}
                                            >
                                                <Image
                                                    source={require('./../../components/images/128/forward.png')}
                                                    style={{
                                                        width: 24,
                                                        height: 24,
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        }
                                        bottomDivider
                                    />
                                    <Modal
                                        isVisible={this.state.showModal}
                                    >
                                        <View>
                                            <ListItem
                                                title="English"                                                
                                                checkmark = {locale === 'en' ? true : false}
                                                chevron = {locale === 'en' ? false : true}
                                                onPress={()=>{I18n.locale = 'en';this.setState({showModal:false})}}
                                                
                                            />
                                            <ListItem
                                                title="العربية"                                                
                                                checkmark = {locale === 'ar' ? true : false}
                                                chevron = {locale === 'ar' ? false : true}
                                                onPress={()=>{I18n.locale = 'ar';this.setState({showModal:false})}}
                                                
                                            />
                                            <ListItem
                                                title="हिन्दी"                                                       
                                                checkmark = {locale === 'hi' ? true : false}
                                                chevron = {locale === 'hi' ? false : true}                                    
                                                onPress={()=>{I18n.locale = 'hi';this.setState({showModal:false})}}
                                            />

                                            <ListItem
                                                title="తెలుగు"                                                
                                                checkmark = {locale === 'te' ? true : false}
                                                chevron = {locale === 'te' ? false : true}
                                                onPress={()=>{I18n.locale = 'te';this.setState({showModal:false})}}
                                            />
                                        </View>
                                    </Modal>
                                </View>
                            </View>
                        }
                    </View>
                </ScrollView>
            </>
        );
    }
    componentWillUnmount() {
        this._mounted = false;
    }
    componentDidMount() {
        this._mounted = true;
        AsyncStorage.getItem('sailor_captain_user').then((user) => {
            let user_data = JSON.parse(user);
            this.setState({
                user_data: user_data,
                user_profile: user_data.emp_photo,
                user_name: user_data.emp_username,
            });
        });
    }
}