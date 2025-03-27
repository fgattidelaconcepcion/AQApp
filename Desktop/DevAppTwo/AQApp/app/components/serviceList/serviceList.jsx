import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import ServiceItem from '../serviceItem/serviceItem';

const ServiceList = ({ itemList, handleModal }) => {
  return (
    <View style={styles.servicesContainer}>
      <FlatList
        keyExtractor={(service) => service.id.toString()}
        data={itemList}
        renderItem={({ item }) => (
          <ServiceItem item={item} handleModal={handleModal} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  servicesContainer: {
    marginTop: 15,
    paddingVertical: 10,
    width: "90%",
  },
});

export default ServiceList;
