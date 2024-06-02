import React, {useState} from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {firebase} from '../../firebase'

// styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
const { primary,secondary,accent } = colors;
import ProfileModal from '../Modals/ProfileModal';
import { useNavigation } from '@react-navigation/native';

const StyledView = styled.TouchableOpacity`
    background-color: ${primary};
    flex-direction: column;
    height: 45px;
    width: 45px;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    border-width: 2px;
    border-color: ${secondary};
    `;

    const Avatar = (props) => {
        navigation = useNavigation();
        //modal
        const[modalVisible,setModalVisible] = useState(false);
        const[headerText,setHeaderText] = useState('');

        const[loggingOut,setloggingOut] = useState(false);

        const onLogout = async() => {
            setloggingOut(true);

            //clear user credentials
            firebase.auth().signOut().then(() => {
                console.log("User signed out");
                setloggingOut(false);
                setModalVisible(false);
                navigation.navigate('Login');

              }).catch((error) => {
                console.error("Error signing out: ", error);
              });

            



            
        };

    const showProfileModal =(user) => {
        setHeaderText(user);
        setModalVisible(true);
    };


    const hideModal = () => {
        setModalVisible(false);

    }

        const onAvatarPress = () => {
            showProfileModal('Jerry Walt');
        };


        return (
            <>
        <StyledView onPress= {onAvatarPress}style= {props.imgContainerStyle}>
            <MaterialCommunityIcons name="account" size= {35} color={accent} />
        </StyledView>
            <ProfileModal modalVisible={modalVisible} headerText={headerText} buttonHandler={onLogout} 
            LoggingOut={loggingOut} 
            hideModal= {hideModal}
            />
            </>
        );
    };


    export default Avatar;