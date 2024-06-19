import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../components/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { firebase } from '../firebase';

const { primary, accent } = colors;

const AttendanceConfirmation2 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { examData } = route.params;
  const [isUploadSuccessful, setUploadSuccessful] = useState(false);

  const handleConfirm = async () => {
    try {
      await firebase.firestore().collection('exam-hall-stats').add(examData);
      console.log('Data submitted successfully');
      console.log(examData);
      setUploadSuccessful(true);
      navigation.navigate('VerificationSuccessful');
    } catch (error) {
      console.error('Error submitting data:', error);
      setError('Failed to submit data');
      navigation.navigate('VerificationFailed');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.message}>
          Do you wish to upload? Once submitted, you cannot make changes.
        </Text>
        <TouchableOpacity
          style={[styles.confirmButton, isUploadSuccessful && styles.disabledButton]}
          onPress={handleConfirm}
          disabled={isUploadSuccessful}
        >
          <Text style={styles.confirmButtonText}>
            {isUploadSuccessful ? 'Confirmed' : 'Confirm'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primary,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: primary,
  },
  message: {
    color: accent,
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
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
  disabledButton: {
    backgroundColor: '#d3d3d3',
  },
});

export default AttendanceConfirmation2;
