import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, Dimensions } from 'react-native';
import { firebase } from '../firebase';
import { colors } from "../components/colors";
const { primary, lightGray, accent } = colors;
const screenWidth = Dimensions.get("window").width;

const ManageDepartments = () => {
  
    const [departments, setDepartments] = useState([]);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [newDeptName, setNewDeptName] = useState('');
    const [newDepartmentName, setNewDepartmentName] = useState('');
    const [creatingDepartment, setCreatingDepartment] = useState(false);
  
    useEffect(() => {
      const fetchDepartments = async () => {
        try {
          const departmentsSnapshot = await firebase.firestore().collection('Departments').get();
          const departmentsList = departmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setDepartments(departmentsList);
        } catch (error) {
          console.error("Error fetching departments: ", error);
        }
      };
  
      fetchDepartments();
    }, []);
  
    const handleEdit = (department) => {
      setEditingDepartment(department);
      setNewDeptName(department.dept_name);
    };
  
    const handleSaveEdit = async () => {
      if (editingDepartment) {
        try {
          await firebase.firestore().collection('Departments').doc(editingDepartment.id).update({
            dept_name: newDeptName,
          });
          setDepartments(departments.map(dept => dept.id === editingDepartment.id ? { ...dept, dept_name: newDeptName } : dept));
          setEditingDepartment(null);
          setNewDeptName('');
        } catch (error) {
          console.error("Error updating department: ", error);
        }
      }
    };
  
    const handleDelete = async (departmentId) => {
      try {
        await firebase.firestore().collection('Departments').doc(departmentId).delete();
        setDepartments(departments.filter(dept => dept.id !== departmentId));
      } catch (error) {
        console.error("Error deleting department: ", error);
      }
    };
    const handleCreateDepartment = async () => {
      if (newDepartmentName) {
        try {
          const newDepartment = {
            dept_name: newDepartmentName,
          };
          const docRef = await firebase.firestore().collection('Departments').add(newDepartment);
          setDepartments([...departments, { id: docRef.id, ...newDepartment }]);
          setNewDepartmentName('');
          setCreatingDepartment(false);
        } catch (error) {
          console.error("Error creating Department: ", error);
        }
      }
    };
  
    return (
      <>
       {creatingDepartment ? (
        <View style={styles.createForm}>
          <TextInput
            value={newDepartmentName}
            onChangeText={setNewDepartmentName}
            placeholder="Department Name"
            style={styles.input}
          />
          <Button title="Create" onPress={handleCreateDepartment} />
          <Button title="Cancel" onPress={() => setCreatingDepartment(false)} />
        </View>
      ) : (
        <Button title="Add New Department" onPress={() => setCreatingDepartment(true)} />
      )} 
      <View style={styles.container}>
        {editingDepartment && (
          <View style={styles.editForm}>
            <TextInput
              value={newDeptName}
              onChangeText={setNewDeptName}
              placeholder="Department Name"
              style={styles.input}
            />
            <Button color="#00B200" title="Save" onPress={handleSaveEdit} />
            <Button color="#B20000" title="cancel" onPress={() => setEditingDepartment(null)} />
          </View>
        )}
        <FlatList
          data={departments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.departmentItem}>
              <Text style={styles.label}>{item.dept_name}</Text>
              <Button color="#0000B2"  title="Edit" onPress={() => handleEdit(item)} />
              <Button  color="#B20000" title="Delete" onPress={() => handleDelete(item.id)} />
            </View>
          )}
        />
      </View>
      </>);
  };
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  
  departmentItem: {
    padding: 10,
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
});

export default ManageDepartments;
