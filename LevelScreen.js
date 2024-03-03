import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Accelerometer } from "expo-sensors";

export default function App() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    Accelerometer.setUpdateInterval(1000); // Päivittää datan joka sekunti

    const subscription = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);
    });

    return () => subscription.remove();
  }, []);

  const { width, height } = Dimensions.get("window");
  const isLandscape = width > height;

  return (
    <View
      style={[
        styles.container,
        { flexDirection: isLandscape ? "row" : "column" },
      ]}
    >
      <Text style={styles.sensorText}>Vatupassi:</Text>
      <Text style={styles.dataText}>x: {data.x.toFixed(3)}</Text>
      <Text style={styles.dataText}>y: {data.y.toFixed(3)}</Text>
      <Text style={styles.dataText}>z: {data.z.toFixed(3)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#90bf91",
  },
  sensorText: {
    fontSize: 30,
    color: "#ffffff",
    margin: 10,
  },
  dataText: {
    fontSize: 30,
    color: "#ffffff",
    margin: 5,
  },
});
