import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import WeatherDisplay from "./WeatherDisplay";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ToolsScreen from "./ToolsScreen";
import BMICalculatorScreen from "./BMICalculatorScreen";
import LevelScreen from "./LevelScreen";
import NetInfo from "@react-native-community/netinfo";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const Stack = createNativeStackNavigator();

const Header = ({ inputCity, setInputCity, handleSubmitEditing }) => {
  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.headerText}>Weather App</Text>
      <TextInput
        style={styles.input}
        value={inputCity}
        onChangeText={setInputCity}
        placeholder="Enter city"
        onSubmitEditing={handleSubmitEditing}
      />
    </SafeAreaView>
  );
};

const WeatherScreen = ({ navigation }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Tampere");
  const [inputCity, setInputCity] = useState("");

  useEffect(() => {
    const checkConnection = async () => {
      const state = await NetInfo.fetch();
      if (!state.isConnected) {
        Alert.alert(
          "Ei internet-yhteyttä",
          "Tarkista internet-yhteytesi ja yritä uudelleen."
        );
      } else {
        fetchWeatherData();
      }
    };

    checkConnection();
  }, [city]);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        inputCity={inputCity}
        setInputCity={setInputCity}
        handleSubmitEditing={() => setCity(inputCity)}
      />
      {weatherData && (
        <WeatherDisplay
          city={weatherData.name}
          description={weatherData.weather[0].description}
          temperature={weatherData.main.temp}
          windSpeed={weatherData.wind.speed}
          humidity={weatherData.main.humidity}
          image={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
        />
      )}
      <TouchableOpacity style={styles.customButton} onPress={fetchWeatherData}>
        <Text style={styles.buttonText}>Päivitä</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.customButton}
        onPress={() => navigation.navigate("Tools")}
      >
        <Text style={styles.buttonText}>Siirry Työkaluihin</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={WeatherScreen}
          options={{ title: "Sää" }}
        />
        <Stack.Screen
          name="Tools"
          component={ToolsScreen}
          options={{ title: "Työkalut" }}
        />
        <Stack.Screen
          name="BMICalculator"
          component={BMICalculatorScreen}
          options={{ title: "BMI Laskuri" }}
        />
        <Stack.Screen
          name="Level"
          component={LevelScreen}
          options={{ title: "Vatupassi" }}
        />
        {/* Voit lisätä LocationScreen tai muita näkymiä tarpeen mukaan */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#90bf91",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#90bf91",
    width: "100%",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "white",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  customButton: {
    backgroundColor: "#76987B",
    padding: 10,
    borderRadius: 20,
    margin: 10,
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default App;
