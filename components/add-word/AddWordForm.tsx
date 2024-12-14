import { useEffect, useState } from 'react';
import { Text, TextInput, Button, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';

import { useWordContext } from '@/context/WordsContext';
import { router, useGlobalSearchParams } from 'expo-router';
import Header from '@/components/header/Header';
import { createWord, readWords, updateWord } from '@/firebase/words/operations';


export default function AddWordForm() {
    let { id } = useGlobalSearchParams<{ id: string }>()
    const [word, setWord] = useState('');
    const [translation, setTranslation] = useState('');
    const [hint, setHint] = useState('');
    const [selectedTag, setSelectedTag] = useState('German A1')
    const { tags } = useWordContext()
    const isValid = word !== "" && translation !== "" && selectedTag !== ""

    const handleSave = async () => {
        if (!isValid) return
        createWord({ word, translation, tag: selectedTag })
        alert('Word added!')
        router.back();
    };

    return (

        <View style={styles.container}>
            <Text style={{ fontSize: 22 }}>Add new word</Text>
            <View style={{ flex: 1 }}>
                <View style={{ gap: 5, marginTop: 10 }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type your word here"
                        value={word}
                        onChangeText={setWord}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholderTextColor={'#ccc'}
                        autoCorrect={true}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Type your word translation here"
                        value={translation}
                        onChangeText={setTranslation}
                        autoCapitalize='none'
                        autoCorrect={true}
                        placeholderTextColor={'#ccc'}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Any hint"
                        value={hint}
                        onChangeText={setHint}
                        autoCapitalize='none'
                        autoCorrect={true}
                        placeholderTextColor={'#ccc'}
                    />
                </View>
                <View style={{ marginBottom: 20 }} />
                <View style={{ marginBottom: 20 }}>
                    <FlatList
                        data={tags}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={[styles.tag, selectedTag === item && { backgroundColor: '#ccc' }]} onPress={() => setSelectedTag(item)}>
                                <ThemedText>{item}</ThemedText>
                            </TouchableOpacity>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <Button disabled={!isValid} title="Save" onPress={handleSave} />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderBottomWidth: 1,
        fontSize: 16,
        paddingHorizontal: 10,
    },
    translation: {
        marginBottom: 20,
        fontSize: 16,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    tag: {
        backgroundColor: '#eee',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginHorizontal: 5,
    },
});
