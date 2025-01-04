import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, FlatList, Text, StyleSheet, Dimensions } from "react-native";
import { Button, ButtonGroup, Layout } from "@ui-kitten/components";
import WordScrollItem from "./components/WordScrollItem";
import { useWordContext } from "@/context/WordsContext";
import { DIFFICULTY_LEVEL, EXPLORE, EXPLORE_WORDS_TYPE, Word } from "@/types";
import { updateWord } from "@/firebase/words/operations";
import { computeNextReviewDateTime } from "@/lib/functions/next-review-date-time";
import { CircularButton } from "../circular-button/CircularButton";
import Feather from "@expo/vector-icons/Feather";
import { shuffleWords } from "@/lib/functions/shuffle-words";

const InfiniteScroll = ({ type, level }: { type: EXPLORE_WORDS_TYPE, level?: number }) => {
  const { words, newWords, reviewWords } = useWordContext();
  const [visitWords, setVisitWords] = useState<Word[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const [focusedItem, setFocusedItem] = useState<{
    word: Word;
    index: number;
  } | null>(null);
  const { height } = Dimensions.get("window");

  useEffect(() => {
    if (type === EXPLORE.NEW) {
      setVisitWords(shuffleWords(newWords));
    } else if (type === EXPLORE.REVIEW) {
      if (level) {
        const reviewWordsByLevel = reviewWords.filter(word => word.difficultyLevel == level);
        console.log({ level });
        setVisitWords(shuffleWords(reviewWordsByLevel));
      } else {
        setVisitWords(shuffleWords(reviewWords));
      }
    } else if (type === EXPLORE.ALL) {
      setVisitWords(shuffleWords(words));
    }
  }, [type, level, reviewWords, newWords, words]);


  const renderItem = ({ item }: { item: Word }) => (
    <WordScrollItem word={item} />
  );

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: { item: Word; index: number }[];
  }) => {
    viewableItems.forEach((item) => {
      const { id, visited } = item.item;
      setFocusedItem({ word: item.item, index: item.index });
      if (id !== "END_OF_LIST") return;
      //   TODO: WILL see what we can do about the visited only without selecting the difficulty level
      //   const word = words.find((word) => word.id === item.item.id) as Word;
      //   if (!word) return;
      //   updateWord(id, { ...word, visited: visited + 1 });
    });
  };

  const onSelectDifficultyLevel = useCallback(
    (difficulty: number) => {
      const nextReviewOn = computeNextReviewDateTime(difficulty);
      if (focusedItem?.word.id) {
        updateWord(focusedItem.word.id, {
          difficultyLevel: difficulty as DIFFICULTY_LEVEL,
          lastVisitedOn: new Date().toISOString(),
          nextReviewOn,
          visited: focusedItem.word.visited + 1,
        });
      }
      flatListRef.current?.scrollToOffset({
        offset: height * (Number(focusedItem?.index) + 1),
        animated: true,
      });
    },
    [focusedItem, height]
  );

  const viewabilityConfig = {
    waitForInteraction: false,
    viewAreaCoveragePercentThreshold: 100,
  };

  const fetchMoreWords = useCallback(() => {
    console.log('fetchMoreItem')
  }, [])

  return (
    <View style={{flex:1, position:'relative'}}>
      <FlatList
        ref={flatListRef}
        data={[...visitWords, { id: "END_OF_LIST" } as Word]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEnabled={type !== EXPLORE.ALL ? false : true}
        onEndReached={fetchMoreWords}
        onEndReachedThreshold={0.1}
      />
      {type !== EXPLORE.ALL && focusedItem?.word.id !== "END_OF_LIST" && (
        <Layout style={styles.difficultyLayout}>
          <View style={styles.buttonContainer}>
            <Text style={styles.difficultyLabel}>Select Difficulty Level</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <CircularButton
                number={1}
                text="Easy"
                onPress={() => onSelectDifficultyLevel(1)}
                backgroundColor="#4CAF50"
              />
              <CircularButton
                number={2}
                text="Moderate"
                onPress={() => onSelectDifficultyLevel(2)}
                backgroundColor="#CDDC39"
              />
              <CircularButton
                number={3}
                text="Intermediate"
                onPress={() => onSelectDifficultyLevel(3)}
                backgroundColor="#FFC107"

              />
              <CircularButton
                number={4}
                text="Challenging"
                onPress={() => onSelectDifficultyLevel(4)}
                backgroundColor="#FF5722"
              />
              <CircularButton
                number={5}
                text="Difficult"
                onPress={() => onSelectDifficultyLevel(5)}
                backgroundColor="#F44336"
              />
            </View>
          </View>
        </Layout>
      )}
      {type === EXPLORE.ALL && focusedItem?.word.id !== "END_OF_LIST" && (
        <Layout style={styles.difficultyLayout}>
          <View style={styles.buttonContainer}>
            <Text style={styles.difficultyLabel}></Text>
            <Feather color={"#B3B3B3"} name="chevron-up" size={18}></Feather>
            <Feather color="#B3B3B3" name="chevron-down" size={18}></Feather>
          </View>
        </Layout>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  flatListContainer: {
  },
  difficultyLayout: {
    flexDirection: "row",
    position: "absolute",
    bottom: 50,
    backgroundColor: "transparent",
  },
  buttonContainer: {
    alignItems: "center",
    flex: 1,
  },
  difficultyLabel: {
    marginBottom: 10,
    fontSize: 11,
    color: 'grey'
  },
  buttonGroup: {
    margin: 2,
  },
});

export default InfiniteScroll;

// changed.forEach((item, index) => {
//     const { id } = item.item
//     if (id === 'END_OF_LIST') return null
//     if (!item.isViewable) {
//         const word = words.find(word => word.id === item.item.id) as Word;
//         updateWord(item.item.id, {
//             ...word,
//             timeSpend: ((word.timeSpend || 0) + (word.timeStart ? Date.now() - word.timeStart : 0)),
//             timeStart: 0
//         });
//         console.log({
//             timeStart: word.timeStart,
//             spend: Date.now() - (word.timeStart || 0)
//         })
//     }
// });
