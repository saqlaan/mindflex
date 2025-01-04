import FlipCard from "@/components/flip-card/FlipCard";
import { ThemedText } from "@/components/ThemedText";
import { updateWord } from "@/firebase/words/operations";
import { generateBackgroundColor } from "@/lib/functions/bg-colors";
import { Word } from "@/types";

import { router } from "expo-router";
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { height } = Dimensions.get('screen')
import { Text } from "@ui-kitten/components";

const WordScrollItem = ({ word }: { word: Word }) => {
    const [showTranslation, setShowTranslation] = useState(false)
    const { bottom } = useSafeAreaInsets()

    if (word.id === 'END_OF_LIST') {
        return <FinalScrollItem />
    }

    if (word)
        return (
            <TouchableWithoutFeedback onPress={() => setShowTranslation(value => !value)}>
                <View style={[styles.container, { height: height, backgroundColor: '#fff', paddingBottom: bottom, position:'relative' }]}>
                    <FlipCard frontText={word.word} backText={word.translation} hint={word.hint} />
                </View >
            </TouchableWithoutFeedback>
        );
};

export const FinalScrollItem = () => {
    const { bottom } = useSafeAreaInsets()
    return (
        <View style={[styles.container, { height: height, paddingBottom: bottom }]}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16, marginBottom: 20}}>You have finished your words for now</Text>

                <TouchableOpacity
                    style={{
                        backgroundColor: "#1DB954",
                        paddingVertical: 20,
                        paddingHorizontal: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 20,
                        flexDirection: 'row',
                        gap: 5
                    }}
                    onPress={() => router.back()}
                >

                    <Text style={{ color: "#fff", fontWeight: "500" }}>Go back</Text>

                </TouchableOpacity>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        width: 300,
        height: 200,

        justifyContent: "center",
        alignItems: "center",
        backfaceVisibility: "hidden",
        borderRadius: 10,
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
    buttonGroup: {
        margin: 2,

    },
});

export default WordScrollItem;
