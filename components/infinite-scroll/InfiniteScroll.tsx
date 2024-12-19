import { app_data } from '@/data';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions, ViewToken } from 'react-native';
import WordScrollItem from './components/WordScrollItem';
import { useWordContext } from '@/context/WordsContext';
import { Word } from '@/types';
import { prioritizeWords } from '@/core/priority';
import { readWords, updateWord } from '@/firebase/words/operations';

// Main component
const InfiniteScroll = () => {
    const { words } = useWordContext();
    const flatListRef = useRef<FlatList>(null);
    const currentIndex = useRef(0);

    const moveToNextItem = useCallback((index: number) => {
        console.log({ index })
        flatListRef.current?.scrollToOffset({ offset: height * (index + 1), animated: true })
        // if (currentIndex.current < data.length - 1) {


        //     // flatListRef.current?.scrollToIndex({ index: currentIndex.current, animated: true });
        // }
    }, [])

    const renderItem = ({ item, index }) => {
        return <WordScrollItem word={item} onDifficultyLevelUpdated={moveToNextItem} index={index} />
    }

    const sortedWords = useMemo(() => {
        return words.sort((a, b) => (b.timeSpend ?? 0) - (a.timeSpend ?? 0));
    }, [words])

    const { height } = Dimensions.get('window');

    const onViewableItemsChanged = ({
        viewableItems,
        changed,
    }: {
        viewableItems: (ViewToken & { item: Word })[];
        changed: (ViewToken & { item: Word })[];
    }) => {
        viewableItems.forEach((item) => {
            const { id } = item.item
            if (id === 'END_OF_LIST') return null
            const word = words.find(word => word.id === item.item.id) as Word;
            console.log({ word });
            updateWord(item.item.id, {
                ...word,
                visited: word.visited + 1,
            });

        });
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
    };



    const viewabilityConfig = {
        waitForInteraction: false, // Optional: To ensure the item is being actively interacted with
        viewAreaCoveragePercentThreshold: 100, // Item needs to be at least 50% visible
    };

    return (
        <FlatList
            ref={flatListRef}
            data={[...sortedWords, { id: 'END_OF_LIST' } as Word]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContainer}
            showsVerticalScrollIndicator={false}
            snapToInterval={height} // Snap to the height of each item
            snapToAlignment="start" // Align to the start of the item
            decelerationRate="fast" // Faster deceleration for smoother snapping
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
        // scrollEnabled={false}
        />
    );
};

// Styles
const styles = StyleSheet.create({
    flatListContainer: {

    },
    itemContainer: {
        backgroundColor: '#f4f4f4',
    },
    word: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    translation: {
        fontSize: 16,
        color: 'gray',
    },
    hint: {
        fontSize: 14,
        color: 'darkgray',
        marginTop: 5,
    },
});

export default InfiniteScroll;
