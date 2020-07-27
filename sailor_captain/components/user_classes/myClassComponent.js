import React, { Component } from 'react';
import { API_CONSTANTS } from '../../constants';
import {
    StatusBar,
    ScrollView,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert,
    StyleSheet
} from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {
    ListItem,
    Avatar,
} from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {Appbar} from 'react-native-paper';
export default class myClassComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            className: null,
        }
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
                    <Appbar.Content title="Your Class" subtitle="You are assigned as Class Teacher" />
                </Appbar.Header>
                <ScrollView>
                    <View>
                        {this.state.className === null &&
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
                        {this.state.className !== null &&
                            <View
                                style={{
                                    margin: 10,
                                }}
                            >
                                {/* <Text
                                    style={{
                                        fontSize: 18,
                                        letterSpacing: 1.5,
                                        color: '#636b6f',
                                        textAlign: 'center',
                                        margin: 10,
                                    }}
                                >{this.state.classGrade + '  :  ' + this.state.className}</Text> */}
                                <ListItem
                                    title={this.state.classGrade}
                                    subtitle={this.state.className}
                                    leftAvatar={{
                                        source:require('./../images/128/person.png'),
                                        rounded:false
                                    }}
                                />
                                <View
                                    style={{
                                        padding: 5,
                                    }}
                                >
                                    <ListItem
                                        title="Students"
                                        leftAvatar={
                                            <Avatar
                                                source={require('./../images/128/id-card.png')}
                                            />
                                        }
                                        rightElement={
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('classStudents', this.state.classStudents)}
                                            >
                                                <Image style={Styles.forwardImage}
                                                    source={require('./../images/128/forward.png')}
                                                />
                                            </TouchableOpacity>
                                        }
                                        bottomDivider
                                    />
                                    <ListItem
                                        title="Subjects"
                                        leftAvatar={
                                            <Avatar
                                                source={require('./../images/reading.png')}
                                            />
                                        }
                                        rightElement={
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('classSubjects', this.state.classSubjects)}
                                            >
                                                <Image style={Styles.forwardImage}
                                                    source={require('./../images/128/forward.png')}
                                                />
                                            </TouchableOpacity>
                                        }
                                        bottomDivider
                                    />
                                    <ListItem
                                        title="Syllabus"
                                        leftAvatar={
                                            <Avatar
                                                source={require('./../images/syllabus.png')}
                                            />
                                        }
                                        rightElement={
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('classSyllabus', this.state.classSubjects)}
                                            >
                                                <Image style={Styles.forwardImage}
                                                    source={require('./../images/128/forward.png')}
                                                />
                                            </TouchableOpacity>
                                        }
                                        bottomDivider
                                    />
                                    {/* <ListItem
                                    title="Timetable"
                                    leftAvatar={
                                        <Avatar                                            
                                            source={require('./../images/128/clock.png')}
                                        />
                                    }
                                    rightElement={
                                        <TouchableOpacity
                                            onPress={()=>this.props.navigation.navigate('classTimetable')}
                                        >
                                            <Image style={Styles.forwardImage}
                                                source={require('./../images/128/forward.png')}
                                            />
                                        </TouchableOpacity>
                                    }
                                    bottomDivider
                                /> */}
                                </View>
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
            let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.GET_MY_CLASS + '/' + uid;
            axios.get(path)
                .then((response) => {
                    this.setState({
                        className      : response.data['class'].class_name,
                        classGrade     : response.data['class'].grade_year,
                        classStudents  : response.data['students'],
                        classSubjects  : response.data['subjects'],
                        classTimetable : ''
                    });
                })
                .catch((error) => {
                    Alert.alert(
                        "Unable to get your class.",
                        "Please check your internet connection or try again after sometime."
                    );
                });
        });
    }
}
const Styles = StyleSheet.create({
    forwardImage: {
        width: 24,
        height: 24,
    }
});