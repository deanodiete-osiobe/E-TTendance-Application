import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../components/colors';
import { useNavigation, useRoute } from '@react-navigation/native';

const { primary, accent } = colors;

const AttendanceConfirmation = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { examData } = route.params;
  const examDataArray = Object.entries(examData);

  function formatString(input) {
    if (!input || typeof input !== 'string') {
      return '';
    }
    let formattedString = input.charAt(0).toUpperCase() + input.slice(1);
    formattedString = formattedString.replace(/([a-z])([A-Z])/g, '$1 $2');
    return formattedString;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <FlatList
          data={examDataArray.filter(item => item[1] !== '' && item[1] !== null)}
          keyExtractor={(item) => item[0]}
          renderItem={({ item }) => (
            item[0] === 'defaulters' ? (
              <View style={styles.defaulterContainer}>
                <Text style={styles.itemKey}>{formatString(item[0]) + ':'}</Text>
                {item[1].length > 0 && item[1].map((defaulter, index) => (
                  <View key={index} style={styles.defaulterDetails}>
                    <Text style={{ color: 'red' }}>Defaulter No. {index + 1}</Text>
                    <Text style={styles.itemValue}>Matric Number: {defaulter.matric}</Text>
                    <Text style={styles.itemValue}>First Name: {defaulter.firstName}</Text>
                    <Text style={styles.itemValue}>Surname: {defaulter.surname}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.itemContainer}>
                <Text style={styles.itemKey}>{formatString(item[0]) + ':'}</Text>
                <Text style={styles.itemValue}>{String(item[1])}</Text>
              </View>
            )
          )}
        />
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => navigation.navigate('AttendanceConfirmation2', { examData })}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primary,
  },
  container: {
    flex: 1,
    backgroundColor: primary,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: colors.accent,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemKey: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  itemValue: {
    flexShrink: 1,
  },
  defaulterDetails: {
    paddingLeft: 10,
    paddingTop: 5,
  }
});

export default AttendanceConfirmation;
