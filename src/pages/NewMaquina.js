import React, { Component } from 'react'
import { Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import axios from 'axios'
import { SERVER } from '../services/api'
import ModalPicker from '../components/ModalPicker'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class NewMaquina extends Component {

    state = {
        nome: '',
        descricao: '',
        horimetro: '',
        usuario: {},
        imagemMaquina: [],
        showModal: false,
        mostraImagemMaquina: this.props.route.params?.imagemMaquina || null,

    }

    componentDidMount = async() => {
        let res = await AsyncStorage.getItem('usuario_logado')
        const usuario = JSON.parse(res)
        this.setState({ usuario })
        console.log(usuario)
    }

    saveMaquina = async () => {
        try {
            const res = await axios.post(`${SERVER}/maquina/save`, {
                ...this.state
            })
        } catch (error) {
            Alert.alert("Erro", error)
        }
        this.props.navigation.navigate('Home')
    }

    atualizaImagem = async () => {
        await this.setState({ mostraImagemMaquina: this.props.route.params?.imagemMaquina || null })
        const res = this.state.mostraImagemMaquina.replace('data:image/png;base64,', '')
        this.setState({ imagemMaquina: res })
    }

    render() {
        return (
            <>
                {this.state.showModal && <ModalPicker isVisible={this.state.showModal}
                    data={this.state.usuario}
                    onCancel={() => this.setState({ showModal: false })}
                />
                }
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    autoCorrect={false}
                    value={this.state.nome}
                    onChangeText={nome => this.setState({ nome })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Descricao"
                    autoCorrect={false}
                    value={this.state.descricao}
                    onChangeText={descricao => this.setState({ descricao })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Horimetro"
                    keyboardType='number-pad'
                    autoCorrect={false}
                    value={this.state.horimetro}
                    onChangeText={horimetro => this.setState({ horimetro })}
                />

                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Camera', { onGoBack: () => this.atualizaImagem(), previousScreen: 'NewMaquina' }) }}>
                    <Text style={{ textAlign: 'center' }}>{"\n"}Imagem da maquina</Text>
                    <Image source={{ uri: this.state.mostraImagemMaquina }} style={{ width: '100%', height: 200, backgroundColor: '#fea' }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnSubmit} onPress={() => { this.saveMaquina() }}>
                    <Text style={styles.submitText}>Salvar</Text>
                </TouchableOpacity>
            </>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#FFF',
        marginTop: 15,
        color: '#222',
        fontSize: 17,
        borderRadius: 20,
        padding: 10,
    },
    btnSubmit: {
        backgroundColor: '#35AAFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        width: '100%',
        padding: 8,
        marginTop: 10
    },
    submitText: {
        color: '#fff',
        fontSize: 18
    },
    camera: {
        flex: 1,

    }
})