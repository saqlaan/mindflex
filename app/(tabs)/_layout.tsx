import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import Feather from "@expo/vector-icons/Feather";
import { useTheme } from "@ui-kitten/components";

// Custom Tab Bar Background
const TabBarBackground = () => <View style={styles.tabBarBackground} />;

// Reusable Tab Icon Component
const TabBarIcon = ({ name, focused }: { name: string; focused: boolean }) => {
    const theme = useTheme();
    const color = focused ? theme["color-white"] : theme["color-light-gray"];
    return <Feather name={name} size={20} color={color} />;
};

// TabLayout Component
export default function TabLayout() {
    const theme = useTheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: theme["color-white"],
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: styles.tabBarStyleIOS,
                    android: styles.tabBarStyleAndroid,
                }),
            }}
        >
            {/* Home Tab */}
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarLabelStyle: styles.tabBarLabel,
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon name="home" focused={focused} />
                    ),
                }}
            />

            {/* Words Library Tab */}
            <Tabs.Screen
                name="wordsLibrary"
                options={{
                    title: "Your Words",
                    tabBarLabelStyle: styles.tabBarLabel,
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon name="book" focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
}

// Styles
const styles = StyleSheet.create({
    tabBarBackground: {
        backgroundColor: "red",
    },
    tabBarLabel: {
        fontSize: 11,
    },
    tabBarStyleIOS: {
        position: "absolute",
        borderTopWidth: 0,
        backgroundColor: "rgba(0,0,0,0.8)", // Transparent to show the gradient
        height: 85,
        paddingTop: 10,
        paddingBottom: 0,
    },
    tabBarStyleAndroid: {
        backgroundColor: "rgba(0,0,0,1)",
        height: 70,
        paddingTop: 5,
    },
});
