import React, { Component } from 'react';
import { API_CONSTANTS } from '../../constants';
import {
    ScrollView,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    Alert,
} from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { ListItem } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Appbar } from 'react-native-paper';
export default class marksComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userExams: null,
        }
    }
    render() {
        return (
            <>
                <StatusBar
                    barStyle="light-content"
                ></StatusBar>
                <Appbar.Header
                    style={{
                        backgroundColor: '#3d5ea1'
                    }}
                >
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title="Choose Exam" subtitle="List of exams( Marks are not assigned )" />
                </Appbar.Header>
                <ScrollView>
                    <View>
                        {this.state.userExams === null &&
                            <SkeletonPlaceholder>
                                <SkeletonPlaceholder.Item
                                    width={Dimensions.get('screen').width - 50}
                                    alignSelf="center"
                                    height={40}
                                    borderRadius={4}
                                    marginTop={10}
                                />
                                <SkeletonPlaceholder.Item
                                    width={Dimensions.get('screen').width - 50}
                                    alignSelf="center"
                                    height={40}
                                    borderRadius={4}
                                    marginTop={10}
                                />
                                <SkeletonPlaceholder.Item
                                    width={Dimensions.get('screen').width - 50}
                                    alignSelf="center"
                                    height={40}
                                    borderRadius={4}
                                    marginTop={10}
                                />
                            </SkeletonPlaceholder>
                        }
                    </View>
                    <View>
                        {this.state.userExams !== null &&
                            <View>
                                {this.state.userExams.map((exam_data, index) => {
                                    console.log();
                                    return (
                                        <ListItem
                                            key={index}
                                            title={exam_data.ex_subject + ' - ' + exam_data.ex_title}
                                            titleProps={{
                                                numberOfLines: 2,
                                            }}
                                            subtitle={exam_data.grade_year + ' - ' + exam_data.class_name +', '+exam_data.ex_date}                                            
                                            bottomDivider
                                            rightElement={
                                                <TouchableOpacity
                                                    onPress={(e) => this.addMarks(exam_data)}
                                                >
                                                    <Image
                                                        source={require('./../images/128/forward.png')}
                                                        style={{
                                                            width: 24,
                                                            height: 24,
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                            }
                                        />
                                    );
                                })}
                            </View>
                        }
                    </View>
                </ScrollView>
            </>

        );
    }
    componentWillUnmount() {
        this._mounted = false;
    }
    componentDidMount() {
        this._mounted = true;
        AsyncStorage.getItem('sailor_captain_user').then((user) => {
            let user_data = JSON.parse(user);
            let uid = user_data.teacher_foriegn_key;
            let sid = user_data.emp_institute;
            let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.GET_USER_EXAMS + '/' + uid;
            axios.get(path)
                .then((response) => {
                    if (response.data === 0) {
                        Alert.alert(
                            "Unable to get your classes.",
                            "Please check your internet connection or try again after sometime."
                        );
                    } else {
                        this.setState({
                            userExams: response.data
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

    addMarks(exam_data) {        
        let screen_data = {
            ex_id: exam_data.id,
            class_id: exam_data.class_id,
            max_marks: exam_data.ex_maxmarks,
        }
        this.props.navigation.navigate('addExamMarks', screen_data)
    }
}