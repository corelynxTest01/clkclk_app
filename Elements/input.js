import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

export default Input = ({
  style,
  name,
  value,
  placeholderTxt,
  handleChange,
  isRequired = false,
  isSecure = false,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPwd, setShowPwd] = useState(isSecure);
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    if (!!value) animatedValue.setValue(1);
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  // Modify the labelStyle object to include a border
  const labelStyle = {
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
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.black, COLORS.black],
    }),
    backgroundColor: COLORS.backgroundColor,
    paddingHorizontal: 4,
    zIndex: 1,
    borderColor: "transparent", //isFocused ? COLORS.border : "transparent",
    borderWidth: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    borderRadius: 4,
    color: isFocused ? COLORS.orange : COLORS.black,
  };

  return (
    <View style={styles.inputGroup}>
      <Animated.Text style={labelStyle}>
        {placeholderTxt}
        {isRequired && "*"}
      </Animated.Text>
      <TextInput
        style={[styles.inputStyle, isFocused && styles.focusedInput]}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={(inpVal) => handleChange(name, inpVal)}
        secureTextEntry={showPwd}
        {...rest}
      />
      {isSecure && (
        <TouchableOpacity
          onPress={() => setShowPwd(!showPwd)}
          style={{
            top: 10,
            right: 10,
            position: "absolute",
          }}
        >
          <Ionicons
            name={showPwd ? "eye-outline" : "eye-off-outline"}
            size={20}
            color={COLORS.orange}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

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
});
