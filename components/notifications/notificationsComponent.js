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
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
    ListItem,
    Avatar,
} from 'react-native-elements';
import Modal from 'react-native-modal'
import { Button} from 'native-base';
import { Appbar } from 'react-native-paper';
export default class notificationsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_skeleton: true,
            user_posts: '',
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
                    <Appbar.Content title="Notifications" subtitle="Latest notifications posted." />
                    <Appbar.Action icon="plus" onPress={() => this.props.navigation.navigate('addNotification')} />                    
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
                                            <SkeletonPlaceholder.Item marginLeft={20} width={60} height={60} borderRadius={50} />
                                            <SkeletonPlaceholder.Item marginLeft={20}>
                                                <SkeletonPlaceholder.Item width={200} height={20} borderRadius={4} />
                                                <SkeletonPlaceholder.Item
                                                    marginTop={6}
                                                    width={100}
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
                        <View>
                            {
                                this.state.user_posts.map((post, index) => {
                                    return (
                                        <ListItem
                                            onPress={() => this.props.navigation.navigate('viewPost', post)}
                                            key={index}
                                            title={post.post_title}
                                            titleProps={{
                                                numberOfLines: 2
                                            }}
                                            subtitle={post.post_day + '  ' + post.post_date}
                                            leftAvatar={
                                                <Avatar
                                                    source={{ uri: post.post_thumbnail }}
                                                />
                                            }
                                            bottomDivider
                                            rightElement={
                                                <TouchableOpacity
                                                    onPress={() => this.showModal(post.id)}
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
                {/* <FAB.Group
                    style={{                                    
                        flex:0,
                        top:Dimensions.get('screen').height/1.8,
                        margin:5,
                        bottom:0,
                        zIndex:5,
                        height:150,                        
                    }}
                    fabStyle={{
                        backgroundColor:'indigo',                        
                    }}
                    open={this.state.showFab}
                    icon={true ? 'bell' : 'bell'}
                    actions={[
                        { icon: 'plus',color:'indigo', label: 'Add Notofication', onPress: () => this.props.navigation.navigate('addNotification') },
                    ]}
                    onStateChange={()=>this.setState({showFab:!this.state.showFab})}                    
                /> */}
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
        let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.DELETE_POST + '/' + this.state.targetPost;
        axios.get(path)
            .then((response) => {
                this.setState({
                    showActivity: false,
                    showModal: false,
                    user_posts: this.state.user_posts.filter((post) => {
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
            let uid = JSON.parse(user).id;
            let url = API_CONSTANTS.API_SEVER + API_CONSTANTS.GET_USER_POSTS + '/' + uid + '/0';
            axios.get(url)
                .then((response) => {
                    this.setState({
                        show_skeleton: false,
                        user_posts: response.data,
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