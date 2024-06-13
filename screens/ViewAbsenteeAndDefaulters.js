import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from "react-native";
import { firebase } from "../firebase";
import { LineChart } from "react-native-chart-kit";
import { colors } from "../components/colors";
const { primary, lightGray, accent } = colors;

const screenWidth = Dimensions.get("window").width;

const ViewAbsenteeAndDefaulterData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [absenteeCounts, setAbsenteeCounts] = useState([]);
  const [defaulterCounts, setDefaulterCounts] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchExamHallStats = async () => {
      setLoading(true);
      try {
        const statsSnapshot = await firebase.firestore().collection("exam-hall-stats").get();
        
        if (!statsSnapshot.empty) {
          const dataMap = {};

          statsSnapshot.docs.forEach((doc) => {
            const data = doc.data();
            console.log('Data', data)
            const date = data.date;

            if (!dataMap[date]) {
              dataMap[date] = { absenteeCount: 0, defaulterCount: 0 };
            }

            dataMap[date].absenteeCount += data.absenteeCount || 0;
            dataMap[date].defaulterCount += data.defaulterCount || 0;
          });

          const absenteeData = [];
          const defaulterData = [];
          const dateLabels = [];

          Object.keys(dataMap).forEach((date) => {
            dateLabels.push(date);
            absenteeData.push(dataMap[date].absenteeCount);
            defaulterData.push(dataMap[date].defaulterCount);
          });

          setAbsenteeCounts(absenteeData);
          setDefaulterCounts(defaulterData);
          setDates(dateLabels);
          setError(null);
          
        } else {
          setError("No data found");
        }
      } catch (error) {
        console.error("Error fetching exam hall stats:", error);
        setError("Failed to fetch exam hall stats");
      } finally {
        setLoading(false);
      }
    };

    fetchExamHallStats();
  }, []);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
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
  const Absenteedata = {
    labels: dates,
    datasets: [
      {
        data: absenteeCounts,
        color: (opacity = 1) => `rgba(129, 53, 155, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Absentee Count"] // optional
  };
  const Defaulterdata = {
    labels: dates,
    datasets: [
      {
        data: defaulterCounts,
        color: (opacity = 1) => `rgba(129, 53, 155, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Defaulter Count"] // optional
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
        <Text style={styles.chartTitle}>Absentee Count</Text>
        <LineChart
        data={Absenteedata}
        width={screenWidth}
        height={256}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
        />

        <Text style={styles.chartTitle}>Defaulter Count</Text>
        <LineChart
        data={Defaulterdata}
        width={screenWidth}
        height={256}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
        />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
});

export default ViewAbsenteeAndDefaulterData;
