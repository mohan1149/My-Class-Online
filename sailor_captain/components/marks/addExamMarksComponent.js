import React, { Component } from 'react';
import { API_CONSTANTS } from '../../constants';
import {
    ScrollView,
    Dimensions,
    View,
    TextInput,
    ActivityIndicator,
    Alert,
    Text
} from 'react-native';
import {
    ListItem,
} from 'react-native-elements';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import axios from 'axios';
import { Appbar, Snackbar } from 'react-native-paper';
let students_data = [];
export default class addExamMarksComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: null,
            exam_id: null,
            showLoading: false,
            show_snack:false
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
                    <Appbar.Content title="Assign Marks" subtitle="" />
                    <Appbar.Action icon="laptop" onPress={() =>{}} />
                    <Appbar.Action icon="check" onPress={() => this.submitMarks()} />
                </Appbar.Header>
                <ScrollView>
                    {this.state.students === null &&
                        <SkeletonPlaceholder
                            margin={10}
                        >
                            <SkeletonPlaceholder.Item
                                width={Dimensions.get('screen').width - 20}
                                height={50}
                                margin={5}

                            />
                            <SkeletonPlaceholder.Item
                                width={Dimensions.get('screen').width - 20}
                                height={50}
                                margin={5}

                            />
                            <SkeletonPlaceholder.Item
                                width={Dimensions.get('screen').width - 20}
                                height={50}
                                margin={5}

                            />
                        </SkeletonPlaceholder>
                    }
                    {this.state.students !== null &&
                        <View
                            style={{
                                margin: 10,
                            }}
                        >
                            {
                                this.state.students.map((student, index) => {
                                    return (
                                        <Student
                                            key={index}
                                            index={index}
                                            student_name={student.fname + ' ' + student.lname}
                                            student_sid={student.sid}
                                            max_marks={this.props.route.params.max_marks}
                                            updateSnack = {()=>this.showSnack()}
                                        />
                                    );
                                })
                            }
                            <Snackbar
                                visible={this.state.show_snack}
                                onDismiss={() => this.hideSnack()}
                                action={{
                                    label: 'Clear',
                                    onPress: () => this.hideSnack(),
                                }}>
                                {'Maximun marks for this exam are '+this.props.route.params.max_marks}
                            </Snackbar>
                            {this.state.showLoading &&
                                <ActivityIndicator
                                    size="large"                                    
                                />
                            }
                        </View>
                    }
                </ScrollView>
            </>

        );
    }
    hideSnack(){
        this.setState({show_snack:false});
    }
    showSnack(){
      this.setState({show_snack:true});
    }
    componentWillUnmount() {
        students_data = [];
    }
    componentDidMount() {       
        let cid = this.props.route.params.class_id;
        let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.GET_CLASS_STUDENTS + '/' + cid;
        axios.get(path)
            .then((response) => {
                this.setState({
                    students: response.data,
                    exam_id: this.props.route.params.ex_id,
                });
            })
            .catch((error) => {
                console.log(error);
                Alert.alert(
                    "Unable to get students.",
                    "Please check your internet connection or try again after sometime."
                );
            });
    }
    submitMarks() {
        let post_data = {
            'class_id': this.props.route.params.class_id,
            'exam_id': this.state.exam_id,
            'students': students_data,
        };
        this.setState({ showLoading: true });
        let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.POST_EXAM_MARKS;
        axios.post(path, post_data)
            .then((response) => {
                this.setState({ showLoading: false });
                this.props.navigation.goBack();
            })
            .catch((error) => {
                this.setState({ showLoading: false });
                Alert.alert(
                    "Unable to post marks.",
                    "Please check your internet connection or try again after sometime."
                );
            });
    }
}

class Student extends Component {
    render() {
        return (
            <>
                <ListItem
                    title={this.props.student_name}
                    subtitle={this.props.student_sid}
                    rightElement={
                        <TextInput
                            ref={input => { this.textInput = input }}
                            placeholder="Enter marks.."
                            keyboardType="decimal-pad"                                         
                            onChangeText={(val) => this.updateMarks(val, this.props.index)}
                        />
                    }
                    bottomDivider
                />
            </>

        );
    }
    componentDidMount() {
        let stud = {
            'id': this.props.student_sid,
            'marks': 0,
        };
        students_data.push(stud);
    }
    updateMarks(value, index) {
        if (value > this.props.max_marks) {
            this.props.updateSnack();
            this.textInput.clear();
        } else {
            students_data[index].marks = value;
        }

    }
}