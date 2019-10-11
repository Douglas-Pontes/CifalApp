import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image
} from 'react-native'

import Icon from 'react-native-vector-icons/Fontisto';

export default class Sync extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        tabBarIcon: ({ focused }) => {
            if (focused)
                return (
                    <Image source={require('../../../assets/img/synchronization-arrows.png')} style={{ width: 26, height: 26 }} />
                )
            else
                return (
                    <Image source={require('../../../assets/img/synchronization-arrows-outline.png')} style={{ width: 26, height: 25 }} />
                )
        }
    }

    render() {
        return (
            <View>
                <Text>
                    Sync
                </Text>
            </View>
        )
    }
}