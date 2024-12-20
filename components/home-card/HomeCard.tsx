import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme, Text, Button } from "@ui-kitten/components";
interface HomeCardProps {
    title: string;
    value?: string;
    textColor?: string;
    bgColor?: string;
    onPress: () => void;
}

const HomeCard: React.FC<HomeCardProps> = ({ title, value, textColor, bgColor, onPress }) => {
    return (
        <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
            <View style={[styles.card, bgColor && { backgroundColor: bgColor }]}>
                <View style={styles.header}>
                    <Text style={[textColor && { color: textColor }, {fontWeight: '500'}]}>{title}</Text>
                    {
                        value && (
                            <View style={styles.iconContainer}>
                                <Text>{value}</Text>
                            </View>
                        ) 
                    }
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F8F8F8', // Light gray background
        borderRadius: 20, // Rounded corners
        padding: 16,
        height: 120, // Adjust as needed
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // For Android shadow
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    iconContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 40,
        padding: 8,
        width: 35,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    value: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
    },
    unit: {
        fontSize: 14,
        fontWeight: '400',
        color: '#777',
        marginLeft: 4,
    },
});

export default HomeCard;
