import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../components/colors';

const { primary, accent } = colors;

const AdminDashboard = () => {
  const handleManageVenues = () => {
    // Logic to navigate to manage venues screen
    navigation.navigate('ManageVenues');
  };

  const handleManageCourses = () => {
    // Logic to navigate to manage courses screen
    navigation.navigate('ManageCourses');
  };

  const handleManageDepartments = () => {
    // Logic to navigate to manage departments screen
    navigation.navigate('ManageDepartments');
  };

  const handleViewActivity = () => {
    // Logic to navigate to view activity screen
    navigation.navigate('ViewActivity');
  };

  

  return (
    <View style={styles.container}>
      
      {/* Manage Courses Button */}
      <TouchableOpacity style={styles.button} onPress={handleManageCourses}>
        <Text style={styles.buttonText}>Manage Courses</Text>
      </TouchableOpacity>

      {/* Manage Departments Button */}
      <TouchableOpacity style={styles.button} onPress={handleManageDepartments}>
        <Text style={styles.buttonText}>Manage Departments</Text>
      </TouchableOpacity>


{/* Manage Venues  Button */}
      {<TouchableOpacity style={styles.button} onPress={handleManageVenues}>
        <Text style={styles.buttonText}>Manage Venues</Text>
      </TouchableOpacity>}



      {/* View Activity Button */}
      <TouchableOpacity style={styles.button} onPress={handleViewActivity}>
        <Text style={styles.buttonText}>View Activity</Text>
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

  confirmButton: {
    backgroundColor: accent,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default AdminDashboard;
