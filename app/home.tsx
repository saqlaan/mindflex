import React, { useCallback, useEffect, useState } from "react";
import {
    TextInput,
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { useWordContext } from "@/context/WordsContext";
import { router, useGlobalSearchParams } from "expo-router";
import Header from "@/components/header/Header";
import { createWord, readWords, updateWord } from "@/firebase/words/operations";
import { Text, useTheme } from "@ui-kitten/components";

export default function AddWord() {
    const { id } = useGlobalSearchParams<{ id: string }>();
    const { words, tags } = useWordContext();
    const theme = useTheme();

    const [formData, setFormData] = useState({
        word: "",
        translation: "",
        hint: "",
        selectedTag: "",
    });
    const [message, setMessage] = useState<string | null>(null);

    const isValid =
        formData.word !== "" && formData.translation !== "" && formData.selectedTag !== "";

    // Prepopulate fields if editing a word
    useEffect(() => {
        async function injectWord() {
            if (id) {
                try {
                    const allWords = await readWords();
                    const existingWord = allWords.find((word) => word.id === id);
                    if (existingWord) {
                        setFormData({
                            word: existingWord.word,
                            translation: existingWord.translation,
                            hint: existingWord.hint || "",
                            selectedTag: existingWord.tag,
                        });
                    }
                } catch (error) {
                    console.error("Error fetching word:", error);
                }
            }
        }
        injectWord();
    }, [id, words]);

    const handleSave = async () => {
        if (!isValid) return;

        try {
            if (id) {
                await updateWord(id, {
                    word: formData.word,
                    translation: formData.translation,
                    tag: formData.selectedTag,
                });
                router.back();
            } else {
                await createWord({
                    word: formData.word,
                    translation: formData.translation,
                    hint: formData.hint,
                    tag: formData.selectedTag,
                    visited: 0,
                });
                setMessage("Word added successfully!");
                resetForm();
                setTimeout(() => setMessage(null), 3000);
            }
        } catch (error) {
            console.error("Error saving word:", error);
            setMessage("Failed to save word. Try again.");
        }
    };

    const resetForm = useCallback(() => {
        setFormData({ word: "", translation: "", hint: "", selectedTag: "" });
    }, []);

    return (
        <View style={styles.container}>
            <Header
                hasBackButton
                title={`${id ? "Update" : "Add"} New Word`}
                headerType="MODAL"
            />
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Word"
                    value={formData.word}
                    onChangeText={(text) => setFormData((prev) => ({ ...prev, word: text }))}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="#B3B3B3"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Translation"
                    value={formData.translation}
                    onChangeText={(text) =>
                        setFormData((prev) => ({ ...prev, translation: text }))
                    }
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="#B3B3B3"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Hint (optional)"
                    value={formData.hint}
                    onChangeText={(text) => setFormData((prev) => ({ ...prev, hint: text }))}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="#B3B3B3"
                />
                <FlatList
                    data={tags}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.tag,
                                formData.selectedTag === item && styles.tagSelected,
                            ]}
                            onPress={() => setFormData((prev) => ({ ...prev, selectedTag: item }))}
                            accessibilityLabel={`Tag ${item}`}
                        >
                            <Text style={styles.tagText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
                {message && <Text style={styles.message}>{message}</Text>}
                <TouchableOpacity
                    style={[styles.saveButton, isValid ? styles.saveButtonEnabled : styles.saveButtonDisabled]}
                    onPress={isValid ? handleSave : undefined}
                    accessibilityLabel="Save Word"
                >
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    form: {
        flex: 1,
        padding: 20,
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        fontSize: 16,
    },
    tag: {
        backgroundColor: "#B3B3B3",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    tagSelected: {
        backgroundColor: "#000",
    },
    tagText: {
        color: "#fff",
    },
    message: {
        color: "#1DB954",
        textAlign: "center",
        marginTop: 10,
    },
    saveButton: {
        paddingVertical: 15,
        borderRadius: 20,
        alignItems: "center",
        marginTop: 20,
    },
    saveButtonEnabled: {
        backgroundColor: "#1DB954",
    },
    saveButtonDisabled: {
        backgroundColor: "#A4F8A9",
    },
    saveButtonText: {
        color: "#fff",
        fontWeight: "500",
    },
});
