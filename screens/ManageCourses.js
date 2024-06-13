
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, Dimensions } from 'react-native';
import { firebase } from '../firebase';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from "../components/colors";
const { primary, lightGray, accent } = colors;
const screenWidth = Dimensions.get("window").width;

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [newCourseName, setNewCourseName] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [creatingCourse, setCreatingCourse] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departmentsSnapshot = await firebase.firestore().collection('Departments').get();
        const departmentList = departmentsSnapshot.docs.map(doc => ({ id: doc.id, label: doc.data().dept_name }));
        setDepartments(departmentList);
        console.log("dep",departmentList)
      } catch (error) {
        console.error("Error fetching departments: ", error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      const fetchCourses = async () => {
        try {
          const coursesSnapshot = await firebase.firestore().collection('Courses').where('departmentId', '==', selectedDepartment.id).get();
          const coursesList = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCourses(coursesList);
        } catch (error) {
          console.error("Error fetching courses: ", error);
        }
      };

      fetchCourses();
    }
  }, [selectedDepartment]);

  const handleEdit = (course) => {
    setEditingCourse(course);
    setNewCourseName(course.name);
  };

  const handleSaveEdit = async () => {
    if (editingCourse) {
      try {
        await firebase.firestore().collection('Courses').doc(editingCourse.id).update({
          course_name: newCourseName,
        });
        setCourses(courses.map(course => course.id === editingCourse.id ? { ...course, name: newCourseName } : course));
        setEditingCourse(null);
        setNewCourseName('');
      } catch (error) {
        console.error("Error updating course: ", error);
      }
    }
  };

  const handleDelete = async (courseId) => {
    try {
      await firebase.firestore().collection('Courses').doc(courseId).delete();
      setCourses(courses.filter(course => course.id !== courseId));
    } catch (error) {
      console.error("Error deleting course: ", error);
    }
  };

  const handleCreateCourse = async () => {
    if (selectedDepartment && newCourseName) {
      try {
        const newCourse = {
          course_name: newCourseName,
          departmentId: selectedDepartment.id,
        };
        const docRef = await firebase.firestore().collection('Courses').add(newCourse);
        setCourses([...courses, { id: docRef.id, ...newCourse }]);
        setNewCourseName('');
        setCreatingCourse(false);
      } catch (error) {
        console.error("Error creating course: ", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholder="Select Department(s)"
        labelField="label"
        valueField="id"
        data={departments}
        isFocus={isFocus}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setSelectedDepartment(item);
          setIsFocus(false);
        }}
      />
      {creatingCourse ? (
        <View style={styles.createForm}>
          <TextInput
            value={newCourseName}
            onChangeText={setNewCourseName}
            placeholder="Course Name"
            style={styles.input}
          />
          <Button title="Create" onPress={handleCreateCourse} />
          <Button title="Cancel" onPress={() => setCreatingCourse(false)} />
        </View>
      ) : (
        <Button title="Add New Course" onPress={() => setCreatingCourse(true)} />
      )}
      {editingCourse && (
        <View style={styles.editForm}>
          <TextInput
            value={newCourseName}
            onChangeText={setNewCourseName}
            placeholder="Course Name"
            style={styles.input}
          />
          <Button color="#00B200" title="Save" onPress={handleSaveEdit} />
          <Button color="#B20000" title="Cancel" onPress={() => setEditingCourse(null)} />
        </View>
      )}
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.courseItem}>
            <Text style={styles.label}>{item.course_name}</Text>
            <Button color="#0000B2" title="Edit" onPress={() => handleEdit(item)} />
            <Button color="#B20000" title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#aaa',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  createForm: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  editForm: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  courseItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    borderColor: lightGray,
    padding: 15,
    fontSize: 14,
    backgroundColor: '#f2f2f2',
    width: screenWidth-180
  },

});

export default ManageCourses;
