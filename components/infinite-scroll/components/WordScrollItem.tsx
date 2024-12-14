import { ThemedText } from "@/components/ThemedText";
import { generateBackgroundColor } from "@/functions/bg-colors";
import { Word } from "@/types";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated, Dimensions, Button, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
const { height } = Dimensions.get('screen')

const WordScrollItem = ({ word }: { word: Word }) => {
    const [showTranslation, setShowTranslation] = useState(false)
    const { bottom } = useSafeAreaInsets()

    if (word.id === 'END_OF_LIST') {
        return <FinalScrollItem />
    }

    if (word)
        return (
            <TouchableWithoutFeedback onPress={() => setShowTranslation(value => !value)}>
                <View style={[styles.container, { height: height, backgroundColor: generateBackgroundColor(), paddingBottom: bottom }]}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                        <View>
                            <Text style={{ fontSize: 32 }}>{word.word}</Text>
                        </View>
                        {
                            showTranslation && (
                                <View style={{}}>
                                    <Text style={{ fontSize: 18 }}>{word.translation}</Text>
                                </View>
                            )
                        }

                    </View>
                    <TouchableOpacity onPress={() => router.navigate('/hint')} style={{ alignItems: 'center' }} >
                        <ThemedText style={{ color: '#000' }} type="link">Hint</ThemedText>
                    </TouchableOpacity>
                </View >
            </TouchableWithoutFeedback>
        );
};

export const FinalScrollItem = () => {
    const { bottom } = useSafeAreaInsets()
    return (
        <View style={[styles.container, { height: height, backgroundColor: generateBackgroundColor(), paddingBottom: bottom }]}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ fontSize: 32, textAlign: 'center', marginBottom: 20 }}>You have finished your words for today</Text>
                <TouchableOpacity onPress={() => router.back()} style={{ alignItems: 'center' }} >
                    <Text style={{ fontSize: 26 }}>Go back</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

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

export default WordScrollItem;
