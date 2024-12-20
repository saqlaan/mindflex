import { WordProvider } from '@/context/WordsContext';
import { Stack } from 'expo-router';
import * as eva from '@eva-design/eva';
import { default as theme } from "@/theme/theme.json"; // <-- Import app theme
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
// import FlashMessage from "react-native-flash-message";



export default function RootLayout() {
    // console.log = () => { };
    // console.warn = () => { };
    // console.error = () => { };
    // if (__DEV__) {
    //     console.log = () => { };
    //     console.warn = () => { };
    //     console.error = () => { };
    // }
    return (
        <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
            <WordProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen options={{ presentation: 'modal', headerTitle: 'Add word', headerShown: false }} name="add-word" />
                        <Stack.Screen options={{ headerTitle: '', headerShown: false }} name="explore/index" /> 
                    <Stack.Screen name="+not-found" />
                </Stack>
            </WordProvider>
            
        </ApplicationProvider>
        </>
    );
}
