import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const serviceModal = ({ modalVisible, itemSelected, handleDelete, handleCancelModal }) => {
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.textContainer}>
          <Text>Estas seguro que queres borrar este servicio</Text>
        </View>
        <View style={styles.textContainer}>
          <Text>{itemSelected.value}</Text>
        </View>
        <View style={styles.btnContainer}>
          <Button title="Borrar" color="red" onPress={handleDelete} />
          <Button title="Cancelar" color="green" onPress={handleCancelModal} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    gap: 20,
  },
  textContainer: {
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "white",
    width: "80%",
    alignContent: "center",
    gap: 20,
    paddingVertical: 20,
    borderRadius: 8,
  },
});

export default serviceModal;
