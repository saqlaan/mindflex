import Header from "@/components/header/Header";
import { ThemedText } from "@/components/ThemedText";
import { useWordContext } from "@/context/WordsContext";
import { deleteWord, readWords, subscribeToWords } from "@/firebase/words/operations";
import { Word } from "@/types";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function WordsLibrary({ navigation }: { navigation: any }) {
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* <Header title="Back" headerType="BACK" /> */}
      <View style={styles.container}>
        <Text>Under construction</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff", alignItems: 'center', justifyContent: 'center' },
  
});
