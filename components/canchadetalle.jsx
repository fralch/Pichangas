import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';

function CanchaDetalle(props) {

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent:"space-between" }} >
                <Image source={require('../assets/logo.png')} style={{ width: 80, height: 100, marginLeft: 10 }} />
                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    marginRight: 20,

                }}>
                    Nombre de la cancha
                </Text>
            </View>
            <View style={{ flex: 5 }} >
            <ScrollView  showsVerticalScrollIndicator={false}>
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
                    <Image source={{uri:"http://mail.mpi.gob.pe/images/Nota_706_VILLA_EL_EDEN_2.JPG"}} style={{ width: '95%', height: 200, marginLeft: 10 }} />
                    <Text style={{fontSize: 18, fontWeight: 'bold', marginRight: 20,}}>Sed ut perspiciatis unde</Text>
                    <Text style={{fontSize: 18,  marginRight: 20,}}>velit, sed quia non numquam</Text>

                </View>
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
                    <Image source={{uri:"http://mail.mpi.gob.pe/images/Nota_706_VILLA_EL_EDEN_2.JPG"}} style={{ width: '95%', height: 200, marginLeft: 10 }} />
                    <Text style={{fontSize: 18, fontWeight: 'bold', marginRight: 20,}}>Sed ut perspiciatis unde</Text>
                    <Text style={{fontSize: 18,  marginRight: 20,}}>velit, sed quia non numquam</Text>

                </View>
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
                    <Image source={{uri:"http://mail.mpi.gob.pe/images/Nota_706_VILLA_EL_EDEN_2.JPG"}} style={{ width: '95%', height: 200, marginLeft: 10 }} />
                    <Text style={{fontSize: 18, fontWeight: 'bold', marginRight: 20,}}>Sed ut perspiciatis unde</Text>
                    <Text style={{fontSize: 18,  marginRight: 20,}}>velit, sed quia non numquam</Text>

                </View>
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
                    <Image source={{uri:"http://mail.mpi.gob.pe/images/Nota_706_VILLA_EL_EDEN_2.JPG"}} style={{ width: '95%', height: 200, marginLeft: 10 }} />
                    <Text style={{fontSize: 18, fontWeight: 'bold', marginRight: 20,}}>Sed ut perspiciatis unde</Text>
                    <Text style={{fontSize: 18,  marginRight: 20,}}>velit, sed quia non numquam</Text>

                </View>
            </ScrollView>
               
            </View>
        </View>
    );

}
const styles = StyleSheet.create({
    container:   {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
   
});

export default CanchaDetalle;