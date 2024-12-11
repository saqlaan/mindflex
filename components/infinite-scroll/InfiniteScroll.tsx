import { app_data } from '@/data';
import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions, ViewToken } from 'react-native';
import WordScrollItem from './components/WordScrollItem';
import { useWordContext } from '@/context/WordsContext';
import { Word } from '@/types';
import { prioritizeWords } from '@/core/priority';

// Main component
const InfiniteScroll = () => {
    const { words, updateWord } = useWordContext();



    const renderItem = ({ item }) => {
        return <WordScrollItem word={item} />
    }

    const { height } = Dimensions.get('window');

    const onViewableItemsChanged = ({
        viewableItems,
        changed,
    }: {
        viewableItems: (ViewToken & { item: Word })[];
        changed: (ViewToken & { item: Word })[];
    }) => {
        viewableItems.forEach((item) => {
            if (item.item.id === -1) return
            const word = words.find(word => word.id === item.item.id) as Word;
            updateWord({
                ...word,
                timeStart: Date.now()
            });
        });
        changed.forEach((item, index) => {
            if (item.item.id === -1) return
            if (!item.isViewable) {
                const word = words.find(word => word.id === item.item.id) as Word;
                updateWord({
                    ...word,
                    timeSpend: (word.timeSpend || 0) + (Date.now() - (word.timeStart || Date.now())),
                    timeStart: undefined
                });
            }
        });
    };

    const viewabilityConfig = {
        waitForInteraction: false, // Optional: To ensure the item is being actively interacted with
        viewAreaCoveragePercentThreshold: 100, // Item needs to be at least 50% visible
    };

    return (
        <FlatList
            data={[...words, { id: -1 } as Word]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContainer}
            showsVerticalScrollIndicator={false}
            snapToInterval={height} // Snap to the height of each item
            snapToAlignment="start" // Align to the start of the item
            decelerationRate="fast" // Faster deceleration for smoother snapping
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
        />
    );
};

// Styles
const styles = StyleSheet.create({
    flatListContainer: {

    },
    itemContainer: {
        // marginBottom: 15,
        // padding: 10,
        backgroundColor: '#f4f4f4',
        // borderRadius: 8,
        // elevation: 2, // Adds a subtle shadow for Android
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
