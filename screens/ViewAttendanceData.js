import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { firebase } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { colors } from "../components/colors";
import { Dropdown } from "react-native-element-dropdown";
const { primary, lightGray, accent } = colors;
import DateTimePicker from "@react-native-community/datetimepicker";

const screenWidth = Dimensions.get("window").width;

const ViewAttendanceData = () => {
  const navigation = useNavigation();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingStats, setLoadingStats] = useState(false);
  const [status, setStatus] = useState([]);
  const [invigilatorEmail, setInvigilatorEmail] = useState("");
  const [course, setCourse] = useState("");
  const [department, setDepartment] = useState("");
  const [dateString, setDateString] = useState("");
  const [timeString, setTimeString] = useState("");
  const [examVenue, setExamVenue] = useState("");
  const [error, setError] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [courseData, setCourseData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setDateString(currentDate.toLocaleDateString());
  };

  useEffect(() => {
    console.log('Stats', stats)
    const fetchDropdownOptions = async () => {
      setLoading(true);
      try {
        const coursesSnapshot = await firebase
          .firestore()
          .collection("Courses")
          .get();
        const courses = coursesSnapshot.docs.map((doc) => ({
          label: doc.data().course_name,
          value: doc.id,
        }));
        setCourseData(courses);

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
        console.log("Error fetching dropdown options:", error);
        setError("Failed to fetch dropdown options");
      } finally {
        setLoading(false);
      }
    };

    fetchDropdownOptions();
  }, []);

  const fetchExamHallStats = async () => {
    setLoadingStats(true);
    try {
      const statsSnapshot = await firebase
        .firestore()
        .collection("exam-hall-stats")
        .where("course", "==", course)
        .where("department", "==", department)
        .where("date", "==", dateString)
        .get();

      if (!statsSnapshot.empty) {
        const doc = statsSnapshot.docs[0];
        const data = doc.data();
        setStats(data);
        console.log('Here', stats)
        setDateString(data.date);
        setTimeString(data.time);
        setExamVenue(data.examVenue);
        setInvigilatorEmail(data.invigilatorEmail);
        let absenteeCount = 0;
        let defaulterCount = 0;
        let physicalStudentCount = 0;
        let sickstudentCount = 0;
        let studentsWithClashingCoursesCount = 0;



        statsSnapshot.docs.forEach((stat) => {
          absenteeCount = stat.data().absenteeCount ? parseInt(stat.data().absenteeCount) : 0;
          defaulterCount = stat.data().defaulterCount ? parseInt(stat.data().defaulterCount) : 0;
          sickstudentCount = stat.data().sickstudentCount ? parseInt(stat.data().sickstudentCount) : 0;
          studentsWithClashingCoursesCount = stat.data().clashingCoursesCount ? parseInt(stat.data().clashingCoursesCount) : 0;
          physicalStudentCount = parseInt(stat.data().physicalStudentCount);
        });

        const othersCount = physicalStudentCount - absenteeCount - defaulterCount - studentsWithClashingCoursesCount;


        const chartData = [
          { name: 'Absentees', population: absenteeCount, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
          { name: 'Defaulters', population: defaulterCount, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
          { name: 'Approved', population: othersCount, color: '#65FF00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
          { name: 'Sick students', population: sickstudentCount, color: '#0318fc', legendFontColor: '#7F7F7F', legendFontSize: 15 },
          { name: 'With clashing courses', population: studentsWithClashingCoursesCount, color: '#FF9900', legendFontColor: '#7F7F7F', legendFontSize: 8 },
        
        ];

        
        console.log("Chart", chartData)

        setPieData(chartData);
        setError(null)
      } else {
        setError("No matching document found");
      }
    } catch (error) {
      console.error("Error fetching exam hall stats:", error);
      setError("Failed to fetch exam hall stats");
    } finally {
      setLoadingStats(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }


  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(1, 1, 1, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{alignItems:"center"}} >
      {stats.length!=0&&(  
        <PieChart
        data={pieData}
        width={screenWidth}
        height={150}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        absolute
      />
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Course</Text>
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
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setCourse(item.label);
            setIsFocus(false);
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Department</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: accent }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          placeholder="Select Department"
          labelField="label"
          valueField="label"
          data={departmentData}
          isFocus={isFocus}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setDepartment(item.label);
            setIsFocus(false);
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Exam Date</Text>
        <TextInput
          style={styles.input}
          value={dateString}
          onPressIn={() => setShow(true)}
          placeholder="Select Exam Date"
        />
      </View>
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

      {stats.length!=0&&(<>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Exam Time</Text>
        <Text style={styles.input}>{timeString}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Exam Venue</Text>
        <Text style={styles.input}>{examVenue}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Invigilator Email</Text>
        <Text style={styles.input}>{invigilatorEmail}</Text>
        </View>
        </>
      )
}
      <TouchableOpacity style={styles.button} onPress={fetchExamHallStats}>
        {loadingStats==true?<ActivityIndicator size="large" color="#fff" />:<Text style={styles.buttonText}>Fetch Exam Hall Data</Text>}
      </TouchableOpacity>
      {
        error == "No matching document found" &&(
          <Text style={{color: "red"}}>No Data Found</Text>
        )
      }


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#fff",
    
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
  },
  chart: {
    marginVertical: 5,
    borderRadius: 16,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    width: 120
  },
  input: {
    borderBottomWidth: 1,
    borderColor: lightGray,
    padding: 20,
    fontSize: 14,
    backgroundColor: '#f2f2f2',
    width: screenWidth-180
  },
  dropdown: {
    height: 60,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: lightGray,
    width: screenWidth-180,
    backgroundColor: '#f2f2f2',
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  inputSearchStyle: {
    height: 50,
    fontSize: 14,
  },
  dateTimePicker: {
    backgroundColor: accent,
    borderTopColor: accent,
    borderTopWidth: 1,
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
});

export default ViewAttendanceData;
