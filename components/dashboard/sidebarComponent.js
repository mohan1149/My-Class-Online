import React, { Component } from 'react';
import { API_CONSTANTS } from './../../constants';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from './../../app/locales/i18n';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();
import {
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Text,
    Image,
    Dimensions,
    View,
    Alert,
} from 'react-native';
import {
    Avatar,
    ListItem,
} from 'react-native-elements';
import Modal from 'react-native-modal';
import axios from 'axios';
export default class SidebarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_data: '',
            user_profile: 'https://www.w3schools.com/w3images/avatar3.png',
            user_name: 'Captain',
            showLogout: false,
            school_name: '',
            dept_name: '',
        }
    }
    logout() {
        this.setState({
            showLogout: false,
        });
        this.props.navigation.navigate('Login');
    }
    render() {
        return (
            <>
                <ScrollView>
                    <View>
                        {this.state.user_data === '' &&
                            <SkeletonPlaceholder>
                                <SkeletonPlaceholder.Item flexDirection="row" alignSelf="center" marginTop={50}>
                                    <SkeletonPlaceholder.Item marginLeft={20} width={150} height={150} borderRadius={100} />
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder>
                        }
                        {this.state.user_data !== '' &&
                            <View>
                                <Avatar
                                    containerStyle={{
                                        alignSelf: 'center',
                                        marginTop: 50,
                                    }}
                                    rounded
                                    size="xlarge"
                                    source={{ uri: this.state.user_profile }}
                                />
                                <View
                                    style={{
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        marginTop: 10,
                                    }}
                                >
                                    <ListItem
                                        title={this.state.user_name}
                                        bottomDivider
                                    />
                                    <ListItem
                                        title={I18n.t('home')}
                                        chevron
                                        leftIcon={{ name: 'home' }}
                                        onPress={()=>{this.props.navigation.toggleDrawer();this.props.navigation.jumpTo('Home')}}
                                    />
                                    <ListItem
                                        title={I18n.t('attendence')}
                                        chevron
                                        leftIcon={{ name: 'laptop' }}
                                        onPress={()=>{this.props.navigation.navigate('setClass')}}
                                    />
                                    <ListItem
                                        title={I18n.t('timetable')}
                                        chevron
                                        leftIcon={{ name: 'alarm' }}
                                        onPress={()=>{this.props.navigation.navigate('userTimetable')}}
                                    />
                                    <ListItem
                                        title={I18n.t('homework')}
                                        chevron
                                        leftIcon={{ name: 'create' }}
                                        onPress={()=>{this.props.navigation.navigate('homework')}}
                                    />
                                    <ListItem
                                        title={I18n.t('posts')}
                                        chevron
                                        leftIcon={{ name: 'comment' }}
                                        onPress={()=>{this.props.navigation.toggleDrawer();this.props.navigation.jumpTo('posts')}}
                                    />
                                    <ListItem
                                        title={I18n.t('settings')}
                                        chevron
                                        leftIcon={{ name: 'settings' }}
                                        onPress={()=>{this.props.navigation.toggleDrawer();this.props.navigation.jumpTo('Settings')}}
                                    />
                                    <ListItem
                                        title={I18n.t('profile')}
                                        chevron
                                        leftIcon={{ name: 'person' }}
                                        onPress={()=>{this.props.navigation.toggleDrawer();this.props.navigation.jumpTo('Profile')}}
                                    />
                                    <ListItem
                                        title={I18n.t('notifications')}
                                        chevron
                                        leftIcon={{ name: 'notifications' }}
                                        onPress={()=>{this.props.navigation.navigate('notifications')}}
                                    />
                                    <ListItem
                                        title={I18n.t('logout')}
                                        chevron
                                        leftIcon={{ name: 'lock' }}
                                        onPress={()=>{}}
                                    />
                                    <ListItem
                                        title={I18n.t('version')}
                                        rightTitle='1.0'
                                                                                                                       
                                    />
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
            let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.GET_USER_DATA + '/' + user_data.id
            axios.get(path)
                .then((response) => {
                    this.setState({
                        user_data: user_data,
                        user_profile: user_data.emp_photo,
                        user_name: user_data.emp_username,
                        school_name: response.data.school.school_name,
                        dept_name: response.data.dept.dept_name,
                    });
                })
                .catch((error) => {
                    Alert.alert(
                        "Unable to get profile.",
                        "Please check your internet connection or try again after sometime."
                    );
                });
        });
    }
}
