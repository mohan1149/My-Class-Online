import React, { Component } from 'react';
import { API_CONSTANTS } from './../../constants';
import I18n from './../../app/locales/i18n';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {
    ScrollView,
    Image,
    TouchableOpacity,
    View,
    Alert,
    StatusBar,
    Dimensions
} from 'react-native';
import {
    ListItem,
} from 'react-native-elements';
import { Appbar } from 'react-native-paper';
export default class setClassComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classData: [],
        }
    }
    render() {
        let id = -1;
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
                    <Appbar.Content title={I18n.t('your_classes')} subtitle={I18n.t('your_classes_text')}/>
                    {/* <Appbar.Action icon="dots-vertical" onPress={() => this._menu.show()} /> */}
                </Appbar.Header>
                <ScrollView
                    style={{
                        backgroundColor:'#fff'
                    }}
                >
                    <View
                        style={{
                            marginLeft: 10,
                        }}
                    >
                        {this.state.classData.length === 0 &&
                            <SkeletonPlaceholder>
                                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginTop={10}>
                                    <SkeletonPlaceholder.Item marginLeft={10}>
                                        <SkeletonPlaceholder.Item marginTop={5} width={Dimensions.get('screen').width - 40} height={60} borderRadius={4} />
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder.Item>

                                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginTop={10}>
                                    <SkeletonPlaceholder.Item marginLeft={10}>
                                        <SkeletonPlaceholder.Item marginTop={5} width={Dimensions.get('screen').width - 40} height={60} borderRadius={4} />
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder.Item>

                            </SkeletonPlaceholder>
                        }
                    </View>
                    <View>
                        {
                            this.state.classData.length > 0 &&
                            <View>
                                {/* <Text
                                    style={{
                                        textAlign: 'center',
                                        fontSize: 20,
                                        color: '#636b6f',
                                        letterSpacing: 1.5,
                                        textTransform: 'uppercase',
                                        margin: 15,
                                    }}
                                >
                                    Today Classes
                                </Text> */}
                                {this.state.classData.map((class_data, key) => {
                                    if (class_data.classId !== id) {
                                        id = class_data.classId;
                                        return (
                                            <ListItem
                                                key={key}
                                                title={class_data.className}
                                                subtitle={class_data.grade}
                                                bottomDivider
                                                chevron
                                                onPress={() => this.gotoAttendence(class_data)}
                                            />
                                        )
                                    }
                                })}
                            </View>
                        }
                    </View>
                </ScrollView>
            </>

        );
    }

    componentDidMount() {
        this._mounted = true;
        AsyncStorage.getItem('sailor_captain_user').then((user) => {
            let user_data = JSON.parse(user);
            let uid = user_data.teacher_foriegn_key;
            let sid = user_data.emp_institute;
            let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.GET_USER_CLASSES + '/' + uid + '/' + sid;
            axios.get(path)
                .then((response) => {
                    this.setState({
                        classData: response.data,
                    });
                })
                .catch((error) => {
                    Alert.alert(
                        I18n.t('classes_error'),
                        I18n.t('alert_generic_error')
                    );
                });
        });
    }

    gotoAttendence(class_data) {
        this.props.navigation.navigate('postAttendence', class_data);
    }
    componentWillUnmount() {
        this._mounted = false;
    }
}
