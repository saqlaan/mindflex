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
    Platform,
} from "react-native";
import LottieView from "lottie-react-native";

import { ThemedText } from "@/components/ThemedText";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useCallback, useRef, useState } from "react";
import { useWordContext } from "@/context/WordsContext";

import { Text } from "@ui-kitten/components";
import { EXPLORE } from "@/types";

import HomeCard from "@/components/home-card/HomeCard";
import Feather from "@expo/vector-icons/Feather";
import alertAnimation from "@/assets/animations/alert.json";
import Ionicons from "@expo/vector-icons/Ionicons";

export const ExploreSection =()=>  {
    const { resetTimeSpent, newWords, words, reviewWords, refreshReviewWords } =
        useWordContext();

    return (
        <View style={{ gap: 20, marginTop: 20, }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Text category="h4" style={{ color: '#333'}}>Explore</Text>
                <Ionicons name="rocket-outline" size={32} color={'#1DB954'}/>
            </View>
            <View style={{ flexDirection: "row", gap: 10}}>
                <HomeCard
                    value={words.length}
                    title={words.length> 0?"All words": "Please add words"}
                    onPress={words.length > 0? () => router.navigate(`/explore?type=${EXPLORE.ALL}`): () => null}
                    textColor="#333"
                    icon={<Ionicons name="library-outline" size={50} color={'#1DB954'} />}
                />
                <HomeCard
                    title={words.length > 0 ? "New words" : "Please add words"}
                    bgColor="#73EA85"
                    value={newWords.length}
                    textColor="#333"
                    onPress={words.length > 0 ? () => router.navigate(`/explore?type=${EXPLORE.NEW}`) : () => null}
                    icon={<Ionicons name="sparkles-outline" size={32} color={'#055843'} />}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});
