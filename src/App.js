import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View,Button, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { CustomModal, CustomInput, AddItem } from './components/index';

export default function App() {
  /* ---------------------------------- HOOKS --------------------------------- */
  const [item, setItem] = useState('');
  const [itemList, setItemList] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const inputValue = item.trim();
  /* -------------------------------- FUNCTIONS ------------------------------- */
  const onChangeText = (text) => {
    setItem(text);
  };

  const addItem = () => {
    if (inputValue) {
      setItemList([
        ...itemList,
        {
          id: itemList.length + 1,
          value: item,
        },
      ]);
      setItem('');
    }
  };

  const onDeleteItem = (id) => {
    setItemList((currentItems) => currentItems.filter((item) => item.id !== id));
    setItemSelected({});
    setModalVisible(!modalVisible);
  };

  const onHandlerModal = (id) => {
    setItemSelected(itemList.find((item) => item.id === id));
    setModalVisible(!modalVisible);
  };
  const renderItem = ({ item }) => (
    <AddItem item={item} onHandlerModal={onHandlerModal} />
  )
  /* -------------------------------- APP COMP -------------------------------- */
  return (
    <SafeAreaView style={styles.container}>
      <CustomInput 
        item={item}
        onChangeText={onChangeText}
        placeholder='Enter item'
        onPressButton={addItem}
        inputValue={inputValue}
        buttonText='Add'
      />
     <View style={styles.itemList}>
      <FlatList 
        data={itemList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style
      />
     </View>
     <CustomModal animationType='fade' modalVisible={modalVisible} item={itemSelected} onDeleteItem={onDeleteItem} setModalVisible={setModalVisible}/>
        
    
    </SafeAreaView>
  );
}

/* --------------------------------- ESTILOS -------------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F0D8',
    paddingTop:50,
  },
  itemList: {
    backgroundColor: '#F2F0D8',
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 20,
  },
 
});
