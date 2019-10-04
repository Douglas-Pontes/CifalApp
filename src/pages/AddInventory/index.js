import React, { Component } from 'react';
import {
    Image,
    ScrollView,
    View,
    Text,
    Picker,
    TouchableOpacity,
    TextInput
} from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import getRealm from '../../config/realm';
import api from '../../config/api';
import uuid from 'react-native-uuid';

export default class AddInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realm: null,
            CodVen: null,
            Nome: null,
            Remessa: null,
            CodUsuario: 1,
        }
    }

    async componentDidMount() {
        const realm = await getRealm();
        this.setState({ realm })
    }

    static navigationOptions = {
        title: "Novo inventário",
    }

    salvarInventario = () => {
        const { realm, CodVen, Remessa, Nome } = this.state;

        realm.write(() => {
            realm.create('Inventarios', {
                InventarioId: uuid.v1(),
                CodVen,
                Remessa,
                Nome,
                Situacao: 'Aberto',
                DataAbertura: new Date(),
                DataSincronizacao: null,
                DataFinalizacao: null,
                Rating: 0,
                Comentario: null,
                CodUsuario: 1
            })
        })
    }

    importarDados = async () => {
        const { realm, Remessa, CodVen, Nome } = this.state;
        if (Remessa == null) {
            alert('Por favor preencha a remessa');
            return;
        }
        if (CodVen == null) {
            alert('Por favor preencha o Código');
            return;
        }
        if (Nome == null) {
            alert('Por favor preencha o vendedor');
            return;
        }

        let remessas = await api.get('remessas/' + this.state.Remessa);

        let remessasToRemove = realm.objects("Remessas").filtered(`NumeroRemessa = ${this.state.Remessa}`);
        console.log('remessas', remessasToRemove)

        realm.write(() => {
            realm.delete(remessasToRemove);

            remessas.data.map(item => {
                realm.create('Remessas', {
                    NumeroRemessa: item.NumeroRemessa,
                    CodVen: item.CodVen,
                    CodProduto: item.CodProduto,
                    Unid: item.Unid,
                    Quantidade: item.Quantidade.toString()
                })
            })
        })

        this.salvarInventario()
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image source={require("../../../assets/img/caixa-aberta.png")} style={{ width: 80, height: 80 }} />
                    <Text>Novo Item</Text>

                    <TextInput style={[styles.input, { marginTop: 20 }]} placeholder="Código" onChangeText={(CodVen) => this.setState({ CodVen: parseInt(CodVen) })} />
                    <TextInput style={styles.input} placeholder="Vendedor" onChangeText={(Nome) => this.setState({ Nome })} />
                    <TextInput style={styles.input} placeholder="Remessa" onChangeText={(Remessa) => this.setState({ Remessa: parseInt(Remessa) })} />

                    <TouchableOpacity style={styles.btn} onPress={this.importarDados}>
                        <Image source={require("../../../assets/img/download-da-nuvem.png")} style={{ width: 27, height: 27 }} />
                        <Text style={styles.btnText}>Importar dados</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}>
                        <Icon name="barcode" size={24} color="white" />
                        <Text style={styles.btnText}>Leitura de Itens</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}