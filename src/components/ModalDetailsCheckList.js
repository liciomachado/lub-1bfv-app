import React, { Component } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, FlatList } from 'react-native'
import axios from 'axios'
import { SERVER } from '../services/api'
export default class ModalDetailsCheckList extends Component {

    state = {
        checklist: {}
    }

    componentDidMount = async () => {
        const id = parseInt(this.props.id)
        const res = await axios.get(`${SERVER}/checklist/findbyid/${id}`)
        this.setState({ checklist: res.data })
    }

    renderCheckList = ({ item }) => (
        <View>
            <Text>Peça: {item.item}</Text>
            <Text>Tempo utilizado: {item.tempoUltimaTroca}/{item.tempoTroca}{"\n"}</Text>
        </View>
    )

    render() {
        return (
            <Modal transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background} />
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Revisão : {this.state.checklist.data}</Text>

                    <Text style={{textAlign: 'center', marginTop: 20}}>Horimetro na checagem : {this.state.checklist.horimetro}</Text>
                    <View style={styles.modal}>
                        <FlatList data={this.state.checklist.checagem}
                            keyExtractor={checagem => `${checagem.id}`}
                            renderItem={this.renderCheckList} />
                    </View>

                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background} />
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        flex: 2,
        backgroundColor: '#FFF'
    },
    header: {
        backgroundColor: '#35AAFF',
        color: '#FFF',
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: 'green'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        flex: 1
    }
})
