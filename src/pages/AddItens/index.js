import React, { Component } from 'react';
import { View, Text, ScrollView, Alert, FlatList, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styles from './styles';
import Dialog from "react-native-dialog";
import getRealm from '../../config/realm';
import uuid from 'react-native-uuid';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/AntDesign';

export default class AddItens extends Component {
    constructor(props) {
        super(props)

        this.state = {
            read: null,
            quantidade: 0,
            visible: false,
            InventarioId: this.props.navigation.getParam("InventarioId"),
            itens: []
        }

        this.props.navigation.addListener("willFocus", async () => {
            const realm = await getRealm();

            let itens = realm.objects("ItensInventario").filtered('InventarioId == "' + this.state.InventarioId + '"');

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

        let itens = realm.objects("ItensInventario").filtered('InventarioId == "' + this.state.InventarioId + '"');

        this.setState({ itens });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Dialog.Container visible={this.state.visible} backdropOpacity={0}>
                    <Dialog.Title>Por favor preencha a quantidade</Dialog.Title>
                    <Dialog.Input style={styles.input} onChangeText={(quantidade) => this.setState({ quantidade })} />
                    <Dialog.Button label="Cancelar" onPress={() => {
                        this.camera.resumePreview();
                        this.setState({ visible: false, quantidade: 0 })
                    }} />
                    <Dialog.Button label="Ok" onPress={() => {

                        const { realm } = this.state;
                        var guid = uuid.v1()

                        realm.write(() => {
                            realm.create('ItensInventario', {
                                CodProduto: guid,
                                InventarioId: this.state.InventarioId,
                                Desceq: 'TESTE',
                                Unideq: 'PCT',
                                Estoque: this.state.quantidade.toString(),
                                PerVista: 'TESTE'
                            })
                        })

                        this.camera.resumePreview();
                        this.setState({ visible: false, quantidade: 0 })
                    }} />
                </Dialog.Container>
                <RNCamera
                    ref={camera => {
                        this.camera = camera;
                    }}
                    onBarCodeRead={scanResult => {
                        if (this.state.read == scanResult.data) return;

                        this.camera.pausePreview();
                        this.setState({ visible: true });
                    }}
                    type={RNCamera.Constants.Type.back}
                    style={styles.camera}
                    androidCameraPermissionOptions={{
                        title: "Permissão para usar a câmera",
                        message:
                            "Nós precisamos de sua permissão para utilizar a câmera do seu celular",
                        buttonPositive: "Ok",
                        buttonNegative: "Cancelar"
                    }}
                    barCodeTypes={[RNCamera.Constants.BarCodeType.code128, RNCamera.Constants.BarCodeType.ean13]}
                />
                <FlatList style={{ marginTop: 200 }} data={this.state.itens} keyExtractor={item => item.CodProduto} renderItem={({ item, index }) => (
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
                                    <Text>{item.Unideq}</Text>
                                </View>
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <Text style={styles.txtNome}>Produto 1</Text>
                                    <Text>Codigo Barras: 2313123123123123</Text>
                                    <Text>Quantidade: {item.Estoque}</Text>
                                </View>
                            </View>
                        </View>
                    </Swipeable>
                )} />
            </ScrollView>
        )
    }
}