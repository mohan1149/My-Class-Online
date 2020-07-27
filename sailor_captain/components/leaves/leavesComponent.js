import React, { Component } from 'react';
import { API_CONSTANTS } from '../../constants';
import {
    ScrollView,
    View,
    Image,
    Dimensions,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    RefreshControl,
    StatusBar
} from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {
    Button,
    ListItem,
} from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Appbar, TextInput } from 'react-native-paper';
import Modal from 'react-native-modal';

import DateTimePickerModal from "react-native-modal-datetime-picker";
export default class leavesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFab: false,
            showModal: false,
            showIndicator: false,
            showDatePicker: false,
            flag: '',
            fromDate: '',
            toDate: '',
            from: '',
            to: '',
            leaveReason: '',
            uid: '',
            leavesData: null,
            refresh: false,
        }
    }
    openApplyModal() {
        this.setState({
            showModal: true,
        });
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
                    <Appbar.Content title="Leaves" subtitle="Leaves applied by you."/>
                    <Appbar.Action icon="plus" onPress={() => this.openApplyModal()} />
                </Appbar.Header>                
                {/* <FAB.Group
                    style={{                                    
                        flex:0,
                        top:Dimensions.get('screen').height/1.8,
                        margin:5,
                        //bottom:0,
                        zIndex:5,
                        height:150,                        
                    }}
                    fabStyle={{
                        backgroundColor:'indigo',                        
                    }}
                    open={this.state.showFab}
                    icon={true ? 'pencil' : 'plus'}
                    actions={[
                        { icon: 'plus',color:'indigo', label: 'Apply for Leave', onPress: () => this.openApplyModal() },
                    ]}
                    onStateChange={()=>this.setState({showFab:!this.state.showFab})}                    
                /> */}
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            onRefresh={() => this.updateComponent()}
                            refreshing={this.state.refresh}
                        />
                    }
                >
                    <View>
                        {this.state.leavesData === null &&
                            <SkeletonPlaceholder>
                                <SkeletonPlaceholder.Item
                                    width={Dimensions.get('screen').width - 20}
                                    height={50}
                                    margin={5}

                                />
                                <SkeletonPlaceholder.Item
                                    width={Dimensions.get('screen').width - 20}
                                    height={50}
                                    margin={5}

                                />
                                <SkeletonPlaceholder.Item
                                    width={Dimensions.get('screen').width - 20}
                                    height={50}
                                    margin={5}

                                />
                            </SkeletonPlaceholder>
                        }
                    </View>
                    <View>
                        {this.state.leavesData !== null &&
                            <View>
                                {
                                    this.state.leavesData.map((leave, index) => {
                                        return (
                                            <ListItem
                                                titleProps={{ numberOfLines: 2 }}
                                                key={index}
                                                title={leave.leave_reason}
                                                subtitle={"Aplied on : " + leave.leave_applied_on}
                                                rightTitle={leave.leave_status === 0 ? 'Pending' : leave.leave_status === 1 ? 'Approved' : 'Cancelled'}
                                                chevron
                                                bottomDivider
                                                onPress={() => this.props.navigation.navigate('viewLeave', leave)}
                                            />
                                        );
                                    })
                                }
                            </View>
                        }
                    </View>
                    <Modal
                        isVisible={this.state.showModal}
                        style={{
                            backgroundColor: '#fff',
                            flex: 0,
                            borderRadius: 6,
                            marginTop: Dimensions.get('screen').height / 4.5,
                        }}
                    >
                        <View>
                            <DateTimePickerModal
                                style={{
                                    zIndex: 10
                                }}
                                isVisible={this.state.showDatePicker}
                                mode="date"
                                onConfirm={(fromDate) => this.handleLeaveDate(fromDate)}
                                onCancel={() => this.setState({ showDatePicker: false })}
                            />
                            <View>
                                <TextInput
                                    label="Reason.."
                                    autoFocus
                                    multiline
                                    onChangeText={(reason) => this.setState({ leaveReason: reason })}
                                />
                            </View>
                            <View
                                style={{
                                    padding: 15,
                                    alignItems: "center"
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#636b6f",
                                        textTransform: 'uppercase',
                                        letterSpacing: 1.5,
                                        fontSize: 12,
                                    }}
                                >From Date</Text>
                                <TouchableOpacity
                                    onPress={() => this.setState({ showDatePicker: true, flag: 'from' })}
                                    style={{
                                        margin: 15,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#636b6f",
                                            textTransform: 'uppercase',
                                            letterSpacing: 1.5,
                                            fontSize: 18,
                                        }}
                                    >{this.state.from}</Text>
                                </TouchableOpacity>
                                <Image
                                    source={require('./../images/128/up-and-down.png')}
                                    style={{
                                        width: 24,
                                        height: 24
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => this.setState({ showDatePicker: true, flag: 'to' })}
                                    style={{
                                        margin: 15,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#636b6f",
                                            textTransform: 'uppercase',
                                            letterSpacing: 1.5,
                                            fontSize: 18,
                                        }}
                                    >{this.state.to}</Text>
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        color: "#636b6f",
                                        textTransform: 'uppercase',
                                        letterSpacing: 1.5,
                                        fontSize: 12,
                                        marginBottom: 10,
                                    }}
                                >To Date</Text>
                                {!this.state.showIndicator &&
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <Button
                                            buttonStyle={{
                                                backgroundColor: 'indigo'
                                            }}
                                            onPress={() => this.applyLeave()}
                                            containerStyle={{
                                                marginTop: 10,
                                                marginRight: 5,
                                            }}
                                            title="Apply"
                                        />
                                        <Button
                                            onPress={() => this.setState({ showModal: false })}
                                            containerStyle={{
                                                marginTop: 10,

                                            }}
                                            title="Cancel"
                                        />
                                    </View>
                                }

                                {this.state.showIndicator &&
                                    <ActivityIndicator
                                        size="large"                                        
                                    />
                                }
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </>
        );
    }
    handleLeaveDate(leaveDate) {
        let d = new Date(leaveDate);
        let weeks = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        if (this.state.flag === 'from') {
            let from = weeks[d.getDay()] + ',' + months[d.getMonth()] + ' ' + (d.getMonth() + 1);
            this.setState({
                fromDate: d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate(),
                showDatePicker: false,
                from: from,
            });
        } else {
            let to = weeks[d.getDay()] + ',' + months[d.getMonth()] + ' ' + (d.getMonth() + 1);
            this.setState({
                showDatePicker: false,
                toDate: d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate(),
                to: to,
            });
        }
    }
    applyLeave() {
        this.setState({
            showIndicator: true,
        });
        let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.APPLY_FOR_LEAVE;
        let post_data = {
            'uid': this.state.uid,
            'reason': this.state.leaveReason,
            'from': this.state.fromDate,
            'to': this.state.toDate,
        };
        axios.post(path, post_data)
            .then((response) => {
                this.setState({
                    showModal: false,
                    showIndicator: false,
                });
                if (response.data === 1) {
                    this.getMyLeaves();
                } else {
                    Alert.alert(
                        "Unable to apply for leave.",
                        "Please check your internet connection or try again after sometime."
                    );
                }
            })
            .catch((error) => {
                Alert.alert(
                    "Unable to apply for leave.",
                    "Please check your internet connection or try again after sometime."
                );
            });
    }
    updateComponent() {
        this.setState({
            refresh: true,
            leavesData: null,
        });
        this.getMyLeaves();
    }
    getMyLeaves() {
        let path = API_CONSTANTS.API_SEVER + API_CONSTANTS.GET_USER_LEAVES + '/' + this.state.uid;
        axios.get(path)
            .then((response) => {
                this.setState({
                    leavesData: response.data,
                    refresh: false,
                });
            })
            .catch((error) => {
                Alert.alert(
                    "Unable to get your leaves.",
                    "Please check your internet connection or try again after sometime."
                );
            });
    }
    componentDidMount() {
        AsyncStorage.getItem('sailor_captain_user').then((user) => {
            let user_data = JSON.parse(user);
            let d = new Date();
            let weeks = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
            let months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
            let from = weeks[d.getDay()] + ',' + months[d.getMonth()] + ' ' + (d.getMonth() + 1);
            let to = weeks[d.getDay()] + ',' + months[d.getMonth()] + ' ' + (d.getMonth() + 1);
            this._mounted = true;
            this.setState({
                from: from,
                to: to,
                uid: user_data.id,
            });
            this.getMyLeaves();
        })
    }
    componentWillUnmount() {
        this._mounted = false;
    }
}