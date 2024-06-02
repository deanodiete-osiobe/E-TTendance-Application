import React,{useState} from 'react';
import { Formik } from 'formik';
import { ActivityIndicator } from 'react-native';
import { colors } from '../components/colors';
import { firebase} from '../firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'
const { primary } = colors;

// Import your custom components here

import MainContainer from '../components/Containers/MainContainer';
import KeyboardAvoidingContainer from '../components/Containers/KeyboardAvoidingContainer';
import RegularText from '../components/Texts/RegularText';
import StyledTextInput from '../components/Containers/Inputs/StyledTextInput';
import MsgBox from '../components/Texts/MsgBox';
import RegularButton from '../components/Buttons/RegularButton';
import PressableText from '../components/Texts/PressableText';
import RowContainer from '../components/Containers/RowContainer';

const Signup= ({ navigation }) => {
    const [message,setMessage] = useState(" ");
    const [isSuccessMessage,setIsSuccessMessage] = useState(false);
    
    const moveTo= (screen, payload) => {
        navigation.navigate(screen, {...payload});
    };


    const handleSignup = async (credentials, setSubmitting) => {
        try {
        
            //call backend
            console.log('called')
            console.log(credentials)
            
            firebase
            .auth().createUserWithEmailAndPassword(credentials?.email, credentials?.password)
                .then(userCredentials => {
                    const user = userCredentials.user;
                    console.log(user);
                    console.log(user.email)})
                    moveTo('EmailVerification');

            setSubmitting(false);
        }

            
        catch (error) {
            setMessage('Signup failed: ' + error.message);
            setSubmitting(false);
    }
};



    return (
        <MainContainer>
            <KeyboardAvoidingContainer>
                <RegularText style={{marginBottom: 25 }}>Enter your account credentials</RegularText>

                {/* Use Formik within a JSX context */}
                <Formik 
                initialValues={{email: '',fullName: '',password: '',confirmPassword: '',}}
                    onSubmit={(values, {setSubmitting}) => {
                        if (values.email == '' || values.password == '' || values.fullName == '' || values.confirmPassword == '') {
                            setMessage('Please fill in all fields.');
                            setSubmitting(false);
                    }  else if ( values.password !==  values.confirmPassword ) {
                        setMessage('Passwords do not match.');
                        setSubmitting(false);
                        }else {
                            handleSignup(values, setSubmitting);
                        }
                    }}
                    >
                    {({handleSignup,handleChange, handleBlur,handleSubmit,values,isSubmitting}) => (
                        <>          
                            <StyledTextInput 
                                label="Full Name" 
                                icon="account" 
                                placeholder="Your full name"
                                onChangeText={handleChange('fullName')} 
                                onBlur={handleBlur('fullName')}
                                value={values.fullName}
                                style={{ marginBottom: 15 }}
                            />

                            <StyledTextInput 
                                label="Email Address" 
                                icon="email-variant" 
                                placeholder="E-mail address" 
                                onChangeText={handleChange('email')} 
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={{ marginBottom: 15 }}
                            />


                                <StyledTextInput 
                                label="Password" 
                                icon="lock-open" 
                                placeholder="* * * * * * * *" 
                                onChangeText={handleChange('password')} 
                                onBlur={handleBlur('password')}
                                value={values.password}
                                isPassword={true}
                                style={{ marginBottom: 15 }}
                            />


                                <StyledTextInput 
                                label="Confirm Password" 
                                icon="lock-open" 
                                placeholder="* * * * * * * *" 
                                onChangeText={handleChange('confirmPassword')} 
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                                isPassword={true}
                                style={{ marginBottom: 15 }}
                            />















                            <MsgBox style={{ marginBottom: 25 }} success={isSuccessMessage}>
                                {message || ' '}
                                </MsgBox>
                                    {!isSubmitting && <RegularButton onPress={handleSubmit}>Signup</RegularButton>}
                                    {isSubmitting && (
                                    <RegularButton disabled={true}>
                                        <ActivityIndicator size="small" color= {primary} />
                                        </RegularButton>
                                    )}

                                        
                                        <PressableText style={{paddingVertical: 16}} onPress={() => {moveTo('Login')}}>
                                            Sign in to an existing account</PressableText> 
                
                    
                    
                        </>
                    )}
                </Formik>
            </KeyboardAvoidingContainer>
        </MainContainer>
    );
};

export default Signup;
