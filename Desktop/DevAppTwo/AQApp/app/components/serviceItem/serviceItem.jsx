import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const serviceItem = ({ item, handleModal }) => {
  return (
    <TouchableOpacity
      onPress={() => handleModal(item)}
      style={styles.service}
    >
      <Text style={styles.serviceText}>{item.value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  service: {
    alignItems: "center",
    backgroundColor: "#cccccc",
    borderRadius: 5,
    justifyContent: "center",
    marginVertical: 10,
    paddingVertical: 15,
  },
  serviceText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default serviceItem;
