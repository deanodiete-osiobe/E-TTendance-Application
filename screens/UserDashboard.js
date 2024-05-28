import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from 'react-native-check-box';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../components/colors';
const { primary, lightGray, accent } = colors;

const UserDashboard = () => {
  const navigation = useNavigation();

  const [numberOfStudents, setNumberOfStudents] = useState('');
  const [isAbsenteesChecked, setIsAbsenteesChecked] = useState(false);
  const [isDefaultersChecked, setIsDefaultersChecked] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateString, setDateString] = useState('');
  const [timeString, setTimeString] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const [courseData, setCourseData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [examPapersMadeEarly, setExamPapersMadeEarly] = useState(null);
  const [studentsWithClashingCourses, setStudentsWithClashingCourses] = useState(null);
  const [studentFellSick, setStudentFellSick] = useState(null);
  const [adequateInvigilators, setAdequateInvigilators] = useState(null);
  const [delayEncountered, setDelayEncountered] = useState(null);
  const [examMonitoringTeamVisited, setExamMonitoringTeamVisited] = useState(null);
  const [physicalStudentCount, setPhysicalStudentCount] = useState('');
  const [lightingBrightEnough, setLightingBrightEnough] = useState(null);
  const [seatsWellSpaced, setSeatsWellSpaced] = useState(null);
  const [examHallClean, setExamHallClean] = useState(null);
  const [GeneralComment, setGeneralComment]= useState(null);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const coursesSnapshot = await firestore.collection('courses').get();
      const courses = coursesSnapshot.docs.map(doc => ({
        label: doc.data().name,
        value: doc.id
      }));
      setCourseData(courses);
    } catch (error) {
      setError('Failed to fetch course data');
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartmentData = async () => {
    try {
      setLoading(true);
      const departmentsSnapshot = await firestore.collection('departments').get();
      const departments = departmentsSnapshot.docs.map(doc => ({
        label: doc.data().name,
        value: doc.id
      }));
      setDepartmentData(departments);
    } catch (error) {
      setError('Failed to fetch department data');
    } finally {
      setLoading(false);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    if (mode === 'date') {
      setDateString(currentDate.toLocaleDateString());
    } else {
      setTimeString(currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      navigation.navigate('AttendanceConfirmation');
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      {currentPage === 1 && (
        <>
          {loading ? (
            <ActivityIndicator size="large" color={accent} />
          ) : (
            <>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: accent }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                placeholder="Course Code"
                labelField="label"
                valueField="value"
                data={courseData}
                isFocus={isFocus}
                onFocus={() => {
                  setIsFocus(true);
                  fetchCourseData();
                }}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  console.log(item.value);
                  setIsFocus(false);
                }}
              />
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: accent }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                placeholder="Select Department(s)"
                labelField="label"
                valueField="value"
                data={departmentData}
                isFocus={isFocus}
                onFocus={() => {
                  setIsFocus(true);
                  fetchDepartmentData();
                }}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  console.log(item.value);
                  setIsFocus(false);
                }}
              />
            </>
          )}
          {error && <Text style={styles.errorText}>{error}</Text>}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Exam Date</Text>
            <TextInput
              style={styles.input}
              value={dateString}
              onFocus={() => showMode('date')}
              placeholder="Select Exam Date"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Exam Time</Text>
            <TextInput
              style={styles.input}
              value={timeString}
              onFocus={() => showMode('time')}
              placeholder="Select Exam Time"
            />
          </View>
        </>
      )}

      {currentPage === 2 && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Exam Location</Text>
            <TextInput
              style={styles.input}
              value={numberOfStudents}
              onChangeText={setNumberOfStudents}
              keyboardType="default"
              placeholder="Enter Venue"
            />
          </View>
          <View style={styles.checkboxContainer}>
      <View style={styles.checkboxGroup}>
        <CheckBox
          style={styles.checkbox}
          onClick={() => setIsAbsenteesChecked(!isAbsenteesChecked)}
          isChecked={isAbsenteesChecked}
          checkBoxColor={accent}
        />
        <Text style={styles.checkboxLabel}>Any absentees?</Text>
      </View>

      






            
          </View>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxGroup}>
              <CheckBox
                style={styles.checkbox}
                onClick={() => setIsDefaultersChecked(!isDefaultersChecked)}
                isChecked={isDefaultersChecked}
                checkBoxColor={accent}
              />
              <Text style={styles.checkboxLabel}>Any defaulters?</Text>
            </View>
          </View>

          {/* New Questions with Radio Buttons */}
      

<View style={styles.inputContainer}>
  <Text style={styles.label}>Did any student fall sick during the exam?</Text>
  <RadioButton.Group onValueChange={newValue => setStudentsWithClashingCourses(newValue)} value={studentsWithClashingCourses}>
    <View style={styles.radioContainer}>
      <View style={styles.radioButton}>
        <RadioButton value="yes" />
        <Text>Yes</Text>
      </View>
      <View style={styles.radioButton}>
        <RadioButton value="no" />
        <Text>No</Text>
      </View>
    </View>
  </RadioButton.Group>
</View>




        </>
      )}

      {currentPage === 3 && (
        <>


<View style={styles.inputContainer}>
  <Text style={styles.label}>Were there students with clashing course(s)?</Text>
  <RadioButton.Group onValueChange={newValue => setStudentFellSick(newValue)} value={studentFellSick}>
    <View style={styles.radioContainer}>
      <View style={styles.radioButton}>
        <RadioButton value="yes" />
        <Text>Yes</Text>
      </View>
      <View style={styles.radioButton}>
        <RadioButton value="no" />
        <Text>No</Text>
      </View>
    </View>
  </RadioButton.Group>
</View>
















<View style={styles.inputContainer}>
  <Text style={styles.label}>Did the exam monitoring team visit the hall?</Text>
  <RadioButton.Group onValueChange={newValue => setExamMonitoringTeamVisited(newValue)} value={examMonitoringTeamVisited}>
    <View style={styles.radioContainer}>
      <View style={styles.radioButton}>
        <RadioButton value="yes" />
        <Text>Yes</Text>
      </View>
      <View style={styles.radioButton}>
        <RadioButton value="no" />
        <Text>No</Text>
      </View>
    </View>
  </RadioButton.Group>
</View>


<View style={styles.inputContainer}>
  <Text style={styles.label}>Was lighting in the hall bright enough?</Text>
  <RadioButton.Group onValueChange={newValue => setLightingBrightEnough(newValue)} value={lightingBrightEnough}>
    <View style={styles.radioContainer}>
      <View style={styles.radioButton}>
        <RadioButton value="yes" />
        <Text>Yes</Text>
      </View>
      <View style={styles.radioButton}>
        <RadioButton value="no" />
        <Text>No</Text>
      </View>
    </View>
  </RadioButton.Group>
</View>



        </>
      )}

      {currentPage === 4 && (
        <>
         



<View style={styles.inputContainer}>
  <Text style={styles.label}>Were the seats in the hall well-spaced?</Text>
  <RadioButton.Group onValueChange={newValue => setseatsWellSpaced(newValue)} value={seatsWellSpaced}>
    <View style={styles.radioContainer}>
      <View style={styles.radioButton}>
        <RadioButton value="yes" />
        <Text>Yes</Text>
      </View>
      <View style={styles.radioButton}>
        <RadioButton value="no" />
        <Text>No</Text>
      </View>
    </View>
  </RadioButton.Group>
</View>
         





<View style={styles.inputContainer}>
  <Text style={styles.label}>Was the exam hall clean and tidy?</Text>
  <RadioButton.Group onValueChange={newValue => setExamHallClean(newValue)} value={examHallClean}>
    <View style={styles.radioContainer}>
      <View style={styles.radioButton}>
        <RadioButton value="yes" />
        <Text>Yes</Text>
      </View>
      <View style={styles.radioButton}>
        <RadioButton value="no" />
        <Text>No</Text>
      </View>
    </View>
  </RadioButton.Group>
</View>



<View style={styles.inputContainer}>
            <Text style={styles.label}>Physical Student Count</Text>
            <TextInput
              style={styles.input}
              value={physicalStudentCount}
              onChangeText={setPhysicalStudentCount}
              keyboardType="numeric"
              placeholder="Enter Student Count"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>General Comment</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Type your comment here"
              multiline={true}
              numberOfLines={4}
              onChangeText={setGeneralComment}
            />
          </View>
         
        </>
      )}





      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          headerTextContainerStyle={{ backgroundColor: accent }}
          style={styles.dateTimePicker}
        />
      )}

      <View style={styles.paginationContainer}>
        {currentPage > 1 && (
          <TouchableOpacity style={styles.button} onPress={handlePrevious}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.pageNumberText}>{`Page ${currentPage} of ${totalPages}`}</Text>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <
          Text style={styles.buttonText}>{currentPage < totalPages ? 'Next' : 'Submit'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 10,
    padding: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: lightGray,
    borderRadius: 5,
    padding: 15,
    fontSize: 16,
    backgroundColor: primary,
  },
  dropdown: {
    marginVertical: 8,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: lightGray,
    width: '100%',
  },
  placeholderStyle: {
    fontSize: 20,
  },
  selectedTextStyle: {
    fontSize: 20,
  },
  inputSearchStyle: {
    height: 50,
    fontSize: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 11,
  },
  checkboxGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginLeft: 10,
  },
  checkboxLabel: {
    fontSize: 19,
  },
  button: {
    backgroundColor: accent,
    paddingVertical: 20, // Increase the padding vertically
    paddingHorizontal: 20, // Increase the padding horizontally
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonText: {
    color: primary,
    fontSize: 16,
  },
  dateTimePicker: {
    backgroundColor: accent,
    borderTopColor: accent,
    borderTopWidth: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 19,
    position: 'bottom',
  },
  pageNumberText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 16,
  
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    marginRight: 10,
    alignItems: 'center',
    marginRight: 20,
  },
  radioLabel: {
    fontSize: 18,
  },
});

export default UserDashboard;
