import React, { Component } from 'react';
import { API_CONSTANTS } from '../../constants';
import {
    StatusBar,
    ScrollView,
    TextInput,
    View,
    Text,
    Dimensions,
    Alert,
    ActivityIndicator,
} from 'react-native';
import {
    ListItem,
    Avatar,
} from 'react-native-elements';
import {Appbar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { WebView } from 'react-native-webview';
import Modal from 'react-native-modal';
import axios from 'axios';
export default class addPostComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_data: '',
            day: '',
            date: '',
            month: '',
            year: '',
            web_loaded: false,
            web_height: 20,
            show_modal: false,
            post_data: '',
            post_title: '',
            image_data: '',
            image_name: '',
            showLoader: false,
            showEditor: true,
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
                    <Appbar.Content title="Add Post" subtitle="Choose class to add exam" />
                    {/* <Appbar.Action icon="dots-vertical" onPress={() => this._menu.show()} /> */}
                </Appbar.Header>
                <ScrollView>
                    {!this.state.web_loaded &&
                        <View
                            style={{
                                marginTop: 20,
                            }}
                        >
                            <SkeletonPlaceholder>
                                <SkeletonPlaceholder.Item marginLeft={20} width={Dimensions.get('screen').width - 40} height={60} borderRadius={50} />
                                <SkeletonPlaceholder.Item marginTop={20} marginLeft={20} width={Dimensions.get('screen').width - 40} height={50} borderRadius={4} />
                                <SkeletonPlaceholder.Item marginTop={20} marginLeft={20} width={Dimensions.get('screen').width - 40} height={150} borderRadius={4} />
                            </SkeletonPlaceholder>
                        </View>
                    }
                    {this.state.web_loaded &&
                        <View
                            style={{
                                padding: 12
                            }}
                        >
                            <ListItem
                                title={this.state.user_data.emp_username}
                                subtitle={this.state.day + '  ' + this.state.date + '-' + this.state.month + '-' + this.state.year}
                                leftAvatar={
                                    <Avatar
                                        source={{ uri: this.state.user_data.emp_photo }}
                                        rounded
                                        size="medium"
                                    />
                                }
                            />
                            <TextInput
                                onChangeText={(e) => this.setState({ post_title: e })}
                                placeholder="Post title.."
                                multiline={true}
                                style={{
                                    backgroundColor: '#fff',
                                    marginTop: 10,
                                    borderRadius: 4,
                                }}
                            />
                        </View>
                    }

                    <WebView
                        ref="webview"
                        onMessage={(data) => this.handleMessage(data)}
                        onLoad={(e) => this.setState({ web_loaded: true, web_height: 500 })}
                        source={{ uri: API_CONSTANTS.API_SEVER + API_CONSTANTS.WEB_EDITOR }}
                        style={{
                            margin: 15,
                            height: this.state.web_height,
                        }}
                    />
                    <Modal
                        isVisible={this.state.show_modal}
                        style={{
                            flex: 0,
                            height: 250,
                            width: Dimensions.get('screen').width - 50,
                            backgroundColor: '#fff',
                            marginTop: Dimensions.get('screen').height / 4,
                            borderRadius: 4,
                            alignSelf: 'center'
                        }}
                    >
                        <View
                            style={{
                                alignItems: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: '#636b6f',
                                    textAlign: 'center',
                                    margin: 15,
                                }}
                            >Please wait, your post is publishing..</Text>
                            <ActivityIndicator
                                size="large"
                                color="indigo"
                            />
                        </View>
                    </Modal>
                </ScrollView>
            </>
        );
    }
    handleMessage(message) {
        let data = JSON.parse(message.nativeEvent.data);
        if (data.status === 'started') {
            this.setState({
                show_modal: true,
            });
        } else if (data.status === 'error') {
            Alert.alert(
                "Unable to publish your post at this moment.",
                "Please check your internet connection or try again after sometime."
            );
        } else {
            this.submitPost(data.status, data.data);
        }
    }

    submitPost(post_thumbnail_url, post_dec) {
        this.setState({
            showLoader: true,
            web_loaded: false,
            showEditor: false,
        });
        let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.ADD_POST;
        let post_data = {
            'ins_id': this.state.user_data.emp_institute,
            'ins_type': this.state.user_data.emp_ins_type,
            'poster_id': this.state.user_data.id,
            'poster_name': this.state.user_data.emp_username,
            'post_title': this.state.post_title,
            'post_desc': post_dec,
            'post_day': this.state.day,
            'poster_image': this.state.user_data.emp_photo,
            'post_thumbnail': post_thumbnail_url,
        };
        axios.post(
            path,
            post_data
        )
            .then((response) => {
                this.setState({
                    show_modal: false,
                    web_loaded: true,
                });
                this.props.navigation.navigate('myPosts');
            })
            .catch((error) => {
                this.setState({
                    showLoader: false,
                });
                Alert.alert(
                    "Unable to process.",
                    "Please check your internet connection or try again after sometime."
                );
            });
    }
    componentWillUnmount() {
        this._mounted = false;
    }
    componentDidMount() {
        this._mounted = true;
        let days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        var d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth();
        let date = d.getDate();
        let day = days[d.getDay()];
        AsyncStorage.getItem('sailor_captain_user').then((user) => {
            this.setState({
                user_data: JSON.parse(user),
                day: day,
                date: date,
                month: (month + 1),
                year: year,
            });
        });
    }
}