import { useEffect, useState } from 'react';
import { TextInput, Button, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useWordContext } from '@/context/WordsContext';
import { router, useGlobalSearchParams } from 'expo-router';
import Header from '@/components/header/Header';


export default function AddWord() {
    let { id } = useGlobalSearchParams<{ id: string }>()
    const [word, setWord] = useState('');
    const [translation, setTranslation] = useState('');
    const [hint, setHint] = useState('');
    const [selectedTag, setSelectedTag] = useState('')
    const { addWord, updateWord, words, tags } = useWordContext()
    const isValid = word !== "" && translation !== "" && selectedTag !== ""

    useEffect(() => {
        if (id) {
            const existingWord = words.find(word => word.id == Number(id))
            if (existingWord) {
                setWord(existingWord.word)
                setTranslation(existingWord.translation)
                setSelectedTag(existingWord.tag)
            }
        }
    }, [id, words])

    const handleSave = () => {
        if (!isValid) return
        if (id) {
            const _id = Number(id)
            updateWord({
                id: Number(_id),
                translation,
                word,
                tag: selectedTag,
            })
            alert('Word Updated');
            router.back();
        } else {
            addWord({ word, translation, tag: selectedTag })
            alert('Word added!')
            router.back();
        }
    };

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <Header title='' headerType={"MODAL"} />
            <View style={styles.container}>
                <ThemedText type="title">{id ? 'Update' : 'Add'} your word here</ThemedText>
                {/* Input for the word */}
                <View style={{ flex: 1, paddingTop: 50 }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type your word here"
                        value={word}
                        onChangeText={setWord}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Type your word translation here"
                        value={translation}
                        onChangeText={setTranslation}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Any hint"
                        value={hint}
                        onChangeText={setHint}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        backgroundColor: '#fff'
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderBottomWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        fontSize: 16,
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
