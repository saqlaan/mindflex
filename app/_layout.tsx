import { WordProvider } from '@/context/WordsContext';
import { Stack } from 'expo-router';
import * as eva from '@eva-design/eva';
import { default as theme } from "@/theme/theme.json"; // <-- Import app theme
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

export default function RootLayout() {
    console.log = () => { };
    console.warn = () => { };
    console.error = () => { };
    // if (__DEV__) {
    //     console.log = () => { };
    //     console.warn = () => { };
    //     console.error = () => { };
    // }
    useEffect(() => {
        StatusBar.setBarStyle('dark-content'); // Set dark text for white background
    }, []);

    return (
        <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
            <WordProvider>
                
                <Stack initialRouteName='login'>
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
