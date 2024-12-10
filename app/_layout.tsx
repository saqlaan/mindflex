import { WordProvider } from '@/context/WordsContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <WordProvider>
            <Stack
                screenOptions={{}}>
                <Stack.Screen options={{ headerTitle: '', headerShown: false }} name="index" />
                <Stack.Screen options={{ headerShown: false }} name="words" />
                <Stack.Screen options={{ presentation: 'modal', headerTitle: 'Add word', headerShown: false }} name="add-word" />
                <Stack.Screen options={{ headerTitle: '', headerShown: false }} name="single-word" />
                <Stack.Screen options={{ presentation: 'modal', headerTitle: '', }} name="hint" />
                <Stack.Screen options={{ headerTitle: '', headerShown: false }} name="explore/index" />
            </Stack>
        </WordProvider>
    );
}
