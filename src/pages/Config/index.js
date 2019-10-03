import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign';

export default class Config extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        tabBarIcon: () => (
            <Icon name="setting" color={"white"} size={24} />
        )
    }

    render() {
        return (
            <View>
                <Text>
                    Config
                </Text>
            </View>
        )
    }
}