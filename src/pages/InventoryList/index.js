import React, { Component } from 'react';
import {
    SafeAreaView,
    Image,
    FlatList,
    View,
    Text,
    Picker,
} from 'react-native'
import getRealm from '../../config/realm';

import Icon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class InventoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realm: null,
            filter: "Todos",
            itens: [
                {
                    Nome: "199 - Douglas Pontes Santos",
                    Remessa: 1240001,
                    Situacao: "Finalizado",
                    DataModificacao: "24/09/2019 10:00:00"
                },
                {
                    Nome: "195 - Thales Henrique Viale",
                    Remessa: 1240002,
                    Situacao: "Aberto",
                    DataModificacao: "24/09/2019 10:00:00"
                },
                {
                    Nome: "198 - Guilherme Pagotto",
                    Remessa: 1240003,
                    Situacao: "Sincronizado",
                    DataModificacao: "24/09/2019 10:00:00"
                }
            ]
        };
    }

    static navigationOptions = {
        title: "Lista de inventário",
    }

    async componentDidMount() {
        const realm = await getRealm()

        fetch("http://192.168.137.1:3000/produtos").then(response => response.json()).then(rf => {
            console.log(rf)
            var start = new Date().getTime();

            realm.write(() => {
                let allProducts = realm.objects('Produtos');
                realm.delete(allProducts);

                rf.map(item => {
                    realm.create('Produtos', {
                        CodProduto: item.CodProduto,
                        Desceq: item.Desceq,
                        Unideq: item.Unideq,
                        Estoque: item.Estoque,
                        PerVista: item.PerVista
                    })
                })
            })

            var end = new Date().getTime();

            console.log(end - start);
        })


        this.setState({ realm });
    }

    render() {
        const info = this.state.realm
            ? 'Number of product in this Realm: ' + this.state.realm.objects('Produtos').length
            : 'Loading...';

        return (
            <View>
                <View style={styles.containerFilter}>
                    <Picker style={styles.picker} selectedValue={this.state.filter} onValueChange={(itemValue) => this.setState({ filter: itemValue })}>
                        <Picker.Item label={"Todos"} value={"Todos"} />
                        <Picker.Item label={"Aberto"} value={"Aberto"} />
                        <Picker.Item label={"Finalizado"} value={"Finalizado"} />
                        <Picker.Item label={"Sincronizado"} value={"Sincronizado"} />
                    </Picker>
                    <View style={styles.arrowDown}>
                        <Icon name="caretdown" size={10} color="white" />
                    </View>
                </View>
                <FlatList data={this.state.itens} renderItem={({ item }) => (
                    <View style={styles.cardItem}>
                        <View style={{ flexDirection: 'row' }}>
                            {item.Situacao == "Aberto" && (<Image source={require("../../../assets/img/aberto.png")} style={{ width: 60, height: 60 }} />)}
                            {item.Situacao == "Sincronizado" && (<Image source={require("../../../assets/img/sincronizado.png")} style={{ width: 60, height: 60 }} />)}
                            {item.Situacao == "Finalizado" && (<Image source={require("../../../assets/img/Oks.png")} style={{ width: 60, height: 60 }} />)}
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={styles.txtNome}>{item.Nome}</Text>
                                <Text>Remessa: {item.Remessa}</Text>
                                <Text>Situação: {item.Situacao}</Text>
                            </View>
                        </View>

                        <Text style={styles.txtData}>{item.DataModificacao}</Text>

                        <FeatherIcon name="info" size={24} style={{ position: 'absolute', bottom: 40, right: 12 }} />
                    </View>
                )} />

            </View>
        )
    }
}