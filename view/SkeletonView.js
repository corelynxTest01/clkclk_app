import React, { useEffect, useState } from "react";
import { View, FlatList, Animated } from "react-native";

export default SkeletonView = ({ dataLength = 10 }) => {
    const [fadeAnim] = useState(new Animated.Value(0.3));

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0.3,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);


    return (
        <View>
            <FlatList
                data={Array.from({ length: dataLength }, _ => _)}
                style={{ flex: 1 }}
                scrollEnabled={false}
                renderItem={() => (<View style={{ padding: 10, marginBottom: 15 }}>
                    <Animated.View style={{
                        height: 20,
                        width: '70%',
                        borderRadius: 4,
                        marginBottom: 10,
                        opacity: fadeAnim,
                        backgroundColor: '#E0E0E0',
                    }} />
                    <Animated.View style={{
                        height: 100,
                        width: '100%',
                        borderRadius: 4,
                        opacity: fadeAnim,
                        backgroundColor: '#E0E0E0',
                    }} />
                </View>)}
                keyExtractor={(_, index) => index?.toString()}
            />
        </View>
    );
}

    ;