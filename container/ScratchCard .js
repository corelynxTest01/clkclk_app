import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    PanResponder,
    Dimensions,
    Image,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = CARD_WIDTH * 0.6;

const ScratchCard = ({ reward, onReveal }) => {
    const [scratched, setScratched] = useState(false);
    const [scratchPercentage, setScratchPercentage] = useState(0);
    const [revealAnimationComplete, setRevealAnimationComplete] = useState(false);
    const scratchedPoints = useRef(new Set()).current;
    const animation = useRef(new Animated.Value(0)).current;

    // Virtual grid for tracking scratched areas (10x10 grid = 100 cells)
    const GRID_SIZE = 10;
    const CELL_WIDTH = CARD_WIDTH / GRID_SIZE;
    const CELL_HEIGHT = CARD_HEIGHT / GRID_SIZE;

    // Create pan responder for tracking scratch gestures
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,

            onPanResponderMove: (event) => {
                if (scratched) return;

                // Get absolute position of the touch
                const { locationX, locationY } = event.nativeEvent;

                // Convert absolute position to relative position on card
                const relativeX = Math.floor(locationX / CELL_WIDTH);
                const relativeY = Math.floor(locationY / CELL_HEIGHT);

                // Ensure we're within bounds
                if (
                    relativeX >= 0 &&
                    relativeX < GRID_SIZE &&
                    relativeY >= 0 &&
                    relativeY < GRID_SIZE
                ) {
                    // Add this point to our scratched set
                    const pointKey = `${relativeX}-${relativeY}`;
                    scratchedPoints.add(pointKey);

                    // Calculate percentage scratched
                    const percentage = (scratchedPoints.size / (GRID_SIZE * GRID_SIZE)) * 100;
                    setScratchPercentage(percentage);

                    // If we've scratched more than 50%, reveal the whole card
                    if (percentage > 50 && !scratched) {
                        setScratched(true);
                        // Animated reveal
                        Animated.timing(animation, {
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: true,
                        }).start(() => {
                            setRevealAnimationComplete(true);
                            if (onReveal) onReveal(reward);
                        });
                    }
                }
            },
        })
    ).current;

    // Define opacity for the scratch layer
    const scratchLayerOpacity = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });

    // Define scale animation for reward reveal
    const rewardScale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.8, 1],
    });

    return (
        <View style={styles.container}>
            {/* Card title */}
            <Text style={styles.cardTitle}>Scratch to reveal your reward!</Text>

            <View style={styles.cardContainer}>
                {/* Reward content (hidden behind scratch layer) */}
                <Animated.View
                    style={[
                        styles.rewardContainer,
                        { transform: [{ scale: rewardScale }] },
                    ]}
                >
                    <Text style={styles.rewardTitle}>Congratulations!</Text>
                    <Text style={styles.rewardText}>{reward}</Text>
                    <Image
                        source={require('../assets/images/eReview-icon.png')} // Replace with your celebration image
                        style={styles.celebrationImage}
                        resizeMode="contain"
                    />
                </Animated.View>

                {/* Scratch layer */}
                {!revealAnimationComplete && (
                    <Animated.View
                        {...panResponder.panHandlers}
                        style={[
                            styles.scratchLayer,
                            {
                                opacity: scratchLayerOpacity,
                            },
                        ]}
                    >
                        <BlurView
                            style={StyleSheet.absoluteFill}
                            blurType="light"
                            blurAmount={0}
                        />
                        <View style={styles.scratchInstructions}>
                            <Text style={styles.scratchText}>
                                {scratched
                                    ? "Revealing your reward..."
                                    : "Scratch here!"}
                            </Text>
                            {!scratched && (
                                <Text style={styles.progressText}>
                                    {Math.round(scratchPercentage)}% scratched
                                </Text>
                            )}
                        </View>
                    </Animated.View>
                )}
            </View>

            {revealAnimationComplete && (
                <Text style={styles.enjoyCoupon}>
                    Your reward is ready to use in Google Pay!
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1a73e8', // Google Blue
        textAlign: 'center',
    },
    cardContainer: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: '#fff',
        position: 'relative',
    },
    rewardContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e8f0fe', // Light Google Blue
        padding: 20,
    },
    rewardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1a73e8', // Google Blue
        marginBottom: 10,
    },
    rewardText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#202124', // Google Gray
        textAlign: 'center',
        marginBottom: 10,
    },
    scratchLayer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#dadce0', // Google Gray background
        alignItems: 'center',
        justifyContent: 'center',
        // Adding a pattern texture to make it look like a scratch card
        borderWidth: 1,
        borderColor: '#dadce0',
    },
    scratchInstructions: {
        alignItems: 'center',
    },
    scratchText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a73e8', // Google Blue
    },
    progressText: {
        fontSize: 14,
        color: '#5f6368', // Google Gray
        marginTop: 5,
    },
    celebrationImage: {
        width: 60,
        height: 60,
        marginTop: 10,
    },
    enjoyCoupon: {
        marginTop: 20,
        fontSize: 16,
        color: '#1a73e8', // Google Blue
        fontWeight: '500',
    },
});

export default ScratchCard;