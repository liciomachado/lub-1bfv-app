import React, { Component } from 'react'
import { Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import axios from 'axios'
import { SERVER } from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class NewCheck extends Component {

    state = {
        id: 0,
        item: '',
        peca: '',
        tempoTroca: '',
        descricaoTroca: '',
        imagemTroca: '',
        maquina: {},
        mostraImagemMaquina: this.props.route.params?.imagemMaquina,
    }

    componentDidMount = async () => {
        let img = ''
        let res = await AsyncStorage.getItem('usuario_logado')
        const usuario = JSON.parse(res)
        this.setState({ usuario })
        const maquina = await axios.get(`${SERVER}/maquina/findbyid/${usuario.id}`)
        this.setState({ maquina: maquina.data })

        //ATUALIZA CHECAGEM
        if (this.props.route.params?.id != 0) {
            const id = this.props.route.params?.id || 0
            const checagem = await axios.get(`${SERVER}/checagem/findbyid/${id}`)
            this.setState({ ...checagem.data })
            img = checagem.data.imagemTroca
            this.setState({ imagemTroca: img })
        }
    }

    saveOrUpdate = async () => {
        try {
            if (this.state.id != 0) {
                const res = await axios.put(`${SERVER}/checagem/update`, {
                    ...this.state
                })
            } else {
                const res = await axios.post(`${SERVER}/checagem/save`, {
                    imagemTroca: this.state.imagemTroca,
                    checagem: {
                        item: this.state.item,
                        peca: this.state.peca,
                        tempoTroca: this.state.tempoTroca,
                        descricaoTroca: this.state.descricaoTroca,
                        maquina: {
                            id: this.state.maquina.id
                        },
                    }
                })
            }
            this.props.navigation.navigate('Home')
        } catch (error) {
            Alert.alert("Erro", error)
        }
    }

    atualizaImagem = async () => {
        await this.setState({ imagemTroca: this.props.route.params?.imagemMaquina || null })
        //const res = this.state.mostraImagemMaquina.replace('data:image/png;base64,', '')
        //this.setState({ imagemTroca:  })
    }

    render() {
        return (
            <>
                <TextInput
                    style={styles.input}
                    placeholder="Item"
                    autoCorrect={false}
                    value={this.state.item}
                    onChangeText={item => this.setState({ item })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Peça"
                    autoCorrect={false}
                    value={this.state.peca}
                    onChangeText={peca => this.setState({ peca })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Intervalo de troca"
                    keyboardType='number-pad'
                    autoCorrect={false}
                    value={this.state.tempoTroca.toString()}
                    onChangeText={tempoTroca => this.setState({ tempoTroca })}
                />
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.input}
                    placeholder="Descrição da troca"
                    autoCorrect={false}
                    value={this.state.descricaoTroca}
                    onChangeText={descricaoTroca => this.setState({ descricaoTroca })}
                />

                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Camera', { onGoBack: () => this.atualizaImagem(), previousScreen: 'NewCheck' }) }}>
                    <Text style={{ textAlign: 'center' }}>{"\n"}Imagem da peça</Text>
                    <Image source={{ uri: "data:image/png;base64," + this.state.imagemTroca }} style={{ width: '100%', height: 200, backgroundColor: '#fea' }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnSubmit} onPress={() => { this.saveOrUpdate() }}>
                    {this.state.id != 0
                        ? <Text style={styles.submitText}>Atualizar checagem</Text>
                        : <Text style={styles.submitText}>Salvar</Text>}
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