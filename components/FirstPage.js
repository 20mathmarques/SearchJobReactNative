import { VStack, Avatar, Button } from "@react-native-material/core";
import { SafeAreaView, StyleSheet, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Logo from "../assets/opportunity.png";

const FirstPage = () => {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={styles.container}>
      <VStack
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          style={styles.logo}
          color="#202542"
          size={150}
          image={{
            uri: "https://cdn-icons-png.flaticon.com/512/2986/2986624.png",
          }}
        />
        <Text style={styles.title}>Jobs</Text>
        <Text style={styles.Subtitle}>Ache seu Emprego da melhor forma. </Text>

        <Text style={styles.Subtitle}> Rápido e Fácil</Text>
      </VStack>

      <VStack justify="between" style={{ marginTop: 15 }}>
        <Button
          title="Login"
          variant="text"
          compact
          style={styles.btnLogin}
          onPress={goToLogin}
          color="#ffff"
        />
        <Button
          title="Registrar-se"
          variant="text"
          style={styles.btnRegister}
          onPress={goToRegister}
          color="#202542"
        />
      </VStack>
    </SafeAreaView>
  );
};

export default FirstPage;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#1F7AF2",
  },

  title: {
    fontSize: 35,
    fontWeight: 700,
    padding: 10,
    tintColor: "#202542",
  },

  Subtitle: {
    fontSize: 14,
    color: "#ffff",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    alignContent: "center",
    textAlign: "center",
    fontWeight: 500,
    margin: 15,
  },

  btnLogin: {
    borderRadius: 50 + "!important",
    backgroundColor: "#202542",
    marginBottom: 20,
    height: 50,
    width: 250,
    justifyContent: "center",
  },

  btnRegister: {
    height: 50,
    width: 250,
    justifyContent: "center",
    borderRadius: 10,

    borderBottomRightRadius: 100,
    marginTop: 20,
    backgroundColor: "#ffff",
  },
  logo: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
});
