import React, { Component } from 'react';
import { API_CONSTANTS } from '../../constants';
import {
    ScrollView,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert,
    StatusBar,
} from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Button, ListItem } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Appbar } from 'react-native-paper';
export default class userSyllabusComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSyllabus: null,
        }
    }
    render() {
        return (
            <>
                <StatusBar
                    barStyle="light-content"
                />
                <Appbar.Header
                    style={{
                        backgroundColor: '#3d5ea1'
                    }}
                >
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title=" My Syllabus" subtitle="List of classs you are taking." />
                    {/* <Appbar.Action icon="dots-vertical" onPress={() => this._menu.show()} /> */}
                </Appbar.Header>
                <ScrollView
                    style={{
                        backgroundColor:'#fff'
                    }}
                >
                    <View>
                        {this.state.userSyllabus === null &&
                            <SkeletonPlaceholder>
                                <SkeletonPlaceholder.Item
                                    width={Dimensions.get('screen').width - 50}
                                    alignSelf="center"
                                    height={40}
                                    borderRadius={4}
                                    marginTop={10}
                                />
                                <SkeletonPlaceholder.Item
                                    width={Dimensions.get('screen').width - 50}
                                    alignSelf="center"
                                    height={40}
                                    borderRadius={4}
                                    marginTop={10}
                                />
                                <SkeletonPlaceholder.Item
                                    width={Dimensions.get('screen').width - 50}
                                    alignSelf="center"
                                    height={40}
                                    borderRadius={4}
                                    marginTop={10}
                                />
                            </SkeletonPlaceholder>
                        }
                    </View>
                    <View>
                        {this.state.userSyllabus !== null &&
                            <View>
                                {this.state.userSyllabus.map((class_data, index) => {
                                    return (
                                        <ListItem
                                            key={index}
                                            title={JSON.parse(class_data.subject).subject}
                                            bottomDivider
                                            subtitle={class_data.grade_year + ' : ' + class_data.class_name}
                                            rightElement={
                                                <TouchableOpacity
                                                    onPress={(e) => this.showSyllabus(class_data.class_id, JSON.parse(class_data.subject).subject)}
                                                >
                                                    <Image
                                                        source={require('./../images/128/forward.png')}
                                                        style={{
                                                            width: 24,
                                                            height: 24,
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                            }
                                        />
                                    );
                                })}
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
            let uid = user_data.teacher_foriegn_key;
            let sid = user_data.emp_institute;
            let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.GET_USER_SYLLABUS + '/' + uid + '/' + sid;
            axios.get(path)
                .then((response) => {
                    if (response.data === 0) {
                        Alert.alert(
                            "Unable to get your syllabus.",
                            "Please check your internet connection or try again after sometime."
                        );
                    } else {
                        this.setState({
                            userSyllabus: response.data
                        });
                    }
                })
                .catch((error) => {
                    Alert.alert(
                        "Unable to get your syllabus.",
                        "Please check your internet connection or try again after sometime."
                    );
                });
        });
    }

    showSyllabus(cid, subject) {
        let screen_data = {
            cid: cid,
            subject: subject,
        };
        this.props.navigation.navigate('showSyllabus', screen_data);
    }
}