import React from "react";
import { View, Text, TouchableOpacity, Picker, StyleSheet } from "react-native";
import DatePicker from "react-native-datepicker";
import { generateYearList } from "../Utils";
import moment from "moment";

export default Calender = (props) => {
    const years = generateYearList();
    const months = Array.from({ length: 12 }, (_, i) => {
        return new Date(0, i).toLocaleString("en-US", { month: "long" }).toLowerCase();
    });

    return (
        <DatePicker
            {...props}
            customStyles={{
                dateInput: { borderWidth: 0 },
                dateText: { color: "black" },
            }}
            renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
            }) => (
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        style={[styles.navButton, prevMonthButtonDisabled && styles.disabledButton]}
                    >
                        <Text>{"<<"}</Text>
                    </TouchableOpacity>

                    <Picker
                        selectedValue={moment(new Date(date)).format("YYYY")}
                        onValueChange={(value) => changeYear(value)}
                        style={styles.picker}
                    >
                        {years.map((year) => (
                            <Picker.Item key={year} label={year.toString()} value={year.toString()} />
                        ))}
                    </Picker>

                    <Picker
                        selectedValue={months[moment(new Date(date)).month()]}
                        onValueChange={(value) => changeMonth(months.indexOf(value))}
                        style={styles.picker}
                    >
                        {months.map((month) => (
                            <Picker.Item key={month} label={month} value={month} />
                        ))}
                    </Picker>

                    <TouchableOpacity
                        onPress={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                        style={[styles.navButton, nextMonthButtonDisabled && styles.disabledButton]}
                    >
                        <Text>{">>"}</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    navButton: {
        padding: 5,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
    },
    disabledButton: {
        opacity: 0.5,
    },
    picker: {
        flex: 1,
        height: 40,
    },
});