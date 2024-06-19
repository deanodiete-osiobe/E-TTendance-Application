import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../components/colors';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../firebase';

const { primary, accent } = colors;

const SupervisorDashboard = () => {
  const navigation = useNavigation();
  
  const viewAttendanceData = () => {
    // Logic to navigate to view Attendance data

    navigation.navigate('ViewAttendanceData');
  };

  const viewAbsentAndDefaulterStudents = () => {
    // Logic to navigate to view Absentee screen
    navigation.navigate('ViewAbsenteeAndDefaulterData');
  };


  const ExportToSheets = () => {
    //Logic to navigate to export

    navigation.navigate('ExportToSheets');
  };

    




  return (
    <View style={styles.container}>
      {/* View Attendance Data button */}
      <TouchableOpacity style={styles.button} onPress={viewAttendanceData}>
        <Text style={styles.buttonText}>View Attendance Data</Text>
      </TouchableOpacity>

      {/* View Absentee button */}
      <TouchableOpacity style={styles.button} onPress={viewAbsentAndDefaulterStudents}>
        <Text style={styles.buttonText}>View Absentee and Defaulters</Text>
      </TouchableOpacity>

      {/* Export to Sheets Button */}
      <TouchableOpacity style={styles.button} onPress={ExportToSheets}>
        <Text style={styles.buttonText}>Export To Sheets</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: accent,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Adjust width as needed
    height: 80, // Adjust height as needed
    marginTop: 20, // Adjust margin top
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SupervisorDashboard;
