import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Animated, PanResponder  } from 'react-native';

import Cancha from './cancha';
import Calendario from './calendario';

import { Ionicons } from '@expo/vector-icons';

function Home() {
  const [searchQuery, setSearchQuery] = React.useState('');
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

  // Configuración del gesto de desplazamiento horizontal
  const panResponder = PanResponder.create({
    // Indicar que el gesto se activa al arrastrar el contenido
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return gestureState.dx !== 0 && gestureState.dy === 0;
    },

    // Indicar que el gesto se activa al soltar el contenido
    onPanResponderRelease: (evt, gestureState) => {
      // Si el desplazamiento horizontal es mayor a 100, mostrar el menú
      if (gestureState.dx > 10) {
        toggleMenu();
      }

      // Si el desplazamiento horizontal es menor a -100, ocultar el menú
      if (gestureState.dx < -10) {
        toggleMenu();
      }

      // Si el desplazamiento horizontal es menor a 100 y mayor a -100, restaurar la posición original
      if (gestureState.dx < 100 && gestureState.dx > -100) {
        Animated.parallel([
          Animated.timing(contentTranslateX, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(menuTranslateX, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }

      return true;
    }
  });

 
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

  return (
    <View style={styles.container}>
    <Animated.View
      style={[
        {
          flex: 1,
          flexDirection: 'column',
          transform: [{ translateX: contentTranslateX }]
        },
      ]}
      {...panResponder.panHandlers}
    >
        
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20 }}>Menú</Text>
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