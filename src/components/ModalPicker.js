import React, { Component } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, FlatList } from 'react-native'
import { Picker } from '@react-native-picker/picker'

export default class ModalPicker extends Component {

    state = {
        usuario: this.props.data
    }

    componentDidMount = async () => {
        await this.setState({ usuario: this.props.data })
        console.log(this.state.usuario)
    }

    renderCheckList = ({usuario }) => (
        //<Text>{usuario.nome} {usuario.id}</Text>
         <Picker.Item label={nome} value={id} key={id} />
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
                    <View style={styles.modal}>
                        <Picker
                            mode='dropdown'
                            style={{ width: '100%', }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ usuario: itemValue })
                            }>
                            {/* {this.state.usuario.map((usuario, key) =>
                                <Picker.Item label={usuario.nome} value={usuario.id} key={usuario.id} />
                            )} */}

                        </Picker>
                            <FlatList data={this.state.usuario}
                                keyExtractor={usuario => `${usuario.id}`}
                                renderItem={this.renderCheckList} />
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Selecionar</Text>
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
