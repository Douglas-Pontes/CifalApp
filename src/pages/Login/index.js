import React, { Component } from 'react'
import { ScrollView, Text, Image, TouchableOpacity, Dimensions, TextInput } from 'react-native'

import styles from './styles'

export default class Login extends Component {
    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.key}>
                    <Image source={require('../../../assets/img/key.png')} style={{ width: 18, height: 18 }} />
                </TouchableOpacity>
                <Image source={require('../../../assets/img/logo_cifal.png')} style={styles.logo} />
                <Text style={styles.warn}>Por favor verifique a chave de acesso antes de entrar no aplicativo.</Text>

                <TextInput style={styles.input} placeholder={" Usuário"} />

                <TextInput style={styles.input} placeholder={" Senha"} secureTextEntry={true} />

                <TouchableOpacity style={styles.btnLogin} onPress={() => this.props.navigation.navigate("TabMaster")}>
                    <Text style={styles.btnText}>ENTRAR</Text>
                </TouchableOpacity>

                <Text style={styles.warn}>Caso não tenha nenhum acesso por favor entrar em contato com o suporte!</Text>
            </ScrollView >
        )
    }
}