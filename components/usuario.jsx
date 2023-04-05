import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Animated, PanResponder, Linking  } from 'react-native';

function Usuario(props) {
    const [text, setText] = useState('');
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent:"space-between" }} >
                <Image source={require('../assets/logo.png')} style={{ width: 80, height: 100, marginLeft: 10 }} />
                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    marginRight: 20,

                }}>
                    Nombre de la cancha
                </Text>
            </View>
            <View style={{ flex: 5 }} >
                <ScrollView  showsVerticalScrollIndicator={false}>
                <TextInput
                    style={styles.input}
                    onChangeText={setText}
                    value={text}
                    placeholder="Enter text"
                    editable={false} // Input inhabilitado
                />
                </ScrollView>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        marginTop: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        
      },
});

export default Usuario;