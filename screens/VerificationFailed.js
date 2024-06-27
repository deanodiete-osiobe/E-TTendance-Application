import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { colors } from '../components/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const { primary, accent} = colors;

const VerificationFailed = ({ onTryAgain }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="close-circle" size={100} color={accent} />
      <Text style={styles.errorMessage}>
        Error occurred during upload. Check your network connectivity and try again.
      </Text>
      <TouchableOpacity style={styles.tryAgainButton} onPress={onTryAgain}>
        <Text style={styles.tryAgainButtonText}>Try Again</Text>
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
  errorIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  errorMessage: {
    color: accent,
    fontSize: 25,
    marginBottom: 20,
    padding: 20,
    textAlign: 'center',
  },
  tryAgainButton: {
    backgroundColor: accent,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  tryAgainButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default VerificationFailed;
