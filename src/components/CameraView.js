import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform } from 'react-native'
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default class CameraView extends Component {
    state = {
        hasPermission: null,
        hasPermissionLibray: null,
        type: Camera.Constants.Type.back,
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        const hasPermissionLibray = await (await ImagePicker.requestMediaLibraryPermissionsAsync()).status;
        this.setState({ hasPermission: status === 'granted', hasPermissionLibray });
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
            let photo = await this.camera.takePictureAsync({
                quality: 0,
                base64: true,
            });
            const res = photo.base64.replace('data:image/png;base64,', '')

            this.props.navigation.navigate(this.props.route.params?.previousScreen, { imagemMaquina: res })
            this.props.route.params.onGoBack()
        }
    }

    render() {
        const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                base64: true,
                quality: 1,
            });

            let res = ''
            if (!result.cancelled) {
                if(Platform.OS === 'web') {
                    res = result.uri
                    var substring = res.indexOf('base64');
                    let num = substring  + 7
    
                    res = res.replace(res.substr(0, num), '')
                } else {
                    res = result.base64
                }
                this.props.navigation.navigate(this.props.route.params?.previousScreen, { imagemMaquina: res })
                this.props.route.params.onGoBack()
            }
        }

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

                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 20 }}>
                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                }}
                                onPress={pickImage}
                            >
                                <FontAwesome
                                    name="photo"
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
                    </Camera>
                </View>
            );
        }
    }
}