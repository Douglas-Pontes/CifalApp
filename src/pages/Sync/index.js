import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native'

import Icon from 'react-native-vector-icons/Fontisto';

export default class Sync extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        tabBarIcon: () => (
            <Icon name="arrow-swap" color={"white"} size={20} style={{ transform: [{ rotate: '90deg' }] }} />
        )
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