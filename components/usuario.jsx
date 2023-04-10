import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Animated, PanResponder, Linking } from 'react-native';

function Usuario(props) {
    const [text, setText] = useState('');
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }} >
                <Image source={require('../assets/logo.png')} style={{ width: 80, height: 100, marginLeft: 10 }} />
                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    marginRight: 20,

                }}>
                    Datos del Usuario
                </Text>
            </View>
            <View style={{ flex: 5 }} >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: '#fff',
                        margin: 10,
                        padding: 10,
                        borderRadius: 10,
                        shadowColor: "#000",
                        elevation: 5,
                        width: '70%',

                        alignSelf: 'center',
                    }}>
                        <Image source={{uri:"https://www.labsaenzrenauld.com/wp-content/uploads/2020/10/Perfil-hombre-ba%CC%81sico_738242395.jpg"}} style={{ width: 100, height: 100, marginBottom: 10, borderRadius: 50}} />
                        <Text style={styles.texto}><Text style={{ fontWeight: 'bold' }}>Nombre:</Text>  nombre de Usuario</Text>
                        <Text style={styles.texto}><Text style={{ fontWeight: 'bold' }}>Correo:</Text>  ingfralch@gmail.com</Text>
                        <Text style={styles.texto}><Text style={{ fontWeight: 'bold' }}>Telefono:</Text>  312 123 4567</Text>
                        
                        <TouchableOpacity style={{
                            backgroundColor: '#F2F2F2',
                            padding: 10,
                            width: '100%',
                            borderRadius: 10,
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                            onPress={{}}
                        >
                            <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>Cerrar Sesión</Text>
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
        backgroundColor: '#F2F2F2',
        marginTop: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,

    },
    texto: {
        fontSize: 15,
        marginBottom: 10,
    },

});

export default Usuario;