import * as React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

function Cancha() {
  return (
    <View style={styles.container}>
      <View style={{flexDirection:"row", paddingVertical:10}}>
        <Image  source={{ uri: 'https://portal.andina.pe/EDPfotografia/Thumbnail/2013/03/15/000205479W.jpg' }} 
                style={{ width: 130, height: 100 , marginLeft:5, borderRadius:10, borderWidth:3, borderColor:"white"}} 
        />
        <View style={{flexDirection:"column", padding:10}}>
            <Text style={{ backgroundColor:"#94C11C", fontSize:20, width:180, color:"white",
              borderWidth: 1,
              borderColor: '#94C11C',              
              paddingLeft:10,
          }}>Cancha 1</Text>
            <Text style={{}}>Calle 1</Text>
            <Text style={{}}>8:00am - 10:00pm</Text>

        </View>



      </View>
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