import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import {CharacterContext} from "../store/character-context";

const Profile = ({ navigation }) => {
    const charCtx = useContext(CharacterContext);
    const character = charCtx.playingCharacter
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{character.name}</Text>

            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.value}>{character.gender}</Text>

            <Text style={styles.label}>Age:</Text>
            <Text style={styles.value}>{character.age}</Text>

            <Text style={styles.label}>Health:</Text>
            <Text style={styles.value}>{character.health}</Text>

            <Text style={styles.label}>Skills:</Text>
            <Text style={styles.value}>{character.skill.join(', ')}</Text>

            <Text style={styles.label}>Inventory:</Text>
            <Text style={styles.value}>{character.inventory.join(', ')}</Text>

            <Text style={styles.label}>Relationships:</Text>
            <Text style={styles.value}>{character.relationship.join(', ')}</Text>

            <Text style={styles.label}>Last Accessed:</Text>
            <Text style={styles.value}>{character.lastAccessed.toLocaleString()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        marginBottom: 20,
    },
});

export default Profile;
