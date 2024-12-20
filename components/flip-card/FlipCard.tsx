import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    StyleProp,
    ViewStyle,
    TextStyle,
    Dimensions,
    Platform,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    interpolate,
} from 'react-native-reanimated';

interface FlipCardProps {
    frontText: string;
    backText: string;
    width?: number;
    height?: number;
    duration?: number;
    cardStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const wWidth = Dimensions.get("window").width;
const wHeight = Dimensions.get("window").height;

const FlipCard: React.FC<FlipCardProps> = ({
    frontText,
    backText,
    width = 200, // Default width 200
    height = 400, // Default height 400
    duration = 500,
    cardStyle,
    textStyle,
}) => {
    const rotate = useSharedValue(0);

    const frontAnimatedStyle = useAnimatedStyle(() => {
        const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
        return {
            transform: [
                {
                    rotateY: withTiming(`${rotateValue}deg`, { duration }),
                },
            ],
        };
    });

    const backAnimatedStyle = useAnimatedStyle(() => {
        const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
        return {
            transform: [
                {
                    rotateY: withTiming(`${rotateValue}deg`, { duration }),
                },
            ],
        };
    });

    const handleFlip = () => {
        rotate.value = rotate.value ? 0 : 1;
    };

    return (
        <View style={styles.container}>
            
            <Pressable onPress={handleFlip} style={[styles.cardContainer]}>
                <Animated.View
                    style={[styles.card, frontAnimatedStyle]}>
                    <Text style={[styles.text, textStyle]}>{frontText}</Text>
                </Animated.View>
                <Animated.View
                    style={[styles.card, { backgroundColor: '#eee' }, backAnimatedStyle]}>
                    <Text style={[styles.text, textStyle]}>{backText}</Text>
                </Animated.View>
            </Pressable>
            <Text style={{fontSize: 11, color: 'grey', marginTop: 10}}>Tap to flip</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: Platform.OS === "ios"? 30: 50,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        position: 'relative',
        width: 200,
        height:400,
        alignItems: 'center'
    },
    card: {
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backfaceVisibility: 'hidden',
        width: wWidth - 80,
        height: 400,
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 2.5, // Shadow radius
        // Android Shadow
        elevation: 5, // Elevation for Android
    },
    text: {
        fontSize: 22,
        fontWeight: 'normal',
        color: '#333',
    },
});

export default FlipCard;
