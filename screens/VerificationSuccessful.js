import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { colors } from '../components/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const { primary, accent,success,fail } = colors;

const VerificationSuccessful = ({ onlogOut }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="check-circle" size={100} color={success} />
      <Text style={styles.successMessage}>
        Attendance uploaded successfully!
      </Text>
      <TouchableOpacity style={styles.logOutButton} onPress={onlogOut}>
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
