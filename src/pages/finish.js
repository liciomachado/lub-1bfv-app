import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default class Finish extends Component {

    render() {
        return (
            <View style={styles.background}>
                <Text style={styles.h1}>Check-list realizado com sucesso!</Text>

                <TouchableOpacity style={styles.btnSubmit}
                    onPress={() => {
                        this.props.navigation.navigate("Home");
                    }}>
                    <Text style={styles.submitText}>Ir para página Inicial</Text>
                </TouchableOpacity>
            </View>
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
        marginBottom: 100,
        fontWeight: "bold",
    }
});