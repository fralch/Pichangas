import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { removeSesion, getSesion, storeSesion } from '../hooks/handleSession.js';
import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';

function CrearUsuario(props) {
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [validar, setValidar] = useState(false);
    const [datosCrearUsuario, setDatosCrearUsuario] = useState({
        nombre: '',
        email: '',
        telefono: '',
        password: '',
        password2: '',
        estado: 1,
    });

    const crearUser = () => {
        setValidar(false);
        const { password, password2 } = datosCrearUsuario;
        if (password === password2) {
            if (datosCrearUsuario.nombre === '') {
                console.log('El nombre es obligatorio');
                setValidar(true);
                return;
            }
            if (datosCrearUsuario.email === '') {
                console.log('El email es obligatorio');
                setValidar(true);
                return;
            }
            if (datosCrearUsuario.password === '') {
                console.log('La contraseña es obligatoria');
                setValidar(true);
                return;
            }
            if (datosCrearUsuario.password2 === '') {
                console.log('La confirmación de contraseña es obligatoria');
                setValidar(true);
                return;
            }

            fetch('http://192.168.1.50:3000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosCrearUsuario)
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
            storeSesion(JSON.stringify(datosCrearUsuario));
            navigation.navigate('Home');
        }else{
            console.log('Las contraseñas no son iguales');
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
                    Crear Usuario
                </Text>
            </View>
            <View style={{ flex: 5 }} >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: "space-between",
                        backgroundColor: '#fff',
                        margin: 10,
                        padding: 20,
                        borderRadius: 10,
                        shadowColor: "#000",
                        elevation: 5,
                        width: '90%',
                        alignSelf: 'center',
                    }}>
                            <View>
                                <TouchableOpacity style={{
                                    backgroundColor: '#94C11C',
                                    padding: 10,
                                    width: 100,
                                    height: 100,
                                    borderRadius: 100,
                                    marginBottom: 10,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                }}
                                >
                                    <FontAwesome name="user" size={44} color="white" style={{alignSelf: 'center'}} />
                                </TouchableOpacity>

                                </View>


                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 10,
                        }}>
                            <Text style={[styles.texto, {width: '30%'}]}>Nombres</Text>
                            
                            <TextInput style={[styles.input, , {width: '70%',  borderColor: validar ? 'red' : 'gray'},]} 
                                onChangeText={(text) => {
                                    setDatosCrearUsuario({
                                        ...datosCrearUsuario,
                                        nombre: text,
                                    })
                                }
                            } />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 10,
                        }}>
                            <Text style={[styles.texto, {width: '30%'}]}>Correo</Text>
                            <TextInput   keyboardType="email-address" style={[styles.input, , {width: '70%', borderColor: validar ? 'red' : 'gray'}]}   pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                             onChangeText={
                                (text) => {
                                    setDatosCrearUsuario({
                                        ...datosCrearUsuario,
                                        email: text,
                                    })
                                }
                             }
                             />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 10,
                        }}>
                            <Text style={[styles.texto, {width: '30%'}]}>Telefono</Text>
                            <TextInput  keyboardType='numeric' style={[styles.input, , {width: '70%'}]} 
                                placeholder='Opccional'
                                onChangeText={
                                    (text) => {
                                        setDatosCrearUsuario({
                                            ...datosCrearUsuario,
                                            telefono: text,
                                        })
                                    }
                                }
                            />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center",
                            justifyContent: "space-between",
                            
                        }}>
                            <Text style={[styles.texto, {width: '30%'}]} >Contraseña</Text>
                            <TextInput secureTextEntry  style={[styles.input, , {width: '70%',  borderColor: validar ? 'red' : 'gray'}]}  
                            onChangeText={
                                (text) => {
                                    setDatosCrearUsuario({
                                        ...datosCrearUsuario,
                                        password: text,
                                    })
                                }
                            }
                            />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                            <Text style={[styles.texto, {width: '30%'}]} >Confirmar Contraseña</Text>
                            <TextInput secureTextEntry  style={[styles.input, , {width: '70%', borderColor: validar ? 'red' : 'gray'}]} 
                             onChangeText={
                                (text) => {
                                    setDatosCrearUsuario({
                                        ...datosCrearUsuario,
                                        password2: text,
                                    })
                                }
                             } 
                             />
                        </View>
                        <TouchableOpacity style={{
                            backgroundColor: '#94C11C',
                            
                            padding: 10,
                            width: '100%',
                            borderRadius: 10,
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                            onPress={
                                () => { crearUser() }
                            }
                        >
                            <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: '#fff' }}>Crear Usuario</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{
                            backgroundColor: 'black',
                            padding: 10,
                            alignSelf: 'center',
                            width: '90%',
                            borderRadius: 10,
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                            onPress={
                                () => { setModalVisible(!modalVisible); }
                            }
                        >
                            <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: '#fff' }}>LOGIN</Text>
                        </TouchableOpacity>
                </ScrollView>
            </View>
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {}} >
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}>
                    <View style={{
                        backgroundColor: '#fff',
                        padding: 20,
                        width: '90%',
                        borderRadius: 10,
                    }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Login</Text>
                        <View style={{  justifyContent: 'space-between' }}>
                           {/* Crear Login */}
                            <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Correo</Text>
                            <TextInput style={styles.input} />
                            <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Contraseña</Text>
                            <TextInput secureTextEntry style={styles.input} />
                            <TouchableOpacity style={{
                                backgroundColor: '#94C11C',
                                padding: 10,
                                width: '100%',
                                borderRadius: 10,
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                                onPress={{}}
                            >
                                <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: '#fff' }}>Iniciar Sesión</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                backgroundColor: 'black',
                                padding: 10,
                                width: '100%',
                                borderRadius: 10,
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                                onPress={
                                    () => { setModalVisible(!modalVisible); }
                                }
                            >
                                <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: '#fff' }}>Cerrar</Text>
                            </TouchableOpacity>



                        </View>
                    </View>
                </View>
            </Modal>

                    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    texto: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },

    
});

export default CrearUsuario;