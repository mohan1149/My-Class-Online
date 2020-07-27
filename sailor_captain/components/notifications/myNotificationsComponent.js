import React, { Component } from 'react';
import { API_CONSTANTS } from './../../constants';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Alert,
    Image,
    Dimensions,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
    ListItem,
} from 'react-native-elements';
import Modal from 'react-native-modal'
import { Button } from 'native-base';
import {Appbar} from 'react-native-paper';
export default class myNotificationsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_skeleton: true,
            user_notif: '',
            showModal: false,
            targetPost: '',
            showActivity: false,
            showFab: false,
        }
    }
    render() {
        let count = [1, 2, 3, 4, 5];
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
                    <Appbar.Content title="My Notifications" subtitle="Notifications added by you." />                    
                </Appbar.Header>
                <Modal
                    isVisible={this.state.showModal}
                    style={{
                        flex: 0,
                        backgroundColor: '#fff',
                        width: Dimensions.get('screen').width - 70,
                        alignSelf: 'center',
                        borderRadius: 4,
                        marginTop: Dimensions.get('screen').height / 4,
                    }}
                >
                    <View
                        style={{
                            padding: 10,
                        }}
                    >
                        <Image
                            source={require('./../images/trash.png')}
                            style={{
                                width: 100,
                                height: 100,
                                alignSelf: 'center',
                                marginTop: 10,
                            }}
                        />
                        <Text
                            style={{
                                margin: 10,
                                fontSize: 18,
                                color: '#636b6f',
                                textAlign: 'center'
                            }}
                        >Are you sure to delete.?</Text>
                        {this.state.showActivity &&
                            <ActivityIndicator
                                size="large"
                                color="indigo"
                            />
                        }
                        {!this.state.showActivity &&
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center'
                                }}
                            >
                                <Button
                                    onPress={(e) => this.deletePost()}
                                    danger={true}
                                    style={{
                                        padding: 10,
                                        margin: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: 16,
                                        }}
                                    >Delete</Text>
                                </Button>
                                <Button
                                    onPress={() => this.setState({ showModal: false })}
                                    info={true}
                                    style={{
                                        padding: 10,
                                        margin: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: 16,
                                        }}
                                    >Cancel</Text>
                                </Button>
                            </View>
                        }
                    </View>
                </Modal>
                <ScrollView>
                    {this.state.show_skeleton &&
                        <SkeletonPlaceholder>
                            {
                                count.map((counter, index) => {
                                    return (
                                        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" key={index} margin={10}>
                                            <SkeletonPlaceholder.Item marginLeft={20}>
                                                <SkeletonPlaceholder.Item width={Dimensions.get('screen').width - 50} height={20} borderRadius={4} />
                                                <SkeletonPlaceholder.Item
                                                    marginTop={6}
                                                    width={Dimensions.get('screen').width - 100}
                                                    height={20}
                                                    borderRadius={4}
                                                />
                                            </SkeletonPlaceholder.Item>
                                        </SkeletonPlaceholder.Item>
                                    );
                                })
                            }
                        </SkeletonPlaceholder>
                    }
                    {!this.state.show_skeleton &&
                        <View
                            style={{
                                padding: 10,
                            }}
                        >
                            {
                                this.state.user_notif.map((notif, index) => {
                                    return (
                                        <ListItem
                                            onPress={() => this.props.navigation.navigate('viewNotification', notif)}
                                            key={index}
                                            title={notif.notif_title}
                                            titleProps={{
                                                numberOfLines: 2
                                            }}
                                            subtitle={notif.notif_desc}
                                            subtitleProps={{
                                                numberOfLines: 2,
                                            }}
                                            //rightSubtitle={notif.notif_date} 
                                            bottomDivider
                                            rightElement={
                                                <TouchableOpacity
                                                    onPress={() => this.showModal(notif.id)}
                                                >
                                                    <Image
                                                        source={require('./../images/128/trash.png')}
                                                        style={{
                                                            width: 24,
                                                            height: 24,
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                            }
                                        />
                                    );
                                })
                            }
                        </View>
                    }
                </ScrollView>
            </>
        );
    }
    showModal(pid) {
        this.setState({
            showModal: true,
            targetPost: pid,
        });
    }

    deletePost() {
        this.setState({
            showModal: false,
            showActivity: true,
        });
        let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.DELETE_NOTIFICATION + '/' + this.state.targetPost;
        axios.get(path)
            .then((response) => {
                this.setState({
                    showActivity: false,
                    showModal: false,
                    user_notif: this.state.user_notif.filter((post) => {
                        return post.id != this.state.targetPost;
                    }),
                });
            })
            .catch((error) => {
                this.setState({
                    showModal: false,
                    showActivity: false,
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
        AsyncStorage.getItem('sailor_captain_user').then((user) => {
            let uid = JSON.parse(user).teacher_foriegn_key;
            let url = API_CONSTANTS.API_SEVER + API_CONSTANTS.GET_MY_NOTIFICATIONS + '/' + uid;
            axios.get(url)
                .then((response) => {
                    this.setState({
                        show_skeleton: false,
                        user_notif: response.data,
                    });
                })
                .catch((error) => {
                    Alert.alert(
                        "Unable to process.",
                        "Please check your internet connection or try again after sometime."
                    );
                });
        });
    }
}