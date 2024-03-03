import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";

function BMICalculatorScreen({ navigation }) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");

  const calculateBMI = () => {
    Keyboard.dismiss();
    if (height && weight) {
      const h = height / 100;
      const w = weight;
      const bmiValue = (w / (h * h)).toFixed(2);
      setBmi(bmiValue);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Laskuri</Text>
      <TextInput
        style={styles.input}
        value={height}
        onChangeText={setHeight}
        placeholder="Pituus cm"
        keyboardType="numeric"
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        placeholder="Paino kg"
        keyboardType="numeric"
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.customButton} onPress={calculateBMI}>
        <Text style={styles.customButtonText}>Laske BMI</Text>
      </TouchableOpacity>
      {bmi ? <Text style={styles.result}>BMI: {bmi}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#90bf91",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#F0F0F0",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#F0F0F0",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: "#F0F0F0",
    backgroundColor: "#76987B",
  },
  customButton: {
    backgroundColor: "#76987B",
    padding: 10,
    borderRadius: 20,
    margin: 10,
    width: "60%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  customButtonText: {
    color: "white",
    fontSize: 18,
  },
  result: {
    fontSize: 20,
    marginVertical: 20,
    color: "#F0F0F0",
  },
});

export default BMICalculatorScreen;
