import React, { Component } from 'react';
import { API_CONSTANTS } from './../../constants';
import I18n from './../../app/locales/i18n';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {
    ScrollView,
    Text,
    Alert,
    Dimensions,
    View,
    Switch,
    ActivityIndicator,
} from 'react-native';
import {
    Avatar,
    ListItem,
    Button
} from 'react-native-elements';
import Modal from 'react-native-modal';
import {Appbar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
let final_students = [];
export default class postAttendenceComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            class_data: '',
            showModal: false,
        }
    }
    render() {
        let cl_name = this.props.route.params.className;
        return (
            <>
                <Appbar.Header
                    style={{
                        backgroundColor: '#3d5ea1'
                    }}
                >
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title={I18n.t('stud_list')} subtitle={I18n.t('stud_list_text')+ cl_name} />
                    <Appbar.Action icon="check" onPress={(e) => this.postAttendence()} />
                </Appbar.Header>
                <ScrollView
                    style={{
                        backgroundColor:'#fff'
                    }}
                >
                    {this.state.class_data === '' &&
                        <SkeletonPlaceholder>

                            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginTop={10}>
                                <SkeletonPlaceholder.Item marginLeft={20} width={60} height={60} borderRadius={50} />
                                <SkeletonPlaceholder.Item marginLeft={10}>
                                    <SkeletonPlaceholder.Item marginTop={5} width={200} height={20} borderRadius={4} />
                                    <SkeletonPlaceholder.Item marginTop={5} width={150} height={20} borderRadius={4} />
                                </SkeletonPlaceholder.Item>
                                <SkeletonPlaceholder.Item marginTop={15} marginLeft={15} width={20} height={20} borderRadius={10} />
                            </SkeletonPlaceholder.Item>

                            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginTop={10}>
                                <SkeletonPlaceholder.Item marginLeft={20} width={60} height={60} borderRadius={50} />
                                <SkeletonPlaceholder.Item marginLeft={10}>
                                    <SkeletonPlaceholder.Item marginTop={5} width={200} height={20} borderRadius={4} />
                                    <SkeletonPlaceholder.Item marginTop={5} width={150} height={20} borderRadius={4} />
                                </SkeletonPlaceholder.Item>
                                <SkeletonPlaceholder.Item marginTop={15} marginLeft={15} width={20} height={20} borderRadius={10} />
                            </SkeletonPlaceholder.Item>

                            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" marginTop={10}>
                                <SkeletonPlaceholder.Item marginLeft={20} width={60} height={60} borderRadius={50} />
                                <SkeletonPlaceholder.Item marginLeft={10}>
                                    <SkeletonPlaceholder.Item marginTop={5} width={200} height={20} borderRadius={4} />
                                    <SkeletonPlaceholder.Item marginTop={5} width={150} height={20} borderRadius={4} />
                                </SkeletonPlaceholder.Item>
                                <SkeletonPlaceholder.Item marginTop={15} marginLeft={15} width={20} height={20} borderRadius={10} />
                            </SkeletonPlaceholder.Item>

                        </SkeletonPlaceholder>
                    }
                    {
                        this.state.class_data !== '' &&
                        <View>
                            {/* <Text
                                style={{
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                    fontWeight: '800',
                                    letterSpacing: 1.5,
                                    color: '#636b6f',
                                    fontSize: 18,
                                    margin: 15,
                                }}
                            >
                                {'Class  :  ' + this.state.class_data.className}
                            </Text> */}
                            <View>
                                {this.state.class_data.classStudents.map((student, index) => {
                                    return (
                                        <Student
                                            id={student.id}
                                            position={index}
                                            key={student.id}
                                            name={student.fname + ' ' + student.lname}
                                            sid={student.sid}
                                            avataar={student.photo}
                                            classId={student.class_id}
                                        />
                                    );
                                })
                                }
                            </View>                            
                        </View>
                    }
                    <Modal
                        isVisible={this.state.showModal}
                        style={{
                            flex: 0,
                            height: 200,
                            width: 300,
                            backgroundColor: '#fff',
                            borderRadius: 6,
                            alignSelf: 'center',
                            marginTop: Dimensions.get('screen').height / 4,
                        }}
                    >
                        <Text
                            style={{
                                color: '#636b6f',
                                textAlign: 'center',
                                fontSize: 18,
                                margin: 10,
                            }}
                        >
                            {I18n.t('attendence_publish_text')}
                        </Text>
                        <ActivityIndicator
                            size="large"                            
                        />
                    </Modal>
                </ScrollView>
            </>
        );
    }
    componentDidMount() {
        AsyncStorage.getItem('sailor_captain_user').then((user) => {
            this.setState({
                class_data: this.props.route.params,
                user_data: JSON.parse(user),
            });
        });

    }

    postAttendence() {
        this.setState({
            showModal: true,
        });
        let date = new Date().getHours();
        let session = date > 12 ? 'PM' : 'AM';
        let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.POST_CLASS_ATTENDENCE;
        let post_data = {
            'classId': this.state.class_data.classId,
            'session': session,
            'posterId': this.state.user_data.teacher_foriegn_key,
            'students': final_students,
        }
        axios.post(
            path,
            post_data
        )
            .then((response) => {
                this.setState({
                    showModal: false,
                });
                final_students = [];
                if (response.data === 1) {
                    this.props.navigation.navigate('setClass');
                } else {
                    Alert.alert(
                        I18n.t('attendence_error'),
                        I18n.t('alert_generic_error')
                    );
                    this.props.navigation.navigate('setClass');
                }
            })
            .catch((error) => {
                this.setState({
                    showModal: false,
                });
                Alert.alert(
                    I18n.t('attendence_error'),
                    I18n.t('alert_generic_error')
                );                
            });
    }
}

class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            students: [],
        }
    }
    render() {
        return (
            <ListItem
                status={this.state.status}
                title={this.props.name}
                subtitle={this.props.sid}
                bottomDivider
                leftAvatar={
                    <Avatar
                        source={{ uri: this.props.avataar }}
                        rounded
                    />
                }
                rightElement={
                    <Switch
                        value={this.state.status}
                        onValueChange={() => this.updateStatus(this.props.position)}
                    />
                }
            />
        );
    }
    updateStatus(key) {
        final_students[key].status = !this.state.status;
        this.setState({
            status: !this.state.status,
        });
    }
    componentDidMount() {
        this._mounted = true;
        let student = {
            id: this.props.id,
            sid: this.props.sid,
            status: false,
        };
        final_students.push(student);
    }
    componentWillUnmount() {
        this._mounted = false;
    }
}