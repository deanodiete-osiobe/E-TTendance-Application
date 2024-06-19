import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { firebase } from '../firebase';

const ViewActivity = () => {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const activitySnapshot = await firebase.firestore().collection('login-activity').orderBy('timestamp', 'desc').limit(10).get();
        const activityList = activitySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setActivity(activityList);
      } catch (error) {
        console.error("Unable to fetch activity: ", error);
      }
    };

    fetchActivity();
  }, []);

  // Function to format timestamp from Firestore
  const formatTimestamp = timestamp => {
    // Check if timestamp exists and is a valid Firestore timestamp
    if (timestamp && timestamp.seconds) {
      return new Date(timestamp.seconds * 1000).toLocaleString();
    } else {
      return "Invalid Date";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Login Activity</Text>
      <FlatList
        data={activity}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.activityItem}>
            <Text>{item.email} logged in at {formatTimestamp(item.timestamp)}</Text>
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
  activityItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ViewActivity;
