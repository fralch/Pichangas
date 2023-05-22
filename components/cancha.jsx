import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Cancha(props) {

  const navigation = useNavigation();

  const irCalendario = () => {
    navigation.navigate('Calendario', props.parametros);
  }

  const convertirFoto = (foto) => {
    if(foto){
      const foto_convertida=  JSON.parse(foto);
      const foto_url = "http://192.168.1.50:3000/uploads/"+foto_convertida[0].fotos;
      const imagen = {
        uri: foto_url,
        width: 130,
        height: 100
      };
    
      return imagen;
    }
  }      

  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{flexDirection:"row", paddingVertical:10}} onPress={irCalendario}>
        <Image source={convertirFoto(props.parametros.fotos)}
                style={{ width: 130, height: 100 , marginLeft:5, borderRadius:10, borderWidth:3, borderColor:"#94C11C"}} 
        /> 
        <View style={{flexDirection:"column", padding:10, paddingTop:0}}>
            <Text style={{ fontSize:20, width:180, color:"#94C11C", fontWeight:"bold"}}>{props.parametros.cancha}</Text>
            <Text style={{}}>{props.parametros.direccion}</Text>
            <Text style={{}}>{props.parametros.horario}</Text>

        </View>



      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
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