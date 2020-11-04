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
import { ListItem } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Appbar} from 'react-native-paper';
export default class addFomeworkComponent extends Component {
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
                    <Appbar.Content title="Assign Homework" />
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
                                        onPress={(e) => this.addHomework(class_data.class_id, class_data.subject)}
                                        chevron
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
                            "Unable to get your classes.",
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

    addHomework(cid, subject) {
        let screen_data = {
            cid: cid,
            subject: subject,
        };
        this.props.navigation.navigate('addHomework', screen_data);
    }
}