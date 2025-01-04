import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useWordContext } from "@/context/WordsContext";
import HomeCard from "@/components/home-card/HomeCard";
import { EXPLORE } from "@/types";

export const ExploreSection = () => {
    const { newWords, words } = useWordContext();
    const hasWords = words.length > 0;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text category="h4" style={styles.headerText}>
                    Explore
                </Text>
                <Ionicons name="rocket-outline" size={32} color="#1DB954" />
            </View>
            <View style={styles.cardContainer}>
                <HomeCard
                    value={words.length}
                    title={hasWords ? "All words" : "Please add words"}
                    onPress={hasWords ? () => router.navigate(`/explore?type=${EXPLORE.ALL}`) : null}
                    textColor="#333"
                    icon={<Ionicons name="library-outline" size={50} color="#1DB954" />}
                />
                <HomeCard
                    value={newWords.length}
                    title={hasWords ? "New words" : "Please add words"}
                    bgColor="#73EA85"
                    textColor="#333"
                    onPress={hasWords ? () => router.navigate(`/explore?type=${EXPLORE.NEW}`) : null}
                    icon={<Ionicons name="sparkles-outline" size={32} color="#055843" />}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: 20,
        marginTop: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    headerText: {
        color: "#333",
    },
    cardContainer: {
        flexDirection: "row",
        gap: 10,
    },
});
