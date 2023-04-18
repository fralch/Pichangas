import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Cancha(props) {

  const navigation = useNavigation();

  const irCalendario = () => {
    navigation.navigate('Calendario', {id: 1});
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{flexDirection:"row", paddingVertical:10}} onPress={irCalendario}>
        <Image source={props.parametros.imagen}

        
                style={{ width: 130, height: 100 , marginLeft:5, borderRadius:10, borderWidth:3, borderColor:"white"}} 
        /> 
        <View style={{flexDirection:"column", padding:10, paddingTop:0}}>
            <Text style={{ fontSize:20, width:180, color:"#94C11C", fontWeight:"bold"}}>{props.parametros.titulo}</Text>
            <Text style={{}}>{props.parametros.direccion}</Text>
            <Text style={{}}>{props.parametros.horario}</Text>

        </View>



      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginVertical: 8,
        borderRadius: 10,
        marginHorizontal: 10,

      
    },
    text: {
        color: 'black',
        fontSize: 20,
    },
});

export default Cancha;