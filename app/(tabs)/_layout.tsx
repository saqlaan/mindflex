import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Icon, useTheme } from '@ui-kitten/components';
import Feather from '@expo/vector-icons/Feather';

const TabBarBackground = () => (
    <View style={{ backgroundColor: 'red' }} />
);

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const theme = useTheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme['color-white'],
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: () => <TabBarBackground />,
                tabBarStyle: Platform.select({
                    ios: {
                        position: 'absolute',
                        borderTopWidth: 0,
                        backgroundColor: 'rgba(0,0,0,0.8)', // Transparent to show the gradient
                        height: 85,
                        paddingTop: 10,
                        paddingBottom: 0
                    },
                    android: {
                        backgroundColor: 'rgba(0,0,0,1)',
                        height:70,
                        paddingTop:5,
                    }
                }),
            }}>

            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarLabelStyle: { fontSize: 11 },
                    tabBarIcon: ({ focused }) => <Feather name={'home'} size={20} color={focused ? theme['color-white'] : theme['color-light-gray']} />
                    ,
                }}
            />
            <Tabs.Screen
                name="add-word"
                options={{
                    title: 'Add Word',
                    tabBarLabelStyle: { fontSize: 11 },
                    tabBarIcon: ({ focused }) => <Feather name={'plus-square'} size={20} color={focused ? theme['color-white'] : theme['color-light-gray']} />,
                }}
            />
            <Tabs.Screen
                name="wordsLibrary"
                options={{
                    title: 'Your Words',
                    tabBarLabelStyle: { fontSize: 11 },
                    tabBarIcon: ({ focused }) => <Feather name={'book'} size={20} color={focused ? theme['color-white'] : theme['color-light-gray']} />,
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarLabelStyle: { fontSize: 11 },
                    tabBarIcon: ({ focused }) => <Feather name={'settings'} size={20} color={focused ? theme['color-white'] : theme['color-light-gray']} />,
                }}
            />
        </Tabs>
    );
}
const styles = StyleSheet.create({
    icon: {
        width: 32,
        height: 32,
    },
});