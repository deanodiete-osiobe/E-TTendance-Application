import React, { version } from 'react';


//React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// styled components
import styled from 'styled-components/native';
import { colors } from '../components/colors';
const { primary,accent,secondary,darkGray } = colors;

//screens
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import EmailVerification from '../screens/EmailVerification';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';
import Avatar from '../components/Buttons/Avatar';
import UserDashboard from '../screens/UserDashboard';
import AdminDashboard from '../screens/AdminDashboard';
import SupervisorDashboard from '../screens/SupervisorDashboard';
import AttendanceConfirmation from '../screens/AttendanceConfirmation';
import VerificationSuccessful from '../screens/VerificationSuccessful';
import VerificationFailed from '../screens/VerificationFailed';



const Stack = createStackNavigator();


    const RootStack= () => {
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
                    elevation: 0
                },
                headerLeftContainerStyle: {
                    paddingLeft: 10
                },
                headerRightContainerStyle: {
                    paddingRight: 25
                }
            }}
            initialRouteName="Login"
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="EmailVerification" component={EmailVerification} options= {{headerTitle: 'Email Verification'}} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options= {{headerTitle: 'Forgot Password'}}/>
                <Stack.Screen name="ResetPassword" component={ResetPassword} options= {{headerTitle: 'Reset Password'}}/>
                <Stack.Screen 
                name="UserDashboard" 
                component={UserDashboard} 
                options= {{
                    headerTitle: 'Dashboard' ,           
                    headerStyle: {
                    height: 100,
                    backgroundColor: accent,
                    borderBottomWidth: 0,
                    shadowOpacity: 0,
                    elevation: 0,
                },
                headerRight: () => <Avatar />                            
        }} 
        
        />
<Stack.Screen 
                name="AdminDashboard" 
                component={AdminDashboard} 
                options= {{
                    headerTitle: 'Dashboard' ,           
                    headerStyle: {
                    height: 100,
                    backgroundColor: accent,
                    borderBottomWidth: 0,
                    shadowOpacity: 0,
                    elevation: 0,
                },
                headerRight: () => <Avatar />                            
        }} 
        />


<Stack.Screen 
                name="SupervisorDashboard" 
                component={SupervisorDashboard} 
                options= {{
                    headerTitle: 'Dashboard' ,           
                    headerStyle: {
                    height: 100,
                    backgroundColor: accent,
                    borderBottomWidth: 0,
                    shadowOpacity: 0,
                    elevation: 0,
                },
                headerRight: () => <Avatar />                            
        }} 
        />

<Stack.Screen 
                name="AttendanceConfirmation" 
                component={AttendanceConfirmation} 
                options= {{
                    headerTitle: 'Confirmation' ,           
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
                component={ VerificationFailed} 
                options= {{
                    headerTitle: 'Confirmation' ,           
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
                options= {{
                    headerTitle: 'Confirmation' ,           
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