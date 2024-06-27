import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../components/colors";
const { primary, lightGray, accent } = colors;
import { firebase } from "../firebase";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const UserDashboard = () => {
  const route = useRoute();
  const { invigilatorEmail } = route.params;
  const navigation = useNavigation();

  const [numberOfStudents, setNumberOfStudents] = useState("");
  const [isAbsenteesChecked, setIsAbsenteesChecked] = useState(false);
  const [isDefaultersChecked, setIsDefaultersChecked] = useState(false);
  const [absenteeCount, setAbsenteeCount] = useState("");
  const [defaulterCount, setDefaulterCount] = useState("");
  const [sickstudentCount, setSickstudentCount] = useState("");
  const [clashingCoursesCount, setClashingCoursesCount] = useState("");

  const [defaulters, setDefaulters] = useState([
    { matric: "", firstName: "", surname: "" },
  ]);
  const [absentees, setAbsentees] = useState([
    { matric: "", firstName: "", surname: "" },
  ]);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const today = new Date();
  const dateString = today.toLocaleDateString();
  const [timeString, setTimeString] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const [courseData, setCourseData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [venueData, setVenueData] = useState([]);
  const [course, setCourse] = useState("");
  const [department, setDepartment] = useState("");
  const [venues, setVenues] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [examPapersMadeEarly, setExamPapersMadeEarly] = useState(null);
  const [studentsWithClashingCourses, setStudentsWithClashingCourses] =
    useState(null);
  const [studentFellSick, setStudentFellSick] = useState(null);

  const [adequateInvigilators, setAdequateInvigilators] = useState(null);
  // const [delayEncountered, setDelayEncountered] = useState(null);
  //const [examMonitoringTeamVisited, setExamMonitoringTeamVisited] =
  useState(null);
  const [physicalStudentCount, setPhysicalStudentCount] = useState("");
  const [lightingBrightEnough, setLightingBrightEnough] = useState(null);
  const [seatsWellSpaced, setSeatsWellSpaced] = useState(null);
  const [examHallClean, setExamHallClean] = useState(null);
  const [generalComment, setGeneralComment] = useState(null);
  const [examVenue, setExamVenue] = useState("");
  const currentDate = new Date();

  const fetchCourseData = async () => {
    try {
      const coursesSnapshot = await firebase
        .firestore()
        .collection("Courses")
        .get();
      const courses = coursesSnapshot.docs.map((doc) => ({
        label: doc.data().course_name,
        value: doc.id,
      }));
      console.log("Courses:", courses);
      setCourseData(courses);
    } catch (error) {
      console.log("Error", error);
      setError("Failed to fetch course data");
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartmentData = async () => {
    try {
      const departmentsSnapshot = await firebase
        .firestore()
        .collection("Departments")
        .get();
      const departments = departmentsSnapshot.docs.map((doc) => ({
        label: doc.data().dept_name,
        value: doc.id,
      }));
      setDepartmentData(departments);
    } catch (error) {
      setError("Failed to fetch department data");
    } finally {
      setLoading(false);
    }
  };

  const fetchVenueData = async () => {
    try {
      const venuesSnapshot = await firebase
        .firestore()
        .collection("Exam Venues")
        .get();
      const venues = venuesSnapshot.docs.map((doc) => ({
        label: doc.data().venue_name,
        value: doc.id,
      }));
      console.log("sample", venues);
      console.log(examData);
      setVenueData(venues);
    } catch (error) {
      setError("Failed to fetch exam venue data");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    if (mode === "date") {
  
    } else {
      setTimeString(
        currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const examData = {
    course,
    department,
    examVenue,
    isAbsenteesChecked,
    absenteeCount,
    sickstudentCount,
    isDefaultersChecked,
    defaulterCount,
    defaulters,
    absentees,
    date: dateString,
    time: timeString,
    examPapersMadeEarly,
    studentsWithClashingCourses,
    studentFellSick,
    adequateInvigilators,
    // delayEncountered,
    clashingCoursesCount,
    //examMonitoringTeamVisited,
    physicalStudentCount,
    lightingBrightEnough,
    seatsWellSpaced,
    examHallClean,
    generalComment,
    invigilatorEmail,
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      navigation.navigate("AttendanceConfirmation", { examData });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleAbsenteeCountChange = (value) => {
    const count = parseInt(value) || 0;
    setAbsenteeCount(count);

    // Initialize or trim the absentees array based on count
    const newAbsentees = [...absentees];
    if (count > absentees.length) {
      for (let i = absentees.length; i < count; i++) {
        newAbsentees.push({ matric: "", firstName: "", surname: "" });
      }
    } else {
      newAbsentees.length = count;
    }
    setAbsentees(newAbsentees);
};



  const handleDefaulterCountChange = (value) => {
    const count = parseInt(value) || 0;
    setDefaulterCount(count);




    
    // Initialize or trim the defaulters array based on count
    const newDefaulters = [...defaulters];
    if (count > defaulters.length) {
      for (let i = defaulters.length; i < count; i++) {
        newDefaulters.push({ matric: "", firstName: "", surname: "" });
      }
    } else {
      newDefaulters.length = count;
    }
    setDefaulters(newDefaulters);


  };
  // Handle changes in individual defaulter fields
  const handleDefaulterChange = (index, field, value) => {
    const newDefaulters = [...defaulters];
    newDefaulters[index][field] = value;
    setDefaulters(newDefaulters);
  };

  // Handle changes in individual absentee fields
  const handleAbsenteeChange = (index, field, value) => {
    const newAbsentees = [...absentees];
    newAbsentees[index][field] = value;
    setAbsentees(newAbsentees);
  };



  useEffect(() => {
    fetchCourseData();
    fetchDepartmentData();
    fetchVenueData();
  }, []);
  return (
    <View style={styles.container}>
      {currentPage === 1 && (
        <>
          {loading ? (
            <ActivityIndicator size="small" color={accent} />
          ) : (
            <>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: accent }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                placeholder="Select Course"
                labelField="label"
                valueField="label"
                data={courseData}
                isFocus={isFocus}
                onFocus={() => {
                  setIsFocus(true);
                }}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setCourse(item.label);
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
                valueField="label"
                data={departmentData}
                isFocus={isFocus}
                onFocus={() => {
                  setIsFocus(true);
                }}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setDepartment(item.label);
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
              editable={false}
              placeholder={dateString}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Exam Time</Text>
            <TextInput
              style={styles.input}
              value={timeString}
              onFocus={() => showMode("time")}
              placeholder="Select Exam Time"
            />
          </View>
        </>
      )}

      {currentPage === 2 && (
        <ScrollView>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Exam Location</Text>

            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: accent }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              placeholder="Select Exam Venue"
              labelField="label"
              valueField="label"
              data={venueData}
              isFocus={isFocus}
              onFocus={() => {
                setIsFocus(true);
              }}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setExamVenue(item.label);
                console.log(item.value);
                setIsFocus(false);
              }}
            />
          </View>

        
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Are there any absentees?</Text>
            <RadioButton.Group
              onValueChange={(newValue) => setIsAbsenteesChecked(newValue)}
              value={isAbsenteesChecked}
            >
              <View style={styles.radioContainer}>
                <View style={styles.radioButton}>
                  <RadioButton value="yes" color={accent} />
                  <Text>Yes</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="no" color={accent} />
                  <Text>No</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.inputContainer}>
            {isAbsenteesChecked == "yes" && (
              <TextInput
                style={styles.input}
                value={String(absenteeCount)}
                onChangeText={handleAbsenteeCountChange}
                keyboardType="numeric"
                placeholder="Enter number of absentees"
              />
            )}
          </View>

          {absenteeCount > 0 &&
            isAbsenteesChecked === "yes" &&
            absentees.map((absentee, index) => (
              <View key={index} style={styles.inputContainer}>
                <Text style={{ fontWeight: "bold" }}>
                  Absentee No. {index + 1}
                </Text>
                <TextInput
                  style={styles.input}
                  value={absentee.matric}
                  onChangeText={(value) =>
                    handleAbsenteeChange(index, "matric", value)
                  }
                  placeholder="Matric Number"
                />
                <TextInput
                  style={styles.input}
                  value={absentee.firstName}
                  onChangeText={(value) =>
                    handleAbsenteeChange(index, "firstName", value)
                  }
                  placeholder="First Name"
                />
                <TextInput
                  style={styles.input}
                  value={absentee.surname}
                  onChangeText={(value) =>
                    handleAbsenteeChange(index, "surname", value)
                  }
                  placeholder="Surname"
                />
              </View>
            ))}


          <View style={styles.inputContainer}>
            <Text style={styles.label}>Are there any defaulters?</Text>
            <RadioButton.Group
              onValueChange={(newValue) => setIsDefaultersChecked(newValue)}
              value={isDefaultersChecked}
            >
              <View style={styles.radioContainer}>
                <View style={styles.radioButton}>
                  <RadioButton value="yes" color={accent} />
                  <Text>Yes</Text>
                </View>
                <View style={styles.radioButton}>
                  <RadioButton value="no" color={accent} />
                  <Text>No</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.inputContainer}>
            {isDefaultersChecked === "yes" && (
              <TextInput
                style={styles.input}
                value={String(defaulterCount)}
                onChangeText={handleDefaulterCountChange}
                keyboardType="numeric"
                placeholder="Enter number of defaulters"
              />
            )}
          </View>

          {defaulterCount > 0 &&
            isDefaultersChecked === "yes" &&
            defaulters.map((defaulter, index) => (
              <View key={index} style={styles.inputContainer}>
                <Text style={{ fontWeight: "bold" }}>
                  Defaulter No. {index + 1}
                </Text>
                <TextInput
                  style={styles.input}
                  value={defaulter.matric}
                  onChangeText={(value) =>
                    handleDefaulterChange(index, "matric", value)
                  }
                  placeholder="Matric Number"
                />
                <TextInput
                  style={styles.input}
                  value={defaulter.firstName}
                  onChangeText={(value) =>
                    handleDefaulterChange(index, "firstName", value)
                  }
                  placeholder="First Name"
                />
                <TextInput
                  style={styles.input}
                  value={defaulter.surname}
                  onChangeText={(value) =>
                    handleDefaulterChange(index, "surname", value)
                  }
                  placeholder="Surname"
                />
              </View>
            ))}

          {/* New Questions with Radio Buttons */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Were exam papers made available early enough?
            </Text>
            <RadioButton.Group
              onValueChange={(newValue) => setExamPapersMadeEarly(newValue)}
              value={examPapersMadeEarly}
            >
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
            <Text style={styles.label}>
              Did any student fall sick during the exam?
            </Text>
            <RadioButton.Group
              onValueChange={(newValue) => setStudentFellSick(newValue)}
              value={studentFellSick}
            >
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
          {studentFellSick === "yes" && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Number of sick students</Text>
              <TextInput
                style={styles.input}
                value={sickstudentCount}
                onChangeText={setSickstudentCount}
                keyboardType="numeric"
                placeholder="Enter number of sick students"
              />
            </View>
          )}
        </ScrollView>
      )}

      {currentPage === 3 && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Were there students with clashing course(s)?
            </Text>
            <RadioButton.Group
              onValueChange={(newValue) =>
                setStudentsWithClashingCourses(newValue)
              }
              value={studentsWithClashingCourses}
            >
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

          {studentsWithClashingCourses === "yes" && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Number of students with clashing courses
              </Text>
              <TextInput
                style={styles.input}
                value={clashingCoursesCount}
                onChangeText={setClashingCoursesCount}
                keyboardType="numeric"
                placeholder="Enter number of students with clashing courses"
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Were the number of invigilators allocated to the hall adequate?
            </Text>
            <RadioButton.Group
              onValueChange={(newValue) => setAdequateInvigilators(newValue)}
              value={adequateInvigilators}
            >
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
            <Text style={styles.label}>
              Was lighting in the hall bright enough?
            </Text>
            <RadioButton.Group
              onValueChange={(newValue) => setLightingBrightEnough(newValue)}
              value={lightingBrightEnough}
            >
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
            <Text style={styles.label}>
              Were the seats in the hall well-spaced?
            </Text>
            <RadioButton.Group
              onValueChange={(newValue) => setSeatsWellSpaced(newValue)}
              value={seatsWellSpaced}
            >
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
            <RadioButton.Group
              onValueChange={(newValue) => setExamHallClean(newValue)}
              value={examHallClean}
            >
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
        <Text
          style={styles.pageNumberText}
        >{`Page ${currentPage} of ${totalPages}`}</Text>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentPage < totalPages ? "Next" : "Submit"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};






const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
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
    height: 80,
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: lightGray,
    width: "100%",
  },
  placeholderStyle: {
    fontSize: 16, // Adjusted font size to 16
  },
  selectedTextStyle: {
    fontSize: 16, // Adjusted font size to 16
  },
  inputSearchStyle: {
    height: 40, // Adjusted height to 40
    fontSize: 16, // Adjusted font size to 16
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 11,
  },
  checkboxGroup: {
    flexDirection: "row",
    alignItems: "center",
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
    alignItems: "center",
    justifyContent: "space-between",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 19,
    position: "bottom",
  },
  pageNumberText: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 16,
  },
  errorText: {
    color: "red",
    marginTop: 10,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButton: {
    marginRight: 10,
    alignItems: "center",
    marginRight: 20,
  },
  radioLabel: {
    fontSize: 18,
  },
});

export default UserDashboard;
