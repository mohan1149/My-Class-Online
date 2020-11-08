import React, { Component } from 'react';
import I18n from './../../app/locales/i18n';
import {
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    Image,
    Alert,
    StyleSheet,
    BackHandler,
    StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Tile } from 'react-native-elements';
Icon.loadFont();
export default class menuComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_profile: 'https://www.w3schools.com/w3images/avatar3.png',
            user_name: 'Captain',
            showLogout: false,
            school_post: '',
            shouldUpdate: false,

        }
    }
    logout() {
        this.setState({
            showLogout: false,
        });
        this.props.navigation.navigate('Login');
    }
    backAction = () => {
        Alert.alert("Hold on!", "Are you sure to exit?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };
    render() {
        return (
            <ScrollView
                style={{
                    backgroundColor: '#fff'
                }}
            >
                <StatusBar
                    backgroundColor="#3d5ea1"
                    barStyle="dark-content"
                />
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <Tile
                        imageSrc={require('./../images/solids/1467776.jpg')}
                        title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
                        featured
                        caption="Some Caption Text"
                        containerStyle={{
                           padding:0,
                        }}
                    />
                    <Tile
                        imageSrc={require('./../images/solids/1467807.jpg')}
                        title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
                        featured
                        caption="Some Caption Text"
                        containerStyle={{
                            padding:0
                        }}
                    />
                    <Tile
                        imageSrc={require('./../images/solids/1467868.jpg')}
                        title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
                        featured
                        caption="Some Caption Text"
                        containerStyle={{
                            padding:0
                        }}
                    />
                    <Tile
                        imageSrc={require('./../images/solids/250763.jpg')}
                        title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
                        featured
                        caption="Some Caption Text"
                        containerStyle={{
                            padding:0
                        }}
                    />
                    <Tile
                        imageSrc={require('./../images/solids/831613.jpg')}
                        title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores dolore exercitationem"
                        featured
                        caption="Some Caption Text"
                        containerStyle={{
                            padding:0
                        }}
                    />
                </ScrollView>
                <View>
                    <View style={Styles.container} >
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('setClass')}
                            style={Styles.menuContainer}
                        >
                            <Image style={Styles.menuImage}
                                source={require('../../components/images/attendence.png')}
                            />
                            <Text style={Styles.menuText}>{I18n.t('attendence')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('myClass')}
                            style={Styles.menuContainer}
                        >
                            <Image style={Styles.menuImage}
                                source={require('../../components/images/reading.png')}
                            />
                            <Text style={Styles.menuText}>{I18n.t('my_class')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('userTimetable')}
                            style={Styles.menuContainer}
                        >
                            <Image style={Styles.menuImage}
                                source={require('../../components/images/clock.png')}
                            />
                            <Text style={Styles.menuText}>{I18n.t('timetable')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('mySyllabus')}
                            style={Styles.menuContainer}
                        >
                            <Image style={Styles.menuImage}
                                source={require('../../components/images/syllabus.png')}
                            />
                            <Text style={Styles.menuText}>{I18n.t('syllabus')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('homework')}
                            style={Styles.menuContainer}
                        >
                            <Image style={Styles.menuImage}
                                source={require('../../components/images/homework.png')}
                            />
                            <Text style={Styles.menuText}>{I18n.t('homework')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('reports')}
                            style={Styles.menuContainer}
                        >
                            <Image style={Styles.menuImage}
                                source={require('../../components/images/graph.png')}
                            />
                            <Text style={Styles.menuText}>{I18n.t('reports')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('exams')}
                            style={Styles.menuContainer}
                        >
                            <Image style={Styles.menuImage}
                                source={require('../../components/images/exam.png')}
                            />
                            <Text style={Styles.menuText}>{I18n.t('exam')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('marks')}
                            style={Styles.menuContainer}
                        >
                            <Image style={Styles.menuImage}
                                source={require('../../components/images/marks.png')}
                            />
                            <Text style={Styles.menuText}>{I18n.t('marks')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('marks')}
                            style={Styles.menuContainer}
                        >
                            <Image style={Styles.menuImage}
                                source={require('../../components/images/upload.png')}
                            />
                            <Text style={Styles.menuText}>{I18n.t('upload_data')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('notifications')}
                            style={Styles.menuContainer}
                        >
                            <Image style={Styles.menuImage}
                                source={require('../../components/images/bell.png')}
                            />
                            <Text style={Styles.menuText}>{I18n.t('notifications')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('leavesComponent')}
                            style={Styles.menuContainer}
                        >
                            <Image style={Styles.menuImage}
                                source={require('../../components/images/travel.png')}
                            />
                            <Text style={Styles.menuText}>{I18n.t('leaves')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('addPost')}
                            style={Styles.menuContainer}
                        >
                            <Image style={Styles.menuImage}
                                source={require('../../components/images/talk.png')}
                            />
                            <Text style={Styles.menuText}>{I18n.t('add_post')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
    buildComponent() {
        this._mounted = true;
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
        if (this.props.route.name === 'Home') {
            this.constructComponent();
        }
    }
    destroyComponent() {
        this.backHandler.remove();
        this._mounted = false;
    }
    constructComponent() {
        AsyncStorage.getItem('sailor_captain_user').then((user) => {
            let user_data = JSON.parse(user);
            this.setState({
                user_profile: user_data.emp_photo,
                user_name: user_data.emp_username,
            });
        });
    }
    componentDidMount() {
        //this.props.navigation.addListener('focus', () => this.buildComponent());
        //this.props.navigation.addListener('blur', () => this.destroyComponent());
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
        this.constructComponent();
    }
}
const Styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        justifyContent: 'space-evenly'
    },
    menuContainer: {
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 12,
        height: 100,
        alignItems: 'center',
        margin: 5,
        borderRadius: 4,
        width: Dimensions.get('screen').width / 3.5,
    },
    menuText: {
        color: "#636b6f",
        textTransform: 'uppercase',
        marginTop: 5,
        marginBottom: 5,
        fontSize: 10,
        fontWeight: 'bold'
    },
    menuImage: {
        width: 50,
        height: 50,
    },
});