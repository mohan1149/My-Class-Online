import React,{Component} from 'react';
import {
    ScrollView,
    View,
    Dimensions,
    Image,
    Text
} from 'react-native';
import HTML from 'react-native-render-html';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
export default class viewPostComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            post_data : '',
            height    : 0,
            width     : 0,
        }
    }
    render(){                    
        return(
            <>
                <ScrollView>
                    {this.state.post_data === '' &&
                        <View
                            style={{
                                padding:15,
                            }}
                        >
                            <SkeletonPlaceholder>
                                <SkeletonPlaceholder.Item 
                                    width={Dimensions.get('screen').width-60}
                                    height={150} 
                                    borderRadius={4} 
                                    marginLeft={15}
                                    marginTop={15}
                                />                         
                                <SkeletonPlaceholder.Item 
                                    width={250} 
                                    height={20} 
                                    borderRadius={4} 
                                    marginLeft={15}
                                    marginTop={15}
                                />
                                <SkeletonPlaceholder.Item 
                                    width={Dimensions.get('screen').width-60} 
                                    height={300} 
                                    borderRadius={4} 
                                    marginLeft={15}
                                    marginTop={15}
                                />
                            </SkeletonPlaceholder>
                        </View>
                    }
                    {this.state.post_data !== '' &&
                        <View>
                            <Image                            
                                source={{uri:this.state.post_data.post_thumbnail}}
                                style={{
                                    height : this.state.height,
                                    width  : this.state.width,
                                    margin : 10,
                                }}
                            />
                            <View
                                style={{
                                    padding:10,                                    
                                }}
                            >
                                <Text
                                    style={{
                                        color:'#636b6f',
                                        fontSize:20,
                                    }}
                                >{this.state.post_data.post_title}</Text>
                                <View
                                    style={{
                                        margin:10,                                                             
                                    }}
                                >                                    
                                    <HTML
                                        html={this.state.post_data.post_desc}                                        
                                    >
                                    </HTML>
                                </View>
                                <Text
                                    style={{
                                        color:'#636b6f',
                                        fontWeight:'bold'
                                    }}
                                >{'By ' + this.state.post_data.poster_name + ','}</Text>
                                <Text
                                    style={{
                                        color:'#636b6f',
                                        fontWeight:'bold'
                                    }}
                                >{'On ' + this.state.post_data.post_date + '.'}</Text>
                            </View>
                        </View>
                    }
                </ScrollView>
            </>
        );
    }
    componentWillUnmount(){
        this._mounted = false;
    }
    componentDidMount(){         
        this._mounted = true;          
        this.setState({
            post_data : this.props.route.params,
            height    : 300,
            width     : Dimensions.get('screen').width-20,
        });     
    }
}