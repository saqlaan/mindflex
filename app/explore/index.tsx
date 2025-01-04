import React from "react";
import { router, useGlobalSearchParams } from "expo-router";
import {
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Header from "@/components/header/Header";
import InfiniteScroll from "@/components/infinite-scroll/InfiniteScroll";
import { EXPLORE, EXPLORE_WORDS_TYPE } from "@/types";

const Explore = () => {
  const { type, level } = useGlobalSearchParams<{ type: EXPLORE_WORDS_TYPE, level?: number }>();

  // Map titles for better scalability
  const titleMap: Record<EXPLORE_WORDS_TYPE, string> = {
    [EXPLORE.ALL]: "All Words",
    [EXPLORE.NEW]: "New Words",
    [EXPLORE.REVIEW]: "Review Words",
  };

  // Default title fallback
  const getTitle = () => titleMap[type] || "Explore";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header Component */}
        <Header
          title={getTitle()}
          headerType="BACK"
          hasBackButton
        />
        {/* Infinite Scroll Section */}
        <InfiniteScroll type={type} level={level} />
      </View>
    </SafeAreaView>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
});

export default Explore;
