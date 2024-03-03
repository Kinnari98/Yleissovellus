import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const WeatherDisplay = ({
  city,
  description,
  temperature,
  windSpeed,
  humidity,
  image,
}) => {
  return (
    <View style={styles.weatherCard}>
      <Text style={styles.text}>City: {city}</Text>
      <Text style={styles.text}>Description: {description}</Text>
      <View style={styles.row}>
        <Text style={styles.text}>Temperature: {temperature} °C</Text>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <Text style={styles.text}>Wind Speed: {windSpeed} m/s</Text>
      <Text style={styles.text}>Humidity: {humidity} %</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherCard: {
    backgroundColor: "#e6f2ff",
    padding: 20,
    borderRadius: 10,
    margin: 10,
    width: "95%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
});

export default WeatherDisplay;
