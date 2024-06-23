import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, Dimensions } from 'react-native';
import { firebase } from '../firebase';
import { colors } from "../components/colors";
const { primary, lightGray, accent } = colors;
const screenWidth = Dimensions.get("window").width;

const ManageVenues = () => {

    const [venues, setVenues] = useState([]);
    const [editingVenue, setEditingVenue] = useState(null);
    const [newVenueName, setNewVenueName] = useState('');
    const [creatingVenue, setCreatingVenue] = useState(false);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const venuesSnapshot = await firebase.firestore().collection('Exam Venues').get();
                const venuesList = venuesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setVenues(venuesList);
            } catch (error) {
                console.error("Error fetching exam venues: ", error);
            }
        };

        fetchVenues();
    }, []);

    const handleEdit = (venue) => {
        setEditingVenue(venue);
        setNewVenueName(venue.venue_name);
    };

    const handleSaveEdit = async () => {
        if (editingVenue) {
            try {
                await firebase.firestore().collection('Exam Venues').doc(editingVenue.id).update({
                    venue_name: newVenueName,
                });
                setVenues(venues.map(venue => venue.id === editingVenue.id ? { ...venue, venue_name: newVenueName } : venue));
                setEditingVenue(null);
                setNewVenueName('');
            } catch (error) {
                console.error("Error updating exam venue: ", error);
            }
        }
    };

    const handleDelete = async (venueId) => {
        try {
            await firebase.firestore().collection('Exam Venues').doc(venueId).delete();
            setVenues(venues.filter(venue => venue.id !== venueId));
        } catch (error) {
            console.error("Error deleting exam venue: ", error);
        }
    };

    const handleCreateVenue = async () => {
        if (newVenueName) {
            try {
                const newVenue = {
                    venue_name: newVenueName,
                };
                const docRef = await firebase.firestore().collection('Exam Venues').add(newVenue);
                setVenues([...venues, { id: docRef.id, ...newVenue }]);
                setNewVenueName('');
                setCreatingVenue(false);
            } catch (error) {
                console.error("Error creating exam venue: ", error);
            }
        }
    };

    return (
        <>
            {creatingVenue ? (
                <View style={styles.createForm}>
                    <TextInput
                        value={newVenueName}
                        onChangeText={setNewVenueName}
                        placeholder="Venue Name"
                        style={styles.input}
                    />
                    <Button title="Create" onPress={handleCreateVenue} />
                    <Button title="Cancel" onPress={() => setCreatingVenue(false)} />
                </View>
            ) : (
                <Button title="Add New Exam Venue" onPress={() => setCreatingVenue(true)} />
            )}
            <View style={styles.container}>
                {editingVenue && (
                    <View style={styles.editForm}>
                        <TextInput
                            value={newVenueName}
                            onChangeText={setNewVenueName}
                            placeholder="Venue Name"
                            style={styles.input}
                        />
                        <Button color="#00B200" title="Save" onPress={handleSaveEdit} />
                        <Button color="#B20000" title="Cancel" onPress={() => setEditingVenue(null)} />
                    </View>
                )}
                <FlatList
                    data={venues}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.venueItem}>
                            <Text style={styles.label}>{item.venue_name}</Text>
                            <Button color="#0000B2" title="Edit" onPress={() => handleEdit(item)} />
                            <Button color="#B20000" title="Delete" onPress={() => handleDelete(item.id)} />
                        </View>
                    )}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    venueItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        borderColor: lightGray,
        padding: 15,
        fontSize: 14,
        backgroundColor: '#f2f2f2',
        width: screenWidth - 180
    },
    editForm: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
    },
});

export default ManageVenues;
