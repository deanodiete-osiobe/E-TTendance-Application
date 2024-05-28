import React,{useState} from 'react';
import { Formik } from 'formik';
import { ActivityIndicator } from 'react-native';

import { colors } from '../components/colors';
const { primary,secondary,lightGray } = colors;

// Import your custom components here

import MainContainer from '../components/Containers/MainContainer';
import KeyboardAvoidingContainer from '../components/Containers/KeyboardAvoidingContainer';
import RegularText from '../components/Texts/RegularText';
import StyledTextInput from '../components/Containers/Inputs/StyledTextInput';
import MsgBox from '../components/Texts/MsgBox';
import RegularButton from '../components/Buttons/RegularButton';
import PressableText from '../components/Texts/PressableText';
import RowContainer from '../components/Containers/RowContainer';
import IconHeader from '../components/Icons/IconHeader';
import StyledCodeInput from '../components/Containers/Inputs/StyledCodeInput';
import ResendTimer from '../components/Timers/ResendTimer';
import MessageModal from '../components/Modals/MessageModal';

const PhoneNumberVerification= ({ navigation }) => {
    // code input
    const MAX_CODE_LENGTH = 4;
    const [code, setCode] = useState('');
    const [pinReady, setPinReady] = useState(false);

    const [message, setMessage] = useState('');
    const [isSuccessMessage,setIsSuccessMessage] = useState(false);

    const[verifying, setVerifying] = useState(false);

    //resending phone number
    const[activeResend, setActiveResend] = useState(false);
    const[resendStatus, setresendStatus] = useState('Resend');
    const[resendingPhoneNo, setresendingPhoneNo] = useState(false);

    //modal
    //modalVisible,buttonHandler, type, headerText, message, buttonText
    const[modalVisible,setModalVisible] = useState(false);
    const[modalMessageType,setModalMessageType] = useState('');
    const[headerText,setHeaderText] = useState('');
    const[modalMessage,setModalMessage] = useState('');
    const[buttonText,setButtonText] = useState('');

    const moveTo= (screen, payload) => {
        navigation.navigate(screen, {...payload});
    };


    const buttonHandler = () => {
        if (modalMessageType === 'success') {
            //move to dashboard
            moveTo("UserDashboard");

        }

        setModalVisible(false);
    };

    const showModal = (type, headerText, message, buttonText) => {
        setModalMessageType(type); 
        setHeaderText(headerText);
        setModalMessage(message);
        setButtonText(buttonText);
        setModalVisible(true);

    }



    async function resendPhoneNo(triggerTimer) {
        try {
            setresendingPhoneNo(true);


            //make request to backend
            //update setresendStatus() to 'Failed' or 'Sent!'
            setresendingPhoneNo(false);
            //hold on briefly
            setTimeout(() => {
                setresendStatus('Resend');
                setActiveResendStatus(false);
                triggerTimer();
            }, 5000);
        } catch (error) {
            setresendingPhoneNo(false);
            setresendStatus('Failed');
            alert('E-mail Resend Failed: ' + error.message);
        }
    }


    const handlePhoneNumberVerification = async () => {
        try {


            setVerifying(true);

            //call backend

            setVerifying(false);
            return showModal('success', 'All Good!', 'Your OTP has been verified.','Proceed');

            
        } catch (error) {

            setVerifying(false);
            return showModal('failed', 'Failed!', error.message,'Close');
    }
};



    return (
        <MainContainer>
            <KeyboardAvoidingContainer>
                <IconHeader name="lock-open" style={{marginBottom: 30}} />
                <RegularText style={{ textAlign: 'center' }}>
                    Enter the 4-digit code sent to your phone number
                </RegularText>


                <StyledCodeInput code={code} setCode={setCode}  maxLength={MAX_CODE_LENGTH} setPinReady={setPinReady} />

                {!verifying && pinReady && <RegularButton onPress={handlePhoneNoVerification}>Verify</RegularButton>}
                {!verifying && !pinReady && <RegularButton disabled = {true} style = {{backgroundColor: secondary}} textStyle={{color: lightGray}}>Verify</RegularButton>}
                        
                                    {verifying && (
                                    <RegularButton disabled={true}>
                                        <ActivityIndicator size="small" color= {primary} />
                                        </RegularButton>
                                    )}

                                        <ResendTimer activeResend={activeResend} 
                                        setActiveResend={setActiveResend}
                                        resendStatus = {resendStatus} 
                                        resendingPhoneNo={resendingPhoneNo}
                                        />

                                        <MessageModal modalVisible={modalVisible} buttonHandler={buttonHandler} type={modalMessageType} headerText={headerText} 
                                        message={modalMessage}
                                        buttonText={buttonText}
                                        />

            </KeyboardAvoidingContainer>
        </MainContainer>
    );
};

export default PhoneNumberVerification;
