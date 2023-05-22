import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert, Modal, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { AntDesign, FontAwesome } from '@expo/vector-icons';
function CanchaDetalle(props) {
    const [data_fotos, setData_fotos] = useState(JSON.parse(props.route.params.fotos));
    const [modalVisible, setModalVisible] = React.useState(false);
    const [descripcion, setDescripcionFotos] = React.useState(null);

    console.log(props.route.params);
    const selectImage = async () => {
        // Solicitar permiso al usuario para acceder a la galería de imágenes
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Se requiere permiso para acceder a la galería de imágenes.');
            return;
        }

        // Abrir la galería de imágenes para seleccionar una
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
            // La imagen ha sido seleccionada, puedes realizar la solicitud POST aquí
            uploadImage(result.uri);
        }
    };

    const uploadImage = async (imageUri) => {
        const apiUrl = `http://192.168.1.50:3000/canchas/fotos/${props.route.params.id}`;
        const formData = new FormData();

        // Agregar la imagen al formulario de datos
        formData.append('fotos', {
            uri: imageUri,
            type: 'image/jpeg', // o 'image/png', dependiendo del tipo de imagen
            name: 'image.jpg',
        });
        // Agregar la descripción al formulario de datos
        formData.append('descripcion', descripcion);
        // Realizar la solicitud POST a la API
        try {
            const response = await fetch(apiUrl, {
                method: 'PATCH',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Manejar la respuesta de la API
            if (response.ok) {
                // La imagen se ha subido correctamente
                console.log('Imagen subida con éxito.');
                setModalVisible(!modalVisible);
                Alert.alert('Imagen subida con éxito.');
            } else {
                // Hubo un error al subir la imagen
                console.log('Error al subir la imagen:', response.status);
            }
        } catch (error) {
            console.log('Error en la solicitud:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }} >
                <Image source={require('../assets/logo.png')} style={{ width: 80, height: 100, marginLeft: 10 }} />
                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    marginRight: 20,

                }}>
                    {props.route.params.cancha}
                </Text>
            </View>
            <View style={{ flex: 5 }} >
                {
                    props.route.params.fotos != null ?
                        <ScrollView showsVerticalScrollIndicator={false}>

                            {

                                data_fotos.map((foto, index) => (
                                    <View key={index} style={{
                                        flexDirection: 'column',
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        backgroundColor: '#fff',
                                        borderRadius: 10,
                                        margin: 10,
                                        padding: 10,
                                        elevation: 5,
                                    }}>
                                        <Image source={{ uri: "http://192.168.1.50:3000/uploads/" + foto.fotos }} style={{ width: '95%', height: 200, marginLeft: 10 }} />
                                        <Text style={{ fontSize: 18, marginRight: 20, }}>{foto.descripcion}</Text>
                                    </View>
                                ))
                            }
                        </ScrollView>
                        :
                        <View style={{
                            flexDirection: 'column',
                            alignItems: "center",
                            justifyContent: "space-between",
                            backgroundColor: '#fff',
                            borderRadius: 10,
                            margin: 10,
                            padding: 10,
                            elevation: 5,
                        }}>
                            <Text style={{ fontSize: 18, marginRight: 20, }}>No hay fotos para mostrar</Text>
                        </View>
                }

            </View>
            <TouchableOpacity
                onPress={() => {
                    setModalVisible(true);
                }}
                style={{
                    width: 50,
                    height: 50,
                    backgroundColor: '#94C11C',
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 20,
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                }}
            >
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={{  backgroundColor: '#fff', padding: 16, elevation: 5, width: '80%' }}>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                            placeholder="Descripción"
                            onChangeText={text => setDescripcionFotos(text)}
                        />

                        <TouchableOpacity style={{ backgroundColor: '#94C11C', padding: 10, borderRadius: 5, marginBottom: 10 }}
                            onPress={selectImage}
                        >
                            <Text style={{ color: '#fff', textAlign: 'center' }}>Agregar</Text>
                        </TouchableOpacity>


                        <Button
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                            title="Cerrar"
                            color={'#555'}

                        />
                    </View>

                </View>
            </Modal>
            
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparencia para oscurecer el fondo
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CanchaDetalle;