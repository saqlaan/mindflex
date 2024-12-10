import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated, Dimensions, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SingleWord = () => {
    const [showHint, setShowHint] = useState(false);
    const [word, setWord] = useState('Guten Tag!');
    const [isFlipped, setIsFlipped] = useState(false);
    const [animatedValue] = useState(new Animated.Value(0));

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 100 }}>
                    <Text style={{ fontSize: 32 }}>{word}</Text>
                </View>
                <TouchableOpacity onPress={() => router.navigate('/hint')} style={{ alignItems: 'center', marginBottom: 20 }} >
                    <ThemedText type="link">Hint</ThemedText>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    card: {
        width: 300,
        height: 200,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        backfaceVisibility: "hidden",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardBack: {
        position: "absolute",
        top: 0,
        backgroundColor: "#dfe6e9",
    },
    word: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2d3436",
    },
    hintButton: {
        marginTop: 20,
        backgroundColor: "#0984e3",
        padding: 10,
        borderRadius: 5,
    },
    hintText: {
        color: "#fff",
        fontSize: 16,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: 250,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
    },
    hintModalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: "center",
    },
    closeButton: {
        backgroundColor: "#d63031",
        padding: 10,
        borderRadius: 5,
    },
    closeText: {
        color: "#fff",
        fontSize: 16,
    },
    meaning: {
        fontSize: 20,
        fontWeight: "600",
        color: "#2d3436",
        textAlign: "center",
        marginBottom: 20,
    },
    difficultyButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    difficultyButton: {
        marginHorizontal: 10,
        backgroundColor: "#00cec9",
        padding: 10,
        borderRadius: 5,
    },
    difficultyText: {
        color: "#fff",
        fontSize: 16,
    },
    tapToFlip: {
        marginTop: 30,
        padding: 10,
        backgroundColor: "#6c5ce7",
        borderRadius: 5,
    },
    tapText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default SingleWord;
