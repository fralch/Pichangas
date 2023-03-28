// Description: Componente que muestra el dia actual y las horas disponibles para reservar
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput,Picker  } from 'react-native';


function Calendario() {
    const [dia, setDia] = React.useState('Lunes');
    const [horas, setHoras] = React.useState(['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']);

    const [selectedValue, setSelectedValue] = React.useState("");

    const opciones = [
        { label: 'Opción 1', value: 'opcion1' },
        { label: 'Opción 2', value: 'opcion2' },
        { label: 'Opción 3', value: 'opcion3' }
      ];

    return (
        <View
            style={[
                styles.container,
                {
                    flexDirection: 'column',
                },
            ]}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: "center" }} >
            <Picker
  selectedValue={selectedValue}
  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
>
  {opciones.map((opcion, index) => (
    <Picker.Item key={index} label={opcion.label} value={opcion.value} />
  ))}
</Picker>
                <Image source={require('../assets/logo.png')} style={{ width: 80, height: 100 }} />             
            </View>
            <View style={{ flex: 5 }} >
                <ScrollView showsVerticalScrollIndicator={false} >


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



export default Calendario;


