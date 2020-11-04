/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//./gradlew app:assembleRelease

import React, { Component, useState } from 'react';
import I18n from './app/locales/i18n';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Image, Text, Dimensions, StatusBar } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Header, Left, Right, Body } from 'native-base';

import loginComponent from './components/login/loginComponent';
import forgotPasswordComponent from './components/login/forgotPasswordComponent';
import menuComponent from './components/dashboard/menuComponent';
import profileComponent from './components/profile/profileComponent';
import SidebarComponent from './components/dashboard/sidebarComponent';
import feedComponent from './components/dashboard/feedComponent';
import settingsComponent from './components/profile/settingsComponent';
import timtableComponent from './components/timetable/timetableComponent';
import weekTimetableComponent from './components/timetable/weekTimetableComponent';
import showSyllabusComponent from './components/syllabus/showSyllabusComponent';
import viewPostComponent from './components/posts/viewPostComponent';
import addPostComponent from './components/posts/addPostComponent';
import myPostsComponent from './components/posts/myPostsComponent';
import setClassComponent from './components/attendence/setClassComponent';
import postAttendenceComponent from './components/attendence/postAttendenceComponent';
import userSyllabusComponent from './components/syllabus/userSyllabusComponent';
import myClass from './components/user_classes/myClassComponent';
import myClassStudentsComponent from './components/user_classes/myClassStudentsComponent';
import myClassSubjectsComponent from './components/user_classes/myClassSubjectsComponent';
import myClassSyllabusComponent from './components/user_classes/myClassSyllabusComponent';
import myClassTimetableComponent from './components/user_classes/myClassTimetanbleComponent';
import viewStudentComponent from './components/student/viewStudentComponent';
import updateProfileComponent from './components/profile/updateProfileComponent';
import leavesComponent from './components/leaves/leavesComponent';
import viewLeaveComponent from './components/leaves/viewLeaveComponent';
import addHomeworkComponent from './components/homework/addHomeworkComponent';
import addClassHomeworkComponent from './components/homework/addClassHomeworkComponent';
import reportsComponent from './components/reports/reportsComponent';
import addExamClassComponent from './components/exams/addExamClassComponent';
import createExamComponent from './components/exams/createExamComponent';
import marksComponent from './components/marks/marksComponent';
import addExamMarksComponent from './components/marks/addExamMarksComponent';
import notificationsComponent from './components/notifications/notificationsComponent';
import addNotificationComponent from './components/notifications/addNotificationComponent';
import myNotificationsComponent from './components/notifications/myNotificationsComponent';
import viewNotificationComponent from './components/notifications/viewNotificationComponent';

import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();
const Stack = createStackNavigator();
//const Tab = createMaterialBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
function BottomTabs({ navigation }) {
  const [showLogout, setShowLogout] = useState(false);
  return (
    <>
      <StatusBar
        backgroundColor="#3d5ea1"
        barStyle="light-content"
      />
      <Header>
        <Left style={{
            flex:1,
            flexDirection:'row',
            //justifyContent:'space-evenly'
            }}>          
          <Button transparent onPress={() => navigation.toggleDrawer()}>          
            <Icon name='menu' size={32} color="#3d5ea1" />            
          </Button>
          <Text
            style={{
              marginTop:12,
              fontSize:18,
              color:'#636b6f'
            }}
          >Hi, Mohan</Text>
        </Left>
        <Right>
        <Button transparent onPress={(e) => setShowLogout(true)}>
            <Icon name='lock' size={32} color="#3d5ea1" />
          </Button>
        </Right>
      </Header>
      <Modal
        animationIn="slideInUp"
        animationInTiming={500}
        isVisible={showLogout}
        style={{
          flex: 0,
          width: Dimensions.get('screen').width - 70,
          backgroundColor: '#fff',
          height: 220,
          borderRadius: 4,
          alignSelf: 'center',
          marginTop: Dimensions.get('screen').height / 4,
        }}
      >
        <Image
          source={require('./components/images/lock.png')}
          style={{
            width: 80,
            height: 80,
            alignSelf: 'center',
            marginTop: 20,
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            color: '#636b6f',
            margin: 10,
          }}
        >{I18n.t('logout_confirm')}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Button
            onPress={(e) => { setShowLogout(false); navigation.navigate('Login') }}
            danger={true}
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              margin: 10,
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: '800',
                fontSize: 18,
              }}
            >{I18n.t('logout')}</Text>
          </Button>
          <Button
            onPress={(e) => setShowLogout(false)}
            info={true}
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              margin: 10,
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: '800',
                fontSize: 18,
              }}
            >{I18n.t('cancel')}</Text>
          </Button>
        </View>
      </Modal>
      <Tab.Navigator
        tabBarPosition="bottom"
        tabBarOptions={{
          showIcon: true,
          showLabel: false,
          style: { backgroundColor: '#fff',paddingBottom:15},
          activeTintColor: '#3d5ea1',   
          inactiveTintColor:'#636b6f',    
          indicatorContainerStyle:{
            marginBottom:20,
          },   
          indicatorStyle: {
            backgroundColor: "#fff",         
          }
        }}
      >
        <Tab.Screen name="Home" component={menuComponent}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Icon name="apps" color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen name="posts" component={feedComponent}
          options={{
            tabBarLabel: "Feed",
            //tabBarColor:'#2196F3',
            tabBarIcon: ({ color, size }) => (
              <Icon name="comment" color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen name="Settings" component={settingsComponent}
          options={{
            tabBarLabel: "Settings",
            //tabBarColor:'#673ab7',
            tabBarIcon: ({ color, size }) => (
              <Icon name="settings" color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen name="Profile" component={profileComponent}
          options={{
            tabBarLabel: "Profile",
            //tabBarColor:'#e91e63',
            tabBarIcon: ({ color, size }) => (
              <Icon name="person" color={color} size={25} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

function Sidebar() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <SidebarComponent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={BottomTabs} />
    </Drawer.Navigator>
  );
}

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Sidebar}
            options={{
              //headerShown: Platform.OS === 'ios' ? true : false,
              headerShown: false,
              headerTitle: 'Welcome Captain',
              headerTitleStyle: {
                color: '#636b6f',
              }
            }}
          />      
          <Stack.Screen name="Login" component={loginComponent} options={{ headerShown: false }} />  
          <Stack.Screen name="forgotPassword" component={forgotPasswordComponent}
            options={{
              headerShown: true,
              headerBackTitle: I18n.t('back'),
              headerTitle: I18n.t('forgot_password'),
              headerTitleStyle: {
                color: '#636b6f',
              }

            }}
          />
          <Stack.Screen name="userTimetable" component={timtableComponent}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="weekTimetable" component={weekTimetableComponent}
            options={{
              headerShown: false,              
            }}
          />
          <Stack.Screen name="showSyllabus" component={showSyllabusComponent}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="viewPost" component={viewPostComponent}
            options={{
              headerShown: true,
              headerBackTitle: 'Back',
              headerTitle: 'View Post',
              headerTitleStyle: {
                color: '#636b6f',
              }
            }}
          />
          <Stack.Screen name="addPost" component={addPostComponent}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="myPosts" component={myPostsComponent}
            options={{
              headerShown: false,
              headerBackTitle: 'Back',
              headerTitle: 'My Posts',
              headerTitleStyle: {
                color: '#636b6f',
              }
            }}
          />
          <Stack.Screen name="setClass" component={setClassComponent}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="postAttendence" component={postAttendenceComponent}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="mySyllabus" component={userSyllabusComponent}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="myClass" component={myClass}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="classStudents" component={myClassStudentsComponent}
            options={{
              headerShown: false,

            }}
          />
          <Stack.Screen name="classSubjects" component={myClassSubjectsComponent}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="classSyllabus" component={myClassSyllabusComponent}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="classTimetable" component={myClassTimetableComponent}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="viewStudent" component={viewStudentComponent}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="updateProfile" component={updateProfileComponent}
            options={{
              headerShown: true,
              headerBackTitle: 'Back',
              headerTitle: 'Update Profile',
              headerTitleStyle: {
                color: '#636b6f',
              }
            }}
          />
          <Stack.Screen name="leavesComponent" component={leavesComponent}
            options={{
              headerShown: false,             
            }}
          />
          <Stack.Screen name="viewLeave" component={viewLeaveComponent}
            options={{
              headerShown: false,          
            }}
          />
          <Stack.Screen name="homework" component={addHomeworkComponent}
            options={{
              headerShown: false,              
            }}
          />
          <Stack.Screen name="addHomework" component={addClassHomeworkComponent}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="reports" component={reportsComponent}
            options={{
              headerShown: false,              
            }}
          />
          <Stack.Screen name="exams" component={addExamClassComponent}
            options={{
              headerShown: false,             
            }}
          />
          <Stack.Screen name="addEaxm" component={createExamComponent}
            options={{
              headerShown: false,             
            }}
          />
          <Stack.Screen name="marks" component={marksComponent}
            options={{
              headerShown: false,              
            }}
          />
          <Stack.Screen name="addExamMarks" component={addExamMarksComponent}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="notifications" component={notificationsComponent}
            options={{
              headerShown: false,              
            }}
          />
          <Stack.Screen name="addNotification" component={addNotificationComponent}
            options={{
              headerShown: false,              
            }}
          />
          <Stack.Screen name="myNotifications" component={myNotificationsComponent}
            options={{
              headerShown: false,              
            }}
          />
          <Stack.Screen name="viewNotification" component={viewNotificationComponent}
            options={{
              headerShown: false,              
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

