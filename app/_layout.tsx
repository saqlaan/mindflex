import { WordProvider } from '@/context/WordsContext';
import { Stack } from 'expo-router';
import * as eva from '@eva-design/eva';

import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';


export default function RootLayout() {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
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
        </ApplicationProvider>
    );
}
