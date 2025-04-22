import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import Calender from "./calender";

export default function DateInput({
    id,
    name,
    label,
    onChange,
    value,
    sendDateErr,
    readOnly = false,
    isRequired = true,
}) {
    const [dateVal, setDateVal] = useState("");
    const [pickDate, setPickDate] = useState("");
    const [errDate, setErrDate] = useState(false);
    const [expiredDate, setExpiredDate] = useState(false);
    const [isLegal, setIsLegal] = useState(true);

    useEffect(() => {
        if (moment(value).isValid()) {
            setDateVal(moment(value, "YYYY-MM-DD").format("MM/DD/YYYY"));
            setPickDate(moment(value).format("MM/DD/YYYY"));
        } else {
            setErrDate(false);
            setDateVal("");
        }
    }, [value]);

    const setDate = (date, name) => {
        if (moment(date).isValid()) {
            setPickDate(date);
            const formattedDate = moment(date).format("MM/DD/YYYY");
            setDateVal(formattedDate);
            validate(formattedDate, name);
            setErrDate(!moment(date, "MM/DD/YYYY", true).isValid());
            onChange({ target: { name: name, value: moment(date, "MM/DD/YYYY", true).format("YYYY-MM-DD") } });
        }
    };

    useEffect(() => {
        sendDateErr(errDate || !isLegal || expiredDate, name);
    }, [errDate, isLegal, expiredDate, sendDateErr, name]);

    const validate = (date, name) => {
        if (["startDate", "endDate"].includes(name)) {
            let givenDate = moment(date, "MM/DD/YYYY");
            if (name === "startDate") {
                setExpiredDate(
                    givenDate.isBefore(
                        new Date(moment().subtract("days").format("MM/DD/YYYY"))
                    )
                );
            } else if (name === "endDate") {
                setExpiredDate(!givenDate.isAfter());
            }
        } else if (["birthDate"].includes(name)) {
            let isLegal = moment().diff(date, "years", true) >= 18;
            setIsLegal(isLegal);
        }
    };

    const handleInput = (e) => {
        let value = e.nativeEvent.text;
        if (!value) onChange({ target: { name: name, value: value } });
        if (value.length <= 10) {
            if (moment(value, "MM/DD/YYYY", true).isValid()) {
                const date = moment(value, "MM/DD/YYYY", true).format("YYYY-MM-DD");
                onChange({ target: { name: name, value: date } });
                setDate(value, name);
                validate(value, name);
            }
            setErrDate(!moment(value, "MM/DD/YYYY", true).isValid());
            setDateVal(value);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, readOnly && styles.readOnly]}
                    name={name}
                    id={id}
                    value={dateVal
                        .replace(/^(\d\d)(\d)$/g, "$1/$2")
                        .replace(/^(\d\d\/\d\d)(\d+)$/g, "$1/$2")
                        .replace(/[^\d\/]/g, "")}
                    onChange={handleInput}
                    placeholder={label}
                    editable={!readOnly}
                />
            </View>

            <TouchableOpacity style={styles.calendarContainer}>
                <Calender
                    name={name}
                    id={"Calender_" + id}
                    showIcon
                    toggleCalendarOnIconClick
                    selected={pickDate}
                    onChange={(date) => setDate(date, name)}
                    readOnly={readOnly}
                />
            </TouchableOpacity>

            {dateVal && errDate && <Text style={styles.errorText}>Invalid date</Text>}
            {!errDate && expiredDate && (
                <Text style={styles.warningText}>Date is in the past!</Text>
            )}
            {!errDate && !isLegal && (
                <Text style={styles.dangerText}>
                    CLK CLK, Inc. requires users to be at least <Text style={styles.boldText}>18</Text> years old
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    inputContainer: {
        flex: 1,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    readOnly: {
        backgroundColor: "#f5f5f5",
    },
    calendarContainer: {
        marginTop: 10,
    },
    errorText: {
        color: "red",
        fontSize: 14,
    },
    warningText: {
        color: "orange",
        fontSize: 14,
    },
    dangerText: {
        color: "red",
        fontSize: 14,
    },
    boldText: {
        fontWeight: "bold",
    },
});