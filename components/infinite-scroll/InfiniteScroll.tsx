import { app_data } from '@/data';
import React, { useRef, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import WordScrollItem from './components/WordScrollItem';
import { useWordContext } from '@/context/WordsContext';
import { Word } from '@/types';

// Main component
const InfiniteScroll = () => {
    const { words, updateWord } = useWordContext();
    const [startTime, setStartTime] = useState<number | null>(null);

    const renderItem = ({ item }) => {
        return <WordScrollItem {...item} />
    }

    const [timeSpent, setTimeSpent] = useState({});

    // console.log(timeSpent);

    const { height } = Dimensions.get('window');

    const onViewableItemsChanged = ({
        viewableItems,
        changed
    }: {
        viewableItems: { index: number; isViewable: boolean; item: Word }[];
        changed: { index: number; isViewable: boolean; item: Word }[]
    }) => {
        // Handle viewable items
        console.log({ viewableItems })
        viewableItems.forEach((item) => {
            updateWord({
                ...item.item,
                timeStart: item.item.timeStart ?? Date.now() // Use default value if undefined
            });
        });
        // Handle changed items
        changed.forEach((item) => {
            if (!item.isViewable) {
                updateWord({
                    ...item.item,
                    timeSpend: (item.item.timeSpend || 0) + (Date.now() - (item.item.timeStart || Date.now())),
                    timeStart: undefined // Reset timeStart after use, if needed
                });
                console.log("Time spent: ", (Date.now() - (item.item.timeStart || Date.now())));
            }
        });
    };


    console.log(words);

    const viewabilityConfig = {
        waitForInteraction: false, // Optional: To ensure the item is being actively interacted with
        viewAreaCoveragePercentThreshold: 100, // Item needs to be at least 50% visible
    };

    return (
        <FlatList
            data={words}
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
