// Description: Componente que muestra el dia actual y las horas disponibles para reservar
import * as React from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    ScrollView, Image, TextInput, Picker, Button,
    Modal, Alert, Linking, Touchable
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native';
import { removeSesion, getSesion } from '../hooks/handleSession.js';

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';



function Calendario(props) {
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = React.useState(false);
    const [usuario, setUsuario] = React.useState({});
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



    React.useEffect(() => {
        const obtenerUsuario = async () => {
            const usuario = await getSesion();
            !usuario ? setUsuario({
                id: 1,
                nombre: 'Sin usuario',
                apellido: 'Alchourron',
                email: 'ingfralch@gmail.com',
                telefono: '961610362',

            }) :
                setUsuario(JSON.parse(usuario));

        }
        obtenerUsuario();
        console.log(usuario);
        // console.log(props.route.params);

        fetch('http://192.168.1.50:3000/horarios/diario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cancha_id: props.route.params.id,
                usuario_id: usuario.id ? usuario.id : 1,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                const horas_coincididas = horas.map((elemento) => {
                    const hora_coincide = json.find((hora) => hora.hora == elemento.hora);
                    if (hora_coincide) {
                        elemento.disponible = false;
                        elemento.data = hora_coincide;
                    }
                    return elemento;


                }
                );

                setHoras(horas_coincididas);

                // console.log(horas_coincididas);
            });
    }, []);

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
        // console.log(currentDate);
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

    const confirmarTurno = (id) => {
        fetch(`http://192.168.1.50:3000/horarios/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                estado: true,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                fetch('http://192.168.1.50:3000/horarios/diario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cancha_id: props.route.params.id,
                        usuario_id: usuario.id ? usuario.id : 1,
                    })
                })
                    .then((response) => response.json())
                    .then((json) => {
                        const horas_coincididas = horas.map((elemento) => {
                            const hora_coincide = json.find((hora) => hora.hora == elemento.hora);
                            if (hora_coincide) {
                                elemento.disponible = false;
                                elemento.data = hora_coincide;
                            }
                            return elemento;


                        }
                        );

                        setHoras(horas_coincididas);

                    });
            })
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

    const irCanchaDetalle = () => {
        const parametros = props.route.params;
        navigation.navigate('CanchaDetalle', parametros);
    }

    return (
        !usuario
            ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Cargando...</Text></View>
            :
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
                <TouchableOpacity style={{ flexDirection: "row" }} onPress={irCanchaDetalle} >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginRight: 10, marginTop: 20, marginBottom: 5 }} >Fotos de {props.route.params.cancha}</Text>
                    <AntDesign name="right" size={20} color="black" style={{ marginTop: 24 }} />
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
                                                onPress={() => { hora.disponible ? confirmarTurno(hora.data.id) : () => { } }}
                                            >
                                                {
                                                    hora.disponible ?
                                                        <AntDesign name="plussquare" size={40} color="#94C11C" />
                                                        :
                                                        <View style={{ alignItems: 'center' }} >
                                                            {hora.data.estado == true ? <AntDesign name="checkcircle" size={24} color="#94C11C" /> : <AntDesign name="clockcircleo" size={24} color="#94C11C" />}

                                                            {hora.data.estado == true ? <Text style={{ fontSize: 14 }} >Horario reservado</Text> : <Text style={{ fontSize: 14 }} >20 min para confirmar la reservación</Text>}
                                                            {hora.data.estado == true ? <></> : <Button onPress={() => { confirmarTurno(hora.data.id) }} title="CONFIRMAR" color={'#7ead00'} />}

                                                            {hora.data.estado == true ? <></> : <Button onPress={() => { confirmarTurno(hora.data.id) }} title="QUITAR" color={'#555'} />}
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
                        <View style={{ marginTop: '30%', backgroundColor: '#fff', padding: 16, elevation: 5, width: '80%', marginLeft: '10%', }}>

                            <Image source={require('../img/qr/qrFrank.jpg')}
                                style={{
                                    width: 300,
                                    height: 300,
                                    padding: 0,
                                    alignSelf: 'center',

                                }} />

                            <Text style={{ alignSelf: "center", textAlign: "center" }}>
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


