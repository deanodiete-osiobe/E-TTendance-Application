import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { firebase } from '../firebase';
import MainContainer from '../components/Containers/MainContainer';
import RegularText from '../components/Texts/RegularText';
import RegularButton from '../components/Buttons/RegularButton';

const ManageUsers = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = await firebase.firestore().collection('Users').get();
        const usersList = usersCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <MainContainer>
        <ActivityIndicator size="large" color="#0000ff" />
      </MainContainer>
    );
  }

  if (error) {
    return (
      <MainContainer>
        <RegularText style={styles.errorText}>{error}</RegularText>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <RegularText style={styles.headerText}>Manage Users</RegularText>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.userText}>Name: {item.name}</Text>
            <Text style={styles.userText}>Email: {item.email}</Text>
          </View>
        )}
        ListEmptyComponent={<RegularText>No registered users found.</RegularText>}
      />
      <RegularButton onPress={() => navigation.goBack()}>Back</RegularButton>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userText: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ManageUsers;
