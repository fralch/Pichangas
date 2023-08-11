import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';

function CanchaDetalle(props) {
    const [data_fotos, setData_fotos] = useState([
            { "descripcion": "esta es la descripcion", "fotos": "https://d2bqn2kyidxvh4.cloudfront.net/wp-content/uploads/2021/02/antapaccay-808x454.jpg" }, 
            { "descripcion": "Nueva descripción ", "fotos": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp01-QdJ8jHug8BhuLRp07L_Jwqfqz9G1o3C4XeJhszTO5votBKg1XkMbTtGbtSOOg0Go&usqp=CAU" }, 
            { "descripcion": "Descripción de las canchitas ", "fotos": "https://lostanos.com/wp-content/uploads/2019/06/Vista-Hilo.jpg" }, 
            { "descripcion": "Canchita deportiva de fútbol ", "fotos": "https://www.abc.com.py/resizer/-av8fIxAay5xcUlBoJpxMtK0vqo=/fit-in/770x495/smart/filters:format(webp)/arc-anglerfish-arc2-prod-abccolor.s3.amazonaws.com/public/RNJISPSCDZGDVOF2XPL44M2ETY.jpg" }
        ]);



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
                <ScrollView showsVerticalScrollIndicator={false}>

                    {
                        props.route.params.fotos != null ?
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
                                    <Image source={{ uri: "" + foto.fotos }} style={{ width: '95%', height: 200, marginLeft: 10 }} />
                                    <Text style={{ fontSize: 18, marginRight: 20, }}>{foto.descripcion}</Text>
                                </View>
                            ))
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
                                <Text style={{ fontSize: 18, marginRight: 20, }}>No hay fotos disponibles</Text>
                            </View>
                    }




                </ScrollView>

            </View>
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