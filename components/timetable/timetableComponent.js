import React, { Component } from 'react';
import { API_CONSTANTS } from './../../constants';
import AsyncStorage from '@react-native-community/async-storage';
import {
    Image,
    StatusBar,
    Dimensions,
    View,
    Alert,
    TouchableOpacity,
} from 'react-native';
import {
    ListItem,
} from 'react-native-elements';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import axios from 'axios';
import { Appbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
export default class timetableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            today_color: '#3d5ea1',
            weekly_color: '#ccc',
            active_color: '#3d5ea1',
            inactiveColor: '#ccc',
            timetable: '',
            timetable_data: '',
            showToday: true,
            showWeekly: false,
            today: '',
            today_data: '',
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
                    <Appbar.Content title="Your classes" subtitle="List of classs you are taking today." />
                    <Appbar.Action icon="book" onPress={(e) => this.showToday()} />
                    <Appbar.Action icon="calendar-today" onPress={(e) => this.showWeekly()} />
                </Appbar.Header>
                <ScrollView
                    style={{
                        backgroundColor:'#fff'
                    }}
                >
                    <View >
                        {this.state.timetable === '' &&
                            <SkeletonPlaceholder>
                                <SkeletonPlaceholder.Item
                                    width={200}
                                    alignSelf="center"
                                    height={25}
                                    borderRadius={4}
                                    marginTop={20}
                                />
                                <SkeletonPlaceholder.Item
                                    width={Dimensions.get('screen').width - 60}
                                    height={70}
                                    borderRadius={4}
                                    marginLeft={20}
                                    marginTop={15}
                                />
                                <SkeletonPlaceholder.Item
                                    width={Dimensions.get('screen').width - 60}
                                    height={70}
                                    borderRadius={4}
                                    marginLeft={20}
                                    marginTop={15}
                                />
                                <SkeletonPlaceholder.Item
                                    width={Dimensions.get('screen').width - 60}
                                    height={70}
                                    borderRadius={4}
                                    marginLeft={20}
                                    marginTop={15}
                                />
                            </SkeletonPlaceholder>
                        }
                        {this.state.showToday && this.state.timetable !== '' &&
                            <View>
                                {/* <Text
                                style={{
                                    alignSelf:'center',
                                    fontSize:20,
                                    textTransform:'uppercase',
                                    letterSpacing:2,
                                }}
                            >{this.state.today}</Text> */}
                                {
                                    this.state.today_data.map((today, index) => {
                                        let key = index + 1;
                                        let title = today == null ? 'No Class' : today.class_name + ' - ' + JSON.parse(today.subject).subject;
                                        let grade = today == null ? 'Period ' + key : 'Period ' + key + ' - ' + today.grade_year;
                                        return (
                                            <ListItem
                                                key={key}
                                                title={title}
                                                subtitle={grade}
                                                bottomDivider
                                                disabled={today === null ? true : false}
                                                onPress={(e) => this.showSyllabus(today.class_id, JSON.parse(today.subject).subject)}
                                                chevron={today != null ? true : false}
                                            />
                                        );
                                    })
                                }
                            </View>
                        }
                        {this.state.showWeekly && this.state.timetable !== '' &&
                            <View>
                                {
                                    this.state.timetable.map((week, index) => {
                                        return (
                                            <ListItem
                                                title={week}
                                                titleStyle={{
                                                    textTransform: 'capitalize',
                                                }}
                                                key={index}
                                                onPress={(e) => this.moveToWeek(week, this.state.timetable_data)}
                                                bottomDivider
                                                chevron
                                            />
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
    componentWillUnmount() {
        this._mounted = false;
    }
    componentDidMount() {
        this._mounted = true;
        let weeks = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        let d = new Date();
        let today = weeks[d.getDay()];
        AsyncStorage.getItem('sailor_captain_user').then((user) => {
            let user_data = JSON.parse(user);
            let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.GET_USER_TIMETABLE + '/' + user_data.emp_institute + '/' + user_data.emp_reg_num;
            axios.get(path)
                .then((response) => {
                    this.setState({
                        timetable: Object.keys(response.data),
                        timetable_data: response.data,
                        today_data: Object.values(response.data[today]),
                        today: today,
                    });
                })
                .catch((error) => {
                    Alert.alert(
                        "Unable to get timetable at this moment.",
                        "Please check your internet connection or try again after sometime."
                    );
                });
        })
    }

    showToday() {
        this.setState({
            weekly_color: this.state.inactiveColor,
            today_color: this.state.active_color,
            showToday: true,
            showWeekly: false,
        });
    }

    showWeekly() {
        this.setState({
            weekly_color: this.state.active_color,
            today_color: this.state.inactiveColor,
            showToday: false,
            showWeekly: true,
        });
    }

    moveToWeek(week, data) {
        let screen_data = {
            week: week,
            data: data,
        }
        this.props.navigation.navigate('weekTimetable', screen_data);
    }

    showSyllabus(cid, subject) {
        let screen_data = {
            cid: cid,
            subject: subject,
        };
        this.props.navigation.navigate('showSyllabus', screen_data);
    }
}