import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    Linking,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import { ListItem } from 'react-native-elements';
export default class viewNotificationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
                    <Appbar.Content title="View Notification" subtitle={this.props.route.params.notif_title} />
                </Appbar.Header>
                <ScrollView>
                    <View
                        style={{
                            margin: 10,
                            backgroundColor: '#fff'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '800',
                                letterSpacing: 1.5,
                                margin: 10,

                            }}
                        >
                            {this.props.route.params.notif_title}
                        </Text>
                        <View>
                            <Text
                                style={{
                                    fontSize: 18,
                                    margin: 15,
                                    color: "#636b6f"
                                }}
                            >
                                {this.props.route.params.notif_desc}
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    //textAlign:"center",
                                    margin: 10,
                                    color: '#636b6f',
                                    fontSize: 18,
                                    textTransform: 'uppercase'
                                }}
                            >attachments</Text>
                            {
                                JSON.parse(this.props.route.params.notif_attachments).map((attachment, index) => {
                                    return (
                                        <View
                                            key={index}
                                        >
                                            <ListItem
                                                leftIcon={{ name: 'file-download' }}
                                                title={'Attachment  ' + (index + 1)}
                                                titleStyle={{
                                                    color: "#3d5ea1"
                                                }}
                                                bottomDivider
                                                onPress={() => this.openLink(attachment)}
                                            />
                                        </View>
                                    );
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
            </>

        );
    }
    openLink(link) {
        Linking.openURL(link);
    }
}