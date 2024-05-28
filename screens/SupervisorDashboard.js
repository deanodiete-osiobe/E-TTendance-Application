import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../components/colors';

const { primary, accent } = colors;

const SupervisorDashboard = () => {
  const viewAttendanceData = () => {
    // Logic to navigate to view Attendance data
  };

  const viewAbsentStudents = () => {
    // Logic to navigate to view Absentee screen
  };

  const viewDefaulters = () => {
    // Logic to navigate to view defaulters screen
  };

  const exportToSheets = () => {
    // Logic to export file to sheets
  };

  const logOut = () => {
    // Logic to return to Login Screen
  };

  return (
    <View style={styles.container}>
      {/* View Attendance Data button */}
      <TouchableOpacity style={styles.button} onPress={viewAttendanceData}>
        <Text style={styles.buttonText}>View Attendance Data</Text>
      </TouchableOpacity>

      {/* View Absentee button */}
      <TouchableOpacity style={styles.button} onPress={viewAbsentStudents}>
        <Text style={styles.buttonText}>View Absentee Students</Text>
      </TouchableOpacity>

      {/* View Defaulters button */}
      <TouchableOpacity style={styles.button} onPress={viewDefaulters}>
        <Text style={styles.buttonText}>View Defaulters</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.button} onPress={logOut}>
        <Text style={styles.buttonText}>Logout</Text>
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
