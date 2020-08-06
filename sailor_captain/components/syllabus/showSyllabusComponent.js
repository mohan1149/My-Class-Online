import React, { Component } from 'react';
import { API_CONSTANTS } from './../../constants';
import {
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import {
    ListItem,
    Button
} from 'react-native-elements';
import axios from 'axios';
import Modal from 'react-native-modal';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Appbar } from 'react-native-paper';
export default class showSyllabusComponent extends Component {
    _menu = null;
    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            subject_completion: '',
            subject_chapters: '',
            showModal: false,
            targetClass: '',
            targetSubject: '',
            targetChapter: '',
            targetPercentage: '',
            showLoader: false,
            showMenu: false,
            resetSyllabusModal: false,
        }
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
                    <Appbar.Content title="Subject Syllabus" subtitle="Update or Add Chapters" />
                    <Appbar.Action icon="plus" />
                    <Appbar.Action icon="delete" />
                </Appbar.Header>
                <Modal                
                    isVisible={this.state.resetSyllabusModal}
                    style={{
                        flex:0,
                        //width:100,
                        backgroundColor:'#fff',
                        alignSelf:'center',
                        padding:20,
                        borderRadius:4,
                        marginTop:Dimensions.get('screen').height/4,
                    }}
                >
                    <View>
                        <Text
                            style={{
                                fontSize:20,
                                color:'grey',
                                textAlign:'center',
                            }}
                        >Are you sure to reset syllabus, once you reset it can't be reversed.</Text>
                        <View
                            style={{
                                display:'flex',
                                flexDirection:'row',
                                justifyContent:'space-evenly',
                                margin:20,
                            }}
                        >
                            <Button
                                title="Reset"
                            />
                            <Button
                                onPress={()=>this.setState({resetSyllabusModal:false})}
                                title="Cancel"
                                buttonStyle={{
                                    backgroundColor:'red'
                                }}
                            />
                        </View>
                    </View>
                </Modal>
                <ScrollView
                    style={{
                        backgroundColor: '#fff'
                    }}
                >

                    <View>
                        {this.state.subject === '' &&
                            <View
                                style={{
                                    margin: 15,
                                }}
                            >
                                <SkeletonPlaceholder>
                                    <SkeletonPlaceholder.Item
                                        width={Dimensions.get('screen').width - 50}
                                        height={60}
                                        borderRadius={5}
                                        margin={10}
                                    />
                                    <SkeletonPlaceholder.Item
                                        width={Dimensions.get('screen').width - 50}
                                        height={20}
                                        borderRadius={5}
                                        margin={10}
                                    />
                                    <SkeletonPlaceholder.Item
                                        width={Dimensions.get('screen').width - 50}
                                        height={60}
                                        borderRadius={5}
                                        margin={10}
                                    />
                                    <SkeletonPlaceholder.Item
                                        width={Dimensions.get('screen').width - 50}
                                        height={60}
                                        borderRadius={5}
                                        margin={10}
                                    />
                                </SkeletonPlaceholder>
                            </View>
                        }
                        {this.state.subject !== '' &&
                            <View
                                style={{
                                    padding: 15,
                                }}
                            >
                                <ListItem
                                    title={this.state.subject}
                                    titleStyle={{
                                        fontSize: 20,
                                    }}
                                    subtitle={'Syllabus Completion : ' + this.state.subject_completion + ' %'}
                                    leftElement={
                                        <Image
                                            source={require('./../images/syllabus.png')}
                                            style={{
                                                width: 40,
                                                height: 40,
                                            }}
                                        />
                                    }
                                    bottomDivider
                                />
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        color: '#636b6f',
                                        fontSize: 20,
                                        margin: 20,
                                    }}
                                >Chapters / Units</Text>
                                <View>
                                    {
                                        this.state.subject_chapters.map((chapter, index) => {
                                            return (
                                                <ListItem
                                                    key={index}
                                                    title={chapter.chapter_name}
                                                    subtitle={'Chapter Completion : ' + chapter.chapter_compltion + ' %'}
                                                    bottomDivider
                                                    rightElement={
                                                        <TouchableOpacity
                                                            onPress={(e) => this.setSubjectData(index + 1)}
                                                        >
                                                            <Image
                                                                source={require('./../images/128/increase.png')}
                                                                style={{
                                                                    width: 24,
                                                                    height: 24,
                                                                }}
                                                            />
                                                        </TouchableOpacity>
                                                    }
                                                />
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        }
                        <Modal
                            isVisible={this.state.showModal}
                            style={{
                                flex: 0,
                                backgroundColor: '#fff',
                                width: Dimensions.get('screen').width - 25,
                                marginTop: Dimensions.get('screen').height / 6,
                                height: 350,
                                alignSelf: 'center',
                                borderRadius: 6,
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: '#636b6f',
                                    fontSize: 18,
                                    marginTop: 20,
                                }}
                            >
                                Choose the percentage..
                        </Text>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginTop: 15,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => this.setSubjectSyllabus(10)}
                                    style={{
                                        height: 50,
                                        width: 50,
                                        backgroundColor: this.state.targetPercentage === 10 ? '#3d5ea1' : '#ccc',
                                        borderRadius: 5,
                                        margin: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            marginTop: 12,
                                            color: '#fff',
                                            fontSize: 22,
                                        }}
                                    >10</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.setSubjectSyllabus(20)}
                                    style={{
                                        height: 50,
                                        width: 50,
                                        backgroundColor: this.state.targetPercentage === 20 ? '#3d5ea1' : '#ccc',
                                        borderRadius: 5,
                                        margin: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            marginTop: 12,
                                            color: '#fff',
                                            fontSize: 22,
                                        }}
                                    >20</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.setSubjectSyllabus(30)}
                                    style={{
                                        height: 50,
                                        width: 50,
                                        backgroundColor: this.state.targetPercentage === 30 ? '#3d5ea1' : '#ccc',
                                        borderRadius: 5,
                                        margin: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            marginTop: 12,
                                            color: '#fff',
                                            fontSize: 22,
                                        }}
                                    >30</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.setSubjectSyllabus(40)}
                                    style={{
                                        height: 50,
                                        width: 50,
                                        backgroundColor: this.state.targetPercentage === 40 ? '#3d5ea1' : '#ccc',
                                        borderRadius: 5,
                                        margin: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            marginTop: 12,
                                            color: '#fff',
                                            fontSize: 22,
                                        }}
                                    >40</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginTop: 15,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => this.setSubjectSyllabus(50)}
                                    style={{
                                        height: 50,
                                        width: 50,
                                        backgroundColor: this.state.targetPercentage === 50 ? '#3d5ea1' : '#ccc',
                                        borderRadius: 5,
                                        margin: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            marginTop: 12,
                                            color: '#fff',
                                            fontSize: 22,
                                        }}
                                    >50</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.setSubjectSyllabus(60)}
                                    style={{
                                        height: 50,
                                        width: 50,
                                        backgroundColor: this.state.targetPercentage === 60 ? '#3d5ea1' : '#ccc',
                                        borderRadius: 5,
                                        margin: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            marginTop: 12,
                                            color: '#fff',
                                            fontSize: 22,
                                        }}
                                    >60</Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginTop: 15,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => this.setSubjectSyllabus(70)}
                                    style={{
                                        height: 50,
                                        width: 50,
                                        backgroundColor: this.state.targetPercentage === 70 ? '#3d5ea1' : '#ccc',
                                        borderRadius: 5,
                                        margin: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            marginTop: 12,
                                            color: '#fff',
                                            fontSize: 22,
                                        }}
                                    >70</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.setSubjectSyllabus(80)}
                                    style={{
                                        height: 50,
                                        width: 50,
                                        backgroundColor: this.state.targetPercentage === 80 ? '#3d5ea1' : '#ccc',
                                        borderRadius: 5,
                                        margin: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            marginTop: 12,
                                            color: '#fff',
                                            fontSize: 22,
                                        }}
                                    >80</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.setSubjectSyllabus(90)}
                                    style={{
                                        height: 50,
                                        width: 50,
                                        backgroundColor: this.state.targetPercentage === 90 ? '#3d5ea1' : '#ccc',
                                        borderRadius: 5,
                                        margin: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            marginTop: 12,
                                            color: '#fff',
                                            fontSize: 22,
                                        }}
                                    >90</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.setSubjectSyllabus(100)}
                                    style={{
                                        height: 50,
                                        width: 50,
                                        backgroundColor: this.state.targetPercentage === 100 ? '#3d5ea1' : '#ccc',
                                        borderRadius: 5,
                                        margin: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            marginTop: 12,
                                            color: '#fff',
                                            fontSize: 22,
                                        }}
                                    >100</Text>
                                </TouchableOpacity>
                            </View>
                            {this.state.showLoader &&
                                <ActivityIndicator
                                    size="large"
                                    color="indigo"
                                />
                            }
                            {!this.state.showLoader &&
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        marginTop: 10,
                                    }}
                                >
                                    <Button
                                        onPress={(e) => this.updateSubjectSyllabus()}
                                        title="Update"
                                        containerStyle={{
                                            margin: 10,
                                        }}
                                    />
                                    <Button
                                        onPress={(e) => this.setState({ showModal: false })}
                                        title="Cancel"
                                        containerStyle={{
                                            margin: 10,
                                        }}
                                        buttonStyle={{
                                            backgroundColor: 'grey'
                                        }}
                                    />
                                </View>
                            }
                        </Modal>
                    </View>
                </ScrollView>
            </>

        );
    }
    setSubjectData(chapter_index) {
        this.setState({
            showModal: true,
            targetChapter: chapter_index,
        });
    }
    setSubjectSyllabus(percentile) {
        this.setState({
            targetPercentage: percentile,
        });
    }
    updateSubjectSyllabus() {
        this.setState({
            showLoader: true,
        });
        let sum = this.state.overallSyllabus + this.state.targetPercentage / this.state.subject_chapters.length;
        let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.UPDATE_SUB_SYLLABUS;
        let post_data = {
            'targetClass': this.state.targetClass,
            'targetSubject': this.state.targetSubject,
            'targetChapter': this.state.targetChapter,
            'targetPercentage': this.state.targetPercentage,
        }
        axios.post(
            path,
            post_data
        )
            .then((response) => {
                this.setState({
                    showLoader: false,
                    showModal: false,
                });
                if (response.data == 1) {
                    this.setState({
                        subject: '',
                    });
                    this.updateComponent();
                } else {
                    Alert.alert(
                        "Unable update subject syallabus.",
                        "Please check your internet connection or try again after sometime."
                    );
                }
            })
            .catch((error) => {
                Alert.alert(
                    "Unable update subject syallabus.",
                    "Please check your internet connection or try again after sometime."
                );
            });
    }
    componentWillUnmount() {
        this._mounted = false;
    }
    componentDidMount() {
        this._mounted = true;
        this.updateComponent();
    }
    updateComponent() {
        let total = 0;
        let cid = this.props.route.params.cid;
        let subject = this.props.route.params.subject;
        let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.GET_SUBJECT_DATA + '/' + cid + '/' + subject;
        axios.get(path)
            .then((response) => {
                Object.values(response.data.subject.subject_chapters).map((chapter) => {
                    total += parseInt(chapter.chapter_compltion);
                })
                this.setState({
                    targetClass: cid,
                    targetSubject: response.data.key,
                    subject: this.props.route.params.subject,
                    subject_completion: response.data.subject.subject_completion,
                    subject_chapters: Object.values(response.data.subject.subject_chapters),
                });
            })
            .catch((error) => {
                Alert.alert(
                    "Unable to get subject data.",
                    "Please check your internet connection or try again after sometime."
                );
            });
    }
}