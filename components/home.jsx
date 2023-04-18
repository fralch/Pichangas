import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Animated, PanResponder, Linking  } from 'react-native';

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
  //-----------------------
        // Estado que indica si el menú está visible o no
        const [menuVisible, setMenuVisible] = useState(false);

        // Estados que indican los valores de desplazamiento horizontal del contenido y del menú
        const [contentTranslateX, setContentTranslateX] = useState(new Animated.Value(0));
        const [menuTranslateX, setMenuTranslateX] = useState(new Animated.Value(-200));

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
            style={{ height: 40, 
                    borderWidth: 2, 
                    borderColor: '#94C11C', 
                    width: "65%", 
                    backgroundColor: 'white', 
                    borderRadius: 10 }}
            placeholder="Buscar..."
            onChangeText={handleSearch}
            value={searchQuery}
          />
          <TouchableOpacity >
            <Ionicons name="search-circle" size={60} color="#94C11C" />
          </TouchableOpacity>

      </View>
      <View style={{ flex: 5}} >
        <ScrollView  showsVerticalScrollIndicator={false} >
          <Cancha parametros={parametros} />
          <Cancha parametros={parametros} />
          <Cancha parametros={parametros} />
          <Cancha parametros={parametros} />
          <Cancha parametros={parametros} />
          <Cancha parametros={parametros} />
          <Cancha parametros={parametros} />
         
        </ScrollView>
      </View>
    </Animated.View>
    <Animated.View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 100, transform: [{ translateX: menuTranslateX }] }}>
        <View style={{ flex: 1, justifyContent:"flex-start", alignItems: 'center', marginTop:35 }}>
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
          <Text style={{marginBottom: 20,marginTop: -20}}>Trabaja con</Text>
          <Text style={{marginBottom: 20,marginTop: -20}}>Nosotros</Text>


        </View>
      </Animated.View>
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

export default Home;