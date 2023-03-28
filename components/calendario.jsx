// Description: Componente que muestra el dia actual y las horas disponibles para reservar
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';


function Calendario() {
    const [dia, setDia] = React.useState('Lunes');
    const [horas, setHoras] = React.useState(['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']);
    
    return (
        <View style={styles.container}>
        <View style={{flexDirection:"row", paddingVertical:10}}>
            <View style={{flexDirection:"column", padding:10}}>
                <Text style={{ backgroundColor:"#94C11C", fontSize:20, width:180, color:"white",
                borderWidth: 1,
                borderColor: '#94C11C',              
                paddingLeft:10,
            }}>{dia}</Text>
                <Text style={{}}>{horas}</Text>
                <Text style={{}}>{horas}</Text>
    
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
        borderWidth: 3,
        borderColor: '#94C11C',
        backgroundColor: 'white',
        padding: 10,
    },
    text: {
        color: 'black',
        fontSize: 20,
    },

    
});
  


export default Calendario;


