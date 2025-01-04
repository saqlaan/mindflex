import { router, useFocusEffect } from "expo-router";
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  RefreshControl,
  Platform,
} from "react-native";
import LottieView from "lottie-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useRef, useState } from "react";
import { useWordContext } from "@/context/WordsContext";

import { Text } from "@ui-kitten/components";
import Logo from "@/assets/images/logo-no-background.png";
import { tabHeight } from "@/core/values";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ExploreSection } from "@/components/explore-section/ExploreSection";
import { WordsReviewSection } from "@/components/words-review-section/WordsReviewSection";

export default function Index() {
  const { resetTimeSpent, refreshReviewWords } = useWordContext();
  const animation = useRef<LottieView>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Handle screen focus
  useFocusEffect(
    useCallback(() => {
      refreshReviewWords();
      return () => {
        console.log("Screen is out of focus");
      };
    }, [refreshReviewWords])
  );

  // Pull-to-refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      refreshReviewWords();
      setRefreshing(false);
    }, 1500);
  }, [refreshReviewWords]);

  // Handle resetting time spent
  const handleResetTimeSpent = useCallback(() => {
    Alert.alert(
      "Reset Time Spent",
      "Are you sure you want to reset the state of the words?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          style: "destructive",
          onPress: resetTimeSpent,
        },
      ]
    );
  }, [resetTimeSpent]);

  // Add New Word Button Component
  const AddNewWordButton = () => (
    <View style={styles.addWordButtonContainer}>
      <TouchableOpacity
        style={styles.addWordButton}
        onPress={() => router.navigate("/add-word")}
      >
        <Ionicons name="add" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
        </View>

        <View style={styles.contentContainer}>
          <ExploreSection />
          <WordsReviewSection />
        </View>
        <AddNewWordButton />
      </ScrollView>
    </SafeAreaView>
  );
}

// Stylesheet
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    paddingBottom: Platform.OS === "ios" ? 85 : 70,
  },
  scrollViewContent: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: "100%",
    height: 40,
    resizeMode: "contain",
  },
  contentContainer: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: tabHeight,
  },
  addWordButtonContainer: {
    alignItems: "center",
  },
  addWordButton: {
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    flexDirection: "row",
    gap: 10,
    position: "absolute",
    width: 50,
    height: 50,
    right: 20,
    bottom: 20,
  },
  addWordText: {
    color: "#fff",
    fontWeight: "500",
  },
});
