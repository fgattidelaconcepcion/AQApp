import { useState } from 'react';
import { TextInput, Text, View, Button, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Modal} from 'react-native';

// Defino un ejemplo de servicios iniciales que mostraré en la aplicación
const servicesExample = [
  { id: 1, value: "Entrenamiento personalizado 1" },
  { id: 2, value: "Entrenamiento personalizado 2" },
  { id: 3, value: "Entrenamiento personalizado 3" },
  { id: 4, value: "Entrenamiento personalizado 4" },
  { id: 5, value: "Entrenamiento personalizado 5" },
  { id: 6, value: "Dieta de entrenamiento 1" },
  { id: 7, value: "Dieta de entrenamiento 2" },
  { id: 8, value: "Dieta de entrenamiento 3" },
  { id: 9, value: "Dieta de entrenamiento 4" },
  { id: 10, value: "Dieta de entrenamiento 5" },
];

export default function App() {
  const [textItem, setTextItem] = useState('');
  const [itemList, setItemList] = useState(servicesExample);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelected, setItemSelected] = useState({});

  const handleChangeText = (text) => {
    setTextItem(text);
  }

  const addItem = () => {
    setItemList(currentValue => [...currentValue, { id: Math.random().toString(), value: textItem }]);
    setTextItem("");
  }

  const handleDelete = () => {
    const filter = itemList.filter((item) => item.id !== itemSelected.id);
    setItemList(filter);
    setModalVisible(false);
  }

  const handleModal = (item) => {
    setItemSelected(item);
    setModalVisible(true);
  }

  const handleCancelModal = () => {
    setModalVisible(false);
  };

  return (
    <ImageBackground
      source={require('./assets/ImgFondo.jpg')}
      style={styles.contenedor}
      resizeMode="cover"
    >
      <View style={styles.header}>
        <Text style={styles.titulo}>AQFIT</Text>
      </View>
      
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

      <View style={styles.servicesContainer}>
        <FlatList
          keyExtractor={(service) => service.id.toString()}
          data={itemList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleModal(item)}
              style={styles.service}
            >
              <Text style={styles.serviceText}>{item.value}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    height: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 50,
    color: 'white',
  },
  input: {
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: '80%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  servicesContainer: {
    marginTop: 15,
    paddingVertical: 10,
    width: "90%",
  },
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
