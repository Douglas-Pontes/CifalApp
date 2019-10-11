import React, { Component } from 'react';
import {
    Image,
    FlatList,
    View,
    Text,
    Picker,
    TouchableOpacity,
    TouchableHighlight,
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
            filter: "Todos",
            itens: [],
            CodUsuario: 1,
            activeRowKey: null
        };

        this.props.navigation.addListener("willFocus", async () => {
            const realm = await getRealm();

            let itens = realm.objects("Inventarios").filtered('CodUsuario == "' + this.state.CodUsuario + '"');

            this.setState({ itens });
        })
    }

    static navigationOptions = {
        title: "Lista de inventários",
    }

    async componentDidMount() {
        const realm = await getRealm()
        this.setState({ realm });

        this.obterInventarios();
    }

    obterInventarios = () => {
        const { realm } = this.state;
        let itens = realm.objects("Inventarios").filtered('CodUsuario == "' + this.state.CodUsuario + '"');
        this.setState({ itens });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
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


                <FlatList data={this.state.itens} keyExtractor={item => item.InventarioId} renderItem={({ item, index }) => (
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
                                                realm.delete(realm.objectForPrimaryKey('Inventarios', this.state.itens[index].InventarioId));
                                            })

                                            this.obterInventarios();
                                        }
                                    }],
                                    { cancelable: true }
                                )

                            }}
                        ><Icon name="delete" size={24} color="white" /></TouchableOpacity>
                    ]}>
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

                            <Text style={styles.txtData}>{item.DataAbertura.toLocaleString()}</Text>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate("InventoryDetails", { item: item })} style={{ position: 'absolute', bottom: 40, right: 12 }}>
                                <FeatherIcon name="info" size={24} />
                            </TouchableOpacity>
                        </View>
                    </Swipeable>
                )} />

                <TouchableOpacity style={styles.newInventoryButton} onPress={() => this.props.navigation.navigate("AddInventory")}>
                    <Icon name="plus" size={26} color={"#FFF"} />
                </TouchableOpacity>
            </View>
        )
    }
}