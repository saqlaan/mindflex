import Header from "@/components/header/Header";
import InfiniteScroll from "@/components/infinite-scroll/InfiniteScroll";
import { ThemedText } from "@/components/ThemedText";
import { EXPLORE, EXPLORE_WORDS_TYPE } from "@/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useGlobalSearchParams } from "expo-router";
import React, { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
  Button,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Explore = () => {
  const { top } = useSafeAreaInsets();
  const { type } = useGlobalSearchParams<{ type: EXPLORE_WORDS_TYPE }>();

  const getTitle = () => {
    switch(type){
        case EXPLORE.ALL:
            return "All words";
        case EXPLORE.NEW:
            return "New words";
        case EXPLORE.REVIEW:
            return "Review words";
        default:
            return ""
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      
      <View style={{ flex: 1, }}>
        <Header title={getTitle()} headerType="BACK" hasBackButton></Header>
        
        <InfiniteScroll type={type} />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  card: {
    width: 300,
    height: 200,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: "hidden",
    borderRadius: 10,
  },
  cardBack: {
    position: "absolute",
    top: 0,
    backgroundColor: "#dfe6e9",
  },
  word: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d3436",
  },
  hintButton: {
    marginTop: 20,
    backgroundColor: "#0984e3",
    padding: 10,
    borderRadius: 5,
  },
  hintText: {
    color: "#fff",
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 250,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  hintModalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#d63031",
    padding: 10,
    borderRadius: 5,
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
  },
  meaning: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2d3436",
    textAlign: "center",
    marginBottom: 20,
  },
  difficultyButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  difficultyButton: {
    marginHorizontal: 10,
    backgroundColor: "#00cec9",
    padding: 10,
    borderRadius: 5,
  },
  difficultyText: {
    color: "#fff",
    fontSize: 16,
  },
  tapToFlip: {
    marginTop: 30,
    padding: 10,
    backgroundColor: "#6c5ce7",
    borderRadius: 5,
  },
  tapText: {
    color: "#fff",
    fontSize: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Explore;
