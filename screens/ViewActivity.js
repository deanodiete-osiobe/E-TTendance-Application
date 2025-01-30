import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { firebase } from '../firebase';

const ViewActivity = () => {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const activitySnapshot = await firebase.firestore().collection('exam-hall-stats').orderBy('uploaded_at', 'desc').limit(10).get();
        const activityList = activitySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setActivity(activityList);
      } catch (error) {
        console.error("Unable to fetch activity: ", error);
      }
    };

    fetchActivity();
  }, []);

  // Function to format timestamp from Firestore
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      weekday: 'long', // "Monday"
      year: 'numeric', // "2021"
      month: 'long', // "January"
      day: 'numeric', // "1"
      hour: '2-digit', // "01"
      minute: '2-digit', // "30"
      second: '2-digit', // "15"
      hour12: true // "AM/PM"
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent User Activity</Text>
      <FlatList
        data={activity}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.activityItem}>
            <Text style={{fontWeight: 'bold'}}>{formatDate(item.uploaded_at)}</Text>
            <Text>{item.invigilatorEmail} uploaded attendance for {item.course} in {item.examVenue}</Text>
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
