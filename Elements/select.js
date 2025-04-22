import React from "react";
import { View, StyleSheet, Text } from "react-native";
import COLORS from "../constants/colors";
import { Picker } from "@react-native-picker/picker";

export default function Select(props) {
    if (typeof props.options == "undefined") return null;
    const dispVal = Array.isArray(props.value) ? props.value[0]?.id : props?.value;

    return <View style={styles.inputContainer}>
        {dispVal && props.label && <Text style={styles.floatingLabel}>{props.label}{props.isRequired && "*"}</Text>}
        <View style={[styles.pickerContainer, props.pickerStyle]}>
            <Picker
                selectedValue={dispVal}
                onValueChange={props.handleChange}
                enabled={!props.isDisabled}
                style={styles.picker}
            >
                {props?.placeholder && <Picker.Item label={props.placeholder + (props?.isRequired && "*" || "")} value="" />}
                {props.options.map(({ id = null, value = null, name: label }, index) =>
                    <Picker.Item key={(index + "_" + label)} label={label} value={id || value} />
                )}
            </Picker>
        </View>
    </View>
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 18,
        position: "relative",
        width: "100%",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 4,
        overflow: 'hidden',
        justifyContent: 'center'
    },
    picker: {
        height: "max-content",
        width: "100%",
    },
    floatingLabel: {
        position: 'absolute',
        left: 10,
        top: -10,
        backgroundColor: COLORS.backgroundColor,
        paddingHorizontal: 5,
        fontSize: 15,
        color: COLORS.black,
        zIndex: 1,
        borderColor: "transparent",
    },
    label: {
        marginTop: 5,
        fontSize: 14,
    },
});