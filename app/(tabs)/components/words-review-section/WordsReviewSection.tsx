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

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCallback, useRef, useState } from "react";
import { useWordContext } from "@/context/WordsContext";

import { Text } from "@ui-kitten/components";
import Ionicons from "@expo/vector-icons/Ionicons";
import { EXPLORE } from "@/types";

export const WordsReviewSection = () => {
  const { reviewWords, newWords } = useWordContext();
  if (reviewWords.length === 0)
    return (
      <View
        style={{
          backgroundColor: "#F8F8F8",
          borderRadius: 20,
          padding: 30,
          paddingHorizontal: 20,
          gap: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3, // For Android shadow
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 20,
        }}
      >
        <Ionicons name="trophy" size={45} color={"#333"} />
        <View
          style={{
            gap: 10,
            alignItems: "flex-end",
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          <Text
            category="h6"
            style={{
              color: "#333",
              flexWrap: "nowrap",
              marginTop: 0,
              textAlign: "right",
            }}
          >
            You have no pending reviews
          </Text>
          {newWords.length > 0 ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#1DB954",
                paddingVertical: 20,
                paddingHorizontal: 20,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                flexDirection: "row",
                gap: 5,
              }}
              onPress={() => router.navigate(`/explore?type=${EXPLORE.NEW}`)}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "500",
                  textAlign: "right",
                }}
              >
                Review new words
              </Text>
              <Ionicons name="rocket" size={18} color={"#fff"} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "#1DB954",

                paddingVertical: 20,
                paddingHorizontal: 20,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                flexDirection: "row",
                gap: 5,
              }}
              onPress={() => router.navigate("/add-word")}
            >
              <Text style={{ color: "#fff", fontWeight: "500" }}>
                Add new words
              </Text>
              <Ionicons name="rocket" size={18} color={"#fff"} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  return (
    <View
      style={{
        backgroundColor: "#F8F8F8",
        borderRadius: 20,
        padding: 30,
        paddingHorizontal: 20,
        gap: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // For Android shadow
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <View>
        <Ionicons name="warning" size={50} color={"#ffbc03"} />
      </View>
      <View style={{ gap: 10, alignItems: "flex-end", flex: 1 }}>
        <Text
          category="h5"
          style={{
            color: "#333",
            flexWrap: "nowrap",
            marginTop: 0,
            textAlign: "right",
          }}
        >
          {reviewWords.length} word{reviewWords.length === 1 ? "" : "s"} ready
          for review
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#1DB954",
            paddingVertical: 20,
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            flexDirection: "row",
            gap: 5,
          }}
          onPress={() => router.navigate(`/explore?type=${EXPLORE.REVIEW}`)}
        >
          <Text style={{ color: "#fff", fontWeight: "500" }}>Review Now</Text>
          <Ionicons name="rocket" size={18} color={"#fff"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
