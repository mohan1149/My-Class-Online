import React, { Component } from 'react';
import {
    ScrollView,
    View,
    ActivityIndicator,
    Alert,
    PermissionsAndroid,
    TouchableOpacity,
    Text,
} from 'react-native';
import {
    TextInput,
    Chip,
    Appbar
} from 'react-native-paper';
import {
    Button,
} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app';
import { API_CONSTANTS } from './../../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
export default class createExamComponent extends Component { 
    constructor(props) {
        super(props);
        const date = new Date();
        this.state = {
            uid: '',
            exTitle: '',
            exDesc: '',
            exMaxmarks: 0,
            exQualifymarks: 0,
            exDate: date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate(),
            exTime: '',
            fileUp: false,
            showLoading: false,
            showDatePicker: false,
            showTimePicker: false,
            exAttachments: [],
        };
    }
    render() {
        return (
            <>
                <Appbar.Header
                    style={{
                        backgroundColor: '#3d5ea1'
                    }}
                >
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title="Create Exam"  />
                    <Appbar.Action icon="check" onPress={(e) => this.postExam()} />
                </Appbar.Header>
                <ScrollView
                    style={{
                        backgroundColor: '#fff',
                    }}
                >
                    <View
                        style={{
                            padding: 10,
                        }}
                    >
                        <TextInput
                            onChangeText={(title) => this.setState({ exTitle: title })}
                            mode="outlined"
                            label="Exam Title.."
                            style={{
                                margin: 3,
                            }}
                        />
                        <TextInput
                            onChangeText={(desc) => this.setState({ exDesc: desc })}
                            mode="outlined"
                            label="Brief Description.."
                            multiline={true}
                            numberOfLines={5}
                            style={{
                                margin: 3,
                            }}
                        />
                        <TextInput
                            onChangeText={(marks) => this.setState({ exMaxmarks: marks })}
                            mode="outlined"
                            label="Max Marks.."
                            keyboardType="decimal-pad"
                            style={{
                                margin: 3,
                            }}
                        />
                        <TextInput
                            onChangeText={(qmarks) => this.setState({ exQualifymarks: qmarks })}
                            keyboardType="decimal-pad"
                            mode="outlined"
                            label="Qualify Marks"
                            style={{
                                margin: 3,
                            }}
                        />
                        <DateTimePickerModal
                            isVisible={this.state.showDatePicker}
                            mode="date"
                            onConfirm={(fromDate) => this.handleDate(fromDate)}
                            onCancel={() => this.setState({ showDatePicker: false })}
                        />
                        <DateTimePickerModal
                            isVisible={this.state.showTimePicker}
                            mode="time"
                            onConfirm={(fromTime) => this.handleTime(fromTime)}
                            onCancel={() => this.setState({ showTimePicker: false })}
                        />
                        <TouchableOpacity
                            onPress={() => this.setState({ showDatePicker: true })}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    margin: 10,
                                    color: '#636b6f'
                                }}
                            >Scheduling Date : {this.state.exDate}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.setState({ showTimePicker: true })}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    margin: 10,
                                    color: '#636b6f'
                                }}
                            >Scheduling Time : {this.state.exTime}
                            </Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: 'row',
                                margin: 10,
                                justifyContent: 'space-evenly'
                            }}
                        >
                            <Chip
                                icon="plus"
                                onPress={() => this.launchDocumentPicker()}
                            >
                                Add Attachments{' (' + this.state.exAttachments.length + ')'}
                            </Chip>
                            {this.state.fileUp &&
                                <ActivityIndicator />
                            }
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                            }}
                        >
                            <View>
                                {
                                    this.state.exAttachments.map((chipImg, index) => {
                                        return (
                                            <Chip
                                                style={{
                                                    marginBottom: 3,
                                                }}
                                                key={index}
                                                icon="file"
                                                onClose={() => this.removeFile(index)}
                                                onPress={() => this.removeFile(index)}
                                            >
                                                Attachment{'(' + (index + 1) + ')'}
                                            </Chip>
                                        );
                                    })
                                }
                            </View>
                        </View>                        
                        {this.state.showLoading &&
                            <ActivityIndicator
                                size="large"                                
                            />
                        }
                    </View>
                </ScrollView>
            </>

        );
    }
    handleDate(fromDate) {
        let date = new Date(fromDate);
        let d_format = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        this.setState({
            exDate: d_format,
            showDatePicker: false,
        });
    }
    handleTime(fromTime) {
        let time = new Date(fromTime);
        let t_format = time.getHours() + ':' + time.getMinutes();
        this.setState({
            showTimePicker: false,
            exTime: t_format,
        });
    }
    postExam() {
        this.setState({
            showLoading: true,
        });
        let post_data = {
            'uid': this.state.uid,
            'exTitle': this.state.exTitle,
            'exDesc': this.state.exDesc,
            'exMaxmarks': this.state.exMaxmarks,
            'exQualifymarks': this.state.exQualifymarks,
            'exDate': this.state.exDate,
            'exTime': this.state.exTime,
            'exAttachments': this.state.exAttachments,
            'exClass': this.props.route.params.cid,
            'exSubject': this.props.route.params.subject,
        };
        let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.CREATE_EXAM;
        axios.post(path, post_data)
            .then((response) => {
                if (response.data === 1) {
                    this.setState({ showLoading: false });
                    this.props.navigation.goBack();
                } else {
                    console.log(response.data);
                    this.setState({ showLoading: false });
                    Alert.alert(
                        "Unable to create exam.",
                        "Please check your internet connection or try again after sometime."
                    );
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({ showLoading: false });
                Alert.alert(
                    "Unable to to create exam.",
                    "Please check your internet connection or try again after sometime."
                );
            });
    }
    removeFile(index) {
        let files = this.state.exAttachments.filter((file, pos) => { return pos != index });
        this.setState({
            exAttachments: files,
        });
    }
    componentDidMount() {
        this._mounted = true;
        AsyncStorage.getItem('sailor_captain_user').then((user) => {
            let uid = JSON.parse(user).teacher_foriegn_key;
            this.setState({
                uid: uid,
            });
        });
    }
    componentWillUnmount() {
        this._mounted = false;
    }
    launchDocumentPicker() {
        PermissionsAndroid.requestMultiple(
            [
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ], {
            title: 'Permission',
            message: 'We need your permission.',
        },
        ).then((perms) => {
            if (perms['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
                perms['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
                this.pickFile();
            }
        });
    }

    pickFile() {
        DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles]
        })
            .then((response) => {
                this.setState({
                    fileUp: true,
                });
                let timestamp = new Date().getTime();
                let ext = response.name.split('.').pop();
                const reference = firebase.storage().ref('exam_attachments/' + timestamp + '.' + ext);
                reference.putFile(response.uri)
                    .then((reslut) => {
                        reference.getDownloadURL()
                            .then((response) => {
                                this.state.exAttachments.push(response);
                                this.setState({
                                    fileUp: false,
                                });
                            })
                            .catch((error) => {
                                this.setState({
                                    fileUp: false,
                                });
                                Alert.alert(
                                    "Unable to upload attachment.",
                                    "Please check your internet connection or try again after sometime."
                                );
                            });
                    })
                    .catch((error) => {
                        this.setState({
                            fileUp: false,
                        });
                        Alert.alert(
                            "Unable to upload attachment.",
                            "Please check your internet connection or try again after sometime."
                        );
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }
}