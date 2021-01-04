import React, { Component } from 'react'
import { Modal, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import { SERVER } from '../services/api'
export default class ModalDetails extends Component {

    state = {
        data : {}
    }
 
    componentDidMount = async () => {
        id = parseInt(this.props.id)
        const res = await axios.get(`${SERVER}/checagem/findbyid/${id}`)
        this.setState({data : res.data})
    }

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
                    <Text style={styles.header}>{this.state.data.item}</Text>
                    <ScrollView>
                        <View>
                            <Image source={require('../img/bomba.jpeg')} style={{ width: '100%', height: 250, }} />
                        </View>
                        <Text>{this.state.data.peca}</Text>

                        <Text>{"\n"} {this.state.data.descricaoComplementar}</Text>

                        <Text>{"\n"} {this.state.data.descricaoTroca}</Text>
                    </ScrollView>

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
        flex: 6,
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
})
