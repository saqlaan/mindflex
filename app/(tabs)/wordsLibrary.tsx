

import Header from "@/components/header/Header";
import { useWordContext } from "@/context/WordsContext";
import { deleteWord, readWords, subscribeToWords } from "@/firebase/words/operations";
import { Word } from "@/types";
import Feather from "@expo/vector-icons/build/Feather";
import { useTheme, Text } from "@ui-kitten/components";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function WordsLibrary({ navigation }: { navigation: any }) {
  const { removeWord, tags } = useWordContext();
  const [selectedTag, setSelectedTag] = useState('');
  const [words, setWords] = useState<Word[]>([])
  const theme = useTheme()
  // Handle word deletion

  const confirmDeleteWord = async (id: string) => {
    return await deleteWord(id)
  }

  const handleDelete = (id: string) => {
    Alert.alert("Delete Word", "Are you sure you want to delete this word?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteWord(id) },
    ]);
  };

  useEffect(() => {
    const unsubscribe = subscribeToWords(setWords);
    return () => unsubscribe();
  }, [])

  const filteredList = useMemo(() => {
    if (selectedTag === "") return words
    return words.filter(word => word.tag == selectedTag)
  }, [words, selectedTag])

  const filteredTags = useMemo(() => {
    return tags.filter(tag => !!words.find(word => word.tag === tag))
  }, [tags, words])

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
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Text style={{ color: '#1DB954'}}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={{ color: '#C60A1B' }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleOnPressFilterBtn = useCallback((value: string) => {
    if (selectedTag == value) setSelectedTag("")
    else setSelectedTag(value)
  }, [selectedTag])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header hasBackButton={false} title="Your words library" headerType="BACK" rightNode={
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }} onPress={() => router.navigate('/add-word')}>
          <Feather name={'plus'} size={32} color={'#000'} />
          {/* <Text category="p1" style={{ color: '#000' }}>Add new</Text> */}
        </TouchableOpacity>
      } />
      <View style={styles.container}>
        <View style={{ marginBottom: 20 }}>

          <FlatList
            data={filteredTags}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.filterTag, selectedTag === item && { backgroundColor: theme['color-dark-gray'] }]} onPress={() => handleOnPressFilterBtn(item)}>
                <Text style={{ color: theme['color-secondary-text'] }}>{item}</Text>
              </TouchableOpacity>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
        {filteredList.length === 0 ? (
          <Text style={styles.noWords}>No words added yet.</Text>
        ) : (
          <>
            <FlatList
              data={filteredList}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 50}}
            />
          </>

        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
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
    backgroundColor: '#B3B3B3',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", gap: 15 },
  noWords: { fontSize: 18, textAlign: "center", marginTop: 20, color: "#999" },
});