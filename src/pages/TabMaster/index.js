import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeNavigator from '../HomeNavigator';
import Sync from '../Sync';
import Config from '../Config';
import Icon from 'react-native-vector-icons/AntDesign';

const TabMaster = createBottomTabNavigator({
    HomeNavigator: {
        screen: HomeNavigator,
        navigationOptions: {
            tabBarIcon: () => (
                <Icon name="home" color={"white"} size={24} />
            )
        }
    },
    Sync: {
        screen: Sync
    },
    Config: {
        screen: Config
    }
},
    {
        tabBarOptions: {
            showIcon: true,
            showLabel: false,
            style: {
                backgroundColor: '#11592A'
            }
        },
    }
)

export default TabMaster;