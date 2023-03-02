import {
  HStack,
  TextInput,
  VStack,
  Button,
  Switch,
} from "@react-native-material/core";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, Image, View } from "react-native";
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
  const [hasGalleryPermission, sethasGalleryPermission] = useState(null);

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      sethasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>Sem permição para fotos</Text>;
  }

  const handleRegister = () => {
    setIsLoading(true);
    axios({
      method: "Post",
      url: "http://localhost:3001/users",
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
    }).then((res) => {
        console.log(res.data, "update profile res");
        alert(res.message)
        navigation.navigate("Login");

      }).catch((e) => {
        console.warn(e, "update profile error");
        alert(e.message);
      
    }).finally(() =>{
      setIsLoading(false)
    })

  };

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  const goToFirstPage = () => {
    navigation.navigate("FirstPage");
  };

  return (
    <SafeAreaView style={styles.container}>
      <VStack spacing={1}>
        <Text style={styles.title}> Crie sua conta </Text>
      </VStack>
      <VStack style={styles.divBtnImage}>
        {!image ? (
          <Button
            style={styles.btnImage}
            tittle="adc photo"
            onPress={() => pickImage()}
            trailing={() => (
              <Icon
                name="account-circle-outline"
                size={39}
                style={{ marginLeft: -20 }}
                color="#202542"
              />
            )}
          />
        ) : (
          <></>
        )}

        {Image && <Image source={{ uri: image }} style={styles.imagePerfil} />}
      </VStack>
      <VStack spacing={6} style={styles.content}>
        <VStack spacing={6}>
          <TextInput
            style={styles.textInput}
            label="Nome"
            variant="standard"
            color="#202542"
            inputContainerStyle={{ outline: "none" }}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.textInput}
            label="Idade"
            variant="standard"
            color="#202542"
            value={year}
            onChangeText={setYear}
          />
          <TextInput
            label="E-mail"
            inputStyle={styles.textInput}
            variant="standard"
            color="#202542"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.textInput}
            label="Senha"
            variant="standard"
            color="#202542"
            value={password}
            onChangeText={setPassword}
          />
          <HStack
            justify="between"
            style={{ padding: 10, alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: 15,
                alignItems: "center",
                textAlign: "center",
              }}
            >
              É recrutador?
            </Text>

            <Switch
              value={isRecruter}
              onValueChange={() => setIsRecruter(!isRecruter)}
              trackColor="#202542"
            />
            <Text style={{ fontSize: 15, alignItems: "center" }}>
              É empresa?
            </Text>
            <Switch
              value={isCompany}
              onValueChange={() => setIsCompany(!isCompany)}
              trackColor="#202542"
            />
          </HStack>
        </VStack>
        <TextInput
          style={styles.textInput}
          label="Descrição de Trabalho"
          variant="standard"
          value={jobDesc}
          color="#202542"
          onChangeText={setJobDesc}
        />

        <TextInput
          label="Experiências"
          style={styles.TextArea}
          numberOfLines={4}
          maxLength={40}
          editable
          variant="standard"
          value={experience}
          color="#202542"
          onChangeText={setExperience}
        />

        <HStack justify="between" style={{ marginTop: 15 }}>
          <Button
            title="Login"
            variant="text"
            compact
            color="#202542"
            onPress={goToLogin}
          />
          <Button
            title="Registrar-se"
            color="#202542"
            tintColor="#fff"
            onPress={handleRegister}
            loading={isLoading}
          />
        </HStack>
        <Button
          variant="outlined"
          title="Voltar"
          onPress={() => goToFirstPage()}
          color="#202542"
          style={{ marginTop: 20 }}
        />
      </VStack>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#1F7AF2",
  },

  title: {
    fontSize: 19,
    color: "#ffff",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    fontWeight: "thin",
    margin: 20,
  },

  btnImage: {
    borderTopStartRadius: 100,
    borderBottomEndRadius: 100,
    borderTopEndRadius: 100,
    borderBottomStartRadius: 100,

    backgroundColor: "#f1f1f1",
    height: 70,
    width: 70,
    alignItems: "flex-end",
    paddingTop: 13,
    alignContent: "center",
    textAlign: "center",
  },

  imagePerfil: {
    height: 100,
    width: 100,
    borderTopStartRadius: 100,
    borderBottomEndRadius: 100,
    borderTopEndRadius: 100,
    borderBottomStartRadius: 100,
  },

  divBtnImage: {
    padding: 10,
    alignItems: "center",
  },
  content: {
    backgroundColor: "#ffff",
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    width: "100%",
    padding: 15,
    flex: 1,
  },
});
