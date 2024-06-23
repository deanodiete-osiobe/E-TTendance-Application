import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const ViewAbsenteeAndDefaulterData = ({ route }) => {
  const { stats } = route.params;
  const { absentees, defaulters } = stats;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Absentees</Text>
        <FlatList
          data={absentees}
          keyExtractor={(item, index) => `${item.matric}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemLabel}>Matric Number:</Text>
              <Text>{item.matric}</Text>
              <Text style={styles.itemLabel}>First Name:</Text>
              <Text>{item.firstName}</Text>
              <Text style={styles.itemLabel}>Surname:</Text>
              <Text>{item.surname}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Defaulters</Text>
        <FlatList
          data={defaulters}
          keyExtractor={(item, index) => `${item.matric}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemLabel}>Matric Number:</Text>
              <Text>{item.matric}</Text>
              <Text style={styles.itemLabel}>First Name:</Text>
              <Text>{item.firstName}</Text>
              <Text style={styles.itemLabel}>Surname:</Text>
              <Text>{item.surname}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemLabel: {
    fontWeight: 'bold',
  },
});

export default ViewAbsenteeAndDefaulterData;
