import React, { Component } from 'react';
import {
    Image,
    FlatList,
    View,
    Text,
    Picker,
    TouchableOpacity,
    TouchableHighlight,
    BackHandler,
    Alert
} from 'react-native'
import getRealm from '../../config/realm';

import Icon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Swipeable from 'react-native-swipeable';

import styles from './styles';

export default class InventoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            realm: null,
            itens: [],
            CodUsuario: 1,
            activeRowKey: null,
            item: this.props.navigation.getParam("item")
        };

        this.props.navigation.addListener("willFocus", async () => {
            const realm = await getRealm();

            let itens = realm.objects("ItensInventario").filtered('InventarioId == "' + this.state.item.InventarioId + '"');

            this.setState({ itens });
        })
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: "Itens Inventário",
            gesturesEnabled: false,
            headerLeft: () => {
                if (navigation.getParam("tipoPagina") == 1) {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate("InventoryList", { item: navigation.getParam("item") })}>
                            <Icon name="arrowleft" size={22} color="white" style={{ marginLeft: 15 }} />
                        </TouchableOpacity>
                    )
                }
                else {
                    return (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrowleft" size={22} color="white" style={{ marginLeft: 15 }} />
                        </TouchableOpacity>
                    )
                }
            }
        }
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

        let itens = realm.objects("ItensInventario").filtered('InventarioId == "' + this.state.item.InventarioId + '"');

        this.setState({ itens });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#d0d0d0', borderWidth: 1, borderColor: '#828282', padding: 5 }}>
                        <Image source={require('../../../assets/img/caixa2.png')} style={{ width: 40, height: 40 }} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontWeight: '700', fontSize: 16 }}>{this.state.item.CodVen} - {this.state.item.Nome}</Text>
                            <Text>Remessa: {this.state.item.Remessa}</Text>
                        </View>
                        <Text style={{ position: 'absolute', right: 5, alignSelf: 'flex-end' }}>{this.state.item.DataAbertura.toLocaleString()}</Text>
                    </View>
                </View>
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

                <TouchableOpacity style={styles.newInventoryButton} onPress={() => this.props.navigation.navigate("AddItens", { InventarioId: this.state.item.InventarioId })}>
                    <Icon name="plus" size={26} color={"#FFF"} />
                </TouchableOpacity>
            </View>
        )
    }
}