import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../components/colors';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../firebase';
import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
;


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


  const ExportToSheets = async () => {
    try {
      // Request permission to access a directory
      const { granted, directoryUri } = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!granted) {
        console.error('Permission not granted to access storage');
        return;
      }
  
      // Fetch data from Firestore
      const statsSnapshot = await firebase.firestore().collection('exam-hall-stats').get();
      const examHallStats = statsSnapshot.docs.map(doc => doc.data());
  
      // Create a new workbook and worksheet
      const ws = XLSX.utils.json_to_sheet(examHallStats);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'ExamHallStats');
  
      // Convert the workbook to a binary string
      const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
  
      // Define the file name
      const fileName = 'exam_hall_stats.xlsx';
      
      // Write the file to the chosen directory
      const contentUri = await FileSystem.StorageAccessFramework.createFileAsync(
        directoryUri,
        fileName,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
  
      await FileSystem.writeAsStringAsync(contentUri, wbout, { encoding: FileSystem.EncodingType.Base64 });
      console.log(`File written to ${contentUri}`);
  
      // Copy the file to a local URI
      const fileUri = FileSystem.documentDirectory + fileName;
      await FileSystem.copyAsync({ from: contentUri, to: fileUri });
  
      // Share the file
      await Sharing.shareAsync(fileUri);
      console.log(`File shared from ${fileUri}`);
  
    } catch (error) {
      console.error('Error exporting data to Excel:', error);
    }
  };
    




  return (
    <View style={styles.container}>
      {/* View Attendance Data button */}
      <TouchableOpacity style={styles.button} onPress={viewAttendanceData}>
        <Text style={styles.buttonText}>View Attendance Data</Text>
      </TouchableOpacity>

      {/* View Absentee button */}
      {/* <TouchableOpacity style={styles.button} onPress={viewAbsentAndDefaulterStudents}>
      <Text style={styles.buttonText}>View Absentee and Defaulters</Text>
      </TouchableOpacity> */}

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
