import Header from "@/components/header/Header";
import { ThemedText } from "@/components/ThemedText";
import { useWordContext } from "@/context/WordsContext";
import { Word } from "@/types";
import { router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Button,
    StyleSheet,
    Alert,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Words({ navigation }: { navigation: any }) {
    const { words, removeWord, tags } = useWordContext();
    const [selectedTag, setSelectedTag] = useState('');
    // Handle word deletion
    const handleDelete = (id: number) => {
        Alert.alert("Delete Word", "Are you sure you want to delete this word?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => removeWord(id) },
        ]);
    };

    const filteredList = useMemo(() => {
        if (selectedTag === "") return words
        return words.filter(word => word.tag == selectedTag)
    }, [words, selectedTag])

    const filteredTags = useMemo(() => {
        return tags.filter(tag => !!words.find(word => word.tag === tag))
    }, [tags])

    // Navigate to edit screen
    const handleEdit = (word: Word) => {
        // navigation.navigate("EditWord", { word });
        router.push(`/add-word?id=${word.id}`)
    };

    const renderItem = ({ item }: { item: Word }) => (
        <View style={styles.wordCard}>
            <View style={styles.textContainer}>
                <Text style={styles.word}>{item.word}</Text>
                <Text style={styles.translation}>{item.translation}</Text>
                {item.tag && <Text style={styles.tag}>#{item.tag}</Text>}
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={() => handleEdit(item)} />
                <Button
                    title="Delete"
                    color="red"
                    onPress={() => handleDelete(item.id)}
                />
            </View>
        </View>
    );

    const handleOnPressFilterBtn = useCallback((value: string) => {
        if (selectedTag == value) setSelectedTag("")
        else setSelectedTag(value)
    }, [selectedTag])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header title="Back" headerType="BACK" />
            <View style={styles.container}>
                <View style={{ marginBottom: 20 }}>
                    <FlatList
                        data={filteredTags}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={[styles.filterTag, selectedTag === item && { backgroundColor: '#ccc' }]} onPress={() => handleOnPressFilterBtn(item)}>
                                <ThemedText>{item}</ThemedText>
                            </TouchableOpacity>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                {filteredList.length === 0 ? (
                    <Text style={styles.noWords}>No words added yet.</Text>
                ) : (
                    <>
                        <FlatList
                            data={filteredList}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                        />
                    </>

                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
    wordCard: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: { flex: 1, marginRight: 10 },
    word: { fontSize: 18, fontWeight: "bold", color: "#333" },
    translation: { fontSize: 16, color: "#666", marginTop: 5 },
    tag: { fontSize: 14, color: "#999", marginTop: 5 },
    filterTag: {
        backgroundColor: '#eee',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    buttonContainer: { flexDirection: "row", justifyContent: "space-between" },
    noWords: { fontSize: 18, textAlign: "center", marginTop: 20, color: "#999" },
});
