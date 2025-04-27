import { View, Image, StyleSheet, Animated, Text } from 'react-native';
import React, { useEffect, useRef } from 'react';
import errorPic from '../assets/images/error.png';
import COLORS from '../constants/colors';

export default Warning = () => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.circleSection}>
            <Animated.View
                style={[
                    styles.circle,
                    {
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            ><Image source={errorPic} style={styles.image} />
            </Animated.View>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.orange }}> WARNING!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    circleSection: {
        alignItems: 'center',
    },
    circle: {
        backgroundColor: '#D02727',
        borderRadius: 50,
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '70%',
        height: '70%',
        resizeMode: 'contain',

    },
});