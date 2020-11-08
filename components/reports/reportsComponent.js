import React, { Component } from 'react';
import { API_CONSTANTS } from '../../constants';
import {
    StatusBar,
    ScrollView,
    View,
    Dimensions,
    Text,
    ActivityIndicator,
    Alert,
} from 'react-native';
import Orientation from "react-native-orientation";
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { Appbar } from 'react-native-paper';
export default class reportsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graphsData: null,
            barData: new Array(12).fill(0),
            pie_data: null,
        }
    }

    render() {
        const chartConfig = {
            backgroundColor: '#3d5ea1',
            backgroundGradientFrom: "#3d5ea1",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 4
            },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
            }
        };
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
                    <Appbar.Content title="Your Reports" />
                    {/* <Appbar.Action icon="dots-vertical" onPress={() => this._menu.show()} /> */}
                </Appbar.Header>
                <ScrollView>
                    {this.state.pie_data === null &&
                        <ActivityIndicator
                            size="large"
                            color="#636b6f"
                            style={{
                                marginTop: Dimensions.get('screen').height / 4,
                            }}
                        />
                    }
                    {this.state.pie_data !== null &&
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    margin: 20,
                                    letterSpacing: 1.5,
                                    color: '#636b6f',
                                    textAlign: 'center'
                                }}
                            >
                                ATTENDENCE TAKEN VS MONTH
                            </Text>
                            <LineChart
                                data={{
                                    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", 'AUG', "SEP", "OCT", "NOV", "DEC"],
                                    datasets: [{
                                        data: this.state.barData,
                                    }]
                                }}
                                width={Dimensions.get('screen').width-30}
                                height={350}
                                chartConfig={chartConfig}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16,
                                    alignSelf: 'center',
                                    marginLeft:15,
                                    marginRight:15,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 20,
                                    margin: 20,
                                    letterSpacing: 1.5,
                                    color: '#636b6f',
                                    textAlign: 'center'
                                }}
                            >
                                SYLLABUS COMPLETION
                            </Text>
                            <View
                                style={{
                                    overflow: 'scroll',
                                    margin: 5,
                                    justifyContent: "flex-start"
                                }}
                            >
                                <PieChart
                                    data={this.state.pie_data}
                                    width={Dimensions.get('screen').width - 70}
                                    height={200}
                                    chartConfig={chartConfig}
                                    accessor="count"
                                    hasLegend={true}
                                    absolute
                                    paddingLeft={20}
                                />
                            </View>
                        </View>
                    }
                </ScrollView>
            </>

        );
    }

    componentDidMount() {
        Orientation.lockToLandscape();
        AsyncStorage.getItem('sailor_captain_user').then((user) => {
            let user_data = JSON.parse(user);
            let uid = user_data.teacher_foriegn_key;
            let sid = user_data.emp_institute;
            let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.GET_USER_REPORTS + '/' + uid + '/' + sid;
            axios.get(path)
                .then((response) => {
                    if (response.data === 0) {
                        Alert.alert(
                            "Unable to get reports.",
                            "Please check your internet connection or try again after sometime."
                        );
                    } else {
                        response.data.classes_count.map((c_count) => {
                            this.state.barData[c_count.date_part] = c_count.count;
                        })
                        let pie_data = [];
                        response.data.sub_syllabus.map((syllabus) => {
                            let data = {
                                name: syllabus.gradeYear + ' ' + syllabus.className + '-' + syllabus.subjects.subject.subject_name,
                                count: parseInt(syllabus.subjects.subject.subject_completion),
                                color: '#' + Math.floor(Math.random() * 14701).toString(16),
                                legendFontColor: 'indigo',
                                legendFontSize: 12,
                            };
                            pie_data.push(data);
                        })
                        this.setState({
                            pie_data: pie_data,
                        });
                    }
                })
                .catch((error) => {
                    Alert.alert(
                        "Unable to get your reports.",
                        "Please check your internet connection or try again after sometime."
                    );
                });
        });
    }

    componentWillUnmount() {
        Orientation.lockToPortrait();
    }
}