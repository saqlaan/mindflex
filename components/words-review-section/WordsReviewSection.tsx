import { router } from "expo-router";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Text } from "@ui-kitten/components";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useWordContext } from "@/context/WordsContext";
import { EXPLORE } from "@/types";

// Define an array for difficulty levels with word count
const difficultyLevels = [
  { name: "Difficult", color: "#D32F2F", wordCount: 5, level: 5}, // Red
  { name: "Challenging", color: "#FF5722", wordCount: 10, level: 4 }, // Deep Orange
  { name: "Intermediate", color: "#FFC107", wordCount: 7, level: 3 }, // Amber
  { name: "Moderate", color: "#FFEB3B", wordCount: 12, level: 2 }, // Yellow
  { name: "Easy", color: "#4CAF50", wordCount: 15, level: 1 }, // Green
];

export const WordsReviewSection = () => {
  const { reviewWords, newWords, words } = useWordContext();

  // Determine if there are words for review or new words to explore
  const hasReviewWords = reviewWords.length > 0;
  const buttonLabel = hasReviewWords ? "Review Now" : "Add new words";
  const buttonTarget = hasReviewWords
    ? `/explore?type=${EXPLORE.REVIEW}`
    : newWords.length > 0
      ? `/explore?type=${EXPLORE.NEW}`
      : "/add-word";

  const getWordsByDifficulty = (level: number) => {
    return words.filter((word) => word.difficultyLevel === level).length;
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text category="h4" style={styles.headerText}>
          Review
        </Text>
        <Ionicons
          name={hasReviewWords ? "warning-outline" : "checkmark-outline"}
          size={32}
          color={hasReviewWords ? "#FFA500" : "#1DB954"}
        />
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Ionicons
          name={hasReviewWords ? "warning" : "trophy"}
          size={45}
          color={hasReviewWords ? "#FFA500" : "#333"}
        />
        <View style={styles.info}>
          <Text category="h6" style={styles.message}>
            {hasReviewWords
              ? `${reviewWords.length} word${reviewWords.length === 1 ? "" : "s"
              } ready for review`
              : "You have no pending reviews"}
          </Text>

          {/* Action Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.navigate(buttonTarget)}
          >
            <Text style={styles.buttonText}>{buttonLabel}</Text>
            <Ionicons name="rocket" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Difficulty Level Boxes - Row wise */}
      <View style={styles.difficultyContainer}>
        {difficultyLevels.map(({ name, color, wordCount, level }, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.difficultyBox, { backgroundColor: color }]}
            onPress={()=> router.navigate(`/explore?type=${EXPLORE.REVIEW}&level=${level}`)}
          >
            <Text style={styles.difficultyText}>
              {name} ({getWordsByDifficulty(level)} words)
            </Text>
          </TouchableOpacity>
        ))}
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
  content: {
    backgroundColor: "#F8F8F8",
    borderRadius: 20,
    padding: 15,
    paddingHorizontal: 20,
    gap: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: Platform.OS === "android" ? 3 : 0, // Android shadow
    flexDirection: "row",
    alignItems: "flex-start",
  },
  info: {
    gap: 10,
    alignItems: "flex-start",
    flex: 1,
  },
  message: {
    color: "#333",
    marginTop: 0,
    textAlign: "left",
  },
  button: {
    backgroundColor: "#1DB954",
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    flexDirection: "row",
    gap: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
  difficultyContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Allow wrapping if there are too many items to fit in a row
    gap: 10, // Add gap between the boxes
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  difficultyBox: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  difficultyText: {
    color: "black",
    fontWeight: "500",
  },
});
