import React, { Component } from 'react';
import { API_CONSTANTS } from '../../constants';
import {
    ScrollView,
    View,
    Image,
    ActivityIndicator,
    Alert,
    Text,
    Dimensions
} from 'react-native';
import {
    Button,
} from 'react-native-elements';
import axios from 'axios';
import Modal from 'react-native-modal';
import {Appbar} from 'react-native-paper';
export default class viewLeaveComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showLoader: false
        }
    }

    render() {
        let leave = this.props.route.params;
        return (
            <>
                <Appbar.Header
                    style={{
                        backgroundColor: '#3d5ea1'
                    }}
                >
                    <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content title="View Leave"/>
                    <Appbar.Action icon="delete" onPress={() => this.setState({ showModal: true })} />
                </Appbar.Header>
                <ScrollView>
                    <View
                        style={{
                            margin: 10,
                            padding: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                textTransform: 'uppercase',
                                fontWeight: '600',
                                letterSpacing: 2,
                                color: '#636b6f',
                                marginBottom: 5
                            }}
                        >leave reason</Text>
                        <Text
                            style={{
                                fontSize: 16,
                                marginBottom: 15,
                                marginTop: 5,
                            }}
                        >{leave.leave_reason}</Text>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <View>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        textTransform: 'uppercase',
                                        fontWeight: '600',
                                        letterSpacing: 2,
                                        color: '#636b6f',
                                        marginBottom: 5,
                                        marginTop: 10,
                                        textAlign: 'center',
                                    }}
                                >
                                    From
                            </Text>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        textTransform: 'uppercase',
                                        fontWeight: '600',
                                        letterSpacing: 2,
                                        color: '#636b6f',
                                        marginBottom: 5,
                                    }}
                                >
                                    {leave.leave_from}
                                </Text>
                            </View>
                            <Image
                                source={require('./../images/128/forward.png')}
                                style={{
                                    width: 35,
                                    height: 35,
                                    marginTop: 15,
                                }}
                            />
                            <View>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        textTransform: 'uppercase',
                                        fontWeight: '600',
                                        letterSpacing: 2,
                                        color: '#636b6f',
                                        marginBottom: 5,
                                        marginTop: 10,
                                        textAlign: 'center'
                                    }}
                                >
                                    To
                            </Text>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        textTransform: 'uppercase',
                                        fontWeight: '600',
                                        letterSpacing: 2,
                                        color: '#636b6f',
                                        marginBottom: 5,
                                    }}
                                >
                                    {leave.leave_from}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    textTransform: 'uppercase',
                                    fontWeight: '600',
                                    letterSpacing: 2,
                                    color: '#636b6f',
                                    marginTop: 10,
                                    textAlign: "center"
                                }}
                            >status : {leave.leave_status === 0 ? 'Pending' : leave.leave_status === 1 ? 'Approved' : 'Cancelled'}</Text>
                        </View>                       
                    </View>
                    <Modal
                        isVisible={this.state.showModal}
                        style={{
                            flex: 0,
                            backgroundColor: '#fff',
                            borderRadius: 6,
                            marginTop: Dimensions.get('screen').height / 4,
                        }}
                    >
                        <Image
                            source={require('./../images/trash.png')}
                            style={{
                                width: 84,
                                height: 84,
                                margin: 15,
                                alignSelf: 'center',
                            }}
                        />
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 18,
                                color: '#636b6f'

                            }}
                        >Are you sure to Delete?</Text>
                        {!this.state.showLoader &&
                            <View
                                style={{
                                    padding: 5,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    margin: 10,
                                    justifyContent: 'center'
                                }}
                            >
                                <Button
                                    onPress={() => this.deleteLeave()}
                                    containerStyle={{
                                        margin: 5
                                    }}
                                    title="Confirm"
                                />
                                <Button
                                    onPress={() => this.setState({ showModal: false })}
                                    title="Cancel"
                                    containerStyle={{
                                        margin: 5
                                    }}
                                />
                            </View>
                        }
                        {this.state.showLoader &&
                            <ActivityIndicator
                                size="large"
                                color="indigo"
                            />
                        }
                    </Modal>
                </ScrollView>
            </>

        );
    }

    componentDidMount() {
        this._mounted = true;
    }
    componentWillUnmount() {
        this._mounted = true;
    }
    deleteLeave() {
        let id = this.props.route.params.id;
        let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.DELETE_USER_LEAVE + '/' + id;
        axios.get(path)
            .then((response) => {
                if (response.data === 1) {
                    this.setState({
                        showLoader: false,
                        showModal: false
                    });
                    this.props.navigation.navigate('leavesComponent')
                } else {
                    Alert.alert(
                        "Unable to delete leave.",
                        "Please check your internet connection or try again after sometime."
                    );
                }
            })
            .catch((error) => {
                Alert.alert(
                    "Unable to delete leave.",
                    "Please check your internet connection or try again after sometime."
                );
            });
        this.setState({
            showLoader: true,
        });
    }
}