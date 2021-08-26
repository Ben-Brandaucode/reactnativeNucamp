import React, { Component } from 'react';
import Constants from 'expo-constants';
import {View, Platform} from 'react-native';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { createStackNavigator} from 'react-navigation-stack'; 
import { createAppContainer } from 'react-navigation';

const DirectoryNavigator = createStackNavigator( 
    { //route config object
        Directory: {screen:Directory},
        CampsiteInfo: {screen: CampsiteInfo}
    },
    {// optional initial route name
        initialRouteName:'Directory',
        defaultNavigationOptions:{
            headerStyle:{
                backgroundColor:"#5637DD"
            },
            headerTintColor:"#fff",
            headerTitleStyle:{
                color:"#fff"
            }
        }
    }
);

const AppNavigator = createAppContainer(DirectoryNavigator);

class Main extends Component {

    render() {
        return (
        <View 
            style = {{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
                }}>
            <AppNavigator />
            
        </View>
        );
    }

}

export default Main;