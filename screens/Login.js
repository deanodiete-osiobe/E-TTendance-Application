import React, { useState } from 'react';
import { Formik } from 'formik';
import { ActivityIndicator } from 'react-native';
import { colors } from '../components/colors';
const { primary } = colors;
import * as Yup from 'yup';
import { firebase } from '../firebase';

import MainContainer from '../components/Containers/MainContainer';
import KeyboardAvoidingContainer from '../components/Containers/KeyboardAvoidingContainer';
import RegularText from '../components/Texts/RegularText';
import StyledTextInput from '../components/Containers/Inputs/StyledTextInput';
import MsgBox from '../components/Texts/MsgBox';
import RegularButton from '../components/Buttons/RegularButton';
import PressableText from '../components/Texts/PressableText';
import RowContainer from '../components/Containers/RowContainer';
import { View, Text, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const moveTo = (screen, payload) => {
    navigation.navigate(screen, { ...payload });
  };

  const handleLogin = async (credentials, setSubmitting) => {
    try {
      setMessage(null);
      const { email, password } = credentials;

      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (email.endsWith('@admin.cu.edu.ng')) {
        moveTo('AdminDashboard', { adminEmail: user.email });
      } else if (email.endsWith('@cu.edu.ng')) {
        moveTo('UserDashboard', { invigilatorEmail: user.email });
      } else {
        setMessage('Unauthorized email domain');
      }

      setSubmitting(false);
    } catch (error) {
      setMessage('Login failed');
      setSubmitting(false);
    }
  };

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .matches(/(@cu\.edu\.ng|@admin\.cu\.edu\.ng)$/, 'You have to use an official email')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <MainContainer>
      <KeyboardAvoidingContainer>
        <RegularText style={{ marginBottom: 25 }}>Enter your account credentials</RegularText>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleLogin(values, setSubmitting);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <>
              <StyledTextInput
                label="Email Address"
                icon="email-variant"
                placeholder="E-mail address"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={{ marginBottom: 25 }}
                error={touched.email && errors.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <StyledTextInput
                label="Password"
                icon="lock-open"
                placeholder="* * * * * * * *"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                isPassword={true}
                style={{ marginBottom: 25 }}
                error={touched.password && errors.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <MsgBox style={{ marginBottom: 25 }} success={isSuccessMessage}>
                {message || ' '}
              </MsgBox>

              {!isSubmitting && (
                <RegularButton onPress={handleSubmit}>Login</RegularButton>
              )}
              {isSubmitting && (
                <RegularButton disabled={true}>
                  <ActivityIndicator size="small" color={primary} />
                </RegularButton>
              )}

              <RowContainer>
                <PressableText onPress={() => { moveTo('Signup') }}>New account? Sign up</PressableText>
                <PressableText onPress={() => { moveTo('ForgotPassword') }}>Forgot Password</PressableText>
              </RowContainer>
            </>
          )}
        </Formik>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  headerText: {
    marginBottom: 25,
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginBottom: 15,
  },
});

export default Login;
