import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image, ScrollView, Platform } from 'react-native';
import ModalDetails from '../components/ModalDetails'
import ModalDetailsCheckList from '../components/ModalDetailsCheckList';
import axios from 'axios'
import { SERVER } from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class Sobre extends Component {

    state = {
        showModal: false,
        idShowModal: 0,

        showModalDetails: false,
        idShowModalDetais: 0,
        maquina: {},
        imagemMaquina: null,
        checkLists: {}
    }

    changeId = async (id) => {
        await this.setState({ idShowModal: id })
        await this.setState({ showModal: true })
    }

    changeIdDetails = async (id) => {
        await this.setState({ idShowModalDetais: id })
        await this.setState({ showModalDetails: true })
    }

    componentDidMount = async () => {
        const res = await axios.get(`${SERVER}/maquina/findbyid/${this.props.route.params.maquina.id}`)
        const maquina = res.data
        this.setState({ maquina })
    }

    renderItem = ({ item }) => (
        <View>
            <TouchableOpacity onPress={() => { this.changeId(item.id) }}>
                <Text>{item.item} - {item.peca}</Text>
            </TouchableOpacity>
        </View>
    )

    renderCheckList = ({ item }) => (
        <View>
            <TouchableOpacity onPress={() => { this.changeIdDetails(item.id) }}> 
                <Text>{item.data}</Text>
            </TouchableOpacity>
        </View>
    )

    logout = () => {
        AsyncStorage.removeItem('usuario_logado')
        AsyncStorage.removeItem('Authorization')
        delete axios.defaults.headers.common['Authorization']
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <>
                {this.state.showModal && <ModalDetails isVisible={this.state.showModal}
                    onCancel={() => this.setState({ showModal: false })}
                    id={this.state.idShowModal} />
                }

                {this.state.showModalDetails && <ModalDetailsCheckList isVisible={this.state.showModalDetails}
                    onCancel={() => this.setState({ showModalDetails: false })}
                    id={this.state.idShowModalDetais} />
                }
                <ScrollView style={{ backgroundColor: '#fff' }}>
                    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                        <View style={styles.background}>
                            <Text>Meu equipamento :</Text>
                            <Text>{this.state.maquina.nome}</Text>

                            <View style={styles.containerLogo}>
                                <Image source={require('../img/escavadeira.jpg')} style={{ width: 300, height: 200 }} />
                                {/* <Image source={{ uri: 'data:mimetype_attachment; base64,' + this.state.imagemMaquina, cache: 'reload' }} style={{ width: 300, height: 200 }} /> */}
                            </View>

                        </View>
                        <View style={styles.alinhamento}>
                            <Text>{this.state.maquina.descricao}</Text>
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{"\n"}Horimetro: {this.state.maquina.horimetro} Horas acumuladas{"\n"}{"\n"}</Text>
                            <View>
                                <FlatList data={this.state.maquina.checagem}
                                    keyExtractor={checagem => `${checagem.id}`}
                                    renderItem={this.renderItem} />
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{"\n"}Revisões:</Text>
                                <FlatList data={this.state.maquina.checklist}
                                    keyExtractor={checagem => `${checagem.id}`}
                                    renderItem={this.renderCheckList} />

                                <TouchableOpacity style={[styles.btnSubmit, { backgroundColor: '#8B0000' }]}
                                    onPress={() => {
                                        this.logout()
                                    }}>
                                    <Text style={styles.submitText}>Sair</Text>
                                </TouchableOpacity>
                            </View>
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
    },
    alinhamento: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
    },
    btnSubmit: {
        marginTop: 10,
        backgroundColor: '#35AAFF',
        width: '80%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    submitText: {
        color: '#fff',
        fontSize: 18
    },
})