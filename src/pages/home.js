import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import { SERVER } from '../services/api'

export default class Home extends Component {

    state = {
        maquina: {},
        ultimoCheck: '',
        usuario: {},
        imagemMaquina: null
    }

    constructor() {
        super();
    }

    componentDidMount = async () => {
        let res = await AsyncStorage.getItem('usuario_logado')
        const usuario = JSON.parse(res)
        this.setState({ usuario })
        const maquina = await axios.get(`${SERVER}/maquina/findbyid/${usuario.id}`)
        this.setState({ maquina: maquina.data })

        this.setState({ imagemMaquina: 'data:mimetype_attachment; base64,' + this.state.maquina.imagemMaquina })
        //console.log(this.state.imagemMaquina)
    }

    

    render() {
        return (
            <KeyboardAvoidingView style={styles.background}>
                <Text style={styles.h1}>Meu equipamento :</Text>
                <Text style={styles.h1}>{this.state.maquina.nome}</Text>

                <Text style={[styles.h1, { marginTop: 50 }]}>Ultimo check-list :</Text>
                <Text style={styles.h1}>{this.state.maquina.dataUltimoChecklist}{"\n"}</Text>

                <Text style={[styles.h1, { color: 'red', textAlign: 'center' }]}>Falta 15 horas para vencer seu Oleo lubrificante</Text>

                <View style={styles.containerLogo}>
                    <Image source={{ uri: this.state.imagemMaquina, scale: 1, cache: 'reload' }} style={{ backgroundColor: '#dee', width: 300, height: 200 }} />
                </View>

                <TouchableOpacity style={styles.btnSubmit}
                    onPress={() => {
                        this.props.navigation.navigate("CheckList", { maquina: this.state.maquina, imagemMaquina: this.state.imagemMaquina });
                    }}>
                    <Text style={styles.submitText}>Realizar Checagem</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnSubmit}
                    onPress={() => {
                        this.props.navigation.navigate("Sobre", { maquina: this.state.maquina, imagemMaquina: this.state.imagemMaquina });
                    }}>
                    <Text style={styles.submitText}>Sobre sua maquina</Text>
                </TouchableOpacity>

                

            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    btnSubmit: {
        marginTop: 10,
        backgroundColor: '#35AAFF',
        width: '80%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    submitText: {
        color: '#fff',
        fontSize: 18
    },
    h1: {
        fontSize: 18,
        fontWeight: "bold",
    }
});