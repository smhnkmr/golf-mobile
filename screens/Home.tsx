import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
} from "react-native";

export default function Home({ navigation }: { navigation: any }) {
  const image = require("../assets/images/background-image.png");

  const loginClickHandler = () => {
    navigation.navigate("Booking");
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.title}>Eagle Club Systems</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={loginClickHandler}>
            <Text style={styles.buttonText}>Book Slots</Text>
          </Pressable>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
  },
  buttonContainer: {
    flex: 3,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: "#1ab394",
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
