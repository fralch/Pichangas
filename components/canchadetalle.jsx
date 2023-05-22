import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
function CanchaDetalle(props) {
    const [data_fotos, setData_fotos] = useState(JSON.parse(props.route.params.fotos));

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
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
    },

});

export default CanchaDetalle;