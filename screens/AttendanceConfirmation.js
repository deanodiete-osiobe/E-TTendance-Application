import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../components/colors';
import { useNavigation } from '@react-navigation/native';
import VerificationSuccessful from './VerificationSuccessful';
import VerificationFailed from './VerificationFailed';
import { firebase } from '../firebase';
import { useRoute } from '@react-navigation/native';
import { FlatList } from 'react-native';

const { primary, accent } = colors;


const AttendanceConfirmation = () => {
  route = useRoute();
  const navigation = useNavigation();
  const [isUploadSuccessful, setUploadSuccessful] = useState(false);
  const {examData} = route.params;

  
  const handleConfirm = async () => {
  
    try {
      await firebase.firestore().collection('exam-hall-stats').add(examData);
      console.log('Data submitted successfully');
      setUploadSuccessful(true);
      navigation.navigate('VerificationSuccessful');
      
    } catch (error) {
      console.error('Error submitting data:', error);
      setError('Failed to submit data');
      navigation.navigate(VerificationFailed);
    }
  };
  const examDataArray = Object.entries(examData);

  function formatString(input) {
    if (!input || typeof input !== 'string') {
      return '';
    }
  
    // Capitalize the first letter of the string
    let formattedString = input.charAt(0).toUpperCase() + input.slice(1);
  
    // Add space before any uppercase letter that follows a lowercase letter
    formattedString = formattedString.replace(/([a-z])([A-Z])/g, '$1 $2');
  
    return formattedString;
  }
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('beforeRemove', (e) => {
  //     if (isUploadSuccessful) {
  //       e.preventDefault();
  //     }
  //   });

  //   return unsubscribe;
  // }, [navigation, isUploadSuccessful]);


  return (
    <View style={styles.container} >
      <FlatList
        data={examDataArray}
        keyExtractor={(item) => item[0]} // Use the key (property name) as the unique identifier
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemKey}>{formatString(item[0])+':'}</Text>
            <Text style={styles.itemValue}>{String(item[1])}</Text> 
          </View>
        )}
      />

      
        <Text style={styles.message}>
        Do you wish to upload? Once submitted, you cannot make changes.
      </Text>
      <TouchableOpacity style={[styles.confirmButton, isUploadSuccessful && styles.disabledButton]} onPress={handleConfirm} disabled={isUploadSuccessful}>
        <Text style={styles.confirmButtonText}>{isUploadSuccessful ? 'Confirmed' : 'Confirm'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
    
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
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemKey: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  itemValue: {
    flexShrink: 1,
  },
  disabledButton: {
    backgroundColor: '#d3d3d3',
  },
});

export default AttendanceConfirmation;
