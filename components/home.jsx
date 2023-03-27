import * as React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import Cancha from './cancha';

import { Ionicons } from '@expo/vector-icons';

function Home() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Aquí puedes agregar la lógica para realizar la búsqueda
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
        <Image source={{ uri: 'https://futbolcracks.com/wp-content/uploads/2020/04/logo_FUTBOLCRACKS.COM_4_20_AF_Mesa-de-trabajo-1.png' }}
          style={{ width: 80, height: 100 }} />
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
          <Cancha />
          <Cancha />
          <Cancha />
          <Cancha />
          <Cancha />
          <Cancha />
          <Cancha />
          <Cancha />
          <Cancha />
          <Cancha />
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

export default Home;