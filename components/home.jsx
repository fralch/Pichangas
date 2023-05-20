import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Animated, PanResponder, Linking, Modal, Alert } from 'react-native';

import Cancha from './cancha';
import Calendario from './calendario';
import { removeSesion, getSesion } from '../hooks/handleSession.js';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

function Home() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigation = useNavigation();
  const [canchas, setCanchas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  //-----------------------
  // Estado que indica si el menú está visible o no
  const [menuVisible, setMenuVisible] = useState(false);

  // Estados que indican los valores de desplazamiento horizontal del contenido y del menú
  const [contentTranslateX, setContentTranslateX] = useState(new Animated.Value(0));
  const [menuTranslateX, setMenuTranslateX] = useState(new Animated.Value(-200));

  // Nueva cancha 
  const [datos_cancha, setDatos_cancha] = useState({
    usuario: '',
    cancha: '',
    direccion: '',
    horario: '',
    email: '',
    telefono: '',
    password: '', 
    estado: true,
  });


  // Función que se ejecuta al hacer clic en el botón "Mostrar menú"
  const toggleMenu = () => {
    // Cambiamos el estado de "menuVisible"
    setMenuVisible(!menuVisible);

    // Creamos una animación que mueve el contenido y el menú horizontalmente
    Animated.parallel([
      // Animación que mueve el contenido
      Animated.timing(contentTranslateX, {
        toValue: menuVisible ? 0 : 100, // Si el menú está visible, el contenido se mueve a la posición 0. Si no, se mueve a la posición 200
        duration: 300, // Duración de la animación
        useNativeDriver: true, // Usar driver nativo para mejorar el rendimiento
      }),

      // Animación que mueve el menú
      Animated.timing(menuTranslateX, {
        toValue: menuVisible ? -100 : 0, // Si el menú está visible, se mueve a la posición -200. Si no, se mueve a la posición 0
        duration: 300, // Duración de la animación
        useNativeDriver: true, // Usar driver nativo para mejorar el rendimiento
      }),
    ]).start(); // Iniciar la animación
  };
  //------------------------

  const parametros = {
    titulo: 'Titulo de la canch',
    direccion: 'direccion de la cancha',
    horario: '8:00am - 10:00pm',
    imagen: require("../img/canchas/1.jpg"),
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Aquí puedes agregar la lógica para realizar la búsqueda
  };

  const openWhatsAppWithMessage = () => {
    let mensaje = ` 😁⚽ Tengo una cancha deportiva y quiero trabajar con ustedes 🥅 🏃🏻`;
    Linking.openURL('whatsapp://send?phone=961610362&text=' + mensaje);
  };

  const checkSesion = async () => {
    console.log("Checando sesion");
    const sesion = await getSesion();
    if (sesion == null) {
      navigation.navigate('CrearUsuario');
    } else {
      console.log("Hay sesion");
      navigation.navigate('Usuario');
    }
  };
  useEffect(() => {
    // accediendo a la api y obtener las canchas
    fetch('http://192.168.1.50:3000/canchas')
      .then((response) => response.json())
      .then((json) => {
        setCanchas(json);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        // setLoading(false);
      });
  }, []);

  const enviarDatosCancha = () => {
    // console.log(datos_cancha);
    fetch('http://192.168.1.50:3000/canchas',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos_cancha)
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      
      fetch('http://192.168.1.50:3000/canchas')
      .then((response) => response.json())
      .then((json) => {
        setCanchas(json);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        // setLoading(false);
      });
      
      setModalVisible(!modalVisible);
      Alert.alert(
        "Cancha creada",
        "La cancha se ha creado correctamente",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    
    }); 
  }


  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            flex: 1,
            flexDirection: 'column',
            transform: [{ translateX: contentTranslateX }]
          },
        ]}>

        <View style={{ flex: 1, flexDirection: 'row', alignItems: "center" }} >
          <TouchableOpacity onPress={toggleMenu}>
            <Image source={require('../assets/logo.png')} style={{ width: 80, height: 100 }} />
          </TouchableOpacity>
          <TextInput
            style={{
              height: 40,
              borderWidth: 2,
              borderColor: '#94C11C',
              width: "65%",
              backgroundColor: 'white',
              borderRadius: 10
            }}
            placeholder="Buscar..."
            onChangeText={handleSearch}
            value={searchQuery}
          />
          <TouchableOpacity >
            <Ionicons name="search-circle" size={60} color="#94C11C" />
          </TouchableOpacity>

        </View>
        <View style={{ flex: 5 }} >
          <ScrollView showsVerticalScrollIndicator={false} >
            {
              canchas.map((cancha, index) => (
                <Cancha key={index} parametros={cancha} />
              ))
            }

          </ScrollView>
        </View>
        {/* boton para agregar canchas */}
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#94C11C',
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
            position: 'absolute',
            bottom: 10,
            right: 10,
          }}
        >
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 100, transform: [{ translateX: menuTranslateX }] }}>
        <View style={{ flex: 1, justifyContent: "flex-start", alignItems: 'center', marginTop: 35 }}>
          <TouchableOpacity onPress={toggleMenu} style={{
            width: 100,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,

          }}>
            <AntDesign name="doubleright" size={24} color="#94C11C" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              checkSesion();
            }
            }

            style={{
              width: 50,
              height: 50,
              backgroundColor: '#94C11C',
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}

          >

            <AntDesign name="user" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{
            marginBottom: 20,
            marginTop: -20,

          }}>
            Usuario
          </Text>

          <TouchableOpacity
            onPress={() => {
              openWhatsAppWithMessage();
            }}
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#94C11C',
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,



            }} >
            <FontAwesome5 name="tools" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{ marginBottom: 20, marginTop: -20 }}>Trabaja con</Text>
          <Text style={{ marginBottom: 20, marginTop: -20 }}>Nosotros</Text>


        </View>
      </Animated.View>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { }} >
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
          <View style={{
            backgroundColor: '#fff',
            padding: 20,
            width: '90%',
            borderRadius: 10,
          }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Crear Empresa</Text>
            <View style={{ justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Usuario</Text>
              <TextInput style={styles.input}
                onChangeText={
                  (text) => {
                    setDatos_cancha({
                      ...datos_cancha,
                      usuario: text,
                    })
                  }}
              />
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Cancha</Text>
              <TextInput  style={styles.input}
                onChangeText={
                  (text) => {
                    setDatos_cancha({
                      ...datos_cancha,
                      cancha: text,
                    })
                  }}
              />
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Dirección</Text>
              <TextInput  style={styles.input}
                onChangeText={
                  (text) => {
                    setDatos_cancha({
                      ...datos_cancha,
                      direccion: text,
                    })
                  }}
              />
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Horario</Text>
              <TextInput  style={styles.input}
                onChangeText={
                  (text) => {
                    setDatos_cancha({
                      ...datos_cancha,
                      horario: text,
                    })
                  }}
              />
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Email</Text>
              <TextInput  style={styles.input}
                onChangeText={
                  (text) => {
                    setDatos_cancha({
                      ...datos_cancha,
                      email: text,
                    })
                  }}
              />
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Telefono</Text>
              <TextInput  style={styles.input}
                onChangeText={
                  (text) => {
                    setDatos_cancha({
                      ...datos_cancha,
                      telefono: text,
                    })
                  }}
              />
              <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Contraseña</Text>
              <TextInput secureTextEntry style={styles.input}
                onChangeText={
                  (text) => {
                    setDatos_cancha({
                      ...datos_cancha,
                      password: text,
                    })
                  }}
              />

              <TouchableOpacity style={{
                backgroundColor: '#94C11C',
                padding: 10,
                width: '100%',
                borderRadius: 10,
                marginTop: 10,
                marginBottom: 10,
              }}
                onPress={
                  () => { enviarDatosCancha()}
                }
              >
                <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: '#fff' }}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                backgroundColor: 'black',
                padding: 10,
                width: '100%',
                borderRadius: 10,
                marginTop: 10,
                marginBottom: 10,
              }}
                onPress={
                  () => { setModalVisible(!modalVisible); }
                }
              >
                <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: '#fff' }}>Cerrar</Text>
              </TouchableOpacity>



            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },

});

export default Home;