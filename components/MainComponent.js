import React, { Component } from 'react';
import { Tile } from 'react-native-elements';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import AboutUs from './AboutComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Constants from 'expo-constants';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import { fetchCampsites, fetchComments, fetchPromotions, fetchPartners } from '../redux/ActionCreators';
import { baseUrl } from '../shared/baseUrl';

const mapDispatchToProps ={
    fetchCampsites,
    fetchComments,
    fetchPromotions,
    fetchPartners
};

const DirectoryNavigator = createStackNavigator(
    {
        Directory: { screen: Directory },
        CampsiteInfo: { screen: CampsiteInfo }
    },
    {
        initialRouteName: 'Directory',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const ContactNavigator = createStackNavigator(
    {
        Home: { screen: Contact }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);
const AboutUsNavigator = createStackNavigator(
    {
        Home: { screen: AboutUs }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);



//--------------MAIN DRAWER NAVIGATOR--
const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },
        Directory: { screen: DirectoryNavigator },
        About: {screen: AboutUsNavigator},
        Contact: {screen: ContactNavigator}
    },
    {
        drawerBackgroundColor: '#CEC8FF'
    }
);

const AppNavigator = createAppContainer(MainNavigator)

class Main extends Component {
    componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();
    }
    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
            }}>
            < AppNavigator />
            </View>
        );
    }
}

export default connect(null, mapDispatchToProps)(Main);