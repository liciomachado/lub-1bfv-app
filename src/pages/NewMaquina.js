import React, { Component } from 'react'
import { Text, Image, TextInput, StyleSheet, TouchableOpacity,Alert } from 'react-native'
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions';
import axios from 'axios'
import { SERVER } from '../services/api'

export default class NewMaquina extends Component {

    state = {
        nome: '',
        descricao: '',
        horimetro: '',
        imagemMaquina: [],
        mostraImagemMaquina: null, 

        hasPermission: true,
        type: Camera.Constants.Type.back
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
    }

    saveMaquina = async () => {
        try {
            const res = await axios.post(`${SERVER}/maquina/save`, {
                ...this.state
            })
        } catch (error) {
            Alert.alert("Erro", error)
        }
    }

    atualizaImagem = async() => {
        await this.setState({ mostraImagemMaquina: this.props.route.params.imagemMaquina || null })
        const res = this.state.mostraImagemMaquina.replace('data:image/png;base64,', '')
        this.setState({imagemMaquina: res})
    }

    render() {
        return (
            <>
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
                <Image source={{ uri: this.state.mostraImagemMaquina }} style={{ width: '100%', height: 200, backgroundColor: '#fea', resizeMode: 'contain' }} />

                <TouchableOpacity style={styles.btnSubmit} onPress={() => { this.props.navigation.navigate('Camera') }}>
                    <Text style={styles.submitText}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnSubmit} onPress={() => { this.atualizaImagem() }}>
                    <Text style={styles.submitText}>Atualizar</Text>
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
        padding: 8
    },
    submitText: {
        color: '#fff',
        fontSize: 18
    },
    camera: {
        flex: 1,

    }
})