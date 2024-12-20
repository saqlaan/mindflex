import { useCallback, useEffect, useState } from 'react';
import { TextInput, StyleSheet, View, FlatList, TouchableOpacity, Button } from 'react-native';

import { useWordContext } from '@/context/WordsContext';
import { router, useGlobalSearchParams } from 'expo-router';
import Header from '@/components/header/Header';
import { createWord, readWords, updateWord } from '@/firebase/words/operations';
import { Text, useTheme } from '@ui-kitten/components';
import { showMessage } from 'react-native-flash-message';


export default function AddWord() {
    let { id } = useGlobalSearchParams<{ id: string }>()
    const [word, setWord] = useState('');
    const [translation, setTranslation] = useState('');
    const [hint, setHint] = useState('');
    const [selectedTag, setSelectedTag] = useState('')
    const { words, tags } = useWordContext();
    const [message, setMessage]= useState<string | null>(null)
    const isValid = word !== "" && translation !== "" && selectedTag !== ""
    const theme = useTheme();
    useEffect(() => {
        async function injectWord() {
            if (id) {
                const words = await readWords();
                const existingWord = words.find(word => word.id == id)
                if (existingWord) {
                    setWord(existingWord.word)
                    setTranslation(existingWord.translation)
                    setSelectedTag(existingWord.tag)
                }
            }
        }
        injectWord()

    }, [id, words])

    const handleSave = async () => {
        if (!isValid) return
        if (id) {
            await updateWord(id, {
                translation,
                word,
                tag: selectedTag,
            })
            router.back();
        } else {
            createWord({ word, translation, tag: selectedTag, visited: 0 })
            createWord({ translation, word, tag: selectedTag, visited: 0 })
            setMessage("Word added successfully")
            resetForm();
            setTimeout(() => {
                setMessage(null)
            }, 3000)
            // router.back();
        }
    };

    const resetForm = useCallback(() => {
        setWord('')
        setTranslation('');
        setSelectedTag('German A1')
    }, [])

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <Header hasBackButton={true} title={`${id ? 'Update' : 'Add'} new word`} headerType={"MODAL"} />
            <View style={styles.container}>
                {/* Input for the word */}
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type your word here"
                        value={word}
                        onChangeText={setWord}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholderTextColor={'#ccc'}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Type your word translation here"
                        value={translation}
                        onChangeText={setTranslation}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholderTextColor={'#ccc'}
                    />
                    {/* <TextInput
                        style={styles.input}
                        placeholder="Any hint"
                        value={hint}
                        onChangeText={setHint}
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholderTextColor={'#ccc'}
                    /> */}
                    <View style={{ marginBottom: 20 }} />
                    <View style={{ marginBottom: 20 }}>
                        <FlatList
                            data={tags}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={[styles.tag, selectedTag === item && { backgroundColor: '#000' }]} onPress={() => setSelectedTag(item)}>
                                    <Text style={{ color: theme['color-secondary-text'] }}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <Text style={{ color: '#B3B3B3'}}>{message}</Text>
                    <View style={{ marginTop: 20 }}>
                        <Button color={'#000'} title='Save' disabled={!isValid} onPress={handleSave}>
                        </Button>
                    </View>
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
        paddingTop: 5,
        backgroundColor: '#fff'
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
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
        backgroundColor: '#B3B3B3',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginHorizontal: 5,
    },
});
