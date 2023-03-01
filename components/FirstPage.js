import {
    HStack,
    TextInput,
    VStack,
    Button,
    Switch,
    Avatar,
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
  
   
    const goToLogin = () => {
      navigation.navigate("Login");
    };
  
    const goToRegister = () => {
      navigation.navigate("Register");
    };
    return (
      <SafeAreaView style={styles.container}>
  
        <VStack >
          <Avatar image={{ uri:".../assets/opportunity.png"}} size={45}/>
          <Text style={styles.title}>
            Ache seu Emprego da melhor forma.
            Rápido e Fácil
          </Text>
        </VStack>
        
  
          <VStack justify="between" style={{ marginTop: 15 }}>
            <Button
              title="Login"
              variant="text"
              compact
              style={styles.btnLogin}
              onPress={goToLogin}
            />
            <Button
              title="Registrar-se"
              style={styles.btnRegister}
              onPress={goToRegister}
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
      backgroundColor: "#2744DB",
    },
  
    title: {
      fontSize: 14,
      color: "#ffff",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      fontWeight: "thin",
      margin: 20,
    },
  
  
    divBtnImage: {
      padding: 10,
      alignItems: "center",
    }
  });
  