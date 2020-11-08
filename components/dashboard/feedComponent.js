import React, { Component } from 'react';
import { API_CONSTANTS } from './../../constants';
import {
    ScrollView,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
    Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import {
    Header,
    Left,
    Right,
    Body,
    Button,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Icon,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Avatar, Divider } from 'react-native-elements';
import axios from 'axios';
export default class feedComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null,
            showLogout: false,
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
                        {this.state.posts === null &&
                            <>
                                <SkeletonPlaceholder>
                                    <SkeletonPlaceholder.Item
                                        width={Dimensions.get('screen').width - 20}
                                        height={200}
                                        borderRadius={4}
                                        marginLeft={10}
                                        marginTop={15}
                                    />
                                </SkeletonPlaceholder>
                                <SkeletonPlaceholder>
                                    <SkeletonPlaceholder.Item
                                        width={Dimensions.get('screen').width - 20}
                                        height={200}
                                        borderRadius={4}
                                        marginLeft={10}
                                        marginTop={15}
                                    />
                                </SkeletonPlaceholder>
                                <SkeletonPlaceholder>
                                    <SkeletonPlaceholder.Item
                                        width={Dimensions.get('screen').width - 20}
                                        height={200}
                                        borderRadius={4}
                                        marginLeft={10}
                                        marginTop={15}
                                    />
                                </SkeletonPlaceholder>
                            </>
                        }
                        {this.state.posts !== null &&
                            <View
                                style={{
                                    marginTop: 10,
                                }}
                            >
                                {
                                    this.state.posts.map((post, index) => {
                                        return (
                                            <Card
                                                key={index}
                                            >
                                                <CardItem>
                                                    <Left>
                                                        <Thumbnail small source={{ uri: post.poster_image }} />
                                                        <Body>
                                                            <Text>{post.poster_name}</Text>
                                                            <Text note>{post.post_day + ' ' + post.post_date}</Text>
                                                        </Body>
                                                    </Left>
                                                </CardItem>
                                                <Divider height={1} />
                                                <CardItem cardBody button onPress={() => this.props.navigation.navigate('viewPost', post)}>
                                                    <Image source={{ uri: post.post_thumbnail }} style={{ height: 200, width: null, flex: 1 }} />
                                                </CardItem>
                                                <CardItem>
                                                    <Text
                                                        numberOfLines={2}
                                                    >{post.post_title}</Text>
                                                </CardItem>
                                            </Card>
                                        );
                                    })
                                }
                            </View>
                        }
                    </View>
                </ScrollView>
            </>
        );
    }
    componentDidMount() {
        AsyncStorage.getItem('sailor_captain_user').then((user) => {
            let user_data = JSON.parse(user);
            this.setState({
                user_profile: user_data.emp_photo,
                user_name: user_data.emp_username,
            });
            let url = API_CONSTANTS.API_SEVER + API_CONSTANTS.GET_SCHOOL_POSTS + '/' + user_data.emp_institute + '/' + user_data.id;
            axios.get(url)
                .then((response) => {
                    this.setState({
                        posts: response.data,
                    });
                })
                .catch((error) => {
                    this.setState({
                        user_profile: user_data.emp_photo,
                        user_name: user_data.emp_username,
                    });
                    Alert.alert(
                        "Unable to get the latest posts.",
                        "Please check your internet connection or try again after sometime.[" + error + "]"
                    );
                });
        });
    }
}