import React, { Component } from 'react';
import I18n from './../../app/locales/i18n';
import {
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    ListItem,
} from 'react-native-elements';
import { Appbar } from 'react-native-paper';
export default class weekTimetableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            week: '',
            week_data: '',
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
                    <Appbar.Content title={I18n.t('your_classes')} subtitle={I18n.t('your_classes_text')} />
                    {/* <Appbar.Action icon="dots-vertical" onPress={() => this._menu.show()} /> */}
                </Appbar.Header>
                <ScrollView
                    style={{
                        backgroundColor: '#fff'
                    }}
                >
                    {this.state.week_data !== '' &&
                        <View
                            style={{
                                padding: 10,
                            }}
                        >                            
                            <View>
                                {
                                    this.state.week_data.map((today, index) => {
                                        let key = index + 1;
                                        let title = today == null ? 'No Class' : today.class_name + ' - ' + JSON.parse(today.subject).subject;
                                        let grade = today == null ? 'Period ' + key : 'Period ' + key + ' - ' + today.grade_year;
                                        return (
                                            <ListItem
                                                key={key}
                                                title={title}
                                                subtitle={grade}
                                                bottomDivider
                                                rightElement={
                                                    <TouchableOpacity
                                                        onPress={(e) => this.showSyllabus(today.class_id, JSON.parse(today.subject).subject)}
                                                        disabled={today === null ? true : false}
                                                    >
                                                        <Image
                                                            source={
                                                                today === null ? require('./../images/128/stop.png') : require('./../images/128/forward.png')
                                                            }
                                                            style={{
                                                                width: 24,
                                                                height: 24,
                                                            }}
                                                        />
                                                    </TouchableOpacity>
                                                }
                                            />
                                        );
                                    })
                                }
                            </View>
                        </View>
                    }
                </ScrollView>
            </>

        );
    }
    componentWillUnmount() {
        this._mounted = false;
    }
    componentDidMount() {
        this._mounted = true;
        let week = this.props.route.params.week;
        this.setState({
            week: week,
            week_data: Object.values(this.props.route.params.data[week])
        });
    }

    showSyllabus(cid, subject) {
        let screen_data = {
            cid: cid,
            subject: subject,
        };
        this.props.navigation.navigate('showSyllabus', screen_data);
    }
}