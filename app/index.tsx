import { Link, router, Stack } from 'expo-router';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback } from 'react';
import { useWordContext } from '@/context/WordsContext';

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
            <ThemedView style={styles.container}>
                <ThemedText darkColor='' type="title">Mindlex</ThemedText>
                <View style={{
                    flex: 1, alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TouchableOpacity style={styles.link} onPress={() => router.navigate('/add-word')}>
                        <ThemedText type="link">Add words</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.link} onPress={() => router.navigate('/words')}>
                        <ThemedText type="link">Your words</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.link} onPress={() => router.navigate('/explore')}>
                        <ThemedText type="link">Visit</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.link} onPress={handleResetTimeSpent}>
                        <ThemedText type="link">Reset time spend</ThemedText>
                    </TouchableOpacity>
                </View>
            </ThemedView>
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
