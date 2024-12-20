import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CircularButtonProps {
    number: number | string;
    text: string;
    onPress: () => void;
    size?: number; // Optional size for the button
    backgroundColor?: string; // Customizable background color
}

export const CircularButton: React.FC<CircularButtonProps> = ({
    number,
    text,
    onPress,
    size = 60, // Default size of 80
    backgroundColor = '#4CAF50', // Default green background color
}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[
                    styles.button,
                    { width: size, height: size, borderRadius: size / 2, backgroundColor },
                ]}
                onPress={onPress}
            >
                <Text style={styles.number}>{number}</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, // Shadow for Android
    },
    number: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF', // White color for text
    },
    text: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: '500',
        color: '#000', // Black color for text
        textAlign: 'center',
    },
});


