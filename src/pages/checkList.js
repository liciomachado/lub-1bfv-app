import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image, ScrollView, TextInput, Platform, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import ModalDetails from '../components/ModalDetails'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SERVER } from '../services/api'

export default class CheckList extends Component {

    state = {
        item: [],
        imagemMaquina: '',
        horimetro: '',

        usuario: {},
        showModal: false,
        idShowModal: 2,
    }

    changeId = async (id) => {
        await this.setState({ idShowModal: id })
        await this.setState({ showModal: true })
    }

    componentDidMount = async () => {
        let img = ''
        let u = await AsyncStorage.getItem('usuario_logado')
        const usuario = JSON.parse(u)
        this.setState({ usuario })
        const res = await axios.get(`${SERVER}/maquina/findbyid/${usuario.id}`)
        img = res.data.imagemMaquina
        this.setState({ item: res.data.checagem, imagemMaquina: img })

    }

    onChange = (key) => {
        let item2 = [...this.state.item];
        item2[key].revisao = !item2[key].revisao;
        this.setState({ item: item2 });
    }

    saveCheck = async () => {
        let itens = this.state.item.filter(check => check.revisao == true)
        let arrayItens = []
        itens.forEach(element => {
            arrayItens.push(element.id)
        });
        try {
            const res = await axios.post(`${SERVER}/checagem/saveCheckList`, {
                arrayItens,
                usuario: this.state.usuario.id,
                horimetro: this.state.horimetro
            })
            this.props.navigation.navigate('Finish')
        } catch (error) {
            alert(error)
        }
    }

    render() {
        return (
            <>
                {this.state.showModal && <ModalDetails isVisible={this.state.showModal}
                    onCancel={() => this.setState({ showModal: false })}
                    id={this.state.idShowModal} />
                }
                <ScrollView>
                    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
                        <View style={styles.background}>
                            <Text>Meu equipamento :</Text>
                            <Text>Escavadeira ES-25</Text>
                            <TouchableOpacity>
                                <View style={styles.containerLogo}>
                                    <Image source={{ uri: "data:image/png;base64," + this.state.imagemMaquina, scale: 1, cache: 'reload' }} style={{ backgroundColor: '#dee', width: 300, height: 200 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.form}>
                            <Text>Horas Trabalhadas:</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={horimetro => this.setState({ horimetro })}
                                value={this.state.horimetro}
                                keyboardType='number-pad'
                            />

                            {this.state.item && this.state.item.map((item, key) =>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} key={item.id}>
                                    <CheckBox
                                        key={item.id}
                                        title={`${item.item} ${item.tempoUltimaTroca}/${item.tempoTroca}`}
                                        checked={item.revisao}
                                        onPress={() => this.onChange(key)}
                                    />
                                    <TouchableOpacity onPress={() => { this.changeId(item.id) }}>
                                        <Icon name="eye" size={20} color="#000" style={{ marginTop: 15 }} />
                                    </TouchableOpacity>
                                </View>
                            )}
                            <TouchableOpacity style={styles.btnSubmit}
                                onPress={() => { this.saveCheck() }}
                            >
                                <Text style={styles.submitText}>Confirmar Checagem</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </>
        )
    }
}
const styles = StyleSheet.create({
    background: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    btnSubmit: {
        marginTop: 10,
        backgroundColor: '#35AAFF',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    submitText: {
        color: '#fff',
        fontSize: 18
    },
    form: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30
    },
})