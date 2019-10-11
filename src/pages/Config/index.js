import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import api from '../../config/api';
import getRealm from '../../config/realm';

export default class Config extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realm: null,
            info: null
        }
    }

    static navigationOptions = {
        tabBarIcon: () => (
            <Icon name="setting" color={"white"} size={24} />
        )
    }

    async componentDidMount() {
        const realm = await getRealm()

        this.setState({
            realm
        });
    }

    importarProdutos = async () => {
        let produtos = await api.get("produtos");
        const { realm } = this.state;

        realm.write(() => {
            var obj = this.state.realm.objects('Produtos');
            realm.delete(obj);

            produtos.data.map((item) => {
                realm.create('Produtos', {
                    CodProduto: item.CodProduto,
                    Desceq: item.Desceq,
                    Unideq: item.Unideq,
                    Estoque: item.Estoque,
                    PerVista: item.PerVista,
                    CodEan14: item.CodEan14
                })
            })
        })
    }

    render() {
        const info = this.state.realm
            ? 'Number of produtos in this Realm: ' + this.state.realm.objects('Produtos').length
            : 'Loading...';

        return (
            <View style={{ marginTop: 30, paddingHorizontal: 10 }}>
                <Text>{info}</Text>
                <TouchableOpacity style={styles.btn} onPress={this.importarProdutos}>
                    <Text style={styles.btnText}>Importar Produtos</Text>
                </TouchableOpacity>
            </View>
        )
    }
}