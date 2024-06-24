import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../components/colors';
import { useNavigation, useRoute } from '@react-navigation/native';

const { primary, accent, secondary } = colors;

const AttendanceConfirmation = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { examData } = route.params;
  const examDataArray = Object.entries(examData);

  function formatString(input) {
    if (!input || typeof input !== 'string') {
      return '';
    }

    const replacements = {
      examPapersMadeEarly: 'Were the Exam Papers Made Early?',
      adequateInvigilators: 'Were there adequate invigilators in the exam hall?',
      physicalStudentCount: 'Physical Student Count',
      clashingCoursesCount: 'Students with Clashing Courses',
      studentFellSick: 'Did any students fall sick in the exam hall?',
      sickstudentCount: 'No. of sick students',
      absenteeCount: 'Absentees noted',
      isAbsenteesChecked: 'Were there any absentees?',
      isDefaultersChecked: 'Were there any defaulters?',
      lightingBrightEnough: 'Was the lighting bright enough?',
      seatsWellSpaced: 'Were the seats well spaced?',
      examVenue: 'Exam Venue',
      examHallClean: 'Was the exam hall clean',
      studentsWithClashingCourses: 'Were there students With clashing courses',
      invigilatorEmail: 'Invigilator Email'
    };

    if (replacements[input]) {
      return replacements[input];
    }

    let formattedString = input.replace(/([a-z])([A-Z])/g, '$1 $2');
    formattedString = formattedString.replace(/_/g, ' ');

    return formattedString.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <FlatList
          data={examDataArray.filter(item => item[1] !== '' && item[1] !== null)}
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => (
            item[0] === 'defaulters' ? (
              <View style={styles.defaulterContainer}>
                <Text style={styles.itemKey}>{formatString(item[0]) + ':'}</Text>
                {item[1].length > 0 && item[1].map((defaulter, index) => (
                  <View key={index} style={styles.defaulterDetails}>
                    <Text style={{ color: 'red' }}>Defaulter No. {index + 1}</Text>
                    <Text style={styles.itemValue}>Matric Number: {defaulter.matric}</Text>
                    <Text style={styles.itemValue}>First Name: {defaulter.firstName}</Text>
                    <Text style={styles.itemValue}>Surname: {defaulter.surname}</Text>
                  </View>
                ))}
              </View>
            ) : item[0] === 'absentees' ? (
              <View style={styles.absenteeContainer}>
                <Text style={styles.itemKey}>{formatString(item[0]) + ':'}</Text>
                {item[1].length > 0 && item[1].map((absentee, index) => (
                  <View key={index} style={styles.absenteeDetails}>
                    <Text style={{ color: 'blue' }}>Absentee No. {index + 1}</Text>
                    <Text style={styles.itemValue}>Matric Number: {absentee.matric}</Text>
                    <Text style={styles.itemValue}>First Name: {absentee.firstName}</Text>
                    <Text style={styles.itemValue}>Surname: {absentee.surname}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.itemContainer}>
                <Text style={styles.itemKey}>{formatString(item[0]) + ':'}</Text>
                <Text style={styles.itemValue}>{String(item[1])}</Text>
              </View>
            )
          )}
        />
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => navigation.navigate('AttendanceConfirmation2', { examData })}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
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
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    margin: 20,
  },
  confirmButton: {
    backgroundColor: accent,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemKey: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#000', // Black color for better contrast
  },
  itemValue: {
    flexShrink: 1,
    color: '#000', // Black color for better contrast
  },
  defaulterContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#ffe6e6',
    borderRadius: 5,
  },
  defaulterDetails: {
    paddingLeft: 10,
    paddingTop: 5,
    color: '#000', // Black color for better contrast
  },
  absenteeContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#e6f2ff',
    borderRadius: 5,
  },
  absenteeDetails: {
    paddingLeft: 10,
    paddingTop: 5,
    color: '#000', // Black color for better contrast
  },
});

export default AttendanceConfirmation;
