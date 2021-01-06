import React, { Component } from 'react';
import {
    View,
    Text,
    RefreshControl,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import { SERVER } from '../services/api'

const initialParams = {
    maquina: {},
    ultimoCheck: '',
    usuario: {},
    imagemMaquina: "",
    trocas: [],
    refreshing: false
}

export default class Home extends Component {

    state = {
        ...initialParams
    }
    
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    buscaDados = async () => {
        let img = ''
        let res = await AsyncStorage.getItem('usuario_logado')
        const usuario = JSON.parse(res)
        this.setState({ usuario })
        try {
            const maquina = await axios.get(`${SERVER}/maquina/findbyid/${usuario.id}`)
            this.setState({ maquina: maquina.data })
            img = maquina.data.imagemMaquina
            this.setState({imagemMaquina: img})
            this.setState({ trocas: maquina.data.trocas })
        } catch (error) {
            console.log(error.response.data)
            this.props.navigation.navigate('NewMaquina')
        }
    }

    componentDidMount = async () => {
        await this.buscaDados()
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.buscaDados().then(() => {
            this.setState({ refreshing: false });
        });
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.background}
                refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} />
                }
            >
                <Text style={styles.h1}>Equipamento: {this.state.maquina.nome}</Text>

                <Text style={[styles.h1, { marginTop: 10 }]}>Ultimo check-list: {this.state.maquina.dataUltimoChecklist}{"\n"}</Text>

                <View style={styles.margem}>
                    {this.state.trocas.map((troca, index) =>
                        <Text key={index} style={{ color: 'red', textAlign: 'justify', marginBottom: 10 }}>* {troca}</Text>
                    )}
                </View>

                <View>
                    <Image source={{ uri: "data:image/png;base64,"+this.state.imagemMaquina, scale: 1, cache: 'reload' }} style={{ backgroundColor: '#dee', width: 300, height: 200 }} />
                </View>

                <TouchableOpacity style={styles.btnSubmit}
                    onPress={() => {
                        this.props.navigation.navigate("CheckList", { maquina: this.state.maquina, imagemMaquina: this.state.imagemMaquina });
                    }}>
                    <Text style={styles.submitText}>Realizar Checagem</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnSubmit}
                    onPress={() => {
                        this.props.navigation.navigate("Sobre", { id: this.state.usuario.id, imagemMaquina: this.state.imagemMaquina });
                    }}>
                    <Text style={styles.submitText}>Sobre sua maquina</Text>
                </TouchableOpacity>
                {!this.state.maquina &&
                    <TouchableOpacity style={styles.btnRegister} onPress={() => { this.props.navigation.navigate('NewMaquina') }}>
                        <Text style={styles.registerText}>Manutenção</Text>
                    </TouchableOpacity>
                }
                {this.state.maquina &&
                    <TouchableOpacity style={styles.btnRegister} onPress={() => { this.props.navigation.navigate('NewCheck') }}>
                        <Text style={styles.registerText}>Novo Item de checagem</Text>
                    </TouchableOpacity>
                }
            </ScrollView >
        )
    }
}
const styles = StyleSheet.create({
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
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
    },
    margem: {
        marginLeft: 45,
        marginRight: 45
    }
});