import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView,  } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

function CrearUsuario(props) {

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
                            
                            <TextInput style={[styles.input, , {width: '70%'}]} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 10,
                        }}>
                            <Text style={[styles.texto, {width: '30%'}]}>Correo</Text>
                            <TextInput style={[styles.input, , {width: '70%'}]} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 10,
                        }}>
                            <Text style={[styles.texto, {width: '30%'}]}>Telefono</Text>
                            <TextInput style={[styles.input, , {width: '70%'}]} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center",
                            justifyContent: "space-between",
                            
                        }}>
                            <Text style={[styles.texto, {width: '30%'}]} >Contraseña</Text>
                            <TextInput style={[styles.input, , {width: '70%'}]} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                            <Text style={[styles.texto, {width: '30%'}]} >Confirmar Contraseña</Text>
                            <TextInput style={[styles.input, , {width: '70%'}]} />
                        </View>
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
                            <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: '#fff' }}>Crear Usuario</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

            </View>
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