import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../components/colors';
import { useNavigation } from '@react-navigation/native';
import VerificationSuccessful from './VerificationSuccessful';
import VerificationFailed from './VerificationFailed';

const { primary, accent } = colors;

const AttendanceConfirmation = ({ onConfirm }) => {
  const navigation = useNavigation();

  const handleConfirm = () => {
    // Perform confirmation logic here
    const isUploadSuccessful = true; // Replace with your actual logic

    if (isUploadSuccessful) {
      navigation.navigate(VerificationSuccessful);
    } else {
      navigation.navigate(VerificationFailed);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Do you wish to upload? Once submitted, you cannot make changes.
      </Text>
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
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
  message: {
    color: accent,
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    padding: 20,
  },
  confirmButton: {
    backgroundColor: accent,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default AttendanceConfirmation;
