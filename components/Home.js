import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from "axios";

export default function Home() {

  const [users, setUsers] = useState('')
  const [company, setCompany] = useState('')

  const Users = 'http://localhost:3001/users'
  const Company = '  http://localhost:3001/company'

  const getUsers = () => {
    axios.get(Users).then((response) => {
      setUsers(response?.data)
      console.log('response', response)
    });
  }

  const getCompany = () => {
    axios.get(Company).then((response) => {
      setCompany(response?.data)
      console.log('response', response)
    });
  }

  useEffect(() => {
    getUsers()
    getCompany()
  }, []);

  console.log('users', users)
  console.log('company', company)


  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <StatusBar style={styles.statusbar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusbar: {
    backgroundColor: '#000'

  }
});
