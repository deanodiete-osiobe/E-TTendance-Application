import React, {useEffect, useState} from "react";
import { Modal, ActivityIndicator, StyleSheet, View, Text, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Formik } from 'formik';
import * as Yup from 'yup';
// styled components
import styled from "styled-components/native";
import { colors } from "../colors";
const { primary, tertiary, accent, secondary, lightGray } = colors;
import BigText from "../Texts/BigText";
import {firebase} from '../../firebase'
import RegularButton from "../Buttons/RegularButton";
import { ModalView, ModalPressableContainer } from "./MessageModal";
const StyledView = styled.View`
  background-color: ${primary};
  flex-direction: column;
  height: 65px;
  width: 65px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: ${secondary};

`;

const ProfileModal = ({
  modalVisible,
  buttonHandler,
  headerText,
  LoggingOut,
  hideModal,
}) => {
  const[email, setEmail] = useState('');
  const[pageNumber, setPageNumber]= useState(1)
  function getCurrentUserEmail() {
      const user = firebase.auth().currentUser;
      if (user) {
        setEmail(user.email)
        return user.email;
      } else {
        console.error("No user is currently signed in.");
        return null;
      }
    }
    function gotoChangePassword(){
      setPageNumber(2)
  
    }
useEffect(() => {
    getCurrentUserEmail();
    
}, []);



const handlePasswordUpdate = async (values, { setSubmitting }) => {
    try {
      const user = firebase.auth().currentUser;
      const { currentPassword, newPassword } = values;

      // Re-authenticate the user
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await user.reauthenticateWithCredential(credential);

      // Update the password
      await user.updatePassword(newPassword);
      alert("Password updated successfully!");
      setPageNumber(1);
    } catch (error) {
      alert('Password Update Failed');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <ModalPressableContainer onPress={hideModal}>
      {pageNumber === 1 && (<ModalView>
          <StyledView>
            <MaterialCommunityIcons name="account" size={55} color={accent} />
          </StyledView>

          <BigText
            style={{ fontSize: 25, color: tertiary, marginVertical: 20 }}
          >
            {email}
          </BigText>
          <RegularButton onPress={gotoChangePassword}>Change Password</RegularButton>
          {!LoggingOut && (
            <RegularButton onPress={buttonHandler}>Logout</RegularButton>
          )}
          {LoggingOut && (
            <RegularButton disabled={true}>
              <ActivityIndicator size="small" color={primary} />
            </RegularButton>
          )}
        </ModalView>)
        }
        {pageNumber === 2 && (<ModalView>
            <Formik
              initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
              validationSchema={Yup.object({
                currentPassword: Yup.string().required('Current Password is required'),
                newPassword: Yup.string()
                  .required('New Password is required')
                  .min(6, 'Password must be at least 6 characters'),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                  .required('Confirm Password is required'),
              })}
              onSubmit={handlePasswordUpdate}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <View style={styles.modalContainer}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Current Password</Text>
                    <TextInput
                      style={styles.input}
                      value={values.currentPassword}
                      onChangeText={handleChange('currentPassword')}
                      onBlur={handleBlur('currentPassword')}
                      secureTextEntry
                      placeholder="Enter Current Password"
                    />
                    {touched.currentPassword && errors.currentPassword && (
                      <Text style={styles.errorText}>{errors.currentPassword}</Text>
                    )}
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>New Password</Text>
                    <TextInput
                      style={styles.input}
                      value={values.newPassword}
                      onChangeText={handleChange('newPassword')}
                      onBlur={handleBlur('newPassword')}
                      secureTextEntry
                      placeholder="Enter New Password"
                    />
                    {touched.newPassword && errors.newPassword && (
                      <Text style={styles.errorText}>{errors.newPassword}</Text>
                    )}
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirm New Password</Text>
                    <TextInput
                      style={styles.input}
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      secureTextEntry
                      placeholder="Confirm New Password"
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                    )}
                  </View>
                  <RegularButton onPress={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <ActivityIndicator size="small" color={primary} />
                    ) : (
                      'Update Password'
                    )}
                  </RegularButton>
                  
                </View>
              )}
            </Formik>
          </ModalView>)
        }
      </ModalPressableContainer>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
    
    inputContainer: {
      marginBottom: 10,
      padding: 10,
    },
    label: {
      fontSize: 18,
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: lightGray,
      borderRadius: 5,
      padding: 15,
      fontSize: 16,
      backgroundColor: primary,
    },
})

export default ProfileModal;
