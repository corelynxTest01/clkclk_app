import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';

export default function ModalContainer({ children, visible = false, onClose }) {
    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animation, { toValue: visible ? 1 : 0, duration: 300, useNativeDriver: true }).start();
    }, [visible]);

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <Animated.View
                            style={[
                                styles.modalContainer,
                                {
                                    transform: [
                                        {
                                            translateY: animation.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [300, 0],
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        >
                            {children}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: "center",
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        maxHeight: Dimensions.get('window').height * 0.8,
    },
});