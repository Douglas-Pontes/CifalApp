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
import ModalSelector from 'react-native-modal-selector';
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
            btnImportarDados: true,
            Vendedores: []
        }
    }

    async componentDidMount() {
        const realm = await getRealm();

        let VendedoresAux = await api.get('/vendedores');
        let Vendedores = [];

        VendedoresAux.data.map(item => {
            Vendedores.push({ label: item.Nome, key: item.CodVen })
        });

        this.setState({ realm, Vendedores: Vendedores })
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
                CodVen: parseInt(CodVen),
                Remessa: parseInt(Remessa),
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

        let remessas = await api.get('remessas/' + this.state.Remessa);

        if (remessas.data == null || remessas.data == undefined) {
            showMessage({
                message: 'Não foi encontrado nenhum remessa para este vendedor ou verifique sua conexão a internet.',
                type: 'danger'
            });

            return;
        }

        let remessasToRemove = realm.objects("Remessas").filtered('NumeroRemessa == "' + this.state.Remessa + '"');
        console.log('remessas', remessasToRemove)

        realm.write(() => {
            realm.delete(remessasToRemove);

            remessas.data.map(item => {
                realm.create('Remessas', {
                    NumeroRemessa: item.NumeroRemessa,
                    CodVen: item.CodVen,
                    CodProduto: item.CodProduto,
                    Nome: item.Nome,
                    Unid: item.Unid,
                    Quantidade: item.Quantidade.toString()
                })
            })
        })

        this.salvarInventario()
    }

    onChangeVendedor = (CodVen, Nome) => {
        if (Nome == "Douglas") {
            this.setState({ CodVen: CodVen.toString(), Nome, btnImportarDados: false, Remessa: (10001).toString() });
        } else {
            this.setState({ CodVen: CodVen.toString(), Nome, btnImportarDados: false, Remessa: (10000).toString() });
        }

    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image source={require("../../../assets/img/caixa-aberta.png")} style={{ width: 80, height: 80 }} />
                    <Text>Novo Item</Text>

                    <ModalSelector
                        data={this.state.Vendedores}
                        initValue="Select something yummy!"
                        supportedOrientations={['portrait']}
                        accessible={true}
                        style={[styles.input, { marginTop: 20 }]}
                        scrollViewAccessibilityLabel={'Scrollable options'}
                        cancelButtonAccessibilityLabel={'Cancelar'}
                        cancelText={'Cancelar'}
                        onChange={(option) => { this.onChangeVendedor(option.key, option.label) }}>
                        <TextInput keyboardType={"number-pad"} value={this.state.CodVen} placeholder="Código" />
                    </ModalSelector>
                    <ModalSelector
                        data={this.state.Vendedores}
                        supportedOrientations={['portrait']}
                        accessible={true}
                        style={[styles.input]}
                        scrollViewAccessibilityLabel={'Scrollable options'}
                        cancelButtonAccessibilityLabel={'Cancelar'}
                        cancelText={'Cancelar'}
                        onChange={(option) => { this.onChangeVendedor(option.key, option.label) }}>
                        <TextInput placeholder="Vendedor" value={this.state.Nome} />
                    </ModalSelector>
                    <ModalSelector
                        data={this.state.Vendedores}
                        supportedOrientations={['portrait']}
                        accessible={true}
                        style={[styles.input]}
                        scrollViewAccessibilityLabel={'Scrollable options'}
                        cancelButtonAccessibilityLabel={'Cancelar'}
                        cancelText={'Cancelar'}
                        onChange={(option) => { this.onChangeVendedor(option.key, option.label) }}>
                        <TextInput placeholder="Remessa" keyboardType={"number-pad"} value={this.state.Remessa} />
                    </ModalSelector>
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