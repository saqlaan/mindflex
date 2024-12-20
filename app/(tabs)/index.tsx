import { router, useFocusEffect } from "expo-router";
import {
    Alert,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
    ScrollView,
    Image,
    RefreshControl,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import { useWordContext } from "@/context/WordsContext";
import AddWordForm from "@/components/add-word/AddWordForm";
import { Text } from "@ui-kitten/components";
import { EXPLORE } from "@/types";
import Logo from "@/assets/images/logo-no-background.png";
import HomeCard from "@/components/home-card/HomeCard";
import Feather from "@expo/vector-icons/Feather";

export default function index() {
    const {
        resetTimeSpent,
        newWords,
        words,
        reviewWords,
        refreshReviewWords,
    } = useWordContext();
    const [refreshing, setRefreshing] = useState(false);


    useFocusEffect(
        useCallback(() => {
            refreshReviewWords();
            return () => {
                console.log("Screen is out of focus");
            };
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);

        // Simulate fetching new data
        setTimeout(() => {
            // Add a new item to the list
            refreshReviewWords();
            setRefreshing(false);
        }, 1500); // Simulate a 1.5-second network request
    };

    const handleResetTimeSpent = useCallback(() => {
        Alert.alert(
            "Reset time spend",
            "Are you sure you want to the state of the words?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Confirm",
                    style: "destructive",
                    onPress: () => resetTimeSpent(),
                },
            ]
        );
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={{ flex: 1, padding: 20 }}>
                <StatusBar barStyle={"default"} />
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        source={Logo}
                        style={{ width: "100%", height: 40, objectFit: "contain" }}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "space-between",
                        paddingBottom: 70,
                    }}
                >
                    <View>
                        <View style={{ flexDirection: "row", gap: 10, paddingTop: 40 }}>
                            {/* <HomeCard value={newWords.length} title='New words' bgColor='#1DB954' textColor='#fff' onPress={() => router.navigate(`/explore?type=${EXPLORE.NEW}`)} /> */}
                            <HomeCard
                                value={words.length}
                                title="All words"
                                onPress={() =>
                                    router.navigate(`/explore?type=${EXPLORE.ALL}`)
                                }
                            />
                            <HomeCard
                                title="Add new words"
                                bgColor="#000"
                                textColor="#fff"
                                onPress={() => router.navigate('/add-word')}
                            />
                        </View>
                        <View style={{ flexDirection: "row", paddingTop: 10 }}></View>
                    </View>

                    <View>
                        {newWords.length > 0 && (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#000",
                                    padding: 20,
                                    borderRadius: 15,
                                    flexDirection: "row",
                                    marginBottom: 10,
                                }}
                                onPress={() => router.navigate(`/explore?type=${EXPLORE.NEW}`)}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        flex: 1,
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <View style={{ flexDirection: "row" }}>
                                        <Text
                                            style={{
                                                color: "#fff",
                                                fontWeight: 600,
                                                marginRight: 10,
                                            }}
                                        >
                                            Review New words
                                        </Text>
                                        <View
                                            style={{
                                                width: 20,
                                                height: 20,
                                                backgroundColor: "#fff",
                                                borderRadius: 20,
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Text style={{ fontSize: 11 }}>{newWords.length}</Text>
                                        </View>
                                    </View>
                                    <Feather name={"navigation"} size={20} color={"#fff"} />
                                </View>
                            </TouchableOpacity>
                        )}
                        
                        {reviewWords.length > 0 ? (
                            <>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "#1DB954",
                                        padding: 20,
                                        borderRadius: 15,
                                        flexDirection: "row",
                                    }}
                                    onPress={() =>
                                        router.navigate(`/explore?type=${EXPLORE.REVIEW}`)
                                    }
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            flex: 1,
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <View style={{ flexDirection: "row" }}>
                                            <Text
                                                style={{
                                                    color: "#fff",
                                                    fontWeight: 600,
                                                    marginRight: 10,
                                                }}
                                            >
                                                Review words
                                            </Text>
                                            <View
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    backgroundColor: "#fff",
                                                    borderRadius: 20,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Text style={{ fontSize: 11 }}>{reviewWords.length}</Text>
                                            </View>
                                        </View>
                                        <Feather name={"clock"} size={20} color={"#fff"} />
                                    </View>
                                </TouchableOpacity>
                                <Text
                                    style={{ marginTop: 10, color: "#121212", textAlign: "center" }}
                                >
                                    You have some words to review
                                </Text>
                            </>
                        ) : (
                            <View>
                                <Text
                                    style={{ marginTop: 10, color: "#121212", textAlign: "center" }}
                                >
                                    Great job! You currently don't have any words to review.
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});
