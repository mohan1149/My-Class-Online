import React,{ Component } from "react";
import{
    ScrollView,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import {

} from 'react-native-elements';
export default class myClassTimetableComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
    }

    render(){
        return (
            <ScrollView>
                
            </ScrollView>
        );
    }
    componentWillUnmount(){
        this._mounted = false;
    }
    componentDidMount(){
        this._mounted = true;
    }
}