import React from 'react';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Styled components
import styled from 'styled-components/native';
import { colors } from '../components/colors';
const { primary, accent } = colors;

// Screens
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import Avatar from '../components/Buttons/Avatar';
import UserDashboard from '../screens/UserDashboard';
import AdminDashboard from '../screens/AdminDashboard';
import SupervisorDashboard from '../screens/SupervisorDashboard';
import AttendanceConfirmation from '../screens/AttendanceConfirmation';
import VerificationSuccessful from '../screens/VerificationSuccessful';
import VerificationFailed from '../screens/VerificationFailed';
import ManageCourses from '../screens/ManageCourses';
import ManageDepartments from '../screens/ManageDepartments';
import ManageVenues from '../screens/ManageVenues';
import ViewActivity from '../screens/ViewActivity';
import ViewAttendanceData from '../screens/ViewAttendanceData';
import ViewAbsenteeAndDefaulterData from '../screens/ViewAbsenteeAndDefaulters';
import AttendanceConfirmation2 from '../screens/AttendanceConfirmation2';



const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: primary,
          headerStyle: {
            height: 100,
            backgroundColor: accent,
            borderBottomWidth: 0,
            shadowColor: 'transparent',
            shadowOpacity: 0,
            elevation: 0,
          },
          headerLeftContainerStyle: {
            paddingLeft: 10,
          },
          headerRightContainerStyle: {
            paddingRight: 25,
          },
        }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerTitle: 'Forgot Password' }} />
        <Stack.Screen
          name="UserDashboard"
          component={UserDashboard}
          options={{
            headerTitle: 'Dashboard',
            headerStyle: {
              height: 100,
              backgroundColor: accent,
              borderBottomWidth: 0,
              shadowOpacity: 0,
              elevation: 0,
            },
            headerRight: () => <Avatar />,
          }}
        />
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{
            headerTitle: 'Dashboard',
            headerStyle: {
              height: 100,
              backgroundColor: accent,
              borderBottomWidth: 0,
              shadowOpacity: 0,
              elevation: 0,
            },
            headerRight: () => <Avatar />,
          }}
        />
        <Stack.Screen
          name="SupervisorDashboard"
          component={SupervisorDashboard}
          options={{
            headerTitle: 'Dashboard',
            headerStyle: {
              height: 100,
              backgroundColor: accent,
              borderBottomWidth: 0,
              shadowOpacity: 0,
              elevation: 0,
            },
            headerRight: () => <Avatar />,
          }}
        />
        <Stack.Screen
          name="AttendanceConfirmation"
          component={AttendanceConfirmation}
          options={{
            headerTitle: 'Confirmation',
            headerStyle: {
              height: 100,
              backgroundColor: accent,
              borderBottomWidth: 0,
              shadowOpacity: 0,
              elevation: 0,
            },
          }}
        />


<Stack.Screen
          name="AttendanceConfirmation2"
          component={AttendanceConfirmation2}
          options={{
            headerTitle: 'Confirmation',
            headerStyle: {
              height: 100,
              backgroundColor: accent,
              borderBottomWidth: 0,
              shadowOpacity: 0,
              elevation: 0,
            },
          }}
        />

        <Stack.Screen
          name="VerificationFailed"
          component={VerificationFailed}
          options={{
            headerTitle: 'Confirmation',
            headerStyle: {
              height: 100,
              backgroundColor: accent,
              borderBottomWidth: 0,
              shadowOpacity: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="VerificationSuccessful"
          component={VerificationSuccessful}
          options={{
            headerTitle: 'Confirmation',
            headerLeft: () => null,
            headerStyle: {
              height: 100,
              backgroundColor: accent,
              borderBottomWidth: 0,
              shadowOpacity: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="ManageVenues"
          component={ManageVenues}
          options={{
            headerTitle: 'Manage Exam Venues',
            headerStyle: {
              height: 100,
              backgroundColor: accent,
              borderBottomWidth: 0,
              shadowOpacity: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="ManageCourses"
          component={ManageCourses}
          options={{
            headerTitle: 'Manage Courses',
            headerStyle: {
              height: 100,
              backgroundColor: accent,
              borderBottomWidth: 0,
              shadowOpacity: 0,
             
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="ManageDepartments"
          component={ManageDepartments}
          options={{
            headerTitle: 'Manage Departments',
            headerStyle: {
              height: 100,
              backgroundColor: accent,
              borderBottomWidth: 0,
              shadowOpacity: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="ViewActivity"
          component={ViewActivity}
          options={{
            headerTitle: 'View Activity',
            headerStyle: {
              height: 100,
              backgroundColor: accent,
              borderBottomWidth: 0,
              shadowOpacity: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="ViewAttendanceData"
          component={ViewAttendanceData}
          options={{
            headerTitle: 'View Attendance Data',
            headerStyle: {
              height: 100,
              backgroundColor: accent,
              borderBottomWidth: 0,
              shadowOpacity: 0,
              elevation: 0,
            },
          }}
        />
        <Stack.Screen
          name="ViewAbsenteeAndDefaulterData"
          component={ViewAbsenteeAndDefaulterData}
          options={{
            headerTitle: 'View Absentee/Defaulter Data',
            headerStyle: {
              height: 100,
              backgroundColor: accent,
              borderBottomWidth: 0,
              shadowOpacity: 0,
              elevation: 0,
            },
          }}
        />




      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
