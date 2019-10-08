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
import StarRating from 'react-native-star-rating';

import styles from './styles';
import getRealm from '../../config/realm';

export default class AddInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realm: null,
            item: this.props.navigation.getParam("item"),
            rating: 0
        }
    }

    async componentDidMount() {
        const realm = await getRealm();
        this.setState({
            realm
        })
    }

    static navigationOptions = {
        title: "Informações Inventário",
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image source={require("../../../assets/img/aberto.png")} style={{ width: 80, height: 80 }} />
                    <Text style={{ marginTop: 5, fontSize: 16, fontWeight: '700' }}>{this.state.item.Situacao}</Text>
                </View>
                <View style={styles.cardItem}>
                    <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 5 }}>Detalhes</Text>
                    <Text>Vendedor: {this.state.item.Nome}</Text>
                    <Text>Remessa: {this.state.item.Remessa}</Text>
                    <Text>Conferente: Douglas Pontes Santos</Text>
                </View>
                <View style={styles.cardItem}>
                    <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 5 }}>Data</Text>
                    <Text>Aberto: {this.state.item.DataAbertura.toLocaleString()}</Text>
                    <Text>Finalizado: {this.state.item.DataFinalizado}</Text>
                    <Text>Sincronizado: {this.state.item.DataSincronizado}</Text>
                </View>
                <View style={styles.cardItem}>
                    <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 5 }}>Avaliação</Text>
                    <Text>Comentários: {this.state.item.Comentario}</Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={this.state.rating}
                        selectedStar={(rating) => this.setState({ rating })}
                        starSize={18}
                        containerStyle={{ marginTop: 10, width: '40%', alignSelf: 'center' }}
                        starStyle={{ color: 'green' }}
                    />
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate("ListItens", { item: this.state.item, tipoPagina: 2 })}>
                    <Icon name="barcode" size={24} color="white" />
                    <Text style={styles.btnText}>Leitura de Itens</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnGreen} onPress={() => { }}>
                    <Icon name="check" size={24} color="white" />
                    <Text style={styles.btnText}>Finalizar</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}