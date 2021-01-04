import React, { Component } from 'react';
import UsuarioService from '../services/usuarioService';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import imageBackground from '../img/background.png'

const initialParams = {
    idtMilitar: '0507260479',
    senha: '123321',
    nome: '',
    email: '',

    showSignUp: false,
}

export default class Login extends Component {

    state = {
        ...initialParams
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    LoginOrSignUp = async () => {
        if (this.state.showSignUp) {
            const res = await this.service.novo({
                idtMilitar: this.state.idtMilitar,
                senha: this.state.senha,
                nome: this.state.nome,
                email: this.state.email
            }).then(
                Alert.alert('Sucesso', 'Aguarde a confirmação de cadastro em seu email!')
            )
            this.setState({ ...initialParams })

        } else {
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
    }

    render() {

        return (
            <ImageBackground source={imageBackground} style={styles.backgroundImage}>
                <View style={styles.formContainer}>
                    {this.state.showSignUp
                        ? <Text style={styles.title}>Cadastre-se</Text>
                        : <Text style={styles.title}>Conecte-se</Text>}
                    {this.state.showSignUp && <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        autoCorrect={false}
                        value={this.state.nome}
                        onChangeText={nome => this.setState({ nome })}
                    />
                    }
                    {this.state.showSignUp && <TextInput
                        style={styles.input}
                        placeholder="Email"
                        autoCorrect={false}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                    }
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
                        onPress={() => { this.LoginOrSignUp() }}>
                        {this.state.showSignUp
                            ? <Text style={styles.submitText}>Finalizar cadastro</Text>
                            : <Text style={styles.submitText}>Acessar</Text>}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnRegister} onPress={() => { this.setState({ showSignUp: !this.state.showSignUp }) }}>
                        {this.state.showSignUp
                            ? <Text style={styles.registerText}>Voltar</Text>
                            : <Text style={styles.registerText}>Criar conta gratuita</Text>}
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