// Description: Componente que muestra el dia actual y las horas disponibles para reservar
import * as React from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    ScrollView, Image, TextInput, Picker, Button
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'


import { AntDesign } from '@expo/vector-icons';



function Calendario() {
    const [dia, setDia] = React.useState('Lunes');
    const [horas, setHoras] = React.useState([
        { hora: '8:00', disponible: true , data:{}},
        { hora: '9:00', disponible: true , data:{}},
        { hora: '10:00', disponible: true , data:{}},
        { hora: '11:00', disponible: true , data:{}},
        { hora: '12:00', disponible: true , data:{}},
        { hora: '13:00', disponible: true , data:{}},
        { hora: '14:00', disponible: true , data:{}},
        { hora: '15:00', disponible: true , data:{}},
        { hora: '16:00', disponible: true , data:{}},
        { hora: '17:00', disponible: true , data:{}},
        { hora: '18:00', disponible: true , data:{}},
        { hora: '19:00', disponible: true , data:{}},
        { hora: '20:00', disponible: true , data:{}},
        { hora: '21:00', disponible: true , data:{}},
        { hora: '22:00', disponible: true , data:{}},    
    ]);

    const [date, setDate] = React.useState(new Date());
    const [showDatePicker, setShowDatePicker] = React.useState(false);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
        console.log(currentDate);
    };

    const dateToString = (date) => {
        //crearte date to string large with format dd nameMonth yyyy    
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let nameMonth = '';
        let nameMonthObject = {
            1: 'ene',
            2: 'feb',
            3: 'mar',
            4: 'abr',
            5: 'may',
            6: 'jun',
            7: 'jul',
            8: 'ago',
            9: 'sep',
            10: 'oct',
            11: 'nov',
            12: 'dic'
        }
        let nameDayObject = {
            1: 'Lun',
            2: 'Mar',
            3: 'Mié',
            4: 'Jue',
            5: 'Vie',
            6: 'Sáb',
            0: 'Dom'

        }
        nameMonth = nameMonthObject[month];
        let nameDay = nameDayObject[date.getDay()];
        return `${nameDay}, ${day} de ${nameMonth} de ${year}`;

    };
    const HorizontalLine = () => {
        return <View style={styles.line} />;
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
                <Image source={require('../assets/logo.png')} style={{ width: 80, height: 100, marginLeft: 10 }} />
                <TouchableOpacity onPress={() => setShowDatePicker(true)}
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                    }}
                >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 10 }} >{dateToString(date)}</Text>
                    <AntDesign name="down" size={24} color="black" />
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="calendar"
                        onChange={handleDateChange}
                    />
                )}
            </View>
            <View style={{ flex: 5 }} >
                <ScrollView showsVerticalScrollIndicator={false} >
                    {
                        horas.map((hora, index) => {
                            return (
                                <View key={index} style={{ flex: 1, marginHorizontal: 5,  padding: 10, marginVertical: 5 }} >
                                    <HorizontalLine />
                                   
                                    <View style={{
                                        flex: 1,
                                        backgroundColor: '#F2F2F2',
                                        borderRadius: 10,
                                        padding: 10,
                                    }}>
                                         <Text style={{ fontSize: 18 }} >{ hora.hora}</Text>
                                            <TouchableOpacity
                                                style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <AntDesign name="plussquare" size={40} color="#94C11C" />

                                            </TouchableOpacity>
                                         
                                    </View>
                                </View>
                            )
                        })
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
    line: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: '90%',
        alignSelf: 'center',
        marginVertical: 10,
      },

});



export default Calendario;


