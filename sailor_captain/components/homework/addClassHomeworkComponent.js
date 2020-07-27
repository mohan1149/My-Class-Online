import React, { Component } from 'react';
import {
    ScrollView,
    View,
    ActivityIndicator,
    Alert,
    StatusBar
} from 'react-native';
import {
    TextInput,
    Chip,
    Appbar
} from 'react-native-paper';
import {
    Button,
} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import firebase from '@react-native-firebase/app';
import { API_CONSTANTS } from './../../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
export default class addClassHomeworkComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            hwTitle: '',
            hwDesc: '',
            hwImages: [],
            hwAttach: [],
            fileUp: false,
            imageUp: false,
            showLoading: false,
        };
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
                    <Appbar.Content title="Create Homework" />
                    {/* <Appbar.Action icon="dots-vertical" onPress={() => this._menu.show()} /> */}
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
                            onChangeText={(title) => this.setState({ hwTitle: title })}
                            mode="outlined"
                            label="Title.."
                            style={{
                                margin: 5,
                            }}
                        />
                        <TextInput
                            onChangeText={(desc) => this.setState({ hwDesc: desc })}
                            mode="outlined"
                            label="Homework Content.."
                            multiline={true}
                            numberOfLines={12}
                            style={{
                                margin: 5,
                            }}
                        />
                        <View
                            style={{
                                display: "flex",
                                flexDirection: 'row',
                                margin: 10,
                                justifyContent: 'space-evenly'
                            }}
                        >
                            <Chip
                                icon="image"
                                onPress={() => this.launchImagePicker()}
                            >
                                Add Image{' (' + this.state.hwImages.length + ')'}
                            </Chip>
                            {this.state.imageUp &&
                                <ActivityIndicator />
                            }
                            <Chip
                                icon="plus"
                                onPress={() => this.launchDocumentPicker()}
                            >
                                Add Attachments{' (' + this.state.hwAttach.length + ')'}
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
                                    this.state.hwImages.map((chipImg, index) => {
                                        return (
                                            <Chip
                                                style={{
                                                    marginBottom: 3,
                                                }}
                                                key={index}
                                                icon="image"
                                                onClose={() => this.removeImage(index)}
                                                onPress={() => this.removeImage(index)}
                                            >
                                                Image{'(' + (index + 1) + ')'}
                                            </Chip>
                                        );
                                    })
                                }
                            </View>
                            <View>
                                {
                                    this.state.hwAttach.map((chipImg, index) => {
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
                        {!this.state.showLoading &&
                            <Button
                                onPress={() => this.postHomework()}
                                containerStyle={{
                                    margin: 5,
                                }}
                                title="Save"
                            />
                        }
                        {this.state.showLoading &&
                            <ActivityIndicator
                                size="large"
                                color="indigo"
                            />
                        }
                    </View>
                </ScrollView>
            </>

        );
    }
    postHomework() {
        this.setState({
            showLoading: true,
        });
        let post_data = {
            'uid': this.state.uid,
            'hwTitle': this.state.hwTitle,
            'hwDesc': this.state.hwDesc,
            'hwImages': this.state.hwImages,
            'hwAttachs': this.state.hwAttach,
            'hwClass': this.props.route.params.cid,
            'hwSubject': this.props.route.params.subject,
        };
        let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.POST_CLASS_HOMEWORK;
        axios.post(path, post_data)
            .then((response) => {
                if (response.data === 1) {
                    this.setState({ showLoading: false });
                    this.props.navigation.navigate('homework');
                } else {
                    this.setState({ showLoading: false });
                    console.log(response.data);
                    Alert.alert(
                        "Unable to post homework.",
                        "Please check your internet connection or try again after sometime."
                    );
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({ showLoading: false });
                Alert.alert(
                    "Unable to post homework.",
                    "Please check your internet connection or try again after sometime."
                );
            });
    }
    removeFile(index) {
        let files = this.state.hwAttach.filter((file, pos) => { return pos != index });
        this.setState({
            hwAttach: files,
        });
    }
    removeImage(index) {
        let images = this.state.hwImages.filter((image, pos) => { return pos != index });
        this.setState({
            hwImages: images,
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
        //console.log(this.props.route.params);
    }
    componentWillUnmount() {
        this._mounted = false;
    }

    launchImagePicker() {
        const options = {
            title: 'Please choose image..',
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                this.setState({
                    imageUp: true,
                });
                let timestamp = new Date().getTime();
                let ext = response.fileName.split('.').pop();
                let image_path = response.path;
                const reference = firebase.storage().ref('homeworks/' + timestamp + '.' + ext);
                reference.putFile(image_path)
                    .then((response) => {
                        reference.getDownloadURL()
                            .then((result) => {
                                this.state.hwImages.push(result);
                                this.setState({
                                    imageUp: false,
                                });
                            })
                            .catch((error) => {
                                this.setState({
                                    imageUp: false,
                                });
                                Alert.alert(
                                    "Unable to upload image.",
                                    "Please check your internet connection or try again after sometime."
                                );
                            });
                    })
                    .catch((error) => {
                        this.setState({
                            imageUp: false,
                        });
                        Alert.alert(
                            "Unable to upload image.",
                            "Please check your internet connection or try again after sometime."
                        );
                    });

            }
        });

    }
    launchDocumentPicker() {
        DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles]
        })
            .then((response) => {
                this.setState({
                    fileUp: true,
                });
                let timestamp = new Date().getTime();
                let ext = response.name.split('.').pop();
                const reference = firebase.storage().ref('homeworks/' + timestamp + '.' + ext);
                reference.putFile(response.uri)
                    .then((reslut) => {
                        reference.getDownloadURL()
                            .then((response) => {
                                this.state.hwAttach.push(response);
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