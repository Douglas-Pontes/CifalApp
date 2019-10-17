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

import styles from './styles';

export default class InventoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realm: null,
            itens: [],
            CodUsuario: 1,
            Remessa: this.props.navigation.getParam('Remessa'),
        };

        this.props.navigation.addListener("willFocus", async () => {
            const realm = await getRealm();

            let itens = realm.objects("Remessas").filtered('NumeroRemessa == "' + this.state.Remessa + '"');

            this.setState({ itens });
        })
    }

    static navigationOptions = {
        title: "Lista de itens da remessa",
    }

    async componentDidMount() {
        const realm = await getRealm()
        this.setState({ realm });

        this.obterItensRemessa();
    }

    obterItensRemessa = () => {
        const { realm } = this.state;
        let itens = realm.objects("Remessas").filtered('NumeroRemessa == "' + this.state.Remessa + '"');
        this.setState({ itens });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList data={this.state.itens} renderItem={({ item, index }) => (
                    <View style={styles.cardItem}>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text>Unidade:</Text>
                                <Text style={{ fontSize: 26, fontWeight: '700' }}>{item.Unid}</Text>
                            </View>
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={styles.txtNome}>{item.Nome}</Text>
                                <Text>Quantidade: {item.Quantidade}</Text>
                            </View>
                        </View>
                    </View>
                )} />
            </View>
        )
    }
}