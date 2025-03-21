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

// Exporto la función App que es el componente principal de mi aplicación
export default function App() {
  // Inicializo el estado de varios valores que necesito en la aplicación
  const [textItem, setTextItem] = useState(''); // Para almacenar el texto ingresado
  const [itemList, setItemList] = useState(servicesExample); // Para almacenar la lista de servicios
  const [modalVisible, setModalVisible] = useState(false); // Para controlar la visibilidad del modal
  const [itemSelected, setItemSelected] = useState({}); // Para almacenar el servicio seleccionado

  // Esta función se llama cuando cambio el texto en el TextInput
  const handleChangeText = (text) => {
    console.log(text); // Imprimo el texto en la consola
    setTextItem(text); // Actualizo el estado del texto
  }

  // Esta función se llama para agregar un nuevo servicio a la lista
  const addItem = () => {
    // Agrego un nuevo servicio a la lista utilizando el texto ingresado
    setItemList(currentValue => [...currentValue, { id: Math.random().toString(), value: textItem }]);
    setTextItem(""); // Reinicio el campo de texto
  }

  // Esta función se llama para eliminar un servicio seleccionado
  const handleDelete = () => {
    console.log("borrar"); // Imprimo en la consola que se quiere borrar
    // Filtrado de la lista para quitar el servicio seleccionado
    const filter = itemList.filter((item) => item.id !== itemSelected.id);
    setItemList(filter); // Actualizo la lista de servicios
    setModalVisible(false); // Cierro el modal
  }

  // Esta función se llama cuando se selecciona un servicio para borrar
  const handleModal = (item) => {
    setItemSelected(item); // Almaceno el servicio seleccionado
    setModalVisible(true); // Muestro el modal de confirmación
  }

  // Esta función se llama para cancelar la acción en el modal
  const handleCancelModal = () => {
    setModalVisible(false); // Cierro el modal
  };

  // Retorno el JSX que representa la interfaz de mi aplicación
  return (
    <ImageBackground
      source={require('./assets/ImgFondo.jpg')} // Ruta de la imagen de fondo
      style={styles.contenedor} // Aplicación de estilos al contenedor
      resizeMode="cover" // Aseguro que la imagen cubra todo el fondo
    >
      {/* Header con el texto en la parte superior */}
      <View style={styles.header}>
        <Text style={styles.titulo}>AQFIT</Text> {/* Título de la aplicación */}
      </View>
      
      {/* TextInput para ingresar el nombre del servicio con fondo transparente y texto blanco */}
      <TextInput 
        value={textItem} // El valor del TextInput es el texto almacenado en el estado
        onChangeText={handleChangeText} // Se llama a esta función cuando cambia el texto
        style={styles.input} // Aplico estilos al TextInput
        placeholder='Escribe algo en el input' // Texto de marcador de posición
        placeholderTextColor='gray' // Color del marcador de posición
      />

      {/* Botón para agregar el servicio ingresado */}
      <Button
        title='Agregar servicios' // Texto del botón
        onPress={addItem} // Se llama a esta función al presionar el botón
        color='white' // Color del botón
      />

      <View style={styles.servicesContainer}>
        <FlatList
          keyExtractor={(service) => service.id.toString()} // Uso el ID como clave única para cada elemento
          data={itemList} // La lista de datos que quiero mostrar
          renderItem={({ item }) => (
            <TouchableOpacity // Hago que el elemento sea presionable
              onPress={() => handleModal(item)} // Llamo a esta función cuando se presiona el servicio
              style={styles.service} // Aplico estilos al servicio
            >
              <Text style={styles.serviceText}>{item.value}</Text> {/* Muestra el valor del servicio */}
            </TouchableOpacity>
          )}
        />
      </View>
        
      <View>
        {/* Muestra la lista de servicios (opcional, ya que también se muestra en el FlatList) */}
        {itemList.map((item) => (
          <View key={item.id}>
            <Text>{item.value}</Text>
          </View>
        ))}
      </View>

      {/* Modal para confirmar la eliminación del servicio */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.textContainer}>
            <Text>Estas seguro que queres borrar este servicio</Text> {/* Mensaje de confirmación */}
          </View>
          <View style={styles.textContainer}>
            <Text>{itemSelected.value}</Text> {/* Muestra el servicio seleccionado */}
          </View>
          <View style={styles.btnContainer}>
            <Button title="Borrar" color="red" onPress={handleDelete}/> {/* Botón para borrar el servicio */}
            <Button title="Cancelar" color="green" onPress={handleCancelModal} /> {/* Botón para cancelar la acción */}
          </View>
        </View>
      </Modal>

    </ImageBackground>
  );
}

// Estilos para los componentes de la aplicación
const styles = StyleSheet.create({
  contenedor: {
    flex: 1, // Permite que el contenedor ocupe todo el espacio disponible
    justifyContent: 'flex-start', // Alinea los componentes desde el principio
    alignItems: 'center', // Centra los componentes horizontalmente
    paddingVertical: 20, // Espaciado vertical
  },
  header: {
    height: 80, // Altura del header
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo del header con transparencia
    width: '100%', // Ancho del header
    justifyContent: 'center', // Centra el texto verticalmente
    alignItems: 'center', // Centra el texto horizontalmente
  },
  titulo: {
    fontSize: 50, // Tamaño de fuente del título
    color: 'white', // Color del texto
  },
  input: {
    color: 'white', // Color del texto del input
    borderBottomWidth: 1, // Ancho del borde inferior
    borderBottomColor: 'white', // Color del borde inferior
    width: '80%', // Ancho del input
    padding: 10, // Espaciado interno
    marginVertical: 10, // Espaciado vertical
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo del input con transparencia
  },
  servicesContainer: {
    marginTop: 15, // Margen superior
    paddingVertical: 10, // Espaciado vertical
    width: "90%", // Ancho del contenedor de servicios
  },
  service: {
    alignItems: "center", // Centra los elementos dentro del servicio
    backgroundColor: "#cccccc", // Color de fondo del servicio
    borderRadius: 5, // Bordes redondeados
    justifyContent: "center", // Centra los elementos verticalmente
    marginVertical: 10, // Margen vertical
    paddingVertical: 15, // Espaciado vertical interno
  },
  serviceText: {
    fontSize: 24, // Tamaño de fuente del texto del servicio
    fontWeight: "bold", // Estilo del texto
  },
  btnContainer: {
    flexDirection: "row", // Alinea los botones en fila
    gap: 20, // Espacio entre los botones
  },
  textContainer: {
    fontWeight: "bold", // Estilo de texto en negrita
  },
  modalContainer: {
    backgroundColor: "white", // Color de fondo del modal
    width: "80%", // Ancho del modal
    alignContent: "center", // Alinea el contenido
    gap: 20, // Espacio entre elementos dentro del modal
    paddingVertical: 20, // Espaciado vertical interno
    borderRadius: 8, // Bordes redondeados del modal
  },
});