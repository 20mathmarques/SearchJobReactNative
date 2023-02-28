import {
  AppBar,
  HStack,
  TextInput,
  VStack,
  Button,
  Switch,
  ListItem,
} from "@react-native-material/core";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [experience, setExperience] = useState("");
  const [isRecruter, setIsRecruter] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = () => {
    setIsLoading(true);
    axios({
      method: "Post",
      url: "  http://localhost:3001/users",
      data: {
        name,
        email,
        year,
        password,
        jobDesc,
        experience,
        isRecruter,
        isCompany,
        image,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.warn(e);
        setError("");
      });
  };

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView>
      <VStack spacing={6} style={{ padding: 16 }}>
        <VStack spacing={1}>
          <Text style={styles.title}> Crie sua conta </Text>
        </VStack>
        <VStack spacing={6}>
        <VStack style={{padding:16}}>

          {Image ? (
            <Button
              style={styles.btnImage}
              tittle="adc photo"
              onPress={pickImage} 
              trailing={(props) => (
                <Icon
                  name="account-circle-outline"
                  size={24}
                  color="#7B88E8"
                  {...props}
                />
              )}
            />
          ) : (
            <Image source={{uri:image}} style={{ width: 40, height: 40 }} />
          )}
          </VStack>
          <TextInput
            label="Nome"
            variant="outlined"
            color="#7B88E8"
            inputContainerStyle={{ outline: "none" }}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            label="Idade"
            variant="outlined"
            value={year}
            onChangeText={setYear}
          />
          <TextInput
            label="E-mail"
            variant="outlined"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            label="Senha"
            variant="outlined"
            value={password}
            onChangeText={setPassword}
          />
          <HStack justify="between">
            <ListItem
              title="É recrutador?"
              trailing={
                <Switch
                  value={isRecruter}
                  onValueChange={() => setIsRecruter(!isRecruter)}
                  trackColor="#7B88E8"
                />
              }
              onPress={() => setIsRecruter(!isRecruter)}
            />

            <ListItem
              title="É empresa?"
              trailing={
                <Switch
                  value={isCompany}
                  onValueChange={() => setIsCompany(!isCompany)}
                  trackColor="#7B88E8"
                />
              }
              onPress={() => setIsCompany(!isCompany)}
            />
          </HStack>
        </VStack>
        <TextInput
          label="Descrição de Trabalho"
          variant="outlined"
          value={jobDesc}
          onChangeText={setJobDesc}
        />

        <TextInput
          label="Experiências"
          style={styles.TextArea}
          multiline={true}
          variant="outlined"
          value={experience}
          onChangeText={setExperience}
        />

        <HStack justify="between">
          <Button
            title="Login"
            variant="text"
            compact
            color="#7B88E8"
            onPress={goToLogin}
          />
          <Button
            title="Registrar-se"
            color="#7B88E8"
            tintColor="#fff"
            onPress={handleRegister}
          />
        </HStack>
      </VStack>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 19,
    color: "#7B88E8",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    fontWeight: "bold",
  },
  btnImage: {
    borderRadius: 50,
    height: 40,
    width: 40,
  },
});
