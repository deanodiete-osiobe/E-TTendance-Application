import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { firebase } from '../firebase';

const ViewActivity = () => {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const statusSnapshot = await firebase.firestore().collection('Status').get();
        const statusList = statusSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStatus(statusList);
      } catch (error) {
        console.error("Unable to fetch activity: ", error);
      }
    };

    fetchStatus();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={status}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.courseItem}>
            <Text>{item.name}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  courseItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ViewActivity;
