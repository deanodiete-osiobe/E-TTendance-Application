import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../components/colors';

const { primary, accent } = colors;

const AdminDashboard = () => {
  const handleManageUsers = () => {
    // Logic to navigate to manage users screen
  };

  const handleManageCourses = () => {
    // Logic to navigate to manage courses screen
  };

  const handleManageDepartments = () => {
    // Logic to navigate to manage departments screen
  };

  const handleViewActivity = () => {
    // Logic to navigate to view activity screen
  };

  const handleConfirmChanges = () => {
    // Logic to confirm changes and trigger backend actions
  };

  return (
    <View style={styles.container}>
      {/* Manage Users Button */}
      <TouchableOpacity style={styles.button} onPress={handleManageUsers}>
        <Text style={styles.buttonText}>Manage Users</Text>
      </TouchableOpacity>

      {/* Manage Courses Button */}
      <TouchableOpacity style={styles.button} onPress={handleManageCourses}>
        <Text style={styles.buttonText}>Manage Courses</Text>
      </TouchableOpacity>

      {/* Manage Departments Button */}
      <TouchableOpacity style={styles.button} onPress={handleManageDepartments}>
        <Text style={styles.buttonText}>Manage Departments</Text>
      </TouchableOpacity>

      {/* View Activity Button */}
      <TouchableOpacity style={styles.button} onPress={handleViewActivity}>
        <Text style={styles.buttonText}>View Activity</Text>
      </TouchableOpacity>

      {/* Confirm Changes Button */}
      <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirmChanges}>
        <Text style={styles.buttonText}>Confirm Changes</Text>
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
