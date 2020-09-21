import React, { Component } from "react";
import {
    ScrollView,
} from 'react-native';
import { List } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
export default class myClassSyllabusComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true
        };
    }
    _handlePress = () =>
        this.setState({
            expanded: !this.state.expanded
        });
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
                    <Appbar.Content title="Your Class Syllabus" subtitle="Subjects & Syllabus completion" />
                </Appbar.Header>
                <ScrollView
                    style={{
                        backgroundColor:'#fff'
                    }}
                >
                    <List.Section
                        style={{
                            backgroundColor: '#fff'
                        }}                        
                    >
                        {
                            subjects.map((subject, index) => {
                                return (
                                    <List.Accordion
                                        style={{
                                            borderBottomColor: '#ccc',
                                            borderBottomWidth: 1,
                                            borderTopColor: '#ccc',
                                        }}
                                        key={index}
                                        title={subject.subject_name}
                                        description={'Total Completed : ' + subject.subject_completion + '%'}
                                        left={props => <List.Icon {...props} icon="book-open" />}
                                    >
                                        {
                                            Object.values(subject.subject_chapters).map((chapter, index) => {
                                                return (
                                                    <List.Item
                                                        key={index}
                                                        title={chapter.chapter_name}
                                                        description={'Completed : ' + chapter.chapter_compltion + '%'}
                                                    />
                                                );
                                            })
                                        }
                                    </List.Accordion>
                                );
                            })
                        }
                    </List.Section>
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