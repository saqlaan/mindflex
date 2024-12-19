import { Link, router, Stack } from 'expo-router';
import { Alert, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback } from 'react';
import { useWordContext } from '@/context/WordsContext';
import AddWordForm from '@/components/add-word/AddWordForm';
import { Button } from '@ui-kitten/components';

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

                    <View style={{ flexDirection: 'column', gap: 10 }}>
                        <Button onPress={() => router.navigate('/add-word')} >
                            Add words
                        </Button>

                        <Button onPress={() => router.navigate('/explore')} >New words</Button>
                        <Button onPress={() => router.navigate('/words')} >Your words</Button>
                        <Button onPress={() => router.navigate('/explore')} >Visit</Button>
                        <Button onPress={handleResetTimeSpent} >Reset time spend</Button>
                    </View>
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
