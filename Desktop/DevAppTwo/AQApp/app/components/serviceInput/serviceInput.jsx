import React from 'react';
import { TextInput, Button, View, StyleSheet } from 'react-native';

const serviceInput = ({ textItem, handleChangeText, addItem }) => {
  return (
    <View>
      <TextInput 
        value={textItem}
        onChangeText={handleChangeText}
        style={styles.input}
        placeholder='Escribe algo en el input'
        placeholderTextColor='gray'
      />
      <Button
        title='Agregar servicios'
        onPress={addItem}
        color='white'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: '80%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default serviceInput;
