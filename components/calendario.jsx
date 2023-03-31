// Description: Componente que muestra el dia actual y las horas disponibles para reservar
import * as React from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    ScrollView, Image, TextInput, Picker, Button,
    Modal, Alert, Linking, Touchable
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'


import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';



function Calendario() {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [dia, setDia] = React.useState('Lunes');
    const [horas, setHoras] = React.useState([
        { hora: '8:00', disponible: true, data: {} },
        { hora: '9:00', disponible: true, data: {} },
        { hora: '10:00', disponible: true, data: {} },
        { hora: '11:00', disponible: true, data: {} },
        { hora: '12:00', disponible: true, data: {} },
        { hora: '13:00', disponible: true, data: {} },
        { hora: '14:00', disponible: true, data: {} },
        { hora: '15:00', disponible: true, data: {} },
        { hora: '16:00', disponible: true, data: {} },
        { hora: '17:00', disponible: true, data: {} },
        { hora: '18:00', disponible: true, data: {} },
        { hora: '19:00', disponible: true, data: {} },
        { hora: '20:00', disponible: true, data: {} },
        { hora: '21:00', disponible: true, data: {} },
        { hora: '22:00', disponible: true, data: {} },
    ]);
    const [h, setH] = React.useState('');

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

    const reservarTurno = (h) => {
        console.log(h);
        setHoras(horas.map((hora) => {
            if (hora.hora === h) {
                hora.disponible = false;
                hora.data = {
                    fecha: dateToString(date),
                    hora: h,
                    cliente: 'Juan Perez',
                    telefono: '123456789',
                    email: 'ingfralch@gmail.com',
                    estado: 'pendiente'

                }
            }
            return hora;

        }));
    }
    const openWhatsAppWithMessage = () => {
        let mensaje = ` 😎⚽ Quisiera confirmar mi reservación 🥅 🏃🏻para el dia ${dateToString(date)} a las ${h}`;
        Linking.openURL('whatsapp://send?phone=961610362&text=' + mensaje);
      };
    
           
        const openYapeApp = async () => {
            try {
              await Linking.openURL('yape://app');
            } catch (error) {
              console.error('Error al abrir Yape', error);
            }
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
                <TouchableOpacity style={{flexDirection:"row"}}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginRight:10, marginTop:20, marginBottom:5 }} >Nombre CanchaDeportiva</Text>
                    <AntDesign name="right" size={20} color="black" style={{marginTop:24}} />
                </TouchableOpacity>
            <View style={{ flex: 5 }} >
                <ScrollView showsVerticalScrollIndicator={false} >
                    {
                        horas.map((hora, index) => {
                            return (
                                <View key={index} style={{ flex: 1, marginHorizontal: 5, padding: 10, marginVertical: 5 }} >
                                    <HorizontalLine />

                                    <View style={{
                                        flex: 1,
                                        backgroundColor: '#F2F2F2',
                                        borderRadius: 10,
                                        padding: 10,
                                    }}>
                                        <Text style={{ fontSize: 18 }} >{hora.hora}</Text>
                                        <TouchableOpacity
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            onPress={() => { reservarTurno(hora.hora); }}
                                        >
                                            {
                                                hora.disponible ?
                                                    <AntDesign name="plussquare" size={40} color="#94C11C" />
                                                    :
                                                    <View style={{ alignItems: 'center' }} >
                                                        {hora.data.estado == "confirmado" ? <AntDesign name="checkcircle" size={24} color="#94C11C" /> : <AntDesign name="clockcircleo" size={24} color="#94C11C" />}
                                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }} >{hora.data.cliente}</Text>


                                                        {hora.data.estado == "confirmado" ? <Text style={{ fontSize: 14 }} >Horario reservado</Text> : <Text style={{ fontSize: 14 }} >Tienes 1 hora para confirmar tu reservación</Text>}
                                                        <Button onPress={() => { setModalVisible(true); setH(hora.hora)}}title="Paga con YAPE" color={'#7ead00'}/>
                                                    </View>

                                            }

                                        </TouchableOpacity>

                                    </View>
                                </View>
                            )
                        })
                    }

                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{ marginTop: '30%', backgroundColor: '#fff', padding: 16 , elevation: 5, width:'80%', marginLeft:'10%', }}>
                        
                            <Image  source={require('../img/qr/qrFrank.jpg')} 
                                    style={{ width: 300, 
                                            height: 300, 
                                            padding: 0,
                                            alignSelf: 'center',
                                            
                                        }} />
                            
                            <Text style={{ alignSelf:"center", textAlign:"center"}}> 
                                Escanea el código QR con tu Yape y paga tu reservación
                            </Text>

                            <TouchableOpacity
                                onPress={() => {
                                    openWhatsAppWithMessage();
                                }}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: '#7ead00',
                                    padding: 10,
                                    borderRadius: 5,
                                    marginVertical: 10,
                                    elevation: 5,
                                }}
                            >
                              <Text style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 16,
                                marginRight: 10,
                                marginBottom: 2,
                                
                              }}>
                                <FontAwesome name="whatsapp" size={24} color="white" />  WhatsApp
                              </Text>
                            </TouchableOpacity>
                            
                            
                            <Button
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                                title="Cerrar"
                                color={'#555'}
                                
                            />
                      
                    </View>
                </Modal>
                
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


