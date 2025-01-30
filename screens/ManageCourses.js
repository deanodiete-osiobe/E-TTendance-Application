import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { firebase } from '../firebase';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from "../components/colors";

const { accent } = colors;
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
      } catch (error) {
        console.error("Error fetching departments: ", error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (selectedDepartment) {
        try {
          const coursesSnapshot = await firebase.firestore().collection('Courses').where('departmentId', '==', selectedDepartment.id).get();
          const coursesList = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCourses(coursesList);
        } catch (error) {
          console.error("Error fetching courses: ", error);
        }
      } else {
        setCourses([]); // Clear courses if no department is selected
      }
    };

    fetchCourses();
  }, [selectedDepartment]);

  const handleEdit = (course) => {
    setEditingCourse(course);
    setNewCourseName(course.course_name);
  };

  const handleSaveEdit = async () => {
    if (editingCourse) {
      try {
        await firebase.firestore().collection('Courses').doc(editingCourse.id).update({
          course_name: newCourseName,
        });
        setCourses(courses.map(course => course.id === editingCourse.id ? { ...course, course_name: newCourseName } : course));
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
        style={[styles.dropdown, isFocus && { borderColor: accent }]}
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
            placeholderTextColor="#999"
            style={styles.input}
          />
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.createButton} onPress={handleCreateCourse}>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setCreatingCourse(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={() => setCreatingCourse(true)}>
          <Text style={styles.addButtonText}>Add New Course</Text>
        </TouchableOpacity>
      )}
      {editingCourse && (
        <View style={styles.editForm}>
          <TextInput
            value={newCourseName}
            onChangeText={setNewCourseName}
            placeholder="Course Name"
            placeholderTextColor="#999"
            style={styles.input}
          />
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setEditingCourse(null)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.courseItem}>
            <Text style={styles.label}>{item.course_name}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: '#f5f5f5',
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#fff', // White background color for the dropdown
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
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
    alignItems: 'center',
  },
  editForm: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    width: '100%',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#007bff', // Blue color for the button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#00B200',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#00B200',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#B20000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#B20000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#0000B2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ManageCourses;
