import React, { Component } from "react";
import {
    ScrollView,
    View,
} from 'react-native';
import {
    ListItem
} from 'react-native-elements';
import { Appbar } from 'react-native-paper';
export default class myClassSubjectsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let subjects = Object.values(this.props.route.params);
        return (
            <>
                <Appbar.Header
                    style={{
                        backgroundColor: '#3d5ea1'
                    }}
                >
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title="Your Class Subjects" subtitle="Subjects & Syllabus completion" />
                </Appbar.Header>
                <ScrollView
                    style={{
                        backgroundColor:'#fff'
                    }}
                >
                    <View
                        style={{
                            margin: 10
                        }}
                    >
                        {
                            subjects.map((subject, index) => {
                                return (
                                    <ListItem
                                        key={index}
                                        title={subject.subject_name}
                                        subtitle={'Syllabus Completion : ' + subject.subject_completion + ' %'}
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

    componentDidMount() {
    }
}