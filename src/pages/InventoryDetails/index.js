import React, { Component } from 'react';
import {
    Image,
    ScrollView,
    View,
    Text,
    Picker,
    TouchableOpacity,
    Modal
} from 'react-native'

import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import StarRating from 'react-native-star-rating';
import SignatureCapture from 'react-native-signature-capture';

import styles from './styles';
import getRealm from '../../config/realm';

export default class AddInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realm: null,
            item: this.props.navigation.getParam("item"),
            rating: 0,
            modalSignature: false
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

    finalizarInventario = () => {
        const { realm } = this.state;

        realm.write(() => {
            realm.create('Inventarios', { InventarioId: this.state.item.InventarioId, Situacao: 'Finalizado', DataFinalizacao: new Date() }, true);
        });

        this.forceUpdate();
    }

    render() {
        return (
            <ScrollView>
                {this.state.item.Situacao == "Finalizado" && <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 10, marginRight: 20 }} onPress={() => this.setState({ modalSignature: true })}>
                    <Image source={require('../../../assets/img/caneta.png')} style={{ width: 26, height: 26 }} />
                </TouchableOpacity>}
                {this.state.item.Situacao == "Sincronizado" && <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 10, marginRight: 20 }} onPress={() => this.setState({ modalSignature: true })}>
                    <Image source={require('../../../assets/img/caneta.png')} style={{ width: 26, height: 26 }} />
                </TouchableOpacity>}

                <View style={styles.container}>
                    {this.state.item.Situacao == "Aberto" && (<Image source={require("../../../assets/img/aberto.png")} style={{ width: 80, height: 80 }} />)}
                    {this.state.item.Situacao == "Sincronizado" && (<Image source={require("../../../assets/img/sincronizado.png")} style={{ width: 80, height: 80 }} />)}
                    {this.state.item.Situacao == "Finalizado" && (<Image source={require("../../../assets/img/Oks.png")} style={{ width: 80, height: 80 }} />)}
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
                    <Text>Finalizado: {this.state.item.DataFinalizacao == null ? "" : this.state.item.DataFinalizacao.toLocaleString()}</Text>
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
                {
                    this.state.item.Situacao == "Aberto" && <View>
                        <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate("InventoryRemessas", { Remessa: this.state.item.Remessa })}>
                            <Entypo name="list" size={27} color="white" />
                            <Text style={styles.btnText}>Itens da remessa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate("ListItens", { item: this.state.item, tipoPagina: 2 })}>
                            <Icon name="barcode" size={24} color="white" />
                            <Text style={styles.btnText}>Leitura de Itens</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnGreen} onPress={this.finalizarInventario}>
                            <Icon name="check" size={24} color="white" />
                            <Text style={styles.btnText}>Finalizar</Text>
                        </TouchableOpacity>
                    </View>
                }
                {
                    this.state.item.Situacao == "Finalizado" && <View>
                        <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Result', { InventarioId: this.state.item.InventarioId, Remessa: this.state.item.Remessa })}>
                            <Icon name="barcode" size={24} color="white" />
                            <Text style={styles.btnText}>Resultado</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnGreen} onPress={() => { }}>
                            <Icon name="check" size={24} color="white" />
                            <Text style={styles.btnText}>Sincronizar</Text>
                        </TouchableOpacity>
                    </View>
                }
                {
                    this.state.item.Situacao == "Sincronizado" && <View>
                        <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('Result', { InventarioId: this.state.item.InventarioId, Remessa: this.state.item.Remessa })}>
                            <Icon name="barcode" size={24} color="white" />
                            <Text style={styles.btnText}>Resultado</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnGreen} onPress={() => { }}>
                            <Icon name="check" size={24} color="white" />
                            <Text style={styles.btnText}>Enviar e-mail</Text>
                        </TouchableOpacity>
                    </View>
                }

                <Modal
                    animationType="fade"
                    transparent={false}
                    onRequestClose={() => this.setState({ modalSignature: false })}
                    visible={this.state.modalSignature}>
                    <SignatureCapture
                        style={{ flex: 1 }}
                        ref="sign"
                        onSaveEvent={() => { }}
                        saveImageFileInExtStorage={false}
                        showNativeButtons={true}
                        showTitleLabel={false}
                        viewMode={"portrait"} />
                </Modal>
            </ScrollView >
        )
    }
}