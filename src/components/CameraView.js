import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default class CameraView extends Component {
    state = {
        hasPermission: null,
        type: Camera.Constants.Type.back,
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
    }

    handleCameraType = () => {
        const { cameraType } = this.state

        this.setState({
            cameraType:
                cameraType === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
        })
    }
    takePicture = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            console.log(photo)
            this.props.navigation.navigate('NewMaquina', {imagemMaquina : photo.base64})
        }
    }
    render() {
        const { hasPermission } = this.state
        if (hasPermission === null) {
            return <View />;
        } else if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 15 }} type={this.state.cameraType} 
                        ref={ref => {
                            this.camera = ref;
                        }}>
                    </Camera>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 20 }}>
                        <TouchableOpacity
                            style={{
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                            }}>
                            <Ionicons
                                name="ios-photos"
                                style={{ color: "#fff", fontSize: 40 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                            }}
                            onPress={() => this.takePicture()}>
                            <FontAwesome
                                name="camera"
                                style={{ color: "#fff", fontSize: 40 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                            }}
                            onPress={() => this.handleCameraType()}
                        >
                            <MaterialCommunityIcons
                                name="camera-switch"
                                style={{ color: "#fff", fontSize: 40 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}