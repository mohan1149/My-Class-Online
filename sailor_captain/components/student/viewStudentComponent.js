import React, { Component } from 'react';
import {
    ScrollView,
    TouchableOpacity,
    Text,
    Image,
    View,
    ActivityIndicator
} from 'react-native';
import {
    Avatar,
    ListItem,
} from 'react-native-elements';
import {Appbar} from 'react-native-paper';
export default class viewStudentComponent extends Component {
    render() {
        let student = this.props.route.params;
        return (
            <>
                <Appbar.Header
                    style={{
                        backgroundColor: '#3d5ea1'
                    }}
                >
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title="Student Profile" subtitle="Student primary data" />
                </Appbar.Header>
                <ScrollView>
                    <View
                        style={{
                            //backgroundColor:'#3d5ea1',
                            padding: 10
                        }}
                    >
                        <Avatar
                            containerStyle={{
                                alignSelf: 'center',
                                marginTop: 20,
                                backgroundColor: '#fff'
                            }}
                            rounded
                            size="xlarge"
                            source={{ uri: student.photo }}
                        />
                        <Text
                            style={{
                                color: '#636b6f',
                                textAlign: 'center',
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginTop: 10,
                            }}
                        >{student.fname + ' ' + student.lname}</Text>
                    </View>
                    <View
                        style={{
                            margin: 10,
                        }}
                    >
                        <ListItem
                            title={student.sid}
                            subtitle="Studet ID"
                            leftAvatar={
                                <Avatar
                                    source={require('./../images/128/id-card.png')}
                                    size="small"
                                />
                            }
                            bottomDivider
                        />
                        <ListItem
                            title={student.phone}
                            subtitle="Phone"
                            leftAvatar={
                                <Avatar
                                    source={require('./../images/128/call.png')}
                                    size="small"
                                />
                            }
                            bottomDivider
                        />
                        <ListItem
                            title={student.email}
                            subtitle="Email"
                            leftAvatar={
                                <Avatar
                                    source={require('./../images/128/mail.png')}
                                    size="small"
                                />
                            }
                            bottomDivider
                        />
                        <ListItem
                            title={student.address}
                            subtitle="Address"
                            leftAvatar={
                                <Avatar
                                    source={require('./../images/128/location.png')}
                                    size="small"
                                />
                            }
                            bottomDivider
                        />
                        <ListItem
                            title='Attendence'
                            subtitle='Updates daily.'
                            leftAvatar={
                                <Avatar
                                    source={require('./../images/128/timetable.png')}
                                    size="small"
                                />
                            }
                            rightElement={
                                <TouchableOpacity>
                                    <Image
                                        source={require('./../images/128/forward.png')}
                                        style={{
                                            width: 24,
                                            height: 24
                                        }}
                                    />
                                </TouchableOpacity>
                            }
                            bottomDivider
                        />
                        <ListItem
                            title='Marks'
                            subtitle='Sorted by examination date.'
                            leftAvatar={
                                <Avatar
                                    source={require('./../images/128/grade.png')}
                                    size="small"
                                />
                            }
                            rightElement={
                                <TouchableOpacity>
                                    <Image
                                        source={require('./../images/128/forward.png')}
                                        style={{
                                            width: 24,
                                            height: 24
                                        }}
                                    />
                                </TouchableOpacity>
                            }
                            bottomDivider
                        />
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
    }
}