import React, {useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { colors } from '../components/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
const { primary, accent,success,fail } = colors;
import { firebase } from '../firebase';

const VerificationSuccessful = () => {
  const navigation= useNavigation();
  const onLogout = async() => {

    //clear user credentials
    firebase.auth().signOut().then(() => {
        console.log("User signed out");
        navigation.navigate('Login');

      }).catch((error) => {
        console.error("Error signing out: ", error);
      });

    



    
};
const isFocused = useIsFocused(); // Check if the screen is focused


useEffect(() => {
  // If the screen is not focused, navigate to the login page
  if (!isFocused) {
    navigation.navigate('Login');
  }
}, [navigation, isFocused]);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="check-circle" size={100} color={success} />
      <Text style={styles.successMessage}>
        Attendance uploaded successfully!
      </Text>
      <TouchableOpacity style={styles.logOutButton} onPress={onLogout}>
        <Text style={styles.logOutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  successMessage: {
    color: accent,
    fontSize: 25,
    marginBottom: 20,
    padding: 20,
    textAlign: 'center',
  },
  logOutButton: {
    backgroundColor: accent,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  logOutButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default VerificationSuccessful;
