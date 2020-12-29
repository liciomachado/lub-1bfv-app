import React, { Component } from 'react';
import UsuarioService from '../services/usuarioService';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import imageBackground from '../img/background.png'

export default class Login extends Component {

    state = {
        idtMilitar: '0507260479',
        senha: '123321',
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    logar = async () => {
        try {
            const res = await this.service.autentica({
                idtMilitar: this.state.idtMilitar,
                senha: this.state.senha
            })
            AsyncStorage.setItem('usuario_logado', JSON.stringify(res.data))
            AsyncStorage.setItem('Authorization', `Bearer ${res.data.token}`)

            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`

            this.props.navigation.navigate('Home')
        } catch (error) {
            Alert.alert('Erro :', 'Usuário invalido')
        }
    }

    render() {

        return (
            <ImageBackground source={imageBackground} style={styles.backgroundImage}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Conecte-se</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="idtMilitar"
                        autoCorrect={false}
                        value={this.state.idtMilitar}
                        onChangeText={idtMilitar => this.setState({ idtMilitar })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        secureTextEntry
                        autoCorrect={false}
                        value={this.state.senha}
                        onChangeText={senha => this.setState({ senha })}
                    />
                    <TouchableOpacity style={styles.btnSubmit}
                        onPress={() => { this.logar() }}>
                        <Text style={styles.submitText}>Acessar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnRegister}>
                        <Text style={styles.registerText}>Criar conta gratuita</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        width: '80%'
    },
    title: {
        color: '#FFF',
        fontSize: 30,
        marginBottom: 10,
        textAlign: 'center'
    },
    input: {
        backgroundColor: '#FFF',
        marginBottom: 15,
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
    btnRegister: {
        marginTop: 10
    },
    registerText: {
        color: '#fff',
        textAlign: 'center'
    }
})