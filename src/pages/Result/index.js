import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import getRealm from '../../config/realm';

import styles from './styles';

export default class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realm: null,
            itens: [],
            CodUsuario: 1,
            InventarioId: this.props.navigation.getParam('InventarioId'),
            Remessa: this.props.navigation.getParam('Remessa'),
        };

        this.props.navigation.addListener("willFocus", async () => {
            const realm = await getRealm();

            let itensRemessa = realm.objects("Remessas").filtered('NumeroRemessa == "' + this.state.Remessa + '"');
            let itensLidos = realm.objects("ItensInventario").filtered('InventarioId == "' + this.state.InventarioId + '"');
            let itens = [];

            console.log('itensRemessa', itensRemessa);
            console.log('itensLidos', itensLidos);

            for (let i = 0; i < itensLidos.length; i++) {
                for (let j = 0; j < itensRemessa.length; j++) {
                    if (itensLidos[i].CodProduto == itensRemessa[j].CodProduto) {
                        itens.push({
                            Nome: itensLidos[i].Desceq,
                            QuantidadeNaRemessa: itensRemessa[j].Quantidade,
                            QuantidadeLida: itensLidos[i].Estoque,
                            QuantidadeFaltando: parseInt(itensRemessa[j].Quantidade) > parseInt(itensLidos[i].Estoque) ? 'Estão faltando ' + (parseInt(itensRemessa[j].Quantidade) - parseInt(itensLidos[i].Estoque)) + ' itens' : '',
                            QuantidadeCerta: parseInt(itensRemessa[j].Quantidade) == parseInt(itensLidos[i].Estoque) ? 'A quantidade deste produto está correta' : '',
                            QuantidadeAMais: parseInt(itensRemessa[j].Quantidade) < parseInt(itensLidos[i].Estoque) ? 'Tem ' + (parseInt(itensLidos[i].Estoque) - parseInt(itensRemessa[j].Quantidade)) + ' itens a mais' : ''
                        })
                    }
                }
            }

            this.setState({ itens })
        })
    }

    static navigationOptions = {
        title: "Relatório",
    }

    async componentDidMount() {
        const realm = await getRealm()
        this.setState({ realm });


        this.obterItens();
    }

    obterItens = () => {
        const { realm } = this.state;

        let itensRemessa = realm.objects("Remessas").filtered('NumeroRemessa == "' + this.state.Remessa + '"');
        let itensLidos = realm.objects("ItensInventario").filtered('InventarioId == "' + this.state.InventarioId + '"');
        let itens = [];


        for (let i = 0; i < itensLidos.length; i++) {
            for (let j = 0; j < itensRemessa.length; j++) {
                if (itensLidos[i].CodProduto == itensRemessa[j].CodProduto) {
                    itens.push({
                        Nome: itensLidos[i].Desceq,
                        QuantidadeNaRemessa: itensRemessa[j].Quantidade,
                        QuantidadeLida: itensLidos[i].Estoque,
                        QuantidadeFaltando: parseInt(itensRemessa[j].Quantidade) > parseInt(itensLidos[i].Estoque) ? 'Estão faltando ' + (parseInt(itensRemessa[j].Quantidade) - parseInt(itensLidos[i].Estoque)) + ' itens' : '',
                        QuantidadeCerta: parseInt(itensRemessa[j].Quantidade) == parseInt(itensLidos[i].Estoque) ? 'A quantidade deste produto está correta' : '',
                        QuantidadeAMais: parseInt(itensRemessa[j].Quantidade) < parseInt(itensLidos[i].Estoque) ? 'Tem ' + (parseInt(itensLidos[i].Estoque) - parseInt(itensRemessa[j].Quantidade)) + ' itens a mais' : ''
                    })
                }
            }
        }

        this.setState({ itens })

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList data={this.state.itens} renderItem={({ item, index }) => (
                    <View style={styles.cardItem}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={styles.txtNome}>{item.Nome}</Text>
                                <Text>Quantidade na remessa: {item.QuantidadeNaRemessa}</Text>
                                <Text>Quantidade contada: {item.QuantidadeLida}</Text>
                                {item.QuantidadeFaltando != '' && <Text style={{ fontWeight: '700', fontSize: 14, color: 'red', marginTop: 10 }}>{item.QuantidadeFaltando}</Text>}
                                {item.QuantidadeCerta != '' && <Text style={{ fontWeight: '700', fontSize: 14, color: 'green', marginTop: 10 }}>{item.QuantidadeCerta}</Text>}
                                {item.QuantidadeAMais != '' && <Text style={{ fontWeight: '700', fontSize: 14, color: 'red', marginTop: 10 }}>{item.QuantidadeAMais}</Text>}
                            </View>
                        </View>
                    </View>
                )} />
            </View>
        )
    }
}