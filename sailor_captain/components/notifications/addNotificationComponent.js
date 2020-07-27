import React, { Component } from 'react';
import {
    ScrollView,
    View,
    ActivityIndicator,
    Alert,
    PermissionsAndroid,
    Text,
    Dimensions,
} from 'react-native';
import {
    TextInput,
    Chip,
    Appbar
} from 'react-native-paper';
import {
    Button,
    ListItem,
} from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app';
import { API_CONSTANTS } from './../../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
let notifClasses = [];
export default class addNotificationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            sid: '',
            nfTitle: '',
            nfDesc: '',
            classes: '',
            fileUp: false,
            showLoading: false,
            nfAttachments: [],
            targetaAll: true,
            allStaff: true,
            allStudent: true,
            showDialog: false,
            finalClasses: [],
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
                    <Appbar.Content title="Add Notification"  />
                    <Appbar.Action icon="check" onPress={() => this.postNotification()} />
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
                            onChangeText={(title) => this.setState({ nfTitle: title })}
                            mode="outlined"
                            label="Title.."
                            style={{
                                margin: 3,
                            }}
                        />
                        <TextInput
                            onChangeText={(desc) => this.setState({ nfDesc: desc })}
                            mode="outlined"
                            label="Description.."
                            multiline={true}
                            numberOfLines={5}
                            style={{
                                margin: 3,
                            }}
                        />
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                margin: 10,
                            }}
                        >
                            {this.state.targetaAll &&
                                <Chip
                                    icon="bank"
                                    onPress={() => this.setState({ targetaAll: false, allStaff: false, allStudent: false })}
                                    onClose={() => this.setState({ targetaAll: false, allStaff: false, allStudent: false })}
                                >
                                    All (Staff & Students)
                            </Chip>
                            }

                            {this.state.allStaff &&
                                <Chip
                                    icon="account-supervisor"
                                    onPress={() => this.setState({ allStaff: false, targetaAll: false })}
                                    onClose={() => this.setState({ allStaff: false, targetaAll: false })}
                                >
                                    Staff
                            </Chip>
                            }
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                            }}
                        >
                            {this.state.allStudent &&
                                <Chip
                                    icon="school"
                                    onPress={() => this.setState({ allStudent: false, targetaAll: false })}
                                    onClose={() => this.setState({ allStudent: false, targetaAll: false })}
                                >
                                    Students
                            </Chip>
                            }
                            <Chip
                                icon="plus"
                                onPress={() => this.pickClass()}
                            >
                                Add Target Class({this.state.finalClasses.length})
                        </Chip>
                        </View>
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
                                Add Attachments{' (' + this.state.nfAttachments.length + ')'}
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
                                    this.state.nfAttachments.map((chipImg, index) => {
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
                    <Modal
                        isVisible={this.state.showDialog}
                        style={{
                            backgroundColor: '#fff',
                            flex: 0,
                            width: Dimensions.get('screen').width - 40,
                            marginTop: Dimensions.get('screen').height / 4,
                            justifyContent: 'center',
                            borderRadius: 6,
                            padding: 10,
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 18,
                            }}
                        >Choose the class</Text>
                        <ScrollView>
                            {this.state.classes.length !== 0 &&
                                this.state.classes.map((class_data, index) => {
                                    return (
                                        <ListItem
                                            key={index}
                                            title={class_data.grade_year + ' - ' + class_data.class_name}
                                            bottomDivider
                                            onPress={() => this.addClass(class_data.class_id)}
                                            leftIcon={{
                                                name: notifClasses.includes(class_data.class_id) ? 'check' : ''
                                            }}
                                        />
                                    );
                                })
                            }
                        </ScrollView>
                        <Button
                            title="Choose"
                            onPress={() => this.chooseClasses()}
                        />
                    </Modal>
                </ScrollView>
            </>

        );
    }
    addClass(cid) {
        if (notifClasses.includes(cid)) {
            notifClasses = notifClasses.filter((notif) => { return notif !== cid })
        } else {
            notifClasses.push(cid);
        }
        this.setState({
            finalClasses: notifClasses,
        });
    }
    chooseClasses() {
        this.setState({
            showDialog: false,
        });
    }
    pickClass() {
        this.setState({
            showDialog: true,
        });
    }
    postNotification() {
        this.setState({
            showLoading: true,
        });
        let post_data = {
            'uid': this.state.uid,
            'notif_sid': this.state.sid,
            'nfTitle': this.state.nfTitle,
            'nfDesc': this.state.nfDesc,
            'targetAll': this.state.targetaAll,
            'allStaff': this.state.allStaff,
            'allStudents': this.state.allStudent,
            'finalClasses': this.state.finalClasses,
            'nfAttachments': this.state.nfAttachments,
        };
        console.log(post_data);
        let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.POST_NOTIFICATION;
        axios.post(path, post_data)
            .then((response) => {
                if (response.data === 1) {
                    this.setState({ showLoading: false });
                    this.props.navigation.goBack();
                } else {
                    this.setState({ showLoading: false });
                    Alert.alert(
                        "Unable to post the notification.",
                        "Please check your internet connection or try again after sometime.[" + response.data + "]"
                    );
                }
            })
            .catch((error) => {
                this.setState({ showLoading: false });
                Alert.alert(
                    "Unable to post the notification.",
                    "Please check your internet connection or try again after sometime.[" + error + "]"
                );
            });
    }
    removeFile(index) {
        let files = this.state.nfAttachments.filter((file, pos) => { return pos != index });
        this.setState({
            nfAttachments: files,
        });
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
                            uid: uid,
                            classes: response.data,
                            sid: sid,
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
                const reference = firebase.storage().ref('notifications/' + timestamp + '.' + ext);
                reference.putFile(response.uri)
                    .then((reslut) => {
                        reference.getDownloadURL()
                            .then((response) => {
                                this.state.nfAttachments.push(response);
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
