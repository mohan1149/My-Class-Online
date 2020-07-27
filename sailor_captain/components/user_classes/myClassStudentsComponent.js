import React, { Component } from "react";
import {
    ScrollView,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    ListItem,
} from 'react-native-elements';
import {Appbar} from 'react-native-paper';
export default class myClassStudentsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let students = this.props.route.params;
        return (
            <>
                <Appbar.Header
                    style={{
                        backgroundColor: '#3d5ea1'
                    }}
                >
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title="Students List" subtitle="List of students under your class." />
                </Appbar.Header>
                <ScrollView>
                    <View
                        style={{
                            margin: 5,
                        }}
                    >
                        {
                            students.map((student, index) => {
                                return (
                                    <ListItem
                                        key={index}
                                        title={student.fname + ' ' + student.lname}
                                        subtitle={student.sid}
                                        rightElement={
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('viewStudent', student)}
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
                                        bottomDivider
                                    />
                                );
                            })
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
    }
}