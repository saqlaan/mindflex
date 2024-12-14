import { Link, router, Stack } from 'expo-router';
import { Alert, Button, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback } from 'react';
import { useWordContext } from '@/context/WordsContext';
import AddWordForm from '@/components/add-word/AddWordForm';

export default function HomeScreen() {
    const { updateWord, resetTimeSpent } = useWordContext()

    const handleResetTimeSpent = useCallback(() => {
        Alert.alert("Reset time spend", "Are you sure you want to the state of the words?", [
            { text: "Cancel", style: "cancel" },
            { text: "Confirm", style: "destructive", onPress: () => resetTimeSpent() },
        ]);
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle={"default"} />
            <View style={styles.container}>
                <ThemedText darkColor='' type="title">Mindlex</ThemedText>
                <View style={{
                    flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 50
                }}>
                    <AddWordForm />

                    <Button title='Add words' onPress={() => router.navigate('/add-word')} />
                    <Button title='Your words' onPress={() => router.navigate('/words')} />
                    <Button title='Visit' onPress={() => router.navigate('/explore')} />
                    <Button title='Reset time spend' onPress={handleResetTimeSpent} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        padding: 20,
    },
    link: {
    },
});
