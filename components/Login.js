import { VStack, Avatar, Button, TextInput } from "@react-native-material/core";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const goToHome = () => {
    axios({
      method: "Post",
      url: "http://localhost:3001/users",
      data: {
        email,
        password
      },
    }).then((res) => {
        console.log(res.data, "update profile res");
        alert(res.message)
        navigation.navigate("Home");

      }).catch((e) => {
        console.warn(e, "update profile error");
        alert(e.message);
      
    }).finally(() =>{
      setIsLoading(false)
    })
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
      </VStack>

      <VStack style={styles.content}>
        <TextInput
          label="E-mail"
          variant="standard"
          color="#202542"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          color="#202542"
          label="Senha"
          variant="standard"
          value={password}
          onChangeText={setPassword}
        />
      </VStack>

      <VStack justify="between" style={{ marginTop: 15 }}>
        <Button
          title="Entrar"
          variant="text"
          style={styles.btnLogin}
          onPress={goToHome}
          color="#ffff"
        />
        <Button
          title="Registrar-se"
          variant="text"
          style={styles.btnRegister}
          onPress={goToRegister}
          color="#202542"
        />
        <Button
          variant="outlined"
          title="Voltar"
          onPress={() => goToFirstPage()}
          color="#f1f1f1"
          style={{ marginTop: 20 }}
        />
      </VStack>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#1F7AF2",
  },

  title: {
    fontSize: 25,
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
    marginTop: 20,
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
  content: {
    backgroundColor: "#ffff",
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    width: "65%",
    padding: 10,
    marginTop: 30,
  },
});
