import DateTimePicker from "@react-native-community/datetimepicker";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import moment from "moment";

export default DatePickerInput = React.memo(
  ({
    name,
    value,
    placeholderTxt,
    handleChange,
    isRequired = false,
    sendDateErr,
    readOnly = false,
  }) => {
    const [show, setShow] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [dateVal, setDateVal] = useState("");
    const [pickDate, setPickDate] = useState("");
    const [errDate, setErrDate] = useState(false);
    const [expiredDate, setExpiredDate] = useState(false);
    const [isLegal, setIsLegal] = useState(true);
    const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
      if (!!value) animatedValue.setValue(1);
      if (moment(value).isValid()) {
        const formattedDate = moment(value, "YYYY-MM-DD").format("MM/DD/YYYY");
        setDateVal(formattedDate);
        setPickDate(formattedDate);
      } else {
        setErrDate(false);
        setDateVal("");
      }
    }, [value]);

    // useEffect(() => {
    //   sendDateErr(errDate || !isLegal || expiredDate, name);
    // }, [errDate, isLegal, expiredDate, name, sendDateErr]);

    const handleFocus = useCallback(() => {
      setIsFocused(true);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, [animatedValue]);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
      if (!value) {
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    }, [animatedValue, value]);

    const labelStyle = useMemo(
      () => ({
        position: "absolute",
        left: 5,
        top: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [12, -14],
        }),
        fontSize: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [16, 16],
        }),
        color: isFocused ? COLORS.orange : COLORS.black,
        backgroundColor: COLORS.backgroundColor,
        paddingHorizontal: 4,
        zIndex: 1,
        borderColor: "transparent",
        borderWidth: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
        borderRadius: 4,
      }),
      [animatedValue, isFocused]
    );

    const onCalenderChange = useCallback(
      (_, selectedDate) => {
        handleChange(name, selectedDate);
        setShow(false);
      },
      [handleChange, name]
    );

    const validate = useCallback((date, fieldName) => {
      const givenDate = moment(date, "MM/DD/YYYY");
      if (fieldName === "startDate")
        setExpiredDate(
          givenDate.isBefore(
            new Date(moment().subtract("days").format("MM/DD/YYYY"))
          )
        );
      else if (fieldName === "endDate") setExpiredDate(!givenDate.isAfter());
      else if (fieldName === "birthDate")
        setIsLegal(moment().diff(date, "years", true) >= 18);
    }, []);

    const setDate = (date, fieldName) => {
      if (!moment(date).isValid()) return;
      setPickDate(date);
      const formattedDate = moment(date).format("MM/DD/YYYY");
      setDateVal(formattedDate);
      validate(formattedDate, fieldName);
      const isValidDate = moment(date, "MM/DD/YYYY", true).isValid();
      setErrDate(!isValidDate);
      if (isValidDate) {
        handleChange(
          fieldName,
          moment(date, "MM/DD/YYYY", true).format("YYYY-MM-DD")
        );
      }
    };

    const handleInput = useCallback(
      (value) => {
        if (!value) {
          handleChange(name, value);
          return;
        }
        if (value.length <= 10) {
          const isValidDate = moment(value, "MM/DD/YYYY", true).isValid();
          if (isValidDate) {
            handleChange(
              name,
              moment(value, "MM/DD/YYYY", true).format("YYYY-MM-DD")
            );
            setDate(value, name);
            validate(value, name);
          }
          setErrDate(!isValidDate);
          setDateVal(value);
        }
      },
      [name, handleChange, setDate, validate]
    );

    const formattedDateVal = useMemo(
      () =>
        dateVal
          .replace(/^(\d\d)(\d)$/g, "$1/$2")
          .replace(/^(\d\d\/\d\d)(\d+)$/g, "$1/$2")
          .replace(/[^\d\/]/g, ""),
      [dateVal]
    );

    return (
      <View style={styles.inputGroup}>
        <Animated.Text style={labelStyle}>
          {placeholderTxt}
          {isRequired && "*"}
        </Animated.Text>
        <TextInput
          style={[styles.inputStyle, isFocused && styles.focusedInput]}
          inputMode="date"
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChangeText={handleInput}
          value={formattedDateVal}
          readOnly={readOnly}
        />
        <TouchableOpacity onPress={() => setShow(true)} style={styles.calender}>
          <Ionicons name="calendar-clear" size={20} color={COLORS.grey} />
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            mode="date"
            is24Hour={true}
            testID="dateTimePicker"
            onChange={onCalenderChange}
            value={!!pickDate ? new Date(pickDate) : new Date()}
          />
        )}
        {dateVal && errDate && <Text style={styles.errText}>invalid date</Text>}
        {!errDate && expiredDate && (
          <Text style={styles.errText}>date is in the past!</Text>
        )}
        {!errDate && !isLegal && (
          <Text style={styles.errText}>
            CLK CLK, Inc. requires users to be at least{" "}
            <Text style={{ fontWeight: "bold" }}>18</Text> years old
          </Text>
        )}
      </View>
    );
  }
);

// Add this style to the inputStyle
const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
    position: "relative",
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 4, // Add this to match the label border radius
  },
  focusedInput: {
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  calender: {
    top: 10,
    right: 10,
    position: "absolute",
  },
  errText: {
    color: COLORS.orange,
    fontSize: 12,
    marginTop: 5,
  },
});
