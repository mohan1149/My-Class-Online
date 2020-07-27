import React, { Component } from 'react';
import { API_CONSTANTS } from './../../constants';
import AsyncStorage from '@react-native-community/async-storage';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {
    ScrollView,
    View,
    Alert,
} from 'react-native';
import {
    Avatar,
    ListItem,
} from 'react-native-elements';
import axios from 'axios';
export default class profileComponent extends Component {
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
                                <SkeletonPlaceholder.Item flexDirection="row" alignSelf="center" marginTop={20}>
                                    <SkeletonPlaceholder.Item marginLeft={20} width={150} height={150} borderRadius={100} />
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder>
                        }
                        {this.state.user_data !== '' &&
                            <View>
                                <Avatar
                                    containerStyle={{
                                        alignSelf: 'center',
                                        marginTop: 20,
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
                                        title={this.state.user_data.emp_reg_num}
                                        //subtitle={I18n.t('user_id')}
                                        leftAvatar={
                                            <Avatar
                                                source={require('./../images/128/id-card.png')}
                                                size="small"
                                            />
                                        }
                                        bottomDivider
                                    />
                                    <ListItem
                                        title={this.state.school_name}
                                        //subtitle={I18n.t('school')}
                                        leftAvatar={
                                            <Avatar
                                                source={require('./../images/128/school.png')}
                                                size="small"
                                            />
                                        }
                                        bottomDivider
                                    />
                                    <ListItem
                                        title={this.state.dept_name}
                                        //subtitle={I18n.t('department')}
                                        leftAvatar={
                                            <Avatar
                                                source={require('./../images/128/desk.png')}
                                                size="small"
                                            />
                                        }
                                        bottomDivider
                                    />
                                    <ListItem
                                        title={this.state.user_data.emp_designation}
                                        //subtitle={I18n.t('designation')}
                                        leftAvatar={
                                            <Avatar
                                                source={require('./../images/128/university.png')}
                                                size="small"
                                            />
                                        }
                                        bottomDivider
                                    />
                                    <ListItem
                                        title={this.state.user_data.emp_phone}
                                        //subtitle={I18n.t('phone')}
                                        leftAvatar={
                                            <Avatar
                                                source={require('./../images/128/call.png')}
                                                size="small"
                                            />
                                        }
                                        bottomDivider
                                    />
                                    <ListItem
                                        title={this.state.user_data.emp_email}
                                        //subtitle={I18n.t('email')}
                                        leftAvatar={
                                            <Avatar
                                                source={require('./../images/128/mail.png')}
                                                size="small"
                                            />
                                        }
                                        bottomDivider
                                    />
                                    <ListItem
                                        title={this.state.user_data.emp_join_date}
                                        //subtitle={I18n.t('joined_date')}
                                        leftAvatar={
                                            <Avatar
                                                source={require('./../images/128/timetable.png')}
                                                size="small"
                                            />
                                        }
                                        bottomDivider
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
        console.log(this.props);
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
