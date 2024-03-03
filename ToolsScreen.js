import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";

const ToolsScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const tools = [
    { id: "1", title: "BMI Laskuri", screen: "BMICalculator" },
    { id: "2", title: "Vatupassi", screen: "Level" },
    { id: "3", title: "Nykyinen sijainti", screen: "Location" },
  ];

  const renderToolItem = ({ item }) => (
    <TouchableOpacity
      style={styles.toolItem}
      onPress={() => {
        setModalVisible(!modalVisible);
        navigation.navigate(item.screen);
      }}
    >
      <Text style={styles.toolItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.customButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.customButtonText}>Valitse työkalu</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <FlatList
            data={tools}
            renderItem={renderToolItem}
            keyExtractor={(item) => item.id}
          />
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.customButtonText}>Sulje</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#90bf91",
  },
  customButton: {
    backgroundColor: "#76987B",
    padding: 10,
    borderRadius: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  customButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [
      { translateX: -(Dimensions.get("window").width * 0.4) },
      { translateY: -100 },
    ],
    width: "80%",
    height: "auto",
  },
  toolItem: {
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 12,
  },
  toolItemText: {
    fontSize: 18,
  },
});

export default ToolsScreen;
