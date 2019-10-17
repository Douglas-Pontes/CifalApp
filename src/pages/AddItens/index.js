import React, { Component } from 'react';
import { View, Text, ScrollView, Alert, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styles from './styles';
import Dialog from "react-native-dialog";
import getRealm from '../../config/realm';
import uuid from 'react-native-uuid';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/AntDesign';
import { showMessage, hideMessage } from "react-native-flash-message";

export default class AddItens extends Component {
    constructor(props) {
        super(props)

        this.state = {
            read: null,
            quantidade: 0,
            codigoBarras: null,
            InventarioId: this.props.navigation.getParam("InventarioId"),
            itens: []
        }

        this.props.navigation.addListener("willFocus", async () => {
            const realm = await getRealm();

            let itens = realm.objects("ItensInventario").filtered('InventarioId == "' + this.state.InventarioId + '"').sorted('Created', true);

            this.setState({ itens });
        })
    }

    static navigationOptions = {
        title: "Leitura Itens",
    }

    async componentDidMount() {
        const realm = await getRealm()

        this.setState({
            realm
        });

        this.obterItens();
    }

    obterItens = () => {
        const { realm } = this.state;

        let itens = realm.objects("ItensInventario").filtered('InventarioId == "' + this.state.InventarioId + '"').sorted('Created', true);

        this.setState({ itens });
    }

    render() {
        return (
            <ScrollView>
                <RNCamera
                    ref={camera => {
                        this.camera = camera;
                    }}
                    onBarCodeRead={scanResult => {
                        if (this.state.codigoBarras == scanResult.data) return;
                        this.setState({ codigoBarras: scanResult.data });
                        this.inputQtd.focus();
                    }}
                    type={RNCamera.Constants.Type.back}
                    style={{ flex: 1, height: 300 }}
                    androidCameraPermissionOptions={{
                        title: "Permissão para usar a câmera",
                        message:
                            "Nós precisamos de sua permissão para utilizar a câmera do seu celular",
                        buttonPositive: "Ok",
                        buttonNegative: "Cancelar"
                    }}
                    barCodeTypes={[RNCamera.Constants.BarCodeType.code128, RNCamera.Constants.BarCodeType.ean13]}
                />
                <View style={{ paddingHorizontal: 10, paddingTop: 10, backgroundColor: 'white' }}>
                    <TextInput style={styles.input} keyboardType={"number-pad"} placeholder="Código" value={this.state.codigoBarras} onChangeText={codigoBarras => {
                        this.setState({ codigoBarras });
                    }} />
                    <TextInput style={styles.input} keyboardType={"number-pad"} placeholder="Quantidade" onChangeText={(quantidade) => this.setState({ quantidade })} ref={(input) => { this.inputQtd = input }} />
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        const { realm, codigoBarras, quantidade } = this.state;
                        var guid = uuid.v1()

                        console.log('codigoBarras', codigoBarras)
                        if (codigoBarras == '' || codigoBarras == null) {
                            showMessage({ message: 'Por favor preencha o código!', type: 'danger' });
                            return;
                        }

                        if (quantidade == '' || quantidade == null) {
                            showMessage({ message: 'Por favor preencha a quantidade!', type: 'danger' });
                            return;
                        }

                        var produto = realm.objects('Produtos').filtered('CodEan14 == "' + codigoBarras + '"');

                        if (produto[0] == undefined) {
                            showMessage({ message: 'Produto não encontrado, por favor importe os produtos na tela de configuração', type: 'danger' });
                            return;
                        }

                        realm.write(() => {
                            realm.create('ItensInventario', {
                                CodProduto: produto[0].CodProduto.toString(),
                                InventarioId: this.state.InventarioId,
                                Desceq: produto[0].Desceq,
                                Unideq: produto[0].Unideq,
                                Estoque: this.state.quantidade.toString(),
                                PerVista: produto[0].PerVista,
                                CodEan14: produto[0].CodEan14,
                                Created: new Date()
                            })
                        })

                        this.camera.resumePreview();
                        this.setState({ quantidade: 0 })
                    }}>
                        <Text style={styles.btnText}>Adicionar</Text>
                    </TouchableOpacity>
                    <FlatList data={this.state.itens} keyExtractor={item => item.CodProduto} renderItem={({ item, index }) => (
                        <Swipeable rightButtons={[
                            <TouchableOpacity
                                style={styles.btnDelete}
                                onPress={() => {
                                    Alert.alert(
                                        'Alerta',
                                        'Você tem certeza que deseja deletar?',
                                        [{ text: 'Não', style: 'cancel' },
                                        {
                                            text: 'Sim', onPress: () => {
                                                const { realm } = this.state;

                                                realm.write(() => {
                                                    realm.delete(realm.objectForPrimaryKey('ItensInventario', this.state.itens[index].CodProduto));
                                                })

                                                this.obterItens();
                                            }
                                        }],
                                        { cancelable: true }
                                    )

                                }}
                            ><Icon name="delete" size={24} color="white" /></TouchableOpacity>
                        ]}>
                            <View style={styles.cardItem}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View>
                                        <Text>Unidade:</Text>
                                        <Text style={{ fontSize: 26, fontWeight: '700' }}>{item.Unideq}</Text>
                                    </View>
                                    <View style={{ flex: 1, marginLeft: 10 }}>
                                        <Text style={styles.txtNome}>{item.Desceq}</Text>
                                        <Text>Codigo Barras: {item.CodEan14}</Text>
                                        <Text>Quantidade: {item.Estoque}</Text>
                                    </View>
                                </View>
                            </View>
                        </Swipeable>
                    )} />
                </View>

            </ScrollView>
        )
    }
}