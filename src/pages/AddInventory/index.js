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
import { showMessage, hideMessage } from "react-native-flash-message";


export default class AddInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realm: null,
            CodVen: null,
            Nome: null,
            Remessa: null,
            DataAbertura: null,
            CodUsuario: 1,
            InventarioId: null,
            item: null,
            btnImportarDados: true
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
        var guid = uuid.v1()
        let created;

        realm.write(() => {
            created = realm.create('Inventarios', {
                InventarioId: guid,
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

        showMessage({
            message: "Inventário criado com sucesso! Por favor faça a leitura de itens.",
            type: "success",
        });

        this.setState({ InventarioId: guid, item: created, btnImportarDados: true })

        this.props.navigation.navigate("ListItens", { item: created, tipoPagina: 1 })
    }

    importarDados = async () => {
        const { realm, Remessa, CodVen, Nome } = this.state;

        if (Remessa == null || Remessa == '') {
            showMessage({
                message: "Por favor preencha a remessa!",
                type: "danger",
            });
            return;
        }
        if (CodVen == null || CodVen == '') {
            showMessage({
                message: "Por favor preencha o código do vendedor!",
                type: "danger",
            });
            return;
        }

        if (Nome == null || Nome == '') {
            showMessage({
                message: "Por favor preencha o vendedor!",
                type: "danger",
            });
            return;
        }

        // let remessas = await api.get('remessas/' + this.state.Remessa);

        // let remessasToRemove = realm.objects("Remessas").filtered(`NumeroRemessa = ${this.state.Remessa}`);
        // console.log('remessas', remessasToRemove)

        // realm.write(() => {
        //     realm.delete(remessasToRemove);

        //     remessas.data.map(item => {
        //         realm.create('Remessas', {
        //             NumeroRemessa: item.NumeroRemessa,
        //             CodVen: item.CodVen,
        //             CodProduto: item.CodProduto,
        //             Unid: item.Unid,
        //             Quantidade: item.Quantidade.toString()
        //         })
        //     })
        // })

        this.salvarInventario()
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image source={require("../../../assets/img/caixa-aberta.png")} style={{ width: 80, height: 80 }} />
                    <Text>Novo Item</Text>

                    <TextInput style={[styles.input, { marginTop: 20 }]} keyboardType={"number-pad"} placeholder="Código" onChangeText={(CodVen) => this.setState({ CodVen: CodVen == '' ? '' : parseInt(CodVen) })} />
                    <TextInput style={styles.input} placeholder="Vendedor" onChangeText={(Nome) => this.setState({ Nome })} />
                    <TextInput style={styles.input} placeholder="Remessa" keyboardType={"number-pad"} onChangeText={(Remessa) => {
                        this.setState({
                            Remessa: Remessa == '' ? '' : parseInt(Remessa),
                            btnImportarDados: Remessa == '' ? true : false,
                        });

                    }} />

                    <TouchableOpacity style={[styles.btn, { backgroundColor: this.state.btnImportarDados ? '#ccc' : '#11592A' }]} onPress={this.importarDados} disabled={this.state.btnImportarDados}>
                        <Image source={require("../../../assets/img/download-da-nuvem.png")} style={{ width: 27, height: 27 }} />
                        <Text style={styles.btnText}>Importar dados</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={[styles.btn, { backgroundColor: this.state.btnLeituraItem ? '#ccc' : '#11592A' }]} onPress={() => this.props.navigation.navigate("ListItens", { item: this.state.item })} disabled={this.state.btnLeituraItem}>
                        <Icon name="barcode" size={24} color="white" />
                        <Text style={styles.btnText}>Leitura de Itens</Text>
                    </TouchableOpacity> */}
                </View>
            </ScrollView>
        )
    }
}