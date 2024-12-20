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
import AddWordForm from "@/components/add-word/AddWordForm";
import { Text } from "@ui-kitten/components";
import { EXPLORE } from "@/types";
import Logo from "@/assets/images/logo-no-background.png";
import HomeCard from "@/components/home-card/HomeCard";
import Feather from "@expo/vector-icons/Feather";
import alertAnimation from "@/assets/animations/alert.json";
import Explore from "../explore";
import { ExploreSection } from "./components/explore-section/ExploreSection";
import { WordsReviewSection } from "./components/words-review-section/WordsReviewSection";
import { tabHeight } from "@/core/values";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function index() {
  const { resetTimeSpent, newWords, words, reviewWords, refreshReviewWords } =
    useWordContext();
  const animation = useRef<LottieView>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { bottom } = useSafeAreaInsets();

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
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ flex: 1, padding: 20, paddingBottom: tabHeight }}>
          <StatusBar
            barStyle={Platform.OS === "ios" ? "light-contents" : "dark-content"}
          />
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
              gap: 20,
            }}
          >
            <ExploreSection />
            <WordsReviewSection />
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#333",
                // width: 150,
                paddingVertical: 20,
                paddingHorizontal: 20,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                flexDirection: "row",
                gap: 10,
              }}
                          onPress={() => router.navigate('/add-word')}
            >
              <Text style={{ color: "#fff", fontWeight: "500" }}>
                Add new word
              </Text>
              <Ionicons name="add" size={18} color={"#fff"} />
            </TouchableOpacity>
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
