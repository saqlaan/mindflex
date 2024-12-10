import { app_data } from '@/data';
import React from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import WordScrollItem from './components/WordScrollItem';

// Main component
const InfiniteScroll = () => {
    const renderItem = ({ item }) => {
        console.log(item)
        return <WordScrollItem {...item} />
    }

    const { height } = Dimensions.get('window');

    return (
        <FlatList
            data={app_data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContainer}
            showsVerticalScrollIndicator={false}
            snapToInterval={height} // Snap to the height of each item
            snapToAlignment="start" // Align to the start of the item
            decelerationRate="fast" // Faster deceleration for smoother snapping
        // contentContainerStyle={{ paddingVertical: 20 }} // Add some padding to make
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
