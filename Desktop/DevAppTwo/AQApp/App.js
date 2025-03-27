import { useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import Header from './app/components/header/header';
import ServiceInput from './app/components/serviceInput/serviceInput';
import ServiceList from './app/components/serviceList/serviceList';
import ServiceModal from './app/components/serviceModal/serviceModal';

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
      <Header />
      <ServiceInput textItem={textItem} handleChangeText={handleChangeText} addItem={addItem} />
      <ServiceList itemList={itemList} handleModal={handleModal} />
      <ServiceModal 
        modalVisible={modalVisible} 
        itemSelected={itemSelected} 
        handleDelete={handleDelete} 
        handleCancelModal={handleCancelModal} 
      />
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
});

