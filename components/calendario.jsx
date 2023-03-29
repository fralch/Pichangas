// Description: Componente que muestra el dia actual y las horas disponibles para reservar
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, 
        ScrollView, Image, TextInput, Picker, Button
    } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker'


function Calendario() {
    const [dia, setDia] = React.useState('Lunes');
    const [horas, setHoras] = React.useState(['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']);

    const [date, setDate] = React.useState(new Date());
    const [showDatePicker, setShowDatePicker] = React.useState(false);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    return (
        <View
            style={[
                styles.container,
                {
                    flexDirection: 'column',
                },
            ]}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: "center" }} >
           
                <Image source={require('../assets/logo.png')} style={{ width: 80, height: 100 }} />
            </View>
            <View style={{ flex: 5 }} >
                <ScrollView showsVerticalScrollIndicator={false} >
                <Button title="Select a date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}

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


